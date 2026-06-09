const { pool } = require('./config/db');

async function fix() {
  // 修复库存记录
  await pool.execute('UPDATE inventory SET quantity = 390.0 WHERE product_id = 6 AND batch_number = "R2603005"');
  
  // 修复库存历史记录
  await pool.execute(`
    UPDATE inventory_history 
    SET quantity_after = 390.0 
    WHERE product_id = 6 AND batch_number = "R2603005" AND reference_id = 26
  `);
  
  console.log('数据修复完成！');
  await pool.end();
}
fix().catch(console.error);