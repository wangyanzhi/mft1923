const { pool } = require('./config/db');

async function verify() {
  // 查询两个入库单的明细
  const [items] = await pool.execute(`
    SELECT so.order_number, sio.batch_number, sio.product_id, sio.quantity, p.model
    FROM stock_in_order_items sio
    JOIN stock_in_orders so ON sio.stock_in_order_id = so.id
    JOIN products p ON sio.product_id = p.id
    WHERE so.order_number IN ('SI-MQ4VSG58', 'SI-MQ4UVRZZ')
  `);
  console.log('=== 入库单明细 ===');
  console.table(items);
  
  // 查询该型号产品的所有库存批次
  const [inv] = await pool.execute(`
    SELECT i.batch_number, i.quantity, i.product_id, p.model
    FROM inventory i
    JOIN products p ON i.product_id = p.id
    WHERE p.model LIKE '%TSM-DS3-0100-C1/C1-18*24%'
  `);
  console.log('\n=== 库存记录 ===');
  console.table(inv);
  
  // 查询库存变动历史
  const [history] = await pool.execute(`
    SELECT ih.change_type, ih.quantity_before, ih.quantity_change, ih.quantity_after, 
           ih.created_at, ih.reference_type, ih.reference_id, so.order_number
    FROM inventory_history ih
    LEFT JOIN stock_in_orders so ON ih.reference_id = so.id
    WHERE ih.product_id = 6 AND ih.batch_number = 'R2603005'
    ORDER BY ih.created_at DESC
  `);
  console.log('\n=== 库存变动历史 ===');
  console.table(history);
  
  await pool.end();
}
verify().catch(console.error);