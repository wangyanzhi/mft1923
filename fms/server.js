require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool, testConnection } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3005;

// ============================================================
// 中间件配置
// ============================================================

// 安全头
app.use(helmet({ contentSecurityPolicy: false }));

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || '*'
    : '*',
  credentials: true,
}));

// Body 解析
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 全局限流
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 500,
  message: { code: 429, message: '请求过于频繁，请稍后再试' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', globalLimiter);

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================
// 数据库初始化 —— 自动建表 + 默认数据
// ============================================================

async function initDatabase() {
  const connection = await pool.getConnection();
  try {
    console.log('[DB] 开始初始化数据库...');

    // ---------- 用户与权限 ----------

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(20),
        role_id INT NOT NULL,
        department_id INT,
        status ENUM('启用','停用') DEFAULT '启用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS role_permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_id INT NOT NULL,
        permission_id INT NOT NULL,
        UNIQUE KEY (role_id, permission_id),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
        FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS role_data_scopes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_id INT NOT NULL,
        resource VARCHAR(50) NOT NULL,
        scope ENUM('全部','本部门','本人') NOT NULL DEFAULT '本人',
        UNIQUE KEY (role_id, resource),
        FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS user_data_scopes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        resource VARCHAR(50) NOT NULL,
        scope ENUM('全部','本部门','本人') NOT NULL DEFAULT '本人',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY (user_id, resource),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // ---------- 产品与库存 ----------

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        model VARCHAR(100) NOT NULL UNIQUE COMMENT '产品型号',
        description TEXT,
        category_id INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        cost_price DECIMAL(10, 2) NOT NULL,
        unit VARCHAR(20) NOT NULL DEFAULT 'pcs',
        image_url VARCHAR(255),
        status ENUM('启用','停用') DEFAULT '启用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS bins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        bin_number VARCHAR(50) NOT NULL UNIQUE COMMENT '箱号编号',
        location VARCHAR(100) COMMENT '位置描述',
        description TEXT COMMENT '备注说明',
        status ENUM('启用','停用') DEFAULT '启用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        batch_number VARCHAR(50) NOT NULL COMMENT '批号',
        bin_id INT COMMENT '箱号/货位',
        quantity DECIMAL(10, 1) NOT NULL DEFAULT 0 COMMENT '库存数量（最小单位0.1）',
        unit_price DECIMAL(10, 2) NOT NULL,
        min_stock DECIMAL(10, 1) NOT NULL DEFAULT 10 COMMENT '安全库存线',
        last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE SET NULL,
        UNIQUE KEY (product_id, batch_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inventory_history (
        id INT AUTO_INCREMENT PRIMARY KEY,
        inventory_id INT NOT NULL,
        product_id INT NOT NULL,
        batch_number VARCHAR(50) NOT NULL,
        change_type ENUM('入库','出库','调整','订单创建','订单取消','订单编辑','入库审批') NOT NULL,
        quantity_before DECIMAL(10, 1) NOT NULL COMMENT '变动前数量',
        quantity_change DECIMAL(10, 1) NOT NULL COMMENT '变动数量（正=增加，负=减少）',
        quantity_after DECIMAL(10, 1) NOT NULL COMMENT '变动后数量',
        reference_type VARCHAR(50) COMMENT '关联单据类型',
        reference_id INT COMMENT '关联单据ID',
        notes TEXT,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (inventory_id) REFERENCES inventory(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // ---------- 订单与采购 ----------

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        customer_id INT NOT NULL,
        user_id INT NOT NULL COMMENT '业务员',
        sales_date DATE,
        agent_name VARCHAR(100),
        contact_phone VARCHAR(20),
        tray_type ENUM('无','单层','双层') DEFAULT '无',
        waterproof ENUM('否','是') DEFAULT '否',
        coc ENUM('否','是') DEFAULT '否',
        delivery_note ENUM('否','是') DEFAULT '否',
        return_note ENUM('否','是') DEFAULT '否',
        inspection ENUM('否','是') DEFAULT '否',
        invoice_rate ENUM('无','1%','13%') DEFAULT '无',
        payment_terms ENUM('已付','月结30天','月结90天','手动') DEFAULT '已付',
        payment_term_manual VARCHAR(50),
        express_company VARCHAR(100),
        attachment_url VARCHAR(255) COMMENT '旧版单文件附件（向后兼容）',
        inspection_image_url VARCHAR(255) COMMENT '旧版单文件验货图（向后兼容）',
        total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        status ENUM('待处理','处理中','已完成','已取消','已发货') DEFAULT '待处理',
        payment_status ENUM('未付款','已付款','部分付款') DEFAULT '未付款',
        payment_method VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // 需要先创建 customers 和 users 表，但 orders 依赖它们
    // 已在下面按依赖顺序处理

    // ---------- 客户与供应商 ----------

    // 先创建不依赖其他表的表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        contact_person VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100),
        address TEXT,
        notes TEXT,
        status ENUM('启用','停用') DEFAULT '启用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        company VARCHAR(100),
        contact_person VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(100),
        address TEXT,
        notes TEXT,
        created_by INT,
        status ENUM('启用','停用') DEFAULT '启用',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // 现在可以创建 orders 表（依赖 customers 和 users）
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        customer_id INT NOT NULL,
        user_id INT NOT NULL COMMENT '业务员',
        sales_date DATE,
        agent_name VARCHAR(100),
        contact_phone VARCHAR(20),
        tray_type ENUM('无','单层','双层') DEFAULT '无',
        waterproof ENUM('否','是') DEFAULT '否',
        coc ENUM('否','是') DEFAULT '否',
        delivery_note ENUM('否','是') DEFAULT '否',
        return_note ENUM('否','是') DEFAULT '否',
        inspection ENUM('否','是') DEFAULT '否',
        invoice_rate ENUM('无','1%','13%') DEFAULT '无',
        payment_terms ENUM('已付','月结30天','月结90天','手动') DEFAULT '已付',
        payment_term_manual VARCHAR(50),
        express_company VARCHAR(100),
        attachment_url VARCHAR(255) COMMENT '旧版单文件附件（向后兼容）',
        inspection_image_url VARCHAR(255) COMMENT '旧版单文件验货图（向后兼容）',
        total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        status ENUM('待处理','处理中','已完成','已取消','已发货') DEFAULT '待处理',
        payment_status ENUM('未付款','已付款','部分付款') DEFAULT '未付款',
        payment_method VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        inventory_id INT COMMENT '关联具体库存批次',
        quantity DECIMAL(10, 1) NOT NULL COMMENT '销售数量（最小0.1单位）',
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (inventory_id) REFERENCES inventory(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        file_type ENUM('合同资质','发货图片') NOT NULL,
        file_name VARCHAR(255) NOT NULL COMMENT '原始文件名',
        file_path VARCHAR(500) NOT NULL COMMENT '服务端存储路径',
        file_size INT NOT NULL COMMENT '文件大小(bytes)',
        mime_type VARCHAR(100) COMMENT 'MIME类型',
        description VARCHAR(255) COMMENT '文件说明',
        uploaded_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS purchase_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        supplier_id INT NOT NULL,
        user_id INT NOT NULL COMMENT '采购员',
        order_date DATE,
        expected_date DATE COMMENT '预计到货日期',
        total_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        status ENUM('待处理','已下单','已收货','已取消') DEFAULT '待处理',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS purchase_order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        purchase_order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity DECIMAL(10, 1) NOT NULL COMMENT '采购数量（支持小数）',
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS stock_in_orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(50) NOT NULL UNIQUE,
        user_id INT NOT NULL COMMENT '操作人',
        status ENUM('草稿','已审批','已取消') DEFAULT '草稿',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS stock_in_order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        stock_in_order_id INT NOT NULL,
        product_id INT NOT NULL,
        batch_number VARCHAR(50) NOT NULL COMMENT '批号',
        bin_id INT COMMENT '入库箱号',
        quantity DECIMAL(10, 1) NOT NULL COMMENT '入库数量（支持小数）',
        unit_price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (stock_in_order_id) REFERENCES stock_in_orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (bin_id) REFERENCES bins(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS customer_consultations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        user_id INT NOT NULL COMMENT '跟进人',
        consultation_date DATE NOT NULL,
        content TEXT NOT NULL COMMENT '咨询/跟进内容',
        next_follow_up DATE COMMENT '下次跟进日期',
        status ENUM('待跟进','跟进中','已关闭') DEFAULT '待跟进',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // ---------- 操作日志 ----------

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS operation_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        action VARCHAR(100) NOT NULL,
        target_type VARCHAR(50) NOT NULL,
        target_id INT,
        details JSON,
        ip_address VARCHAR(50),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    console.log('[DB] 所有数据表创建完成');

    // ---------- 插入默认数据 ----------

    // 默认角色
    const [roleRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM roles');
    if (roleRows[0].cnt === 0) {
      await connection.execute(`
        INSERT INTO roles (name, description) VALUES
          ('管理员', '系统管理员，拥有所有权限'),
          ('销售', '销售角色，管理订单、客户和咨询'),
          ('采购', '采购角色，管理采购和供应商'),
          ('库存', '库存角色，管理库存、入库和箱号')
      `);
      console.log('[DB] 默认角色已创建');
    }

    // 默认权限
    const [permRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM permissions');
    if (permRows[0].cnt === 0) {
      await connection.execute(`
        INSERT INTO permissions (name, description) VALUES
          ('user_management', '用户管理'),
          ('product_management', '产品与分类管理'),
          ('inventory_management', '库存管理'),
          ('bin_management', '箱号/货位管理'),
          ('order_management', '销售订单管理'),
          ('purchase_management', '采购订单管理'),
          ('customer_management', '客户管理'),
          ('consultation_management', '咨询跟进管理'),
          ('supplier_management', '供应商管理'),
          ('report_management', '报表查看')
      `);
      console.log('[DB] 默认权限已创建');
    }

    // 角色-权限关联
    const [rpRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM role_permissions');
    if (rpRows[0].cnt === 0) {
      // 获取角色和权限
      const [roles] = await connection.execute('SELECT id, name FROM roles');
      const [perms] = await connection.execute('SELECT id, name FROM permissions');
      const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));
      const permMap = Object.fromEntries(perms.map(p => [p.name, p.id]));

      const assignments = {
        管理员: ['user_management', 'product_management', 'inventory_management', 'bin_management',
                 'order_management', 'purchase_management', 'customer_management',
                 'consultation_management', 'supplier_management', 'report_management'],
        销售: ['product_management', 'order_management', 'customer_management',
                'consultation_management', 'report_management'],
        采购: ['product_management', 'purchase_management', 'supplier_management', 'report_management'],
        库存: ['product_management', 'inventory_management', 'bin_management', 'report_management'],
      };

      const values = [];
      for (const [roleName, permNames] of Object.entries(assignments)) {
        for (const permName of permNames) {
          values.push([roleMap[roleName], permMap[permName]]);
        }
      }

      await connection.query(
        'INSERT INTO role_permissions (role_id, permission_id) VALUES ?',
        [values]
      );
      console.log('[DB] 角色权限关联已创建');
    }

    // 角色级数据范围默认值
    const [rdsRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM role_data_scopes');
    if (rdsRows[0].cnt === 0) {
      const [roles] = await connection.execute('SELECT id, name FROM roles');
      const roleMap = Object.fromEntries(roles.map(r => [r.name, r.id]));
      const resources = ['customer', 'consultation', 'order', 'purchase', 'stock_in_order'];
      const values = [];
      for (const [roleName, roleId] of Object.entries(roleMap)) {
        const scope = roleName === '管理员' ? '全部' : '本人';
        for (const res of resources) {
          values.push([roleId, res, scope]);
        }
      }
      await connection.query(
        'INSERT INTO role_data_scopes (role_id, resource, scope) VALUES ?',
        [values]
      );
      console.log('[DB] 角色数据范围已创建');
    }

    // 默认管理员用户
    const [userRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM users');
    if (userRows[0].cnt === 0) {
      const [roles] = await connection.execute('SELECT id, name FROM roles');
      const adminRole = roles.find(r => r.name === '管理员');
      const hashedPassword = await bcrypt.hash('admin123', 10);

      await connection.execute(
        'INSERT INTO users (username, password, name, role_id, status) VALUES (?, ?, ?, ?, ?)',
        ['admin', hashedPassword, '系统管理员', adminRole.id, '启用']
      );
      console.log('[DB] 默认管理员用户已创建 (admin / admin123)');
    }

    // 默认产品分类
    const [catRows] = await connection.execute('SELECT COUNT(*) AS cnt FROM categories');
    if (catRows[0].cnt === 0) {
      await connection.execute(`
        INSERT INTO categories (name, description) VALUES
          ('单面板', '单面电路板'),
          ('双面板', '双面电路板'),
          ('多层板', '多层电路板'),
          ('柔性板', '柔性电路板 FPC'),
          ('铝基板', '铝基电路板')
      `);
      console.log('[DB] 默认产品分类已创建');
    }

    console.log('[DB] 数据库初始化完成');

  } catch (error) {
    console.error('[DB] 初始化失败:', error.message);
    throw error;
  } finally {
    connection.release();
  }
}

// ============================================================
// 路由挂载
// ============================================================

// 认证路由
app.use('/api/auth', require('./routes/authRoutes'));

// 用户管理路由
app.use('/api/users', require('./routes/userRoutes'));

// 角色管理路由
app.use('/api/roles', require('./routes/roleRoutes'));

// 产品管理路由
app.use('/api/products', require('./routes/productRoutes'));

// 箱号管理路由
app.use('/api/bins', require('./routes/binRoutes'));

// 库存管理路由
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// 销售订单路由
app.use('/api/orders', require('./routes/orderRoutes'));

// 客户路由
app.use('/api/customers', require('./routes/customerRoutes'));

// 咨询路由
app.use('/api/consultations', require('./routes/consultationRoutes'));

// 采购路由
app.use('/api/purchase', require('./routes/purchaseRoutes'));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    code: 200,
    message: 'OK',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
    },
  });
});

// 临时：根路径返回 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// 全局错误处理
// ============================================================

app.use((err, req, res, next) => {
  console.error('[Error]', err.stack || err.message);

  // multer 文件过大错误
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ code: 400, message: '文件大小超出限制' });
  }

  // JWT 错误
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ code: 401, message: '无效的认证令牌' });
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ code: 401, message: '认证令牌已过期' });
  }

  res.status(err.status || 500).json({
    code: err.status || 500,
    message: process.env.NODE_ENV === 'production'
      ? '服务器内部错误'
      : err.message,
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ code: 404, message: '接口不存在' });
});

// ============================================================
// 启动服务
// ============================================================

async function start() {
  // 测试数据库连接
  const dbOk = await testConnection();
  if (!dbOk) {
    console.error('[Server] 数据库连接失败，无法启动服务');
    process.exit(1);
  }

  // 初始化数据库（建表 + 默认数据）
  try {
    await initDatabase();
  } catch (error) {
    console.error('[Server] 数据库初始化失败，无法启动服务:', error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`[Server] 电路基板进销存系统已启动`);
    console.log(`[Server] 地址: http://localhost:${PORT}`);
    console.log(`[Server] 环境: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[Server] 数据库: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
  });
}

start();
