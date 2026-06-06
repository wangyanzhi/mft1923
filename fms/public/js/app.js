/**
 * 电路基板进销存系统 — 前端 SPA
 * Design System: Modern Tech Dashboard
 */

// ============================================================
// SVG 图标库 (Heroicons-style, 24x24)
// ============================================================
const Icons = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
  package: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  warehouse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  clipboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  messageCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  barChart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  dollar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  construction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>`,
  logOut: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
};

// ============================================================
// API 服务
// ============================================================
const API = {
  base: '/api',

  async request(method, path, body = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    const token = Auth.getToken();
    if (token) opts.headers['Authorization'] = `Bearer ${token}`;
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(this.base + path, opts);
    const data = await res.json();

    if (res.status === 401) { Auth.logout(); throw new Error(data.message || '认证失败'); }
    if (!res.ok) throw new Error(data.message || '请求失败');
    return data;
  },

  get(path) { return this.request('GET', path); },
  post(path, body) { return this.request('POST', path, body); },
  put(path, body) { return this.request('PUT', path, body); },
  delete(path) { return this.request('DELETE', path); },
};

// ============================================================
// 认证管理
// ============================================================
const Auth = {
  getToken() { return localStorage.getItem('token'); },
  getUser() { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } },
  setSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
  },
  isLoggedIn() { return !!this.getToken(); },
  hasPermission(perm) {
    const user = this.getUser();
    return user && user.permissions && user.permissions.includes(perm);
  },
};

// ============================================================
// Toast
// ============================================================
const Toast = {
  show(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  },
  success(msg) { this.show(msg, 'success'); },
  error(msg) { this.show(msg, 'error'); },
  warning(msg) { this.show(msg, 'warning'); },
  info(msg) { this.show(msg, 'info'); },
};

// ============================================================
// Modal
// ============================================================
const Modal = {
  open(title, bodyHtml, footerHtml = '') {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHtml;
    document.getElementById('modalFooter').innerHTML = footerHtml;
    document.getElementById('modalOverlay').style.display = 'flex';
  },
  close() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modalBody').innerHTML = '';
    document.getElementById('modalFooter').innerHTML = '';
    document.getElementById('modalBox').style.width = ''; // reset custom width
  },
};
document.getElementById('modalClose').addEventListener('click', Modal.close);
document.getElementById('modalOverlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) Modal.close();
});

// ============================================================
// 导航菜单配置 (SVG icons)
// ============================================================
const MENU_CONFIG = [
  { section: '主菜单', items: [
    { id: 'dashboard', icon: 'dashboard', label: '仪表盘', perm: null },
  ]},
  { section: '业务管理', items: [
    { id: 'products', icon: 'package', label: '产品管理', perm: 'product_management' },
    { id: 'inventory', icon: 'warehouse', label: '库存管理', perm: 'inventory_management' },
    { id: 'stockin', icon: 'barChart', label: '入库单', perm: 'inventory_management' },
    { id: 'bins', icon: 'mapPin', label: '箱号管理', perm: 'bin_management' },
    { id: 'orders', icon: 'clipboard', label: '销售订单', perm: 'order_management' },
    { id: 'purchases', icon: 'truck', label: '采购管理', perm: 'purchase_management' },
  ]},
  { section: '客户管理', items: [
    { id: 'customers', icon: 'users', label: '客户管理', perm: 'customer_management' },
    { id: 'consultations', icon: 'messageCircle', label: '咨询跟进', perm: 'consultation_management' },
  ]},
  { section: '系统设置', items: [
    { id: 'users', icon: 'settings', label: '用户管理', perm: 'user_management' },
    { id: 'roles', icon: 'settings', label: '角色管理', perm: 'user_management' },
  ]},
];

// ============================================================
// 路由
// ============================================================
const Router = {
  currentPage: null,

  navigate(pageId) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
    if (navItem) navItem.classList.add('active');

    for (const section of MENU_CONFIG) {
      for (const item of section.items) {
        if (item.id === pageId) {
          document.getElementById('pageTitle').textContent = item.label;
          break;
        }
      }
    }

    const container = document.getElementById('contentArea');
    this.currentPage = pageId;

    switch (pageId) {
      case 'dashboard': renderDashboard(container); break;
      case 'products': renderProducts(container); break;
      case 'inventory': renderInventory(container); break;
      case 'bins': renderBins(container); break;
      case 'stockin': renderStockInOrders(container); break;
      case 'orders': renderPlaceholder(container, '销售订单', '此模块将在第六阶段实现', 'clipboard'); break;
      case 'purchases': renderPlaceholder(container, '采购管理', '此模块将在第七阶段实现', 'truck'); break;
      case 'customers': renderPlaceholder(container, '客户管理', '此模块将在第七阶段实现', 'users'); break;
      case 'consultations': renderPlaceholder(container, '咨询跟进', '此模块将在第七阶段实现', 'messageCircle'); break;
      case 'users': renderUsers(container); break;
      case 'roles': renderRoles(container); break;
      default: renderDashboard(container);
    }
  },
};

// ============================================================
// 渲染侧边栏
// ============================================================
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  let html = '';

  for (const section of MENU_CONFIG) {
    const visibleItems = section.items.filter(item => !item.perm || Auth.hasPermission(item.perm));
    if (visibleItems.length === 0) continue;

    html += `<div class="nav-section">${section.section}</div>`;
    for (const item of visibleItems) {
      html += `
        <a class="nav-item" data-page="${item.id}" onclick="Router.navigate('${item.id}')">
          <span class="nav-icon">${Icons[item.icon] || ''}</span>
          <span>${item.label}</span>
        </a>`;
    }
  }
  nav.innerHTML = html;
}

// ============================================================
// 仪表盘
// ============================================================
async function renderDashboard(container) {
  const user = Auth.getUser();

  container.innerHTML = `
    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon blue">${Icons.package}</div>
        <div class="stat-info">
          <div class="stat-value" id="statProducts">-</div>
          <div class="stat-label">产品总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red">${Icons.alert}</div>
        <div class="stat-info">
          <div class="stat-value" id="statAlerts">-</div>
          <div class="stat-label">库存预警</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon indigo">${Icons.clipboard}</div>
        <div class="stat-info">
          <div class="stat-value" id="statOrders">-</div>
          <div class="stat-label">今日订单</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green">${Icons.dollar}</div>
        <div class="stat-info">
          <div class="stat-value" id="statSales">-</div>
          <div class="stat-label">本月销售额 (元)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon amber">${Icons.users}</div>
        <div class="stat-info">
          <div class="stat-value" id="statCustomers">-</div>
          <div class="stat-label">客户总数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon indigo">${Icons.messageCircle}</div>
        <div class="stat-info">
          <div class="stat-value" id="statConsultations">-</div>
          <div class="stat-label">待处理咨询</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">系统概览</div>
      <div class="welcome-panel">
        <p>欢迎回来，<strong>${user.name}</strong>（${user.role}）</p>
        <p style="margin-top:8px">系统各模块按阶段开发上线：</p>
        <div class="phase-list" style="margin-top:6px">
          <span style="color:var(--color-success)">&#10003;</span> 第一阶段：项目骨架 + 数据库
          <span style="color:var(--color-success)">&#10003;</span> 第二阶段：认证系统 + 登录页 + 主框架（当前）
          <span style="color:var(--color-text-muted)">&#9711;</span> 第三阶段：用户管理 + 产品管理
          <span style="color:var(--color-text-muted)">&#9711;</span> 第四阶段：库存管理 + 箱号管理
          <span style="color:var(--color-text-muted)">&#9711;</span> 后续阶段：订单、采购、客户...
        </div>
      </div>
    </div>
  `;

  loadDashboardStats();
}

async function loadDashboardStats() {
  try { const d = await API.get('/products?limit=1'); document.getElementById('statProducts').textContent = '✓'; } catch (_) {}
  try { const d = await API.get('/inventory/alerts'); document.getElementById('statAlerts').textContent = d.data?.length || 0; } catch (_) {}
}

// ============================================================
// 占位页面
// ============================================================
// ============================================================
// 库存管理页面
// ============================================================
let invPage = 1, invSearch = '', invAlertOnly = false;

async function renderInventory(container) {
  invPage = 1; invSearch = ''; invAlertOnly = false;
  await loadInvList(container);
}

async function loadInvList(container, page = 1, search = '', alertOnly = false) {
  invPage = page; invSearch = search; invAlertOnly = alertOnly;
  try {
    const res = await API.get(`/inventory?page=${page}&limit=15&search=${encodeURIComponent(search)}&alert_only=${alertOnly?'1':'0'}`);
    const { list, pagination } = res.data;

    let rows = '';
    if (list.length === 0) {
      rows = `<tr><td colspan="10"><div class="empty-state"><div class="empty-icon">${Icons.warehouse}</div><p>暂无库存记录</p></div></td></tr>`;
    } else {
      rows = list.map(i => {
        const isAlert = i.quantity <= i.min_stock && i.quantity > 0;
        return `<tr style="${isAlert ? 'background:#FEF2F2' : ''}">
          <td>${i.id}</td><td><strong>${escHtml(i.product_model)}</strong></td>
          <td>${escHtml(i.batch_number)}</td><td><span class="badge badge-info">${escHtml(i.category_name)}</span></td>
          <td class="font-mono" style="color:${isAlert?'var(--color-danger)':'inherit'};font-weight:${isAlert?'700':'400'}">${i.quantity}</td>
          <td>${i.min_stock}</td><td>${escHtml(i.unit)}</td>
          <td>${i.bin_number ? escHtml(i.bin_number) + (i.bin_location ? ' ('+escHtml(i.bin_location)+')' : '') : '<span style="color:var(--color-text-muted)">未分配</span>'}</td>
          <td>${new Date(i.last_updated_at).toLocaleDateString('zh-CN')}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="invIn(${i.product_id},'${escHtml(i.product_model)}','${escHtml(i.batch_number)}')" style="color:var(--color-success)">入库</button>
            <button class="btn btn-sm btn-outline" onclick="invOut(${i.product_id},'${escHtml(i.product_model)}','${escHtml(i.batch_number)}',${i.quantity})" style="color:var(--color-warning)">出库</button>
          </td>
        </tr>`;
      }).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span>库存管理</span><button class="btn btn-primary btn-sm" onclick="invIn()">+ 入库</button></div>
        <div class="toolbar">
          <input type="text" id="invSearch" placeholder="搜索型号 / 批号..." value="${escHtml(search)}" onkeydown="if(event.key==='Enter')loadInvList(document.getElementById('contentArea'),1,this.value,invAlertOnly)">
          <label style="display:flex;align-items:center;gap:6px;font-size:13px;cursor:pointer"><input type="checkbox" id="invAlertCb" ${alertOnly?'checked':''} onchange="loadInvList(document.getElementById('contentArea'),1,invSearch,this.checked)"> 仅显示预警</label>
          <span class="spacer"></span>
          <span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 条</span>
        </div>
        <div class="table-container"><table><thead><tr>
          <th>ID</th><th>型号</th><th>批号</th><th>分类</th><th>库存量</th><th>安全线</th><th>单位</th><th>箱号</th><th>更新时间</th><th>操作</th>
        </tr></thead><tbody>${rows}</tbody></table></div>
        ${renderInvPagination(pagination)}
      </div>`;

    const [alertRes] = await (async () => {
      try { return [await API.get('/inventory/alerts')]; } catch { return [{data:[]}]; }
    })();
    if (alertRes.data.length > 0) {
      const alertHtml = alertRes.data.map(a =>
        `<tr style="background:#FEF2F2"><td>${escHtml(a.product_model)}</td><td>${a.batch_number}</td><td style="color:var(--color-danger);font-weight:700">${a.quantity}</td><td>${a.min_stock}</td><td>${a.bin_number||'-'}</td></tr>`
      ).join('');
      container.insertAdjacentHTML('beforeend', `
        <div class="card" style="border:1px solid #FECACA">
          <div class="card-header" style="color:var(--color-danger)">⚠️ 库存预警（${alertRes.data.length} 项低于安全线）</div>
          <div class="table-container"><table><thead><tr><th>型号</th><th>批号</th><th>当前库存</th><th>安全线</th><th>箱号</th></tr></thead><tbody>${alertHtml}</tbody></table></div>
        </div>`);
    }
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

function renderInvPagination(p) {
  if (p.totalPages <= 1) return '';
  let btns = '';
  btns += `<button ${p.page===1?'disabled':''} onclick="loadInvList(document.getElementById('contentArea'),${p.page-1},invSearch,invAlertOnly)">上一页</button>`;
  for (let i=1;i<=p.totalPages;i++) btns += `<button class="${i===p.page?'active':''}" onclick="loadInvList(document.getElementById('contentArea'),${i},invSearch,invAlertOnly)">${i}</button>`;
  btns += `<button ${p.page===p.totalPages?'disabled':''} onclick="loadInvList(document.getElementById('contentArea'),${p.page+1},invSearch,invAlertOnly)">下一页</button>`;
  return `<div class="pagination">${btns}<span class="page-info">第 ${p.page}/${p.totalPages} 页</span></div>`;
}

// --- 入库/出库弹窗 ---
async function invIn(productId, model, batch) {
  const [prodRes, binRes] = await Promise.all([
    API.get('/products?limit=100'),
    API.get('/bins'),
  ]);
  const prodOpts = prodRes.data.list.map(p => `<option value="${p.id}" ${p.id===productId?'selected':''}>${escHtml(p.model)}</option>`).join('');
  const binOpts = '<option value="">不指定箱号</option>' + binRes.data.filter(b => b.status==='启用').map(b => `<option value="${b.id}">${escHtml(b.bin_number)} (${escHtml(b.location||'')})</option>`).join('');

  Modal.open('库存入库', `
    <form>
      <div class="form-row">
        <div class="form-group"><label>产品 *</label><select id="invProd" onchange="onInvProdChange()">${prodOpts}</select></div>
        <div class="form-group"><label>批号 *</label><input type="text" id="invBatch" value="${escHtml(batch||'')}" required placeholder="如: 2024-A01"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>数量 * (≥0.1)</label><input type="number" id="invQty" step="0.1" min="0.1" value="1" required></div>
        <div class="form-group"><label>单价</label><input type="number" id="invPrice" step="0.01" value="0"></div>
      </div>
      <div class="form-group"><label>箱号（放置位置）</label><select id="invBin">${binOpts}</select></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="execInvIn()">确认入库</button>
  `);
}

async function execInvIn() {
  try {
    await API.post('/inventory/in', {
      product_id: parseInt(document.getElementById('invProd').value),
      batch_number: document.getElementById('invBatch').value.trim(),
      quantity: parseFloat(document.getElementById('invQty').value),
      unit_price: parseFloat(document.getElementById('invPrice').value) || 0,
      bin_id: parseInt(document.getElementById('invBin').value) || null,
    });
    Toast.success('入库成功'); Modal.close(); loadInvList(document.getElementById('contentArea'), invPage, invSearch, invAlertOnly);
  } catch (err) { Toast.error(err.message); }
}

function invOut(productId, model, batch, maxQty) {
  Modal.open('库存出库 — ' + model + ' (' + batch + ')', `
    <form>
      <p style="margin-bottom:12px;font-size:13px;color:var(--color-text-secondary)">当前库存：<strong>${maxQty}</strong></p>
      <div class="form-row">
        <div class="form-group"><label>出库数量 * (≥0.1)</label><input type="number" id="invQty" step="0.1" min="0.1" max="${maxQty}" value="1" required></div>
        <div class="form-group"><label>备注</label><input type="text" id="invNotes" placeholder="出库原因"></div>
      </div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-warning" onclick="execInvOut(${productId},'${escHtml(batch)}',${maxQty})">确认出库</button>
  `);
}

async function execInvOut(productId, batch, maxQty) {
  try {
    const qty = parseFloat(document.getElementById('invQty').value);
    if (qty < 0.1) { Toast.warning('最小出库数量为 0.1'); return; }
    if (qty > maxQty) { Toast.warning('库存不足'); return; }
    await API.post('/inventory/out', { product_id: productId, batch_number: batch, quantity: qty, notes: document.getElementById('invNotes').value });
    Toast.success('出库成功'); Modal.close(); loadInvList(document.getElementById('contentArea'), invPage, invSearch, invAlertOnly);
  } catch (err) { Toast.error(err.message); }
}

// ============================================================
// 箱号管理页面
// ============================================================
async function renderBins(container) {
  try {
    const res = await API.get('/bins');
    const bins = res.data;

    let rows = '';
    if (bins.length === 0) {
      rows = `<tr><td colspan="6"><div class="empty-state"><div class="empty-icon">${Icons.mapPin}</div><p>暂无箱号</p></div></td></tr>`;
    } else {
      rows = bins.map(b => `
        <tr>
          <td>${b.id}</td><td><strong>${escHtml(b.bin_number)}</strong></td><td>${escHtml(b.location||'-')}</td>
          <td>${b.product_count}</td><td>${b.total_quantity}</td>
          <td><span class="badge ${b.status==='启用'?'badge-success':'badge-default'}">${b.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="editBin(${b.id})">编辑</button>
            <button class="btn btn-sm btn-outline" onclick="deleteBinConfirm(${b.id},'${escHtml(b.bin_number)}',${b.product_count},${b.total_quantity})" style="color:var(--color-danger);margin-left:4px">删除</button>
          </td>
        </tr>`).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span>箱号管理</span><button class="btn btn-primary btn-sm" onclick="addBin()">+ 新增箱号</button></div>
        <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:16px">箱号用于记录产品在仓库中的存放位置，入库时绑定，方便快速查找。</p>
        <div class="table-container"><table><thead><tr>
          <th>ID</th><th>箱号编号</th><th>位置描述</th><th>存放产品数</th><th>库存总量</th><th>状态</th><th>操作</th>
        </tr></thead><tbody>${rows}</tbody></table></div>
      </div>`;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

function addBin() {
  Modal.open('新增箱号', `
    <form>
      <div class="form-row">
        <div class="form-group"><label>箱号编号 *</label><input type="text" id="bfNumber" required placeholder="如: A-01-03"></div>
        <div class="form-group"><label>位置描述</label><input type="text" id="bfLocation" placeholder="如: A区-1排-3层"></div>
      </div>
      <div class="form-group"><label>备注</label><input type="text" id="bfDesc"></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveBin(0)">创建</button>
  `);
}

async function editBin(id) {
  const res = await API.get('/bins/' + id);
  const b = res.data;
  // 检查是否有产品
  let warning = '';
  if (b.products && b.products.length > 0) {
    warning = `<div style="background:#FEF3C7;padding:10px;border-radius:6px;margin-bottom:12px;font-size:13px">
      ⚠️ 该箱号下有 <strong>${b.products.length}</strong> 条库存记录，修改箱号编号可能影响仓库定位。
      <div style="margin-top:6px">${b.products.map(p => escHtml(p.model)+' ('+p.batch_number+'): '+p.quantity).join(' | ')}</div>
    </div>`;
  }

  Modal.open('编辑箱号 — ' + b.bin_number, `
    <form>${warning}
      <div class="form-row">
        <div class="form-group"><label>箱号编号 *</label><input type="text" id="bfNumber" value="${escHtml(b.bin_number)}" required></div>
        <div class="form-group"><label>位置描述</label><input type="text" id="bfLocation" value="${escHtml(b.location||'')}"></div>
      </div>
      <div class="form-group"><label>备注</label><input type="text" id="bfDesc" value="${escHtml(b.description||'')}"></div>
      <div class="form-group"><label>状态</label><select id="bfStatus"><option value="启用" ${b.status==='启用'?'selected':''}>启用</option><option value="停用" ${b.status==='停用'?'selected':''}>停用</option></select></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveBin(${id})">保存</button>
  `);
}

async function saveBin(id) {
  try {
    const body = {
      bin_number: document.getElementById('bfNumber').value.trim(),
      location: document.getElementById('bfLocation').value.trim(),
      description: document.getElementById('bfDesc')?.value.trim() || '',
    };
    if (id !== 0) body.status = document.getElementById('bfStatus').value;
    if (!body.bin_number) { Toast.warning('请输入箱号编号'); return; }
    if (id === 0) { await API.post('/bins', body); Toast.success('箱号创建成功'); }
    else { await API.put('/bins/' + id, body); Toast.success('箱号更新成功'); }
    Modal.close(); renderBins(document.getElementById('contentArea'));
  } catch (err) { Toast.error(err.message); }
}

function deleteBinConfirm(id, number, prodCount, totalQty) {
  const canDelete = prodCount === 0;
  Modal.open('确认删除', `
    <p>确定要删除箱号 <strong>${escHtml(number)}</strong> 吗？</p>
    ${!canDelete ? `<p style="color:var(--color-danger);font-size:13px;margin-top:8px">该箱号下还有 <strong>${prodCount}</strong> 条库存（共 ${totalQty} 单位），无法删除。请先移走所有产品。</p>` : ''}
    <p style="color:var(--color-danger);font-size:13px;margin-top:8px">此操作不可撤销</p>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    ${canDelete ? `<button class="btn btn-danger" onclick="deleteBinExec(${id})">确认删除</button>` : ''}
  `);
}

async function deleteBinExec(id) {
  try { await API.delete('/bins/' + id); Toast.success('箱号已删除'); Modal.close(); renderBins(document.getElementById('contentArea')); }
  catch (err) { Toast.error(err.message); }
}

// ============================================================
// 入库单管理页面
// ============================================================
let sioPage = 1;

async function renderStockInOrders(container) {
  sioPage = 1; await loadSioList(container);
}

async function loadSioList(container, page = 1) {
  sioPage = page;
  try {
    const res = await API.get('/inventory/stock-in-orders?page=' + page);
    const { list, pagination } = res.data;

    let rows = '';
    if (list.length === 0) {
      rows = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.barChart}</div><p>暂无入库单</p></div></td></tr>`;
    } else {
      rows = list.map(s => {
        const statusBadge = s.status === '草稿' ? 'badge-warning' : s.status === '已审批' ? 'badge-success' : 'badge-default';
        return `<tr>
          <td><strong>${escHtml(s.order_number)}</strong></td><td>${s.item_count} 项</td>
          <td><span class="badge ${statusBadge}">${s.status}</span></td>
          <td>${escHtml(s.operator_name||'-')}</td><td>${escHtml(s.notes||'-')}</td>
          <td>${new Date(s.created_at).toLocaleString('zh-CN')}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="viewSio(${s.id})">查看</button>
            ${s.status==='草稿' ? `<button class="btn btn-sm btn-outline" style="color:var(--color-success);margin-left:4px" onclick="approveSio(${s.id})">审批</button><button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="cancelSio(${s.id})">取消</button>` : ''}
          </td>
        </tr>`;
      }).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span>入库单管理</span><button class="btn btn-primary btn-sm" onclick="createSio()">+ 创建入库单</button></div>
        <div class="table-container"><table><thead><tr>
          <th>单号</th><th>明细</th><th>状态</th><th>操作人</th><th>备注</th><th>创建时间</th><th>操作</th>
        </tr></thead><tbody>${rows}</tbody></table></div>
        ${pagination.totalPages > 1 ? `<div class="pagination"><span class="page-info">第 ${pagination.page}/${pagination.totalPages} 页</span></div>` : ''}
      </div>`;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

async function createSio() {
  const [prodRes, binRes] = await Promise.all([
    API.get('/products?limit=200'),
    API.get('/bins'),
  ]);
  const prods = prodRes.data.list;
  const bins = binRes.data.filter(b => b.status === '启用');
  const prodOpts = prods.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('');
  const binOpts = '<option value="">不指定</option>' + bins.map(b => `<option value="${b.id}">${escHtml(b.bin_number)}</option>`).join('');

  // 加宽弹窗
  document.getElementById('modalBox').style.width = '780px';
  Modal.open('创建入库单', `
    <style>
      .sio-item input:focus, .sio-item select:focus { border-color: #3B82F6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,.12) !important; }
      .sio-item input:hover, .sio-item select:hover { border-color: #94A3B8; }
    </style>
    <div class="form-group"><label>入库明细</label></div>
    <div style="display:flex;gap:8px;margin-bottom:10px;padding:0 10px;font-size:12px;font-weight:600;color:var(--color-text-secondary)">
      <div style="width:190px;flex-shrink:0">产品</div>
      <div style="flex:1">批号</div>
      <div style="width:70px;flex-shrink:0">数量</div>
      <div style="width:80px;flex-shrink:0">单价</div>
      <div style="flex:1">箱号</div>
      <div style="width:30px;flex-shrink:0"></div>
    </div>
    <div id="sioItems" style="display:flex;flex-direction:column;gap:6px">
      <div class="sio-item" style="display:flex;gap:8px;align-items:center;padding:8px 10px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0">
        <select class="sio-prod" style="width:190px;flex-shrink:0;height:38px;padding:0 10px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;cursor:pointer">${prodOpts}</select>
        <input type="text" class="sio-batch" placeholder="批号" required style="flex:1;min-width:0;height:38px;padding:0 10px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;outline:none">
        <input type="number" class="sio-qty" step="0.1" min="0.1" value="1" required style="width:70px;flex-shrink:0;height:38px;padding:0 6px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;text-align:center;outline:none">
        <input type="number" class="sio-price" step="0.01" value="0" style="width:80px;flex-shrink:0;height:38px;padding:0 8px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;text-align:right;outline:none">
        <select class="sio-bin" style="flex:1;min-width:0;height:38px;padding:0 10px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none;cursor:pointer">${binOpts}</select>
        <button type="button" onclick="this.closest('.sio-item').remove()" title="删除此行" style="width:30px;flex-shrink:0;height:38px;background:none;border:none;color:#94A3B8;cursor:pointer;font-size:20px;padding:0;line-height:1;border-radius:6px;transition:all .15s" onmouseenter="this.style.background='#FEE2E2';this.style.color='#EF4444'" onmouseleave="this.style.background='none';this.style.color='#94A3B8'">&times;</button>
      </div>
    </div>
    <button type="button" class="btn btn-sm btn-outline" onclick="addSioItem()" style="margin-top:10px">+ 添加明细</button>
    <div class="form-group" style="margin-top:16px"><label>备注</label><input type="text" id="sioNotes" placeholder="入库说明（可选）"></div>
  `, `
    <button class="btn btn-outline" onclick="Modal.close();document.getElementById('modalBox').style.width=''">取消</button>
    <button class="btn btn-primary" onclick="execCreateSio()">创建入库单</button>
  `);
}

function addSioItem() {
  const container = document.getElementById('sioItems');
  const template = container.querySelector('.sio-item').cloneNode(true);
  // Reset values in cloned inputs
  const inputs = template.querySelectorAll('input');
  inputs.forEach(i => {
    if (i.classList.contains('sio-qty')) i.value = '1';
    else if (i.classList.contains('sio-price')) i.value = '0';
    else i.value = '';
  });
  container.appendChild(template);
}

async function execCreateSio() {
  try {
    document.getElementById('modalBox').style.width = '';
    const items = [];
    document.querySelectorAll('.sio-item').forEach(el => {
      const prodId = parseInt(el.querySelector('.sio-prod').value);
      const batch = el.querySelector('.sio-batch').value.trim();
      const qty = parseFloat(el.querySelector('.sio-qty').value);
      if (prodId && batch && qty >= 0.1) {
        items.push({
          product_id: prodId,
          batch_number: batch,
          quantity: qty,
          unit_price: parseFloat(el.querySelector('.sio-price').value) || 0,
          bin_id: parseInt(el.querySelector('.sio-bin').value) || null,
        });
      }
    });
    if (items.length === 0) { Toast.warning('请至少添加一条有效明细'); return; }
    await API.post('/inventory/stock-in-orders', { items, notes: document.getElementById('sioNotes').value });
    Toast.success('入库单创建成功'); Modal.close(); loadSioList(document.getElementById('contentArea'), sioPage);
  } catch (err) { Toast.error(err.message); }
}

async function viewSio(id) {
  const res = await API.get('/inventory/stock-in-orders/' + id);
  const s = res.data;
  const itemsHtml = s.items.map(i => `
    <tr><td>${escHtml(i.product_model)}</td><td>${i.batch_number}</td><td>${i.quantity}</td><td>¥${Number(i.unit_price).toFixed(2)}</td><td>${i.bin_number||'-'}</td></tr>
  `).join('');

  Modal.open('入库单详情 — ' + s.order_number, `
    <p>状态: <span class="badge ${s.status==='草稿'?'badge-warning':s.status==='已审批'?'badge-success':'badge-default'}">${s.status}</span> | 操作人: ${escHtml(s.operator_name||'')} | 备注: ${escHtml(s.notes||'')}</p>
    <div class="table-container" style="margin-top:12px"><table><thead><tr><th>产品</th><th>批号</th><th>数量</th><th>单价</th><th>箱号</th></tr></thead><tbody>${itemsHtml}</tbody></table></div>
  `, `<button class="btn btn-outline" onclick="Modal.close()">关闭</button>`);
}

async function approveSio(id) {
  if (!confirm('确认审批通过该入库单？审批后库存将自动增加。')) return;
  try { await API.put('/inventory/stock-in-orders/' + id + '/approve'); Toast.success('审批通过，库存已更新'); loadSioList(document.getElementById('contentArea'), sioPage); }
  catch (err) { Toast.error(err.message); }
}

async function cancelSio(id) {
  if (!confirm('确认取消该入库单？')) return;
  try { await API.put('/inventory/stock-in-orders/' + id + '/cancel'); Toast.success('入库单已取消'); loadSioList(document.getElementById('contentArea'), sioPage); }
  catch (err) { Toast.error(err.message); }
}

// ============================================================
// 产品管理页面
// ============================================================
let prodPage = 1, prodSearch = '', prodCatFilter = '';

async function renderProducts(container) {
  prodPage = 1; prodSearch = ''; prodCatFilter = '';
  await loadProdList(container);
}

async function loadProdList(container, page = 1, search = '', catFilter = '') {
  prodPage = page; prodSearch = search; prodCatFilter = catFilter;
  try {
    const [prodRes, catRes] = await Promise.all([
      API.get(`/products?page=${page}&limit=12&search=${encodeURIComponent(search)}&category_id=${catFilter}&status=`),
      API.get('/products/categories/list'),
    ]);
    const { list, pagination } = prodRes.data;
    const cats = catRes.data;

    const catOpts = '<option value="">全部分类</option>' + cats.map(c => `<option value="${c.id}" ${catFilter == c.id ? 'selected' : ''}>${escHtml(c.name)} (${c.product_count})</option>`).join('');

    let rows = '';
    if (list.length === 0) {
      rows = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.package}</div><p>暂无产品</p></div></td></tr>`;
    } else {
      rows = list.map(p => {
        const imgTag = p.image_url
          ? `<img src="${p.image_url}" alt="${escHtml(p.model)}" style="width:48px;height:48px;object-fit:cover;border-radius:4px">`
          : `<div style="width:48px;height:48px;background:var(--color-bg);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--color-text-muted)">📦</div>`;
        return `
        <tr>
          <td>${p.id}</td>
          <td>${imgTag}</td>
          <td><strong>${escHtml(p.model)}</strong></td>
          <td><span class="badge badge-info">${escHtml(p.category_name)}</span></td>
          <td class="font-mono">¥${Number(p.price).toFixed(2)}</td>
          <td>${escHtml(p.unit)}</td>
          <td><span class="badge ${p.status==='启用'?'badge-success':'badge-default'}">${p.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="editProduct(${p.id})">编辑</button>
            <button class="btn btn-sm btn-outline" onclick="deleteProdConfirm(${p.id},'${escHtml(p.model)}')" style="color:var(--color-danger);margin-left:4px">删除</button>
          </td>
        </tr>`;
      }).join('');
    }

    // 分类管理子面板
    let catRows = cats.map(c => `
      <tr>
        <td>${c.id}</td><td>${escHtml(c.name)}</td><td>${c.product_count}</td><td>${escHtml(c.description||'-')}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editCategory(${c.id},'${escHtml(c.name)}','${escHtml(c.description||'')}')">编辑</button>
          <button class="btn btn-sm btn-outline" onclick="deleteCatConfirm(${c.id},'${escHtml(c.name)}',${c.product_count})" style="color:var(--color-danger);margin-left:4px">删除</button>
        </td>
      </tr>`).join('');

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span>产品管理</span>
          <button class="btn btn-primary btn-sm" onclick="addProduct()">+ 新增产品</button>
        </div>
        <div class="toolbar">
          <input type="text" id="prodSearchInput" placeholder="搜索型号 / 描述..." value="${escHtml(search)}"
            onkeydown="if(event.key==='Enter')loadProdList(document.getElementById('contentArea'),1,this.value,prodCatFilter)">
          <select id="prodCatSelect" onchange="loadProdList(document.getElementById('contentArea'),1,prodSearch,this.value)">
            ${catOpts}
          </select>
          <button class="btn btn-outline btn-sm" onclick="loadProdList(document.getElementById('contentArea'),1,document.getElementById('prodSearchInput').value,prodCatFilter)">搜索</button>
          <span class="spacer"></span>
          <button class="btn btn-outline btn-sm" onclick="addCategory()">+ 分类</button>
          <span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 个产品</span>
        </div>
        <div class="table-container">
          <table>
            <thead><tr><th>ID</th><th>图片</th><th>型号</th><th>分类</th><th>售价</th><th>单位</th><th>状态</th><th>操作</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${renderProdPagination(pagination)}
      </div>

      <div class="card">
        <div class="card-header"><span>产品分类</span></div>
        <div class="table-container">
          <table>
            <thead><tr><th>ID</th><th>名称</th><th>产品数</th><th>描述</th><th>操作</th></tr></thead>
            <tbody>${catRows || '<tr><td colspan="5"><div class="empty-state"><p>暂无分类</p></div></td></tr>'}</tbody>
          </table>
        </div>
      </div>`;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

function renderProdPagination(p) {
  if (p.totalPages <= 1) return '';
  let btns = '';
  btns += `<button ${p.page===1?'disabled':''} onclick="loadProdList(document.getElementById('contentArea'),${p.page-1},prodSearch,prodCatFilter)">上一页</button>`;
  for (let i=1;i<=p.totalPages;i++) btns += `<button class="${i===p.page?'active':''}" onclick="loadProdList(document.getElementById('contentArea'),${i},prodSearch,prodCatFilter)">${i}</button>`;
  btns += `<button ${p.page===p.totalPages?'disabled':''} onclick="loadProdList(document.getElementById('contentArea'),${p.page+1},prodSearch,prodCatFilter)">下一页</button>`;
  return `<div class="pagination">${btns}<span class="page-info">第 ${p.page}/${p.totalPages} 页</span></div>`;
}

async function addProduct() {
  const cats = (await API.get('/products/categories/list')).data;
  const catOpts = cats.map(c => `<option value="${c.id}">${escHtml(c.name)}</option>`).join('');

  Modal.open('新增产品', `
    <form id="prodForm" enctype="multipart/form-data">
      <div class="form-row">
        <div class="form-group"><label>产品型号 *</label><input type="text" id="pfModel" required></div>
        <div class="form-group"><label>分类 *</label><select id="pfCat">${catOpts}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>售价 *</label><input type="number" id="pfPrice" step="0.01" min="0" required></div>
        <div class="form-group"><label>成本价</label><input type="number" id="pfCost" step="0.01" min="0"></div>
      </div>
      <div class="form-group"><label>单位</label><input type="text" id="pfUnit" value="pcs" placeholder="pcs / 片 / 卷"></div>
      <div class="form-group"><label>描述</label><textarea id="pfDesc" rows="2"></textarea></div>
      <div class="form-group"><label>产品图片</label><input type="file" id="pfImage" accept="image/jpeg,image/png,image/webp"></div>
      <div class="form-group"><label>状态</label><select id="pfStatus"><option value="启用">启用</option><option value="停用">停用</option></select></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveProduct(0)">创建产品</button>
  `);
}

async function editProduct(id) {
  const [prodRes, catRes] = await Promise.all([
    API.get('/products/' + id),
    API.get('/products/categories/list'),
  ]);
  const p = prodRes.data;
  const catOpts = catRes.data.map(c => `<option value="${c.id}" ${c.id===p.category_id?'selected':''}>${escHtml(c.name)}</option>`).join('');

  Modal.open('编辑产品 — ' + p.model, `
    <form id="prodForm" enctype="multipart/form-data">
      <input type="hidden" id="pfId" value="${p.id}">
      <div class="form-row">
        <div class="form-group"><label>产品型号 *</label><input type="text" id="pfModel" value="${escHtml(p.model)}" required></div>
        <div class="form-group"><label>分类 *</label><select id="pfCat">${catOpts}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>售价 *</label><input type="number" id="pfPrice" step="0.01" value="${p.price}" required></div>
        <div class="form-group"><label>成本价</label><input type="number" id="pfCost" step="0.01" value="${p.cost_price}"></div>
      </div>
      <div class="form-group"><label>单位</label><input type="text" id="pfUnit" value="${escHtml(p.unit)}"></div>
      <div class="form-group"><label>描述</label><textarea id="pfDesc" rows="2">${escHtml(p.description||'')}</textarea></div>
      <div class="form-group"><label>产品图片</label>
        ${p.image_url ? `<div style="margin-bottom:8px"><img src="${p.image_url}" style="max-width:120px;border-radius:6px"></div>` : ''}
        <input type="file" id="pfImage" accept="image/jpeg,image/png,image/webp"><span class="form-hint">留空不修改</span>
      </div>
      <div class="form-group"><label>状态</label><select id="pfStatus"><option value="启用" ${p.status==='启用'?'selected':''}>启用</option><option value="停用" ${p.status==='停用'?'selected':''}>停用</option></select></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveProduct(${p.id})">保存修改</button>
  `);
}

async function saveProduct(id) {
  try {
    const formData = new FormData();
    formData.append('model', document.getElementById('pfModel').value.trim());
    formData.append('category_id', document.getElementById('pfCat').value);
    formData.append('price', document.getElementById('pfPrice').value);
    formData.append('cost_price', document.getElementById('pfCost').value || '0');
    formData.append('unit', document.getElementById('pfUnit').value || 'pcs');
    formData.append('description', document.getElementById('pfDesc').value);
    formData.append('status', document.getElementById('pfStatus').value);

    const imgFile = document.getElementById('pfImage').files[0];
    if (imgFile) formData.append('image', imgFile);

    const token = Auth.getToken();

    if (id === 0) {
      await fetch('/api/products', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: formData });
      Toast.success('产品创建成功');
    } else {
      await fetch('/api/products/' + id, { method: 'PUT', headers: { 'Authorization': 'Bearer ' + token }, body: formData });
      Toast.success('产品更新成功');
    }

    Modal.close();
    loadProdList(document.getElementById('contentArea'), prodPage, prodSearch, prodCatFilter);
  } catch (err) {
    Toast.error('保存失败');
  }
}

function deleteProdConfirm(id, model) {
  Modal.open('确认删除', `
    <p>确定要删除产品 <strong>${escHtml(model)}</strong> 吗？</p>
    <p style="color:var(--color-danger);font-size:13px;margin-top:8px">此操作不可撤销</p>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-danger" onclick="deleteProdExec(${id})">确认删除</button>
  `);
}

async function deleteProdExec(id) {
  try {
    await API.delete('/products/' + id);
    Toast.success('产品已删除');
    Modal.close();
    loadProdList(document.getElementById('contentArea'), prodPage, prodSearch, prodCatFilter);
  } catch (err) {
    Toast.error(err.message);
  }
}

// --- 分类弹窗 ---
function addCategory() {
  Modal.open('新增分类', `
    <form><div class="form-row">
      <div class="form-group"><label>名称 *</label><input type="text" id="cfName" required></div>
      <div class="form-group"><label>描述</label><input type="text" id="cfDesc"></div>
    </div></form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveCategory(0)">创建</button>
  `);
}

function editCategory(id, name, desc) {
  Modal.open('编辑分类', `
    <form><div class="form-row">
      <div class="form-group"><label>名称 *</label><input type="text" id="cfName" value="${escHtml(name)}" required></div>
      <div class="form-group"><label>描述</label><input type="text" id="cfDesc" value="${escHtml(desc)}"></div>
    </div></form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveCategory(${id})">保存</button>
  `);
}

async function saveCategory(id) {
  try {
    const body = { name: document.getElementById('cfName').value.trim(), description: document.getElementById('cfDesc').value.trim() };
    if (!body.name) { Toast.warning('请输入分类名称'); return; }
    if (id === 0) { await API.post('/products/categories', body); Toast.success('分类创建成功'); }
    else { await API.put('/products/categories/' + id, body); Toast.success('分类更新成功'); }
    Modal.close();
    loadProdList(document.getElementById('contentArea'), prodPage, prodSearch, prodCatFilter);
  } catch (err) { Toast.error(err.message); }
}

function deleteCatConfirm(id, name, count) {
  Modal.open('确认删除', `
    <p>确定要删除分类 <strong>${escHtml(name)}</strong> 吗？</p>
    ${count > 0 ? `<p style="color:var(--color-danger);font-size:13px;margin-top:8px">该分类下还有 ${count} 个产品，无法删除</p>` : ''}
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    ${count === 0 ? `<button class="btn btn-danger" onclick="deleteCatExec(${id})">确认删除</button>` : ''}
  `);
}

async function deleteCatExec(id) {
  try { await API.delete('/products/categories/' + id); Toast.success('分类已删除'); Modal.close(); loadProdList(document.getElementById('contentArea'), prodPage, prodSearch, prodCatFilter); }
  catch (err) { Toast.error(err.message); }
}

// ============================================================
// 角色管理页面
// ============================================================
async function renderRoles(container) {
  try {
    const [rolesRes, permsRes] = await Promise.all([
      API.get('/roles'),
      API.get('/roles/permissions/all'),
    ]);
    const roles = rolesRes.data;
    const allPerms = permsRes.data;

    let rows = '';
    if (roles.length === 0) {
      rows = `<tr><td colspan="5"><div class="empty-state"><div class="empty-icon">${Icons.settings}</div><p>暂无角色</p></div></td></tr>`;
    } else {
      rows = roles.map(r => `
        <tr>
          <td>${r.id}</td>
          <td><strong>${escHtml(r.name)}</strong></td>
          <td>${escHtml(r.description || '-')}</td>
          <td><span class="badge badge-info">${r.perm_count} 项权限</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="editRole(${r.id})">编辑</button>
            <button class="btn btn-sm btn-outline" onclick="deleteRoleConfirm(${r.id},'${escHtml(r.name)}',${r.perm_count})" style="color:var(--color-danger);margin-left:4px">删除</button>
          </td>
        </tr>`).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span>角色管理</span>
          <button class="btn btn-primary btn-sm" onclick="addRole()">+ 新增角色</button>
        </div>
        <p style="font-size:13px;color:var(--color-text-secondary);margin-bottom:16px">
          角色定义了用户可以访问的功能模块。修改角色权限后，属于该角色的所有用户权限会立即生效。
        </p>
        <div class="table-container">
          <table>
            <thead><tr><th>ID</th><th>角色名称</th><th>描述</th><th>权限</th><th>操作</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;

    // 保存权限列表供后续使用
    window._allPermissions = allPerms;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

async function addRole() {
  const perms = window._allPermissions || [];
  const permChecks = perms.map(p => `
    <label style="display:inline-flex;align-items:center;gap:6px;margin:3px 12px 3px 0;font-size:13px;cursor:pointer">
      <input type="checkbox" value="${p.id}" class="role-perm-cb"> ${p.name} <span style="color:var(--color-text-muted);font-size:11px">${escHtml(p.description||'')}</span>
    </label>`).join('');

  Modal.open('新增角色', `
    <form id="roleForm">
      <div class="form-row">
        <div class="form-group"><label>角色名称 *</label><input type="text" id="rfName" required placeholder="如：财务、质检"></div>
        <div class="form-group"><label>描述</label><input type="text" id="rfDesc" placeholder="角色职责说明"></div>
      </div>
      <div class="form-group">
        <label>权限分配</label>
        <div style="background:var(--color-bg);border-radius:var(--radius-sm);padding:12px;max-height:200px;overflow-y:auto">
          ${permChecks || '<span style="color:var(--color-text-muted)">暂无可用权限</span>'}
        </div>
      </div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveRole(0)">创建角色</button>
  `);
}

async function editRole(id) {
  const [roleRes] = await Promise.all([API.get('/roles/' + id)]);
  const role = roleRes.data;
  const perms = window._allPermissions || [];
  const selectedPerms = new Set(role.permission_ids || []);

  const permChecks = perms.map(p => `
    <label style="display:inline-flex;align-items:center;gap:6px;margin:3px 12px 3px 0;font-size:13px;cursor:pointer">
      <input type="checkbox" value="${p.id}" class="role-perm-cb" ${selectedPerms.has(p.id)?'checked':''}> ${p.name}
      <span style="color:var(--color-text-muted);font-size:11px">${escHtml(p.description||'')}</span>
    </label>`).join('');

  Modal.open('编辑角色 — ' + role.name, `
    <form id="roleForm">
      <input type="hidden" id="rfId" value="${role.id}">
      <div class="form-row">
        <div class="form-group"><label>角色名称 *</label><input type="text" id="rfName" value="${escHtml(role.name)}" required></div>
        <div class="form-group"><label>描述</label><input type="text" id="rfDesc" value="${escHtml(role.description||'')}"></div>
      </div>
      <div class="form-group">
        <label>权限分配（取消勾选 = 移除权限）</label>
        <div style="background:var(--color-bg);border-radius:var(--radius-sm);padding:12px;max-height:200px;overflow-y:auto">
          ${permChecks || '<span style="color:var(--color-text-muted)">暂无可用权限</span>'}
        </div>
      </div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveRole(${role.id})">保存修改</button>
  `);
}

async function saveRole(id) {
  try {
    const body = {
      name: document.getElementById('rfName').value.trim(),
      description: document.getElementById('rfDesc').value.trim(),
      permission_ids: Array.from(document.querySelectorAll('.role-perm-cb:checked')).map(cb => parseInt(cb.value)),
    };

    if (!body.name) { Toast.warning('请输入角色名称'); return; }

    if (id === 0) {
      await API.post('/roles', body);
      Toast.success('角色创建成功');
    } else {
      await API.put('/roles/' + id, body);
      Toast.success('角色更新成功');
    }

    Modal.close();
    renderRoles(document.getElementById('contentArea'));
  } catch (err) {
    Toast.error(err.message);
  }
}

function deleteRoleConfirm(id, name, permCount) {
  Modal.open('确认删除', `
    <p>确定要删除角色 <strong>${escHtml(name)}</strong> 吗？</p>
    <p style="color:var(--color-danger);font-size:13px;margin-top:8px">该角色的 ${permCount} 项权限配置将被一并删除。此操作不可撤销。</p>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-danger" onclick="deleteRoleExec(${id})">确认删除</button>
  `);
}

async function deleteRoleExec(id) {
  try {
    await API.delete('/roles/' + id);
    Toast.success('角色已删除');
    Modal.close();
    renderRoles(document.getElementById('contentArea'));
  } catch (err) {
    Toast.error(err.message);
  }
}

// ============================================================
// 用户管理页面
// ============================================================
const RESOURCES = ['customer', 'consultation', 'order', 'purchase', 'stock_in_order'];
const RESOURCE_LABELS = { customer: '客户', consultation: '咨询', order: '销售订单', purchase: '采购单', stock_in_order: '入库单' };
const SCOPE_OPTIONS = ['全部', '本部门', '本人'];

let userPage = 1, userSearch = '';

async function renderUsers(container) {
  userPage = 1; userSearch = '';
  await loadUserList(container);
}

async function loadUserList(container, page = 1, search = '') {
  userPage = page; userSearch = search;
  try {
    const res = await API.get(`/users?page=${page}&limit=15&search=${encodeURIComponent(search)}`);
    const { list, pagination } = res.data;

    let rows = '';
    if (list.length === 0) {
      rows = `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.users}</div><p>暂无用户数据</p></div></td></tr>`;
    } else {
      rows = list.map(u => `
        <tr>
          <td>${u.id}</td>
          <td><strong>${escHtml(u.username)}</strong></td>
          <td>${escHtml(u.name)}</td>
          <td><span class="badge badge-info">${escHtml(u.role_name)}</span></td>
          <td>${escHtml(u.email || '-')}</td>
          <td>${escHtml(u.phone || '-')}</td>
          <td><span class="badge ${u.status === '启用' ? 'badge-success' : 'badge-default'}">${u.status}</span></td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="editUser(${u.id})" title="编辑">编辑</button>
            <button class="btn btn-sm btn-outline" onclick="deleteUserConfirm(${u.id},'${escHtml(u.username)}')" title="删除" style="color:var(--color-danger);margin-left:4px">删除</button>
          </td>
        </tr>`).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <span>用户管理</span>
          <button class="btn btn-primary btn-sm" onclick="addUser()">+ 新增用户</button>
        </div>
        <div class="toolbar">
          <input type="text" id="userSearchInput" placeholder="搜索用户名 / 姓名 / 邮箱..." value="${escHtml(search)}"
            onkeydown="if(event.key==='Enter')loadUserList(document.getElementById('contentArea'),1,document.getElementById('userSearchInput').value)">
          <button class="btn btn-outline btn-sm" onclick="loadUserList(document.getElementById('contentArea'),1,document.getElementById('userSearchInput').value)">搜索</button>
          <span class="spacer"></span>
          <span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 个用户</span>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr><th>ID</th><th>用户名</th><th>姓名</th><th>角色</th><th>邮箱</th><th>电话</th><th>状态</th><th>操作</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${renderPagination(pagination)}
      </div>`;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

function renderPagination(p) {
  if (p.totalPages <= 1) return '';
  let btns = '';
  btns += `<button ${p.page === 1 ? 'disabled' : ''} onclick="loadUserList(document.getElementById('contentArea'),${p.page - 1},userSearch)">上一页</button>`;
  for (let i = 1; i <= p.totalPages; i++) {
    btns += `<button class="${i === p.page ? 'active' : ''}" onclick="loadUserList(document.getElementById('contentArea'),${i},userSearch)">${i}</button>`;
  }
  btns += `<button ${p.page === p.totalPages ? 'disabled' : ''} onclick="loadUserList(document.getElementById('contentArea'),${p.page + 1},userSearch)">下一页</button>`;
  return `<div class="pagination">${btns}<span class="page-info">第 ${p.page}/${p.totalPages} 页</span></div>`;
}

async function addUser() {
  const roles = await API.get('/users/roles/list');
  const roleOpts = roles.data.map(r => `<option value="${r.id}">${r.name}</option>`).join('');

  Modal.open('新增用户', `
    <form id="userForm">
      <div class="form-row">
        <div class="form-group"><label>用户名 *</label><input type="text" id="ufUsername" required></div>
        <div class="form-group"><label>密码 *</label><input type="password" id="ufPassword" required placeholder="至少6位"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>姓名 *</label><input type="text" id="ufName" required></div>
        <div class="form-group"><label>角色 *</label><select id="ufRole">${roleOpts}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>邮箱</label><input type="email" id="ufEmail"></div>
        <div class="form-group"><label>电话</label><input type="text" id="ufPhone"></div>
      </div>
      <div class="form-group"><label>状态</label><select id="ufStatus"><option value="启用">启用</option><option value="停用">停用</option></select></div>
      <h4 style="margin-top:20px;margin-bottom:8px;font-size:14px">数据可见范围</h4>
      <p class="form-hint" style="margin-bottom:12px">未设置时继承角色默认值（非管理员默认为"本人"）</p>
      ${RESOURCES.map(r => `
        <div class="form-row" style="grid-template-columns:120px 1fr">
          <div class="form-group"><label>${RESOURCE_LABELS[r]}</label></div>
          <div class="form-group">
            <select id="ufScope_${r}" class="scope-select">
              <option value="">（继承角色默认）</option>
              ${SCOPE_OPTIONS.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>`).join('')}
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveUser(0)">创建用户</button>
  `);
}

async function editUser(id) {
  const [userRes, rolesRes] = await Promise.all([
    API.get('/users/' + id),
    API.get('/users/roles/list'),
  ]);
  const u = userRes.data;
  const roles = rolesRes.data;
  const roleOpts = roles.map(r => `<option value="${r.id}" ${r.id === u.role_id ? 'selected' : ''}>${r.name}</option>`).join('');
  const scopeMap = {};
  if (u.data_scopes) u.data_scopes.forEach(s => { scopeMap[s.resource] = s.scope; });

  Modal.open('编辑用户 — ' + u.username, `
    <form id="userForm">
      <input type="hidden" id="ufId" value="${u.id}">
      <div class="form-row">
        <div class="form-group"><label>用户名</label><input type="text" value="${escHtml(u.username)}" disabled></div>
        <div class="form-group"><label>新密码（留空不修改）</label><input type="password" id="ufPassword" placeholder="至少6位"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>姓名 *</label><input type="text" id="ufName" value="${escHtml(u.name)}" required></div>
        <div class="form-group"><label>角色</label><select id="ufRole">${roleOpts}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>邮箱</label><input type="email" id="ufEmail" value="${escHtml(u.email || '')}"></div>
        <div class="form-group"><label>电话</label><input type="text" id="ufPhone" value="${escHtml(u.phone || '')}"></div>
      </div>
      <div class="form-group"><label>状态</label><select id="ufStatus"><option value="启用" ${u.status==='启用'?'selected':''}>启用</option><option value="停用" ${u.status==='停用'?'selected':''}>停用</option></select></div>
      <h4 style="margin-top:20px;margin-bottom:8px;font-size:14px">数据可见范围</h4>
      <p class="form-hint" style="margin-bottom:12px">未设置时继承角色默认值</p>
      ${RESOURCES.map(r => `
        <div class="form-row" style="grid-template-columns:120px 1fr">
          <div class="form-group"><label>${RESOURCE_LABELS[r]}</label></div>
          <div class="form-group">
            <select id="ufScope_${r}" class="scope-select">
              <option value="">（继承角色默认）</option>
              ${SCOPE_OPTIONS.map(s => `<option value="${s}" ${scopeMap[r]===s?'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>`).join('')}
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="saveUser(${u.id})">保存修改</button>
  `);
}

async function saveUser(id) {
  try {
    const body = {
      name: document.getElementById('ufName').value.trim(),
      role_id: parseInt(document.getElementById('ufRole').value),
      email: document.getElementById('ufEmail').value.trim(),
      phone: document.getElementById('ufPhone').value.trim(),
      status: document.getElementById('ufStatus').value,
    };

    if (id === 0) {
      // 新建
      body.username = document.getElementById('ufUsername').value.trim();
      body.password = document.getElementById('ufPassword').value;
      if (!body.username || !body.password || !body.name) {
        Toast.warning('用户名、密码、姓名为必填项'); return;
      }
      await API.post('/auth/register', body);
      Toast.success('用户创建成功');
    } else {
      // 编辑
      const pwd = document.getElementById('ufPassword').value;
      if (pwd) body.password = pwd;

      // 收集 data_scopes
      body.data_scopes = [];
      for (const r of RESOURCES) {
        const val = document.getElementById('ufScope_' + r).value;
        if (val) body.data_scopes.push({ resource: r, scope: val });
      }

      await API.put('/users/' + id, body);
      Toast.success('用户更新成功');
    }

    Modal.close();
    loadUserList(document.getElementById('contentArea'), userPage, userSearch);
  } catch (err) {
    Toast.error(err.message);
  }
}

function deleteUserConfirm(id, username) {
  Modal.open('确认删除', `
    <p>确定要删除用户 <strong>${escHtml(username)}</strong> 吗？</p>
    <p style="color:var(--color-danger);font-size:13px;margin-top:8px">此操作不可撤销</p>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-danger" onclick="deleteUserExec(${id})">确认删除</button>
  `);
}

async function deleteUserExec(id) {
  try {
    await API.delete('/users/' + id);
    Toast.success('用户已删除');
    Modal.close();
    loadUserList(document.getElementById('contentArea'), userPage, userSearch);
  } catch (err) {
    Toast.error(err.message);
  }
}

function escHtml(str) {
  if (!str) return '';
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function renderPlaceholder(container, title, message, iconKey) {
  container.innerHTML = `
    <div class="card">
      <div class="empty-state">
        <div class="empty-icon">${Icons[iconKey] || Icons.construction}</div>
        <h3>${title}</h3>
        <p>${message}</p>
      </div>
    </div>
  `;
}

// ============================================================
// 登录
// ============================================================
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const btnText = document.getElementById('loginBtnText');
  const errorEl = document.getElementById('loginError');

  btn.disabled = true;
  btnText.textContent = '登录中...';
  errorEl.textContent = '';

  try {
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    if (!username || !password) throw new Error('请输入用户名和密码');

    const res = await API.post('/auth/login', { username, password });
    Auth.setSession(res.data.token, res.data.user);
    Toast.success(`欢迎回来，${res.data.user.name}！`);
    showApp();
  } catch (err) {
    errorEl.textContent = err.message;
  } finally {
    btn.disabled = false;
    btnText.textContent = '登 录';
  }
}

// ============================================================
// 初始化
// ============================================================
function showApp() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  const user = Auth.getUser();
  document.getElementById('userInfo').textContent = `${user.name}`;
  document.getElementById('userAvatar').textContent = (user.name || 'U')[0];

  renderSidebar();
  Router.navigate('dashboard');
}

// ============================================================
// 事件
// ============================================================
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('logoutBtn').addEventListener('click', () => Auth.logout());
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});
document.getElementById('loginPassword').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin(new Event('submit'));
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') Modal.close();
});

// ============================================================
// 启动
// ============================================================
if (Auth.isLoggedIn()) {
  API.get('/auth/me').then(() => showApp()).catch(() => Auth.logout());
}
