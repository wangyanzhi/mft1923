# 电路基板进销存系统 - Code Wiki

## 1. 项目概述

### 1.1 项目简介

电路基板进销存系统是一个完整的企业级库存管理系统，基于 Node.js + Express + MySQL 技术栈开发。系统提供了完整的用户权限管理、产品管理、库存管理、销售订单、采购订单、客户管理以及客户咨询跟进等核心业务功能。

### 1.2 主要特性

- **完整的权限控制系统**：基于角色的权限管理（RBAC），支持数据范围控制（用户级优先 + 角色级兜底）
- **拆零销售支持**：产品支持小数数量（最小销售/出入库单位 0.1），所有数量字段统一使用 DECIMAL(10,1)，库存可存在小于 1 的零数
- **批号管理**：库存产品支持批号追踪
- **箱号/货位管理**：产品入库绑定箱号，方便仓库快速定位实物位置
- **订单管理**：销售订单和采购订单的全流程管理
- **库存预警**：支持库存低于安全线的预警功能（安全线支持小数）
- **文件上传**：支持产品图片和订单附件的上传
- **操作日志**：记录系统关键操作

---

## 2. 系统架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                        前端 (SPA)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   登录认证   │  │  业务模块    │  │  数据展示    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/REST API
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   后端 (Express.js)                     │
│  ┌───────────────────────────────────────────────────┐ │
│  │              中间件层 (Middleware)                  │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐ │ │
│  │  │ 认证中间件 │  │ 文件上传   │  │ 限流       │ │ │
│  │  └────────────┘  └────────────┘  └────────────┘ │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │              路由层 (Routes)                        │ │
│  │  认证 / 用户 / 产品 / 库存 / 订单 / 采购 / 客户      │ │
│  └───────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────┐ │
│  │              控制层 (Controllers)                   │ │
│  │  业务逻辑处理 / 数据验证 / 事务处理                 │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ MySQL 连接池
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    MySQL 数据库                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ 用户表   │  │ 产品表   │  │ 库存表   │  │ 订单表 │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 2.2 技术栈

| 层级         | 技术选型                          |
|--------------|----------------------------------|
| 后端框架     | Express.js 4.x                   |
| 数据库       | MySQL 8.x                        |
| 数据库驱动   | mysql2 (Promise-based)           |
| 认证方式     | JWT (jsonwebtoken)               |
| 密码加密     | bcryptjs                         |
| 文件上传     | multer                           |
| 前端         | 原生 JavaScript + HTML5 + CSS3   |
| 环境变量     | dotenv                           |
| 跨域处理     | cors                             |

---

## 3. 目录结构

```
fms/
├── server.js                          # 主入口文件
├── package.json                       # 项目依赖配置
├── database.sql                       # 数据库结构（可选）
├── .env.example                       # 环境变量示例
├── .gitignore
├── config/
│   └── db.js                          # 数据库连接池配置
├── controllers/                       # 控制器层
│   ├── authController.js             # 认证控制器
│   ├── userController.js             # 用户控制器
│   ├── productController.js          # 产品控制器
│   ├── inventoryController.js        # 库存控制器
│   ├── binController.js              # 箱号/货位控制器
│   ├── orderController.js            # 销售订单控制器
│   ├── purchaseController.js         # 采购订单控制器
│   ├── customerController.js         # 客户控制器
│   └── consultationController.js     # 咨询管理控制器
├── middleware/                       # 中间件层
│   ├── auth.js                       # JWT认证与权限验证
│   └── upload.js                     # 文件上传处理
├── services/                         # 服务层
│   └── operationLogService.js        # 操作日志服务
├── routes/                           # 路由层
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── inventoryRoutes.js
│   ├── binRoutes.js                   # 箱号/货位路由
│   ├── orderRoutes.js
│   ├── purchaseRoutes.js
│   ├── customerRoutes.js
│   └── consultationRoutes.js
├── public/                           # 前端静态资源
│   ├── index.html                    # 主页面
│   ├── login-test.html               # 登录测试页
│   ├── css/
│   │   └── style.css                 # 样式文件
│   └── js/
│       └── app.js                    # 前端业务逻辑
└── uploads/                          # 文件上传目录（.gitignore）
```

---

## 4. 配置文件说明

### 4.1 package.json

```json
{
  "name": "circuit-board-inventory",
  "version": "1.0.0",
  "description": "电路基板进销存系统",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 4.2 环境变量 (.env)

复制 `.env.example` 为 `.env` 并根据实际环境修改：

| 变量名         | 说明                 | 默认值                  |
|----------------|----------------------|------------------------|
| DB_HOST        | 数据库主机地址       | localhost              |
| DB_USER        | 数据库用户名         | root                   |
| DB_PASSWORD    | 数据库密码           | (需设置)               |
| DB_PORT        | 数据库端口           | 3306                   |
| DB_NAME        | 数据库名称           | circuit_board_inventory|
| JWT_SECRET     | JWT签名密钥          | (需设置)               |
| PORT           | 服务端口             | 3005                   |

---

## 5. 核心模块详解

### 5.1 主入口 (server.js)

**位置**: [server.js](file:///c:/Users/georg/Documents/trae_projects/fms/server.js)

**功能**:
- Express 应用初始化与启动
- 中间件配置（CORS、JSON解析、URL编码）
- 静态资源服务配置
- 数据库自动初始化与建表
- 路由挂载
- 健康检查端点

**关键流程**:
```
启动服务 → 初始化数据库（建表+默认数据）→ 挂载路由 → 监听端口
```

**默认初始化数据**:
- 4个角色：管理员、销售、采购、库存
- 1个管理员用户（admin / admin123）
- 5种产品分类

### 5.2 数据库连接 (config/db.js)

**位置**: [config/db.js](file:///c:/Users/georg/Documents/trae_projects/fms/config/db.js)

**功能**: 创建MySQL连接池，提供全局数据库访问能力

```javascript
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  // 最大连接数
  queueLimit: 0         // 队列无限制
});
```

### 5.3 认证中间件 (middleware/auth.js)

**位置**: [middleware/auth.js](file:///c:/Users/georg/Documents/trae_projects/fms/middleware/auth.js)

**核心功能**:

#### 5.3.1 verifyToken
- 验证 JWT Token 有效性
- 从 `Authorization: Bearer <token>` 头中提取 Token
- 验证用户是否存在且状态为活跃
- 将用户信息附加到 `req.user`

#### 5.3.2 verifyPermission(permissionName)
- 检查当前登录用户是否拥有指定权限
- 查询 `role_permissions` 关联表验证权限

#### 5.3.3 applyDataScope(resource)
数据范围权限控制，采用**用户级优先 + 角色级兜底**两级配置：

1. 先查 `user_data_scopes`（用户级）→ 命中则使用
2. 未命中则查 `role_data_scopes`（角色级默认值）
3. 都没有则默认为 `本人`（最严格，只看自己创建的）

支持范围：
- `全部` — 全部数据
- `本部门` — 本部门数据
- `本人` — 仅自己创建的数据

可限制的资源：customer、consultation、order、purchase、stock_in_order

### 5.3b 文件上传中间件 (middleware/upload.js)

**位置**: [middleware/upload.js](file:///c:/Users/georg/Documents/trae_projects/fms/middleware/upload.js)

**上传配置**:

| 场景 | 允许格式 | 大小限制 | 存储路径 |
|------|---------|---------|---------|
| 产品图片 | jpg, jpeg, png, webp | 5 MB | `uploads/products/` |
| 订单文档 (document) | pdf, doc, docx, xls, xlsx, jpg, jpeg, png, webp | 10 MB | `uploads/orders/documents/` |
| 发货图片 (shipment_photo) | jpg, jpeg, png, webp | 10 MB | `uploads/orders/shipments/` |

**安全措施**:
- MIME 类型白名单校验（非仅文件扩展名）
- 文件大小硬限制（multer limits.fileSize）
- 文件名随机化（UUID + 原始扩展名），防止路径遍历
- 上传目录按模块隔离，不可执行

### 5.4 认证控制器 (controllers/authController.js)

**位置**: [controllers/authController.js](file:///c:/Users/georg/Documents/trae_projects/fms/controllers/authController.js)

**主要接口**:
- `POST /api/auth/login` - 用户登录，返回JWT Token
- `POST /api/auth/register` - 用户注册（需管理员权限）
- `GET /api/auth/me` - 获取当前登录用户信息
- `PUT /api/auth/password` - 更新当前用户密码

### 5.5 产品管理 (controllers/productController.js)

**位置**: [controllers/productController.js](file:///c:/Users/georg/Documents/trae_projects/fms/controllers/productController.js)

**主要功能**:
- 产品列表查询（支持分类、关键词筛选、分页）
- 产品详情查看
- 产品新增（支持图片上传）
- 产品编辑
- 产品删除
- 产品分类管理（增删改查）

### 5.6 库存管理 (controllers/inventoryController.js)

**位置**: [controllers/inventoryController.js](file:///c:/Users/georg/Documents/trae_projects/fms/controllers/inventoryController.js)

**核心功能**:
- 库存列表查询与预警
- 库存入库（增加库存，支持批号）
- 库存出库（减少库存，支持并发控制）
- 库存调整（直接设置库存数量）
- 库存变动历史记录查询
- 入库单管理（创建、列表、审批、取消）

**关键特性**:
- 使用数据库事务确保库存操作的原子性
- 使用 `FOR UPDATE` 锁防止并发超卖
- 批号追踪管理
- 库存预警（数量≤最小库存值）

### 5.6b 箱号管理 (controllers/binController.js)

**位置**: [controllers/binController.js](file:///c:/Users/georg/Documents/trae_projects/fms/controllers/binController.js)

**核心功能**:
- 箱号增删改查（bin_number 唯一、location、description）
- 查看箱号下已存放的产品列表（按 product_id + batch_number 维度）
- 入库时指定箱号（`inventory.bin_id` 关联）
- 销售出库/查找产品时，可通过箱号快速定位实物位置

**业务约束**:
- **修改箱号**：弹出确认框，列出该箱号下当前存放的所有产品（型号、批号、数量），提醒用户"修改箱号编号可能影响仓库定位，是否继续？"
- **删除箱号**：必须先确保该箱号下没有任何库存产品（`SELECT COUNT(*) FROM inventory WHERE bin_id = ? AND quantity > 0`），如有产品则拒绝删除并提示"该箱号下仍有 N 个产品存放，请先移走所有产品后再删除"
- **停用箱号**：可将箱号 status 设为 `inactive`，入库时不再出现在可选列表，但不影响已有库存记录

### 5.7 销售订单管理 (controllers/orderController.js)

**位置**: [controllers/orderController.js](file:///c:/Users/georg/Documents/trae_projects/fms/controllers/orderController.js)

**主要功能**:
- 订单列表查询（支持筛选、分页）
- 订单详情查看
- 创建订单（自动扣减库存）
- 编辑订单（先恢复库存再扣减）
- 更新订单状态与支付状态
- 删除订单（仅待处理状态可删）
- 销售统计

**订单字段**:
- 基础信息：订单号、客户、日期、业务员
- 产品选项：托盘类型、防水、COC、送货单、退货单、验货
- 财务选项：发票税率、付款条件、付款方式
- 附件（多文件支持）：通过 `order_files` 表管理，分为两类：
  - **document（合同/资质）**：订单合同、资质证书等，支持 PDF/Word/Excel/图片
  - **shipment_photo（发货图片）**：产品发货实拍照片，支持 JPG/PNG/WebP

---

## 6. 数据库设计

### 6.1 核心数据表

#### 6.1.1 用户与权限表

| 表名 | 说明 |
|------|------|
| users | 用户信息表 |
| roles | 角色表 |
| permissions | 权限表 |
| role_permissions | 角色-权限关联表 |
| role_data_scopes | 角色数据范围配置表（角色级默认值） |
| user_data_scopes | 用户数据范围配置表（用户级覆盖，优先级高于角色级） |

#### 6.1.2 产品与库存表

| 表名 | 说明 |
|------|------|
| categories | 产品分类表 |
| products | 产品信息表 |
| bins | 箱号/货位表（产品入库放置位置） |
| inventory | 库存表（批号维度） |
| inventory_history | 库存变动历史表 |

#### 6.1.3 订单与采购表

| 表名 | 说明 |
|------|------|
| orders | 销售订单表 |
| order_items | 销售订单明细表 |
| order_files | 订单附件表（合同/资质文档 + 发货图片，支持多文件） |
| purchase_orders | 采购订单表 |
| purchase_order_items | 采购订单明细表 |
| stock_in_orders | 入库单表 |
| stock_in_order_items | 入库单明细表 |

#### 6.1.4 客户与供应商表

| 表名 | 说明 |
|------|------|
| customers | 客户表 |
| suppliers | 供应商表 |
| customer_consultations | 客户咨询跟进表 |

#### 6.1.5 其他表

| 表名 | 说明 |
|------|------|
| operation_logs | 系统操作日志表 |

### 6.2 关键表结构

#### products 表
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(100) NOT NULL UNIQUE,  -- 产品型号
  description TEXT,
  category_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  cost_price DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  image_url VARCHAR(255),
  status ENUM('启用','停用') DEFAULT '启用',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

#### inventory 表
```sql
CREATE TABLE inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  batch_number VARCHAR(50) NOT NULL,  -- 批号
  bin_id INT,                          -- 箱号/货位（入库时记录放置位置）
  quantity DECIMAL(10, 1) NOT NULL DEFAULT 0,  -- 支持小数（最小销售单位 0.1）
  unit_price DECIMAL(10, 2) NOT NULL,
  min_stock DECIMAL(10, 1) NOT NULL DEFAULT 10, -- 安全库存线（支持小数）
  last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (bin_id) REFERENCES bins(id) ON DELETE SET NULL,
  UNIQUE KEY (product_id, batch_number)
);
```

#### bins 表（箱号/货位管理）
```sql
CREATE TABLE bins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  bin_number VARCHAR(50) NOT NULL UNIQUE,  -- 箱号编号（如 A-01-03）
  location VARCHAR(100),                   -- 位置描述（如 A区-1排-3层）
  description TEXT,                        -- 备注说明
  status ENUM('启用','停用') DEFAULT '启用',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### user_data_scopes 表
```sql
CREATE TABLE user_data_scopes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  resource VARCHAR(50) NOT NULL,          -- 资源: customer, consultation, order, purchase, stock_in_order
  scope ENUM('全部','本部门','本人') NOT NULL DEFAULT '本人',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, resource)
);
```

#### order_items 表（销售订单明细）
```sql
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  inventory_id INT,                        -- 关联具体库存批次
  quantity DECIMAL(10, 1) NOT NULL,        -- 销售数量（最小 0.1 单位）
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);
```

#### order_files 表（订单附件/发货图片，支持多文件上传）
```sql
CREATE TABLE order_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  file_type ENUM('合同资质','发货图片') NOT NULL,
    -- 'document':      订单合同、资质证书等 PDF/Word/Excel/图片
    -- 'shipment_photo': 产品发货实拍图片
  file_name VARCHAR(255) NOT NULL,       -- 原始文件名
  file_path VARCHAR(500) NOT NULL,       -- 服务端存储路径
  file_size INT NOT NULL,                -- 文件大小（bytes）
  mime_type VARCHAR(100),                -- MIME 类型
  description VARCHAR(255),              -- 文件说明（可选）
  uploaded_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
```

> **注意**: `orders` 表中保留 `attachment_url` 和 `inspection_image_url` 字段作为向后兼容（单文件场景快速上传），但推荐使用 `order_files` 表支持多文件管理。

#### purchase_order_items 表（采购订单明细）
```sql
CREATE TABLE purchase_order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  purchase_order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity DECIMAL(10, 1) NOT NULL,        -- 采购数量（支持小数）
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### stock_in_order_items 表（入库单明细）
```sql
CREATE TABLE stock_in_order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  stock_in_order_id INT NOT NULL,
  product_id INT NOT NULL,
  batch_number VARCHAR(50) NOT NULL,       -- 批号
  bin_id INT,                              -- 入库箱号
  quantity DECIMAL(10, 1) NOT NULL,        -- 入库数量（支持小数）
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (stock_in_order_id) REFERENCES stock_in_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (bin_id) REFERENCES bins(id)
);
```

#### inventory_history 表（库存变动历史）
```sql
CREATE TABLE inventory_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inventory_id INT NOT NULL,
  product_id INT NOT NULL,
  batch_number VARCHAR(50) NOT NULL,
  change_type ENUM('入库','出库','调整','订单创建','订单取消','订单编辑','入库审批') NOT NULL,
  quantity_before DECIMAL(10, 1) NOT NULL, -- 变动前数量
  quantity_change DECIMAL(10, 1) NOT NULL, -- 变动数量（正=增加，负=减少）
  quantity_after DECIMAL(10, 1) NOT NULL,  -- 变动后数量
  reference_type VARCHAR(50),              -- 关联单据类型（order / stock_in / manual）
  reference_id INT,                        -- 关联单据 ID
  notes TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

#### orders 表
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  customer_id INT NOT NULL,
  user_id INT NOT NULL,
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
  attachment_url VARCHAR(255),              -- 旧版单文件附件（向后兼容，推荐使用 order_files 表）
  inspection_image_url VARCHAR(255),        -- 旧版单文件验货图（向后兼容，推荐使用 order_files 表）
  total_amount DECIMAL(10, 2) NOT NULL,
  status ENUM('待处理','处理中','已完成','已取消','已发货') DEFAULT '待处理',
  payment_status ENUM('未付款','已付款','部分付款') DEFAULT '未付款',
  payment_method VARCHAR(50),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## 7. API 接口文档

### 7.1 认证模块 (Auth)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| POST | /api/auth/login | 用户登录 | - |
| POST | /api/auth/register | 用户注册 | user_management |
| GET | /api/auth/me | 获取当前用户 | 已登录 |
| PUT | /api/auth/password | 更新密码 | 已登录 |

### 7.2 用户管理 (Users)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/users | 用户列表 | user_management |
| GET | /api/users/:id | 用户详情 | user_management |
| PUT | /api/users/:id | 更新用户 | user_management |
| DELETE | /api/users/:id | 删除用户 | user_management |
| GET | /api/users/roles/list | 角色列表 | user_management |
| GET | /api/users/permissions/list | 权限列表 | user_management |

### 7.3 产品管理 (Products)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/products | 产品列表 | - |
| GET | /api/products/:id | 产品详情 | - |
| POST | /api/products | 新增产品 | product_management |
| PUT | /api/products/:id | 更新产品 | product_management |
| DELETE | /api/products/:id | 删除产品 | product_management |
| GET | /api/products/categories/list | 分类列表 | - |
| POST | /api/products/categories | 新增分类 | product_management |
| PUT | /api/products/categories/:id | 更新分类 | product_management |
| DELETE | /api/products/categories/:id | 删除分类 | product_management |

### 7.4 库存管理 (Inventory)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/inventory | 库存列表 | inventory_management |
| GET | /api/inventory/alerts | 库存预警 | inventory_management |
| POST | /api/inventory/in | 库存入库 | inventory_management |
| POST | /api/inventory/out | 库存出库 | inventory_management |
| PUT | /api/inventory/adjust | 库存调整 | inventory_management |
| GET | /api/inventory/history | 库存历史 | inventory_management |
| POST | /api/inventory/stock-in-orders | 创建入库单 | inventory_management |
| GET | /api/inventory/stock-in-orders | 入库单列表 | inventory_management |
| GET | /api/inventory/stock-in-orders/today-count | 今日入库单数 | inventory_management |
| GET | /api/inventory/stock-in-orders/:id | 入库单详情 | inventory_management |
| PUT | /api/inventory/stock-in-orders/:id | 修改入库单 | inventory_management |
| PUT | /api/inventory/stock-in-orders/:id/approve | 审批入库单 | inventory_management |
| PUT | /api/inventory/stock-in-orders/:id/cancel | 取消入库单 | inventory_management |
| GET | /api/inventory/batch-numbers/:productId | 产品批号列表 | inventory_management |
| GET | /api/inventory/search-suggestions | 搜索建议 | inventory_management |

### 7.4b 箱号管理 (Bins)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/bins | 箱号列表（含各箱号下产品数量统计） | inventory_management |
| GET | /api/bins/:id | 箱号详情 | inventory_management |
| GET | /api/bins/:id/products | 查询该箱号下所有存放产品（型号、批号、数量） | inventory_management |
| POST | /api/bins | 新增箱号 | inventory_management |
| PUT | /api/bins/:id | 修改箱号（返回该箱号下的产品列表供前端确认） | inventory_management |
| DELETE | /api/bins/:id | 删除箱号（仅当无产品存放时允许） | inventory_management |
| PUT | /api/bins/:id/status | 启用/停用箱号 | inventory_management |

### 7.5 销售订单 (Orders)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/orders | 订单列表 | order_management |
| GET | /api/orders/today-count | 今日订单数 | order_management |
| GET | /api/orders/:id | 订单详情 | order_management |
| POST | /api/orders | 创建订单 | order_management |
| PUT | /api/orders/:id | 更新订单 | order_management |
| PUT | /api/orders/:id/status | 更新状态 | order_management |
| DELETE | /api/orders/:id | 删除订单 | order_management |
| GET | /api/orders/stats/sales | 销售统计 | order_management |
| POST | /api/orders/:id/files | 上传订单附件（document/shipment_photo，支持多文件批量上传） | order_management |
| GET | /api/orders/:id/files | 获取订单文件列表（按 file_type 分类返回） | order_management |
| DELETE | /api/orders/:id/files/:fileId | 删除单个文件 | order_management |

### 7.6 采购管理 (Purchase)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/purchase | 采购订单列表 | purchase_management |
| GET | /api/purchase/:id | 采购订单详情 | purchase_management |
| POST | /api/purchase | 创建采购单 | purchase_management |
| PUT | /api/purchase/:id/status | 更新状态 | purchase_management |
| DELETE | /api/purchase/:id | 删除采购单 | purchase_management |
| GET | /api/purchase/suppliers/list | 供应商列表 | purchase_management |
| POST | /api/purchase/suppliers | 新增供应商 | purchase_management |
| PUT | /api/purchase/suppliers/:id | 更新供应商 | purchase_management |
| DELETE | /api/purchase/suppliers/:id | 删除供应商 | purchase_management |

### 7.7 客户管理 (Customers)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/customers | 客户列表 | customer_management |
| GET | /api/customers/:id | 客户详情 | customer_management |
| POST | /api/customers | 新增客户 | customer_management |
| PUT | /api/customers/:id | 更新客户 | customer_management |
| DELETE | /api/customers/:id | 删除客户 | customer_management |

### 7.8 咨询管理 (Consultations)

| 方法 | 路径 | 说明 | 权限要求 |
|------|------|------|----------|
| GET | /api/consultations | 咨询列表 | consultation_management |
| GET | /api/consultations/:id | 咨询详情 | consultation_management |
| POST | /api/consultations | 新增咨询 | consultation_management |
| PUT | /api/consultations/:id | 更新咨询 | consultation_management |
| DELETE | /api/consultations/:id | 删除咨询 | consultation_management |
| GET | /api/consultations/customer/:customer_id | 客户咨询列表 | consultation_management |

---

## 8. 前端架构

### 8.1 前端结构

**主要文件**:
- [public/index.html](file:///c:/Users/georg/Documents/trae_projects/fms/public/index.html) - 主页面
- [public/js/app.js](file:///c:/Users/georg/Documents/trae_projects/fms/public/js/app.js) - 前端逻辑
- [public/css/style.css](file:///c:/Users/georg/Documents/trae_projects/fms/public/css/style.css) - 样式

### 8.2 前端功能模块

1. **登录页面**: 用户认证
2. **仪表盘**: 数据概览（产品数、库存、订单数、客户数等）
3. **用户管理**: 用户增删改查
4. **产品管理**: 产品与分类管理
5. **库存管理**: 库存查询、入库、出库、调整、入库单
6. **订单管理**: 销售订单创建与管理
7. **采购管理**: 采购订单与供应商管理
8. **客户管理**: 客户信息管理
9. **咨询管理**: 客户咨询跟进

### 8.3 权限控制

前端通过 `userInfo.permissions` 数组动态控制：
- 导航菜单的显示/隐藏
- 操作按钮的可见性
- 页面路由的访问权限

---

## 9. 部署与运行

### 9.1 环境要求

- Node.js 18+ 
- MySQL 8.0+

### 9.2 安装步骤

1. **克隆或下载项目**
```bash
cd fms
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
copy .env.example .env
# 编辑 .env 文件，填入数据库连接信息
```

4. **启动项目**
```bash
# 生产模式
npm start

# 开发模式（自动重启）
npm run dev
```

5. **访问应用**
```
http://localhost:3005
```

**默认账号**:
- 用户名: `admin`
- 密码: `admin123`

---

## 10. 权限系统说明

### 10.1 预置角色与权限

| 角色 | 权限 |
|------|------|
| 管理员 | 所有权限（含 bin_management） |
| 销售 | product_management, order_management, customer_management, consultation_management, report_management |
| 采购 | product_management, purchase_management, supplier_management, report_management |
| 库存 | product_management, inventory_management, bin_management, report_management |

### 10.2 数据范围控制

采用**用户级优先 + 角色级兜底**两级配置：

**优先级**: `user_data_scopes`（用户级） > `role_data_scopes`（角色级默认） > `本人`（默认最严格）

**配置资源**: customer, consultation, order, purchase, stock_in_order

**范围级别**:
- `全部` — 全部数据，不做过滤
- `本部门` — 仅本部门数据（按 `users.department_id` 过滤）
- `本人` — 仅自己创建的数据（按 `created_by` / `user_id` 过滤）

**管理方式**:
- 管理员在用户管理页面为每个用户单独设置各资源的数据可见范围
- 未设置时自动继承用户所属角色的默认范围
- 角色默认范围在 `role_data_scopes` 表中预置

---

## 11. 关键业务流程

### 11.1 销售订单创建流程

```
1. 选择客户 → 2. 添加产品（选择型号和批号）→ 3. 填写订单信息 → 4. 提交
   ↓
系统自动：
- 验证库存是否充足
- 使用 FOR UPDATE 锁定库存行（防止并发）
- 扣减库存
- 创建订单记录
- 记录库存变动历史
- 记录操作日志
```

### 11.2 入库单审批流程

```
1. 创建入库单（草稿状态，指定产品、批号、数量、箱号）
   → 2. 审批通过
   ↓
系统自动：
- 验证箱号是否存在且为 active 状态
- 更新入库单状态为 approved
- 增加库存（按批号），同时记录 bin_id（箱号）
- 记录库存变动历史
- 记录操作日志
```

### 11.3 销售出库 - 产品快速定位

```
1. 销售员在订单中选择产品型号和批号
   → 2. 系统自动显示该产品库存对应的箱号（bin_number + location）
   ↓
仓库人员根据箱号快速找到实物 → 拣货出库
```

### 11.4 箱号修改/删除约束流程

**修改箱号**:
```
管理员修改箱号 → 系统查询 inventory 中该箱号下的所有产品
  → 如有产品：返回产品列表（型号、批号、数量），前端弹出确认框
  → 管理员确认 → 执行修改
  → 记录操作日志
```

**删除箱号**:
```
管理员删除箱号 → 系统查询 inventory WHERE bin_id = ? AND quantity > 0
  → 数量 > 0：拒绝删除，返回提示"该箱号下仍有 N 个产品存放"
  → 数量 = 0：允许删除（inventory.bin_id 已通过 ON DELETE SET NULL 自动置空）
  → 记录操作日志
```

---

## 12. 开发指南

### 12.1 添加新接口

1. 在 `controllers/` 中创建或修改控制器函数
2. 在 `routes/` 中定义路由
3. 在 `server.js` 中挂载路由（如果是新模块）

### 12.2 添加新数据表

在 `server.js` 的 `initDatabase()` 函数中添加建表语句，系统会在启动时自动创建。

### 12.3 小数数量运算注意事项

> ⚠️ **重要**：系统最小销售/出入库单位为 **0.1**，所有数量计算严禁使用 JavaScript 浮点运算（`0.1 + 0.2 !== 0.3`）。

**推荐做法**:
- **优先在 SQL 中进行数量加减**：`UPDATE inventory SET quantity = quantity + ? WHERE ...`，MySQL 的 DECIMAL 运算天然精确
- **JS 侧校验使用整数化比较**：将数量乘以 10 转为整数再比较（`qty * 10`），避免浮点误差
- **前端输入**：`<input type="number" step="0.1" min="0.1">`，提交前校验 `value % 0.1 === 0`（或更安全地用 `(value * 10) % 1 === 0`）
- **后端验证**：所有数量参数校验最小值 0.1，并验证是否为 0.1 的整数倍

### 12.4 操作日志记录

使用 `operationLogService.logOperation()` 记录关键操作：

```javascript
const { logOperation } = require('../services/operationLogService');

logOperation({
  user_id: req.user.id,
  action: '操作名称',
  target_type: '目标类型',
  target_id: 目标ID,
  details: { 详细信息 },
  ip_address: req.ip,
  user_agent: req.headers['user-agent']
});
```

---

## 13. 常见问题

### Q: 数据库连接失败怎么办？
A: 检查 .env 文件中的数据库配置是否正确，确保 MySQL 服务已启动。

### Q: 如何重置管理员密码？
A: 直接修改数据库 users 表中 admin 用户的 password 字段（需使用 bcrypt 加密）。

### Q: 上传的文件保存在哪里？
A: 默认保存在项目根目录的 `uploads/` 文件夹中，该目录已被 .gitignore 忽略。

---

## 14. 设计文档参考

- [Design.md](file:///c:/Users/georg/Documents/trae_projects/fms/Design.md) - 系统设计文档
- [PERMISSIONS.md](file:///c:/Users/georg/Documents/trae_projects/fms/PERMISSIONS.md) - 权限系统说明
- [PROJECT_OVERVIEW.md](file:///c:/Users/georg/Documents/trae_projects/fms/PROJECT_OVERVIEW.md) - 项目概览

---

## 15. 从零到上线任务计划

### 第一阶段：项目初始化与环境搭建

| # | 任务 | 说明 |
|---|------|------|
| 1.1 | 初始化项目骨架 | 创建 `fms/` 目录，`npm init`，安装依赖（express, mysql2, jsonwebtoken, bcryptjs, multer, cors, dotenv, helmet, express-rate-limit） |
| 1.2 | 创建 `.env.example` + `.env` | 配置 `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`, `DB_NAME`, `JWT_SECRET`, `PORT` |
| 1.3 | 创建 `config/db.js` | MySQL 连接池配置（mysql2/promise），连接数限制、队列配置 |
| 1.4 | 创建 `server.js` 入口 | Express 应用初始化、中间件挂载（CORS, JSON, helmet, 限流）、`initDatabase()` 自动建表函数、路由挂载、健康检查端点 `/api/health` |
| 1.5 | 创建 `.gitignore` | 排除 `node_modules/`, `.env`, `uploads/`, `logs/` |
| 1.6 | 准备 MySQL 数据库 | 创建 `circuit_board_inventory` 数据库，utf8mb4 字符集 |

**验收标准**: `npm run dev` 启动服务，连接 MySQL 成功，所有表自动创建，`/api/health` 返回 200。

---

### 第二阶段：认证后端 + 登录页 + 主框架 🎨

| # | 任务 | 说明 |
|---|------|------|
| 2.1 | `services/operationLogService.js` | 操作日志记录服务 |
| 2.2 | `middleware/auth.js` | `verifyToken` JWT 验证、`verifyPermission(perm)` 权限检查、`applyDataScope(resource)` 数据范围（用户级优先 → 角色级兜底 → 默认本人） |
| 2.3 | `controllers/authController.js` | `POST /api/auth/login` 登录返回 JWT、`POST /api/auth/register` 注册、`GET /api/auth/me` 当前用户、`PUT /api/auth/password` 改密码 |
| 2.4 | `routes/authRoutes.js` | 认证路由挂载 |
| 2.5 | **🎨 `public/index.html`** | **SPA 主框架：侧边导航 + 顶部栏 + 主内容区 + 页面切换** |
| 2.6 | **🎨 `public/css/style.css`** | **全局样式：企业级配色、导航/表格/表单/按钮/弹窗基础组件** |
| 2.7 | **🎨 `public/js/app.js`** | **前端核心：路由管理、API 封装（Authorization 头 + 401 拦截）、权限菜单渲染、Toast 通知** |
| 2.8 | **🎨 登录页** | **登录表单 → Token 存 localStorage → 跳转仪表盘** |
| 2.9 | **🎨 仪表盘框架** | **概览卡片占位（统计数字后续阶段逐步接入真实 API）** |

**🎯 本阶段可见成果**: 打开浏览器 → 看到登录页 → 用 admin/admin123 登录 → 进入仪表盘主页（侧边栏、顶栏、卡片布局俱全）

---

### 第三阶段：用户管理（后端 + 前端）🎨

| # | 任务 | 说明 |
|---|------|------|
| 3.1 | `controllers/userController.js` | 用户 CRUD、角色列表、权限列表；**编辑时支持设置 user_data_scopes（数据可见范围面板）** |
| 3.2 | `routes/userRoutes.js` | 用户管理路由（均需 `user_management` 权限） |
| 3.3 | **🎨 用户管理页面** | **用户列表（表格）、新增/编辑弹窗（含数据可见范围面板：每资源选 全部/本部门/本人）、删除确认** |

**🎯 本阶段可见成果**: 仪表盘侧边栏点击"用户管理" → 看到用户列表 → 新增/编辑/删除用户正常

---

### 第四阶段：产品管理（后端 + 前端）🎨

| # | 任务 | 说明 |
|---|------|------|
| 4.1 | `middleware/upload.js` | multer 配置：产品图片（jpg/png/webp, 5MB）；订单文档（pdf/doc/docx/xls/xlsx + 图片, 10MB）；发货图片（jpg/png/webp, 10MB） |
| 4.2 | `controllers/productController.js` | 产品 CRUD（分页、分类/关键词筛选）、分类 CRUD、产品图片上传 |
| 4.3 | `routes/productRoutes.js` | 产品 + 分类路由（读公开，写需 `product_management` 权限） |
| 4.4 | **🎨 产品管理页面** | **产品列表（分页+筛选）、新增/编辑弹窗（图片上传预览）、分类管理标签页** |

**🎯 本阶段可见成果**: 侧边栏"产品管理" → 产品列表 → 创建/编辑产品→ 上传图片 → 按分类筛选

---

### 第五阶段：库存管理 + 箱号管理（后端 + 前端）🎨

| # | 任务 | 说明 |
|---|------|------|
| 5.1 | `controllers/binController.js` | 箱号 CRUD、查询箱号下产品列表、箱号启用/停用；修改时返回关联产品供确认；删除时校验无库存 |
| 5.2 | `routes/binRoutes.js` | 箱号路由（`inventory_management` 权限） |
| 5.3 | `controllers/inventoryController.js` | 库存列表（预警高亮+显示箱号位置）、入库（指定箱号+记录历史）、出库（FOR UPDATE 锁+显示箱号）、调整、预警列表、变动历史、批号查询、搜索建议 |
| 5.4 | 入库单管理 | 创建入库单（草稿+指定箱号）、列表、详情、修改、审批（通过后自动入库+记录 bin_id）、取消 |
| 5.5 | `routes/inventoryRoutes.js` | 库存 + 入库单路由（`inventory_management` 权限，dataScope） |
| 5.6 | **🎨 库存管理页面** | **库存列表（预警红色高亮、显示箱号+位置）、入库/出库/调整面板、批号筛选** |
| 5.7 | **🎨 箱号管理页面** | **箱号列表、新增/编辑/删除（修改弹出关联产品确认、删除校验非空）、启用/停用** |
| 5.8 | **🎨 入库单页面** | **入库单列表、创建（选产品+批号+箱号+数量）、审批/取消按钮** |

**🎯 本阶段可见成果**: 库存列表（带预警）→ 入库/出库操作 → 箱号管理 → 入库单审批流程，全部可操作

---

### 第六阶段：销售订单管理（后端 + 前端）🎨

| # | 任务 | 说明 |
|---|------|------|
| 6.1 | `controllers/orderController.js` | 创建订单（验证库存→锁行→扣减→创建，事务中完成）、编辑（恢复+重扣）、状态/支付状态更新、删除（仅待处理）、销售统计、今日订单数 |
| 6.2 | 订单文件管理 | 文件上传接口（合同资质/发货图片）/文件列表/文件删除 |
| 6.3 | `routes/orderRoutes.js` | 订单路由（`order_management` 权限，dataScope）+ 文件子路由 |
| 6.4 | **🎨 订单管理页面** | **订单列表（状态/支付标签）、创建订单向导（选客户→加产品→选批号→填信息→提交）、状态流转按钮** |
| 6.5 | **🎨 订单附件 UI** | **两个上传区域：①合同资质（PDF/Word/Excel/图片）②发货图片；文件预览/下载/删除** |

**🎯 本阶段可见成果**: 完整的订单创建流程（客户→产品→批号→附件→提交）→ 库存自动扣减 → 状态流转

---

### 第七阶段：采购管理 + 客户管理 + 咨询跟进（后端 + 前端）🎨

| # | 任务 | 说明 |
|---|------|------|
| 7.1 | `controllers/purchaseController.js` | 采购单 CRUD、状态管理、供应商 CRUD |
| 7.2 | `routes/purchaseRoutes.js` | 采购 + 供应商路由（`purchase_management` 权限，dataScope） |
| 7.3 | `controllers/customerController.js` | 客户 CRUD（dataScope）、客户关联订单/咨询统计 |
| 7.4 | `controllers/consultationController.js` | 咨询 CRUD、按客户查询（dataScope） |
| 7.5 | `routes/customerRoutes.js` + `routes/consultationRoutes.js` | 客户 + 咨询路由 |
| 7.6 | **🎨 采购管理页面** | **采购单列表、创建采购单（选供应商→加产品→提交）、状态更新；供应商管理子页面** |
| 7.7 | **🎨 客户管理页面** | **客户列表（分页+搜索）、新增/编辑弹窗、查看关联订单和咨询** |
| 7.8 | **🎨 咨询管理页面** | **咨询列表（按客户/状态筛选）、新增/编辑弹窗、跟进记录时间线** |

**🎯 本阶段可见成果**: 采购/客户/咨询三个模块全部可操作，系统功能完整

---

### 第八阶段：仪表盘数据接入 + UI 打磨

| # | 任务 | 说明 |
|---|------|------|
| 8.1 | 仪表盘真实数据接入 | 产品总数、库存预警数、今日订单数、本月销售额、客户总数、待处理咨询数等统计卡片 |
| 8.2 | 响应式优化 | 移动端/平板适配调整 |
| 8.3 | UI 细节打磨 | 加载状态、空数据提示、操作确认弹窗、表单校验提示、键盘快捷键 |
| 8.4 | 错误页面 | 404/403/500 友好错误页 |
| 8.5 | 前端性能优化 | 大列表虚拟滚动、图片懒加载、CSS/JS 压缩 |

**🎯 本阶段可见成果**: 仪表盘数字跳动、响应式适配、交互细节完善

---

### 第九阶段：安全加固与优化

| # | 任务 | 说明 |
|---|------|------|
| 9.1 | 输入验证 | 所有 API 参数校验（必填、类型、长度、范围），使用 express-validator |
| 9.2 | 限流保护 | `express-rate-limit`：登录接口严格限流（15分钟内5次），普通 API 宽松限流 |
| 9.3 | helmet 安全头 | 启用 helmet 中间件，配置 CSP、X-Frame-Options 等 |
| 9.4 | 文件上传安全 | multer fileFilter 校验 MIME 类型 + 魔数校验、文件大小限制、上传目录不可执行 |
| 9.5 | 日志完善 | 所有关键操作记录 `operation_logs`：登录、CRUD、入库/出库、订单状态变更、审批 |
| 9.6 | 统一错误处理 | 全局错误处理中间件，生产环境不泄露堆栈信息，返回统一 `{ code, message }` 格式 |
| 9.7 | CORS 配置 | 生产环境限制允许的 Origin 白名单 |

**验收标准**: OWASP Top 10 基础防护到位；错误信息不泄露内部细节。

---

### 第十阶段：测试

| # | 任务 | 说明 |
|---|------|------|
| 10.1 | API 接口测试 | Jest + Supertest：认证、用户 CRUD、产品 CRUD、库存操作、订单流程、权限校验 |
| 10.2 | 库存并发测试 | 模拟多用户同时出库同一批号产品，验证 `FOR UPDATE` 锁防超卖 |
| 10.3 | 权限边界测试 | 各角色越权访问测试；数据范围过滤测试（all vs department vs own） |
| 10.4 | 前端功能回归测试 | 手动测试清单：登录→各模块 CRUD→订单流程→入库单审批→权限切换 |
| 10.5 | 数据范围两级配置测试 | 验证用户级覆盖角色级、默认 own 的优先级链 |

**验收标准**: 核心接口覆盖率 > 80%；并发不出错；权限边界牢固。

---

### 第十一阶段：部署上线

| # | 任务 | 说明 |
|---|------|------|
| 11.1 | 生产 MySQL 配置 | 字符集 utf8mb4、InnoDB 引擎、定时备份策略（每日全量 + binlog）、慢查询日志 |
| 11.2 | PM2 进程管理 | `pm2 start server.js --name fms-api`，配置 `--max-memory-restart 512M`、日志轮转 |
| 11.3 | Nginx 反向代理 | 反向代理 `location /api/` → `localhost:3005`，静态资源直接 serve + cache，gzip 压缩，HTTPS（Let's Encrypt） |
| 11.4 | 生产环境变量 | 强随机 JWT_SECRET（64字符+）、数据库强密码、关闭 verbose 错误 |
| 11.5 | 数据库备份脚本 | crontab 定时 `mysqldump` + 异地备份（或云存储） |
| 11.6 | 健康检查与监控 | `/api/health` 端点供 Nginx/监控探测；基础监控（CPU/内存/磁盘/DB连接数） |
| 11.7 | 上线 Checklist | DNS 解析、SSL 证书自动续期、防火墙规则（仅开放 80/443）、初始数据导入、默认管理员密码修改 |

**验收标准**: 外网可访问 HTTPS；服务异常自动重启；数据库每日自动备份；健康检查正常。

---

### 后续迭代方向（上线后）

- 报表与数据导出（Excel/PDF）
- 操作日志查询界面
- 移动端适配 / PWA
- 消息通知（库存预警推送、订单状态变更通知）
- 多语言支持
- 数据看板（ECharts 图表：销售趋势、库存周转率等）
- API 文档自动生成（Swagger）
