const { pool } = require('../config/db');

/**
 * 记录系统操作日志
 * @param {Object} params
 * @param {number} params.user_id - 操作用户 ID
 * @param {string} params.action - 操作名称
 * @param {string} params.target_type - 目标类型（如 user, product, order 等）
 * @param {number} [params.target_id] - 目标 ID
 * @param {Object} [params.details] - 详细信息
 * @param {string} [params.ip_address] - 客户端 IP
 * @param {string} [params.user_agent] - 客户端 User-Agent
 */
async function logOperation({ user_id, action, target_type, target_id = null, details = null, ip_address = null, user_agent = null }) {
  try {
    await pool.execute(
      `INSERT INTO operation_logs (user_id, action, target_type, target_id, details, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, action, target_type, target_id, details ? JSON.stringify(details) : null, ip_address, user_agent]
    );
  } catch (error) {
    console.error('[OperationLog] 记录失败:', error.message);
    // 日志记录失败不应影响主业务
  }
}

module.exports = { logOperation };
