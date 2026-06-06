/**
 * 中文化迁移 v2 —— VARCHAR中转，彻底解决混合状态问题
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mysql = require('mysql2/promise');

async function convertEnum(conn, table, column, mapping, newEnumDef) {
  // 1. 先扩成 VARCHAR 避免 ENUM 限制
  await conn.execute(`ALTER TABLE ${table} MODIFY ${column} VARCHAR(50) NOT NULL DEFAULT ''`);
  // 2. 更新所有数据
  for (const [en, zh] of Object.entries(mapping)) {
    await conn.execute(`UPDATE ${table} SET ${column} = ? WHERE ${column} = ?`, [zh, en]);
  }
  // 3. 缩回 ENUM
  await conn.execute(`ALTER TABLE ${table} MODIFY ${column} ${newEnumDef}`);
}

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST, user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  console.log('=== 中文化迁移 v2 (VARCHAR中转) ===\n');

  // 1. 角色名称
  const roleMap = { admin: '管理员', sales: '销售', purchase: '采购', inventory: '库存' };
  for (const [en, zh] of Object.entries(roleMap)) {
    await conn.execute('UPDATE roles SET name = ?, description = ? WHERE name = ?', [zh, zh + '角色', en]);
  }
  console.log('✅ 1. 角色名称');

  // 2. 数据范围
  await convertEnum(conn, 'role_data_scopes', 'scope',
    { all: '全部', department: '本部门', own: '本人' },
    "ENUM('全部','本部门','本人') NOT NULL DEFAULT '本人'");
  await convertEnum(conn, 'user_data_scopes', 'scope',
    { all: '全部', department: '本部门', own: '本人' },
    "ENUM('全部','本部门','本人') NOT NULL DEFAULT '本人'");
  console.log('✅ 2. 数据范围');

  // 3. 订单状态
  await convertEnum(conn, 'orders', 'status',
    { pending: '待处理', processing: '处理中', completed: '已完成', cancelled: '已取消', shipped: '已发货' },
    "ENUM('待处理','处理中','已完成','已取消','已发货') DEFAULT '待处理'");
  console.log('✅ 3. 订单状态');

  // 4. 支付状态
  await convertEnum(conn, 'orders', 'payment_status',
    { unpaid: '未付款', paid: '已付款', partial: '部分付款' },
    "ENUM('未付款','已付款','部分付款') DEFAULT '未付款'");
  console.log('✅ 4. 支付状态');

  // 5. 通用启用/停用状态
  for (const tbl of ['products', 'users', 'suppliers', 'customers', 'bins']) {
    await convertEnum(conn, tbl, 'status',
      { active: '启用', inactive: '停用' },
      "ENUM('启用','停用') DEFAULT '启用'");
  }
  console.log('✅ 5. 通用状态(产品/用户/供应商/客户/箱号)');

  // 6. 订单托盘类型
  await convertEnum(conn, 'orders', 'tray_type',
    { none: '无', single: '单层', double: '双层' },
    "ENUM('无','单层','双层') DEFAULT '无'");
  console.log('✅ 6. 托盘类型');

  // 7. 是/否选项
  for (const col of ['waterproof', 'coc', 'delivery_note', 'return_note', 'inspection']) {
    await convertEnum(conn, 'orders', col,
      { yes: '是', no: '否' },
      "ENUM('否','是') DEFAULT '否'");
  }
  console.log('✅ 7. 是/否选项');

  // 8. 发票税率
  await convertEnum(conn, 'orders', 'invoice_rate',
    { none: '无', '1': '1%', '13': '13%' },
    "ENUM('无','1%','13%') DEFAULT '无'");
  console.log('✅ 8. 发票税率');

  // 9. 付款条件
  await convertEnum(conn, 'orders', 'payment_terms',
    { paid: '已付', term30: '月结30天', term90: '月结90天', manual: '手动' },
    "ENUM('已付','月结30天','月结90天','手动') DEFAULT '已付'");
  console.log('✅ 9. 付款条件');

  // 10. 采购单状态
  await convertEnum(conn, 'purchase_orders', 'status',
    { pending: '待处理', ordered: '已下单', received: '已收货', cancelled: '已取消' },
    "ENUM('待处理','已下单','已收货','已取消') DEFAULT '待处理'");
  console.log('✅ 10. 采购单状态');

  // 11. 入库单状态
  await convertEnum(conn, 'stock_in_orders', 'status',
    { draft: '草稿', approved: '已审批', cancelled: '已取消' },
    "ENUM('草稿','已审批','已取消') DEFAULT '草稿'");
  console.log('✅ 11. 入库单状态');

  // 12. 咨询状态
  await convertEnum(conn, 'customer_consultations', 'status',
    { open: '待跟进', in_progress: '跟进中', closed: '已关闭' },
    "ENUM('待跟进','跟进中','已关闭') DEFAULT '待跟进'");
  console.log('✅ 12. 咨询状态');

  // 13. 库存变动类型
  await convertEnum(conn, 'inventory_history', 'change_type',
    { in: '入库', out: '出库', adjust: '调整', order_create: '订单创建', order_cancel: '订单取消', order_edit: '订单编辑', stock_in_approve: '入库审批' },
    "ENUM('入库','出库','调整','订单创建','订单取消','订单编辑','入库审批') NOT NULL");
  console.log('✅ 13. 库存变动类型');

  // 14. 订单文件类型
  await convertEnum(conn, 'order_files', 'file_type',
    { document: '合同资质', shipment_photo: '发货图片' },
    "ENUM('合同资质','发货图片') NOT NULL");
  console.log('✅ 14. 订单文件类型');

  // ── 验证 ──
  console.log('\n=== 验证 ===');
  const [roles] = await conn.execute('SELECT name FROM roles');
  console.log('角色: ' + roles.map(r => r.name).join(' | '));

  const [scopes] = await conn.execute("SELECT DISTINCT scope FROM role_data_scopes");
  console.log('数据范围: ' + scopes.map(s => s.scope).join(' | '));

  const [ostatus] = await conn.execute("SHOW COLUMNS FROM orders LIKE 'status'");
  console.log('订单状态ENUM: ' + ostatus[0].Type);

  const [pstatus] = await conn.execute("SHOW COLUMNS FROM orders LIKE 'payment_status'");
  console.log('支付状态ENUM: ' + pstatus[0].Type);

  const [ftype] = await conn.execute("SHOW COLUMNS FROM order_files LIKE 'file_type'");
  console.log('文件类型ENUM: ' + ftype[0].Type);

  await conn.end();
  console.log('\n=== ✅ 中文化迁移完成 ===');
})();
