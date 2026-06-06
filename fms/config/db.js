const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * MySQL 连接池配置
 * 使用 mysql2/promise 提供 Promise-based API
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'circuit_board_inventory',
  port: parseInt(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,       // 最大连接数
  queueLimit: 0,             // 队列无限制（0 = 无限）
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10秒心跳
  charset: 'utf8mb4',
});

/**
 * 获取数据库连接
 * @returns {Promise<mysql.PoolConnection>}
 */
async function getConnection() {
  return await pool.getConnection();
}

/**
 * 测试数据库连接
 * @returns {Promise<boolean>}
 */
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('[DB] 数据库连接成功');
    return true;
  } catch (error) {
    console.error('[DB] 数据库连接失败:', error.message);
    return false;
  }
}

module.exports = { pool, getConnection, testConnection };
