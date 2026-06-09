const { pool } = require('./config/db');

async function check() {
  // 查询这个订单的明细
  const [items] = await pool.execute(`
    SELECT oi.*, p.model AS product_model, i.batch_number
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    LEFT JOIN inventory i ON oi.inventory_id = i.id
    WHERE oi.order_id = (SELECT id FROM orders WHERE order_number = 'SO260607C0NK1')
  `);
  console.log('=== 订单明细 ===');
  console.table(items);
  
  // 查询库存变动历史
  const [history] = await pool.execute(`
    SELECT ih.*, p.model
    FROM inventory_history ih
    JOIN products p ON ih.product_id = p.id
    WHERE ih.reference_type = 'order' AND ih.reference_id = (SELECT id FROM orders WHERE order_number = 'SO260607C0NK1')
    ORDER BY ih.id DESC
  `);
  console.log('\n=== 库存变动历史 ===');
  console.table(history);
  
  await pool.end();
}
check().catch(console.error);