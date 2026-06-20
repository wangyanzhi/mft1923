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
      case 'orders': renderOrders(container); break;
      case 'purchases': renderPurchases(container); break;
      case 'customers': renderCustomers(container); break;
      case 'consultations': renderConsultations(container); break;
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
      ${statCard('blue', Icons.package, 'statProducts', '产品总数', '...')}
      ${statCard('red', Icons.alert, 'statAlerts', '库存预警', '...')}
      ${statCard('indigo', Icons.clipboard, 'statOrders', '今日订单', '...')}
      ${statCard('green', Icons.dollar, 'statSales', '本月销售额', '...')}
      ${statCard('amber', Icons.users, 'statCustomers', '客户总数', '...')}
      ${statCard('indigo', Icons.messageCircle, 'statConsultations', '待处理咨询', '...')}
    </div>
    <div class="card">
      <div class="card-header">系统概览</div>
      <div class="welcome-panel">
        <p>欢迎回来，<strong>${user.name}</strong>（${user.role}）</p>
        <p style="margin-top:8px;font-size:13px;color:var(--color-text-muted)">数据每 30 秒自动刷新</p>
      </div>
    </div>`;
  loadDashboardStats();
  // Auto-refresh
  if (window._dashInterval) clearInterval(window._dashInterval);
  window._dashInterval = setInterval(loadDashboardStats, 30000);
}
function statCard(iconCls, iconSvg, id, label, val) { return `<div class="stat-card"><div class="stat-icon ${iconCls}">${iconSvg}</div><div class="stat-info"><div class="stat-value" id="${id}">${val}</div><div class="stat-label">${label}</div></div></div>`; }

const _f = (n) => { if (n == null) return '-'; return typeof n === 'number' ? (n % 1 === 0 ? n.toLocaleString() : n.toFixed(1)) : n; };
const _y = (n) => n != null ? '¥' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '-';

async function loadDashboardStats() {
  const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  // Products count
  try { const r = await API.get('/products?limit=1'); setText('statProducts', _f(r.data.pagination.total)); } catch (_) { setText('statProducts', '-'); }
  // Inventory alerts
  try { const r = await API.get('/inventory/alerts'); setText('statAlerts', _f(r.data.length)); } catch (_) { setText('statAlerts', '-'); }
  // Today orders
  try { const r = await API.get('/orders/today-count'); setText('statOrders', _f(r.data.count)); } catch (_) { setText('statOrders', '-'); }
  // Monthly sales
  try { const now = new Date(); const r = await API.get(`/orders/stats/sales?year=${now.getFullYear()}&month=${now.getMonth()+1}`); setText('statSales', _y(r.data.total.total_amount)); } catch (_) { setText('statSales', '-'); }
  // Customers count
  try { const r = await API.get('/customers?limit=1'); setText('statCustomers', _f(r.data.pagination.total)); } catch (_) { setText('statCustomers', '-'); }
  // Pending consultations
  try { const r = await API.get('/consultations?status=待跟进&limit=1'); setText('statConsultations', _f(r.data.pagination.total)); } catch (_) { setText('statConsultations', '-'); }
}

// ============================================================
// 客户管理页面
// ============================================================
let custPage = 1, custSearch = '';
async function renderCustomers(container) { custPage = 1; custSearch = ''; await loadCustList(container); }
async function loadCustList(container, page = 1, search = '') {
  custPage = page; custSearch = search;
  try {
    const res = await API.get(`/customers?page=${page}&limit=15&search=${encodeURIComponent(search)}`);
    const { list, pagination } = res.data;
    let rows = list.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.users}</div><p>暂无客户</p></div></td></tr>` :
      list.map(c => `<tr>
        <td>${c.id}</td><td><strong>${escHtml(c.name)}</strong></td><td>${escHtml(c.company||'-')}</td>
        <td>${escHtml(c.contact_person||'-')}</td><td>${escHtml(c.phone||'-')}</td>
        <td><span class="badge ${c.status==='启用'?'badge-success':'badge-default'}">${c.status}</span></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editCustomer(${c.id})">编辑</button>
          <button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="deleteCustConfirm(${c.id},'${escHtml(c.name)}')">删除</button>
        </td></tr>`).join('');
    container.innerHTML = `<div class="card">
      <div class="card-header"><span>客户管理</span><button class="btn btn-primary btn-sm" onclick="editCustomer(0)">+ 新增客户</button></div>
      <div class="toolbar"><input type="text" id="custSearch" placeholder="搜索名称/公司/联系人..." value="${escHtml(search)}" onkeydown="if(event.key==='Enter')loadCustList(document.getElementById('contentArea'),1,this.value)"><button class="btn btn-outline btn-sm" onclick="loadCustList(document.getElementById('contentArea'),1,document.getElementById('custSearch').value)">搜索</button><span class="spacer"></span><span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 个</span></div>
      <div class="table-container"><table><thead><tr><th>ID</th><th>名称</th><th>公司</th><th>联系人</th><th>电话</th><th>状态</th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div>
      ${pagination.totalPages > 1 ? `<div class="pagination"><span class="page-info">第 ${page}/${pagination.totalPages} 页</span></div>` : ''}
    </div>`;
  } catch (err) { container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`; }
}

async function editCustomer(id) {
  let c = { name: '', company: '', contact_person: '', phone: '', email: '', address: '', notes: '', status: '启用' };
  if (id > 0) { const r = await API.get('/customers/' + id); c = r.data; }
  Modal.open(id === 0 ? '新增客户' : '编辑客户 — ' + c.name, `
    <form><div class="form-row">
      <div class="form-group"><label>名称 *</label><input type="text" id="cfName" value="${escHtml(c.name)}" required></div>
      <div class="form-group"><label>公司</label><input type="text" id="cfCompany" value="${escHtml(c.company||'')}"></div>
    </div><div class="form-row">
      <div class="form-group"><label>联系人</label><input type="text" id="cfPerson" value="${escHtml(c.contact_person||'')}"></div>
      <div class="form-group"><label>电话</label><input type="text" id="cfPhone" value="${escHtml(c.phone||'')}"></div>
    </div><div class="form-row">
      <div class="form-group"><label>邮箱</label><input type="email" id="cfEmail" value="${escHtml(c.email||'')}"></div>
      <div class="form-group"><label>地址</label><input type="text" id="cfAddr" value="${escHtml(c.address||'')}"></div>
    </div><div class="form-group"><label>备注</label><textarea id="cfNotes" rows="2">${escHtml(c.notes||'')}</textarea></div>
    ${id > 0 ? `<div class="form-group"><label>状态</label><select id="cfStatus"><option value="启用" ${c.status==='启用'?'selected':''}>启用</option><option value="停用" ${c.status==='停用'?'selected':''}>停用</option></select></div>` : ''}
    </form>
  `, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-primary" onclick="saveCustomer(${id})">保存</button>`);
}

async function saveCustomer(id) {
  try {
    const body = { name: document.getElementById('cfName').value.trim(), company: document.getElementById('cfCompany').value.trim(), contact_person: document.getElementById('cfPerson').value.trim(), phone: document.getElementById('cfPhone').value.trim(), email: document.getElementById('cfEmail').value.trim(), address: document.getElementById('cfAddr').value.trim(), notes: document.getElementById('cfNotes').value.trim() };
    if (!body.name) { Toast.warning('请输入客户名称'); return; }
    if (id === 0) { await API.post('/customers', body); Toast.success('客户创建成功'); }
    else { const st = document.getElementById('cfStatus'); if (st) body.status = st.value; await API.put('/customers/' + id, body); Toast.success('客户更新成功'); }
    Modal.close(); loadCustList(document.getElementById('contentArea'), custPage, custSearch);
  } catch (err) { Toast.error(err.message); }
}
function deleteCustConfirm(id, name) { Modal.open('确认删除', `<p>确定删除客户 <strong>${escHtml(name)}</strong>？</p>`, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-danger" onclick="deleteCustExec(${id})">确认</button>`); }
async function deleteCustExec(id) { try { await API.delete('/customers/' + id); Toast.success('已删除'); Modal.close(); loadCustList(document.getElementById('contentArea'), custPage, custSearch); } catch (err) { Toast.error(err.message); } }

// ============================================================
// 咨询跟进页面
// ============================================================
let consPage = 1, consStatus = '';
async function renderConsultations(container) { consPage = 1; consStatus = ''; await loadConsList(container); }
async function loadConsList(container, page = 1, status = '') {
  consPage = page; consStatus = status;
  try {
    const params = new URLSearchParams({ page, limit: 15, status });
    const res = await API.get('/consultations?' + params.toString());
    const { list, pagination } = res.data;
    const badge = s => s==='待跟进'?'badge-warning':s==='跟进中'?'badge-info':'badge-default';
    let rows = list.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.messageCircle}</div><p>暂无咨询记录</p></div></td></tr>` :
      list.map(c => `<tr>
        <td>${c.id}</td><td><strong>${escHtml(c.customer_name)}</strong></td><td>${escHtml(c.content).substring(0,60)}${c.content.length>60?'...':''}</td>
        <td><span class="badge ${badge(c.status)}">${c.status}</span></td><td>${c.consultation_date||'-'}</td><td>${c.next_follow_up||'-'}</td>
        <td>${escHtml(c.operator_name||'-')}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="editConsultation(${c.id})">编辑</button>
          <button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="deleteConsConfirm(${c.id})">删除</button>
        </td></tr>`).join('');
    container.innerHTML = `<div class="card">
      <div class="card-header"><span>咨询跟进</span><button class="btn btn-primary btn-sm" onclick="editConsultation(0)">+ 新增咨询</button></div>
      <div class="toolbar"><select onchange="loadConsList(document.getElementById('contentArea'),1,this.value)"><option value="">全部状态</option><option value="待跟进" ${status==='待跟进'?'selected':''}>待跟进</option><option value="跟进中" ${status==='跟进中'?'selected':''}>跟进中</option><option value="已关闭" ${status==='已关闭'?'selected':''}>已关闭</option></select><span class="spacer"></span><span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 条</span></div>
      <div class="table-container"><table><thead><tr><th>ID</th><th>客户</th><th>内容</th><th>状态</th><th>日期</th><th>下次跟进</th><th>跟进人</th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>`;
  } catch (err) { container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`; }
}

async function editConsultation(id) {
  const [custRes] = await Promise.all([API.get('/customers?limit=200')]);
  const custOpts = custRes.data.list.map(c => `<option value="${c.id}">${escHtml(c.name)}</option>`).join('');
  let c = { customer_id: '', consultation_date: new Date().toISOString().slice(0,10), content: '', next_follow_up: '', status: '待跟进', notes: '' };
  if (id > 0) { const r = await API.get('/consultations/' + id); c = r.data; }
  Modal.open(id === 0 ? '新增咨询' : '编辑咨询', `
    <form>
      <div class="form-group"><label>客户 *</label><select id="cfCust">${custOpts}</select></div>
      <div class="form-row">
        <div class="form-group"><label>日期</label><input type="date" id="cfDate" value="${c.consultation_date}"></div>
        <div class="form-group"><label>下次跟进</label><input type="date" id="cfNext" value="${c.next_follow_up||''}"></div>
      </div>
      <div class="form-group"><label>咨询内容 *</label><textarea id="cfContent" rows="3" required>${escHtml(c.content||'')}</textarea></div>
      <div class="form-row">
        <div class="form-group"><label>状态</label><select id="cfStatus">${['待跟进','跟进中','已关闭'].map(s=>`<option ${c.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label>备注</label><textarea id="cfNotes" rows="2">${escHtml(c.notes||'')}</textarea></div>
    </form>
  `, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-primary" onclick="saveConsultation(${id})">保存</button>`);
  if (id > 0) document.getElementById('cfCust').value = c.customer_id;
}

async function saveConsultation(id) {
  try {
    const body = { customer_id: parseInt(document.getElementById('cfCust').value), consultation_date: document.getElementById('cfDate').value, content: document.getElementById('cfContent').value.trim(), next_follow_up: document.getElementById('cfNext').value, status: document.getElementById('cfStatus').value, notes: document.getElementById('cfNotes').value.trim() };
    if (!body.customer_id || !body.content) { Toast.warning('客户和咨询内容为必填'); return; }
    if (id === 0) { await API.post('/consultations', body); Toast.success('咨询创建成功'); }
    else { await API.put('/consultations/' + id, body); Toast.success('咨询更新成功'); }
    Modal.close(); loadConsList(document.getElementById('contentArea'), consPage, consStatus);
  } catch (err) { Toast.error(err.message); }
}
function deleteConsConfirm(id) { Modal.open('确认删除','<p>确定删除该咨询记录？</p>',`<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-danger" onclick="deleteConsExec(${id})">确认</button>`); }
async function deleteConsExec(id) { try { await API.delete('/consultations/' + id); Toast.success('已删除'); Modal.close(); loadConsList(document.getElementById('contentArea'), consPage, consStatus); } catch (err) { Toast.error(err.message); } }

// ============================================================
// 采购管理页面
// ============================================================
let purPage = 1;
async function renderPurchases(container) { purPage = 1; await loadPurList(container); }
async function loadPurList(container, page = 1) {
  purPage = page;
  try {
    const [purRes, supRes] = await Promise.all([API.get('/purchase?page=' + page), API.get('/purchase/suppliers/list')]);
    const { list, pagination } = purRes.data;
    const suppliers = supRes.data;
    const badge = s => s==='待处理'?'badge-warning':s==='已下单'?'badge-info':s==='已收货'?'badge-success':'badge-default';
    let rows = list.length === 0 ? `<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">${Icons.truck}</div><p>暂无采购单</p></div></td></tr>` :
      list.map(p => `<tr>
        <td><strong>${escHtml(p.order_number)}</strong></td><td>${escHtml(p.supplier_name||'-')}</td><td>¥${Number(p.total_amount).toFixed(2)}</td>
        <td><span class="badge ${badge(p.status)}">${p.status}</span></td><td>${p.item_count} 项</td><td>${p.order_date||'-'}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="viewPurchase(${p.id})">查看</button>
          ${p.status==='待处理'?`<button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="deletePurConfirm(${p.id},'${escHtml(p.order_number)}')">删除</button>`:''}
        </td></tr>`).join('');
    let supRows = suppliers.map(s => `<tr><td>${s.id}</td><td>${escHtml(s.name)}</td><td>${escHtml(s.contact_person||'-')}</td><td>${escHtml(s.phone||'-')}</td><td><span class="badge ${s.status==='启用'?'badge-success':'badge-default'}">${s.status}</span></td><td><button class="btn btn-sm btn-outline" onclick="editSupplier(${s.id})">编辑</button><button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="deleteSupConfirm(${s.id},'${escHtml(s.name)}')">删除</button></td></tr>`).join('');
    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span>采购单管理</span><button class="btn btn-primary btn-sm" onclick="createPurchase()">+ 创建采购单</button></div>
        <div class="table-container"><table><thead><tr><th>单号</th><th>供应商</th><th>金额</th><th>状态</th><th>明细</th><th>日期</th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div>
      </div>
      <div class="card">
        <div class="card-header"><span>供应商管理</span><button class="btn btn-primary btn-sm" onclick="editSupplier(0)">+ 新增供应商</button></div>
        <div class="table-container"><table><thead><tr><th>ID</th><th>名称</th><th>联系人</th><th>电话</th><th>状态</th><th>操作</th></tr></thead><tbody>${supRows||'<tr><td colspan="6">暂无供应商</td></tr>'}</tbody></table></div>
      </div>`;
  } catch (err) { container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`; }
}

async function createPurchase() {
  const [prodRes, supRes] = await Promise.all([API.get('/products?limit=200&status='), API.get('/purchase/suppliers/list')]);
  const supOpts = '<option value="">选供应商</option>' + supRes.data.filter(s => s.status === '启用').map(s => `<option value="${s.id}">${escHtml(s.name)}</option>`).join('');
  const prodOpts = prodRes.data.list.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('');
  document.getElementById('modalBox').style.width = '700px';
  Modal.open('创建采购单', `
    <div class="form-row"><div class="form-group"><label>供应商 *</label><select id="pfSup">${supOpts}</select></div><div class="form-group"><label>预计到货</label><input type="date" id="pfExpected"></div></div>
    <div class="form-group"><label>产品明细</label></div>
    <div id="pfItems"><div class="pf-item" style="display:flex;gap:8px;align-items:center;padding:8px 10px;background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;margin-bottom:6px">
      <select class="pf-prod" style="flex:1;height:38px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;background:#fff;outline:none">${prodOpts}</select>
      <input type="number" class="pf-qty" step="0.1" min="0.1" value="1" style="width:70px;height:38px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;text-align:center;outline:none">
      <input type="number" class="pf-price" step="0.01" value="0" style="width:80px;height:38px;border:1.5px solid #CBD5E1;border-radius:6px;font-size:13px;font-family:inherit;text-align:right;outline:none">
      <button type="button" onclick="this.closest('.pf-item').remove()" style="width:30px;height:38px;background:none;border:none;color:#94A3B8;cursor:pointer;font-size:20px;padding:0">&times;</button>
    </div></div>
    <button type="button" class="btn btn-sm btn-outline" onclick="addPfItem()" style="margin-top:8px">+ 添加产品</button>
    <div class="form-group" style="margin-top:12px"><label>备注</label><textarea id="pfNotes" rows="2"></textarea></div>
  `, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-primary" onclick="execCreatePurchase()">提交</button>`);
}

function addPfItem() { const c = document.getElementById('pfItems'); const t = c.querySelector('.pf-item').cloneNode(true); t.querySelectorAll('input').forEach(i => i.value = i.classList.contains('pf-qty') ? '1' : '0'); c.appendChild(t); }

async function execCreatePurchase() {
  try {
    const items = []; document.querySelectorAll('.pf-item').forEach(el => { const pid = parseInt(el.querySelector('.pf-prod').value), qty = parseFloat(el.querySelector('.pf-qty').value), price = parseFloat(el.querySelector('.pf-price').value); if (pid && qty >= 0.1) items.push({ product_id: pid, quantity: qty, unit_price: price }); });
    if (items.length === 0) { Toast.warning('请添加产品明细'); return; }
    const body = { supplier_id: parseInt(document.getElementById('pfSup').value), order_date: new Date().toISOString().slice(0,10), expected_date: document.getElementById('pfExpected').value, notes: document.getElementById('pfNotes').value, items };
    if (!body.supplier_id) { Toast.warning('请选择供应商'); return; }
    await API.post('/purchase', body); Toast.success('采购单创建成功'); Modal.close(); loadPurList(document.getElementById('contentArea'), purPage);
  } catch (err) { Toast.error(err.message); }
}

async function viewPurchase(id) {
  const r = await API.get('/purchase/' + id); const p = r.data;
  const itemsHtml = p.items.map(i => `<tr><td>${escHtml(i.product_model)}</td><td>${i.quantity}</td><td>¥${Number(i.unit_price).toFixed(2)}</td><td>¥${Number(i.subtotal).toFixed(2)}</td></tr>`).join('');
  const canTrans = { '待处理': ['已下单','已取消'], '已下单': ['已收货','已取消'] };
  const btns = (canTrans[p.status] || []).map(s => `<button class="btn btn-sm ${s==='已取消'?'btn-danger':'btn-primary'}" onclick="changePurStatus(${p.id},'${s}')">→ ${s}</button>`).join(' ');
  Modal.open('采购单 — ' + p.order_number, `
    <p>供应商：<strong>${escHtml(p.supplier_name)}</strong> | 状态：<span class="badge">${p.status}</span> | 合计：<strong>¥${Number(p.total_amount).toFixed(2)}</strong></p>
    <p style="font-size:13px;color:var(--color-text-secondary)">日期：${p.order_date||'-'} | 预计到货：${p.expected_date||'-'} | 备注：${escHtml(p.notes||'')}</p>
    <div class="table-container" style="margin-top:12px"><table style="width:100%"><thead><tr><th style="width:45%">型号</th><th style="width:15%">数量</th><th style="width:20%">单价</th><th style="width:20%">小计</th></tr></thead><tbody>${itemsHtml}</tbody></table></div>
  `, `${btns}<button class="btn btn-outline" onclick="Modal.close()">关闭</button>`);
}

async function changePurStatus(id, s) { try { await API.put('/purchase/' + id + '/status', { status: s }); Toast.success('状态已更新'); Modal.close(); loadPurList(document.getElementById('contentArea'), purPage); } catch (err) { Toast.error(err.message); } }
function deletePurConfirm(id, on) { Modal.open('确认删除', `<p>删除采购单 <strong>${escHtml(on)}</strong>？</p>`, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-danger" onclick="deletePurExec(${id})">确认</button>`); }
async function deletePurExec(id) { try { await API.delete('/purchase/' + id); Toast.success('已删除'); Modal.close(); loadPurList(document.getElementById('contentArea'), purPage); } catch (err) { Toast.error(err.message); } }

async function editSupplier(id) {
  let s = { name: '', contact_person: '', phone: '', email: '', address: '', notes: '', status: '启用' };
  if (id > 0) { const [rows] = await (await API.get('/purchase/suppliers/list')).data.filter(r => r.id === id); if (rows) s = rows; else { const r2 = await API.get('/purchase/suppliers/list'); s = r2.data.find(r => r.id === id) || s; } }
  Modal.open(id === 0 ? '新增供应商' : '编辑供应商', `
    <form><div class="form-row"><div class="form-group"><label>名称 *</label><input type="text" id="sfName" value="${escHtml(s.name)}" required></div><div class="form-group"><label>联系人</label><input type="text" id="sfPerson" value="${escHtml(s.contact_person||'')}"></div></div>
    <div class="form-row"><div class="form-group"><label>电话</label><input type="text" id="sfPhone" value="${escHtml(s.phone||'')}"></div><div class="form-group"><label>邮箱</label><input type="email" id="sfEmail" value="${escHtml(s.email||'')}"></div></div>
    <div class="form-group"><label>地址</label><input type="text" id="sfAddr" value="${escHtml(s.address||'')}"></div>
    <div class="form-group"><label>备注</label><textarea id="sfNotes" rows="2">${escHtml(s.notes||'')}</textarea></div>
    ${id>0?`<div class="form-group"><label>状态</label><select id="sfStatus"><option value="启用" ${s.status==='启用'?'selected':''}>启用</option><option value="停用" ${s.status==='停用'?'selected':''}>停用</option></select></div>`:''}
    </form>
  `, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-primary" onclick="saveSupplier(${id})">保存</button>`);
}

async function saveSupplier(id) {
  try {
    const body = { name: document.getElementById('sfName').value.trim(), contact_person: document.getElementById('sfPerson').value.trim(), phone: document.getElementById('sfPhone').value.trim(), email: document.getElementById('sfEmail').value.trim(), address: document.getElementById('sfAddr').value.trim(), notes: document.getElementById('sfNotes').value.trim() };
    if (!body.name) { Toast.warning('请输入供应商名称'); return; }
    if (id > 0) { const st = document.getElementById('sfStatus'); if (st) body.status = st.value; }
    if (id === 0) { await API.post('/purchase/suppliers', body); Toast.success('供应商创建成功'); }
    else { await API.put('/purchase/suppliers/' + id, body); Toast.success('供应商更新成功'); }
    Modal.close(); loadPurList(document.getElementById('contentArea'), purPage);
  } catch (err) { Toast.error(err.message); }
}
function deleteSupConfirm(id, name) { Modal.open('确认删除', `<p>删除供应商 <strong>${escHtml(name)}</strong>？</p>`, `<button class="btn btn-outline" onclick="Modal.close()">取消</button><button class="btn btn-danger" onclick="deleteSupExec(${id})">确认</button>`); }
async function deleteSupExec(id) { try { await API.delete('/purchase/suppliers/' + id); Toast.success('已删除'); Modal.close(); loadPurList(document.getElementById('contentArea'), purPage); } catch (err) { Toast.error(err.message); } }

// ============================================================
// 销售订单页面
// ============================================================
let ordPage = 1, ordSearch = '', ordStatus = '', ordPayStatus = '';

async function renderOrders(container) {
  ordPage = 1; ordSearch = ''; ordStatus = ''; ordPayStatus = '';
  await loadOrdList(container);
}

async function loadOrdList(container, page = 1, search = '', status = '', payStatus = '') {
  ordPage = page; ordSearch = search; ordStatus = status; ordPayStatus = payStatus;
  try {
    const params = new URLSearchParams({ page, limit: 12, search, status, payment_status: payStatus });
    const res = await API.get('/orders?' + params.toString());
    const { list, pagination } = res.data;

    const statusBadge = s => s === '待处理' ? 'badge-warning' : s === '处理中' ? 'badge-info' : s === '已完成' ? 'badge-success' : s === '已取消' ? 'badge-default' : 'badge-default';
    const payBadge = p => p === '已付款' ? 'badge-success' : p === '部分付款' ? 'badge-warning' : 'badge-default';

    let rows = '';
    if (list.length === 0) {
      rows = `<tr><td colspan="10"><div class="empty-state"><div class="empty-icon">${Icons.clipboard}</div><p>暂无订单</p></div></td></tr>`;
    } else {
      rows = list.map(o => `
        <tr>
          <td><strong>${escHtml(o.order_number)}</strong></td>
          <td>${escHtml(o.customer_name||'-')}</td>
          <td>¥${Number(o.total_amount).toFixed(2)}</td>
          <td><span class="badge ${statusBadge(o.status)}">${o.status}</span></td>
          <td><span class="badge ${payBadge(o.payment_status)}">${o.payment_status}</span></td>
          <td>${escHtml(o.operator_name||'-')}</td>
          <td>${o.item_count} 项</td>
          <td>${o.sales_date ? new Date(o.sales_date).toLocaleDateString('zh-CN') : '-'}</td>
          <td>
            ${o.status==='待处理'
              ? `<button class="btn btn-sm btn-primary" onclick="viewOrder(${o.id})">审核</button>`
              : `<button class="btn btn-sm btn-outline" onclick="viewOrder(${o.id})">查看</button>`}
            ${(o.status!=='已完成' && o.status!=='已取消')
              ? `<button class="btn btn-sm btn-outline" onclick="editOrder(${o.id})" style="margin-left:4px">编辑</button>`
              : ''}
            ${o.status==='待处理'
              ? `<button class="btn btn-sm btn-outline" style="color:var(--color-danger);margin-left:4px" onclick="deleteOrderConfirm(${o.id},'${escHtml(o.order_number)}')">删除</button>`
              : ''}
            <button class="btn btn-sm btn-outline" style="margin-left:4px;background:#F59E0B;color:#fff;border-color:#F59E0B" onclick="showDeliveryNote(${o.id})">送货单</button>
          </td>
        </tr>`).join('');
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header"><span>销售订单</span><button class="btn btn-primary btn-sm" onclick="createOrder()">+ 创建订单</button></div>
        <div class="toolbar">
          <input type="text" id="ordSearch" placeholder="搜索单号/客户/业务员..." value="${escHtml(search)}" onkeydown="if(event.key==='Enter')loadOrdList(document.getElementById('contentArea'),1,this.value,ordStatus,ordPayStatus)">
          <select id="ordStatusSel" onchange="loadOrdList(document.getElementById('contentArea'),1,ordSearch,this.value,ordPayStatus)">
            <option value="">全部状态</option><option value="待处理" ${status==='待处理'?'selected':''}>待处理</option><option value="处理中" ${status==='处理中'?'selected':''}>处理中</option><option value="已完成" ${status==='已完成'?'selected':''}>已完成</option><option value="已取消" ${status==='已取消'?'selected':''}>已取消</option>
          </select>
          <select onchange="loadOrdList(document.getElementById('contentArea'),1,ordSearch,ordStatus,this.value)">
            <option value="">全部付款</option><option value="未付款" ${payStatus==='未付款'?'selected':''}>未付款</option><option value="已付款" ${payStatus==='已付款'?'selected':''}>已付款</option><option value="部分付款" ${payStatus==='部分付款'?'selected':''}>部分付款</option>
          </select>
          <span class="spacer"></span>
          <span style="font-size:13px;color:var(--color-text-secondary)">共 ${pagination.total} 单</span>
        </div>
        <div class="table-container"><table><thead><tr>
          <th>订单号</th><th>客户</th><th>金额</th><th>状态</th><th>付款</th><th>业务员</th><th>明细</th><th>日期</th><th>操作</th>
        </tr></thead><tbody>${rows}</tbody></table></div>
        ${renderOrdPagination(pagination)}
      </div>`;
  } catch (err) {
    container.innerHTML = `<div class="card"><div class="empty-state"><p>加载失败：${escHtml(err.message)}</p></div></div>`;
  }
}

function renderOrdPagination(p) {
  if (p.totalPages <= 1) return '';
  let btns = '';
  btns += `<button ${p.page===1?'disabled':''} onclick="loadOrdList(document.getElementById('contentArea'),${p.page-1},ordSearch,ordStatus,ordPayStatus)">上一页</button>`;
  for (let i=1;i<=p.totalPages;i++) btns += `<button class="${i===p.page?'active':''}" onclick="loadOrdList(document.getElementById('contentArea'),${i},ordSearch,ordStatus,ordPayStatus)">${i}</button>`;
  btns += `<button ${p.page===p.totalPages?'disabled':''} onclick="loadOrdList(document.getElementById('contentArea'),${p.page+1},ordSearch,ordStatus,ordPayStatus)">下一页</button>`;
  return `<div class="pagination">${btns}<span class="page-info">第 ${p.page}/${p.totalPages} 页</span></div>`;
}

// --- 创建订单向导 ---
async function createOrder() {
  const [custRes] = await Promise.all([API.get('/customers?limit=200')]);
  const customers = custRes.data.list || [];
  const custOpts = '<option value="">请选择</option>' + customers.map(c => `<option value="${c.id}">${escHtml(c.name)}${c.company?' ('+escHtml(c.company)+')':''}</option>`).join('');

  document.getElementById('modalBox').style.width = '860px';
  Modal.open('', `
    <style>
      .so-container { padding: 16px 0; }
      .so-title { text-align:center; font-size:20px; font-weight:700; color:#1E293B; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid #3B82F6 }
      
      .so-row { display:flex; gap:16px; margin-bottom:10px }
      .so-col { flex:1 }
      .so-col-2 { flex:2 }
      .so-col-3 { flex:3 }
      .so-col-4 { flex:4 }
      
      .so-label { display:block; font-size:12px; font-weight:600; color:#475569; margin-bottom:4px; padding-left:2px }
      .so-label.required::after { content:' *'; color:#EF4444 }
      
      .so-input, .so-select { width:100%; height:36px; border:1.5px solid #E2E8F0; border-radius:6px; padding:0 10px; font-size:13px; font-family:inherit; background:#fff; outline:none; transition:all .2s }
      .so-input:focus, .so-select:focus { border-color:#3B82F6; box-shadow:0 0 0 2px rgba(59,130,246,.12) }
      .so-input::placeholder { color:#94A3B8 }
      
      /* 开关样式 */
      .so-switch-group { display:flex; align-items:center; gap:10px }
      .so-switch { position:relative; width:40px; height:22px; cursor:pointer }
      .so-switch input { opacity:0; width:0; height:0 }
      .so-switch-track { position:absolute; top:0; left:0; right:0; bottom:0; background:#CBD5E1; border-radius:11px; transition:all .3s }
      .so-switch-track::before { position:absolute; content:''; height:16px; width:16px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:all .3s; box-shadow:0 1px 3px rgba(0,0,0,.1) }
      .so-switch input:checked + .so-switch-track { background:#10B981 }
      .so-switch input:checked + .so-switch-track::before { transform:translateX(18px) }
      .so-switch-label { font-size:12px; color:#64748B }
      
      /* 单选按钮组 */
      .so-radio-group { display:flex; align-items:center; gap:12px }
      .so-radio { display:flex; align-items:center; gap:4px; cursor:pointer }
      .so-radio input { width:16px; height:16px; accent-color:#3B82F6 }
      .so-radio label { font-size:12px; color:#475569; cursor:pointer }
      
      /* 产品明细表格 */
      .so-table-wrapper { margin-top:6px; border:1.5px solid #94A3B8; border-radius:8px; overflow:hidden }
      .so-table { width:100%; border-collapse:collapse }
      .so-table th { background:#F8FAFC; padding:8px 10px; text-align:left; font-size:11px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:.5px }
      .so-table td { padding:8px 10px; border-top:1.5px solid #CBD5E1; vertical-align:middle }
      .so-table .item-row:hover { background:#F8FAFC }
      
      .so-item-input { width:100%; height:34px; border:1.5px solid #E2E8F0; border-radius:5px; padding:0 8px; font-size:12px; outline:none; transition:all .2s }
      .so-item-input:focus { border-color:#3B82F6 }
      .so-item-select { width:100%; height:34px; border:1.5px solid #E2E8F0; border-radius:5px; padding:0 8px; font-size:12px; outline:none; background:#fff }
      .so-item-select:focus { border-color:#3B82F6 }
      
      .so-delete-btn { width:26px; height:26px; border:none; background:#F1F5F9; border-radius:5px; color:#94A3B8; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all .2s }
      .so-delete-btn:hover { background:#FEE2E2; color:#EF4444 }
      
      .so-add-btn { margin-top:8px; padding:6px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:5px; font-size:12px; font-weight:500; color:#64748B; cursor:pointer; transition:all .2s }
      .so-add-btn:hover { background:#EFF6FF; border-color:#3B82F6; color:#3B82F6 }
      
      /* 合计栏 */
      .so-total-bar { display:flex; justify-content:flex-end; align-items:center; margin-top:8px; padding:10px; background:#F0FDF4; border-radius:6px; border:1px solid #BBF7D0 }
      .so-total-label { font-size:13px; font-weight:500; color:#059669; margin-right:8px }
      .so-total-value { font-size:20px; font-weight:700; color:#059669 }
      
      /* 上传区域 */
      .so-upload-area { border:2px dashed #CBD5E1; border-radius:8px; padding:10px; text-align:center; cursor:pointer; transition:all .2s; background:#FAFBFC; min-height:60px; display:flex; align-items:center; justify-content:center; gap:8px }
      .so-upload-area:hover { border-color:#3B82F6; background:#EFF6FF }
      .so-upload-area svg { width:20px; height:20px; color:#94A3B8; flex-shrink:0 }
      .so-upload-text { font-size:11px; color:#475569; font-weight:500 }
      .so-upload-hint { font-size:10px; color:#94A3B8 }
      
      .so-file-list { margin-top:8px }
      .so-file-item { display:flex; align-items:center; gap:6px; padding:6px 10px; background:#F1F5F9; border-radius:5px; margin-bottom:5px }
      .so-file-name { flex:1; font-size:12px; color:#475569; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
      .so-file-size { font-size:11px; color:#94A3B8 }
      .so-file-remove { color:#EF4444; cursor:pointer; font-size:14px }
      
      /* 备注 */
      .so-textarea { width:100%; min-height:60px; border:1.5px solid #E2E8F0; border-radius:6px; padding:10px 12px; font-size:13px; font-family:inherit; resize:vertical; outline:none; transition:all .2s }
      .so-textarea:focus { border-color:#3B82F6; box-shadow:0 0 0 2px rgba(59,130,246,.12) }
      .so-textarea::placeholder { color:#94A3B8 }
      
      /* 库存红色高亮 */
      .stock-warning { color:#EF4444; font-weight:700 }
    </style>

    <div class="so-container">
      <h1 class="so-title">销售单</h1>

      <!-- 销售日期 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label required">销售日期</label>
          <input type="date" id="ofDate" value="${new Date().toISOString().slice(0,10)}" class="so-input">
        </div>
      </div>

      <!-- 采购单位、电话、经办人 -->
      <div class="so-row">
        <div class="so-col-2">
          <label class="so-label required">采购单位</label>
          <select id="ofCustomer" class="so-select">${custOpts}</select>
        </div>
        <div class="so-col">
          <label class="so-label">电话</label>
          <input type="text" id="ofPhone" class="so-input" placeholder="请输入">
        </div>
        <div class="so-col">
          <label class="so-label">经办人</label>
          <input type="text" id="ofAgent" class="so-input" placeholder="请输入">
        </div>
      </div>

      <!-- 数据录入标题 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 8px;padding-left:2px">数据录入:</div>

      <!-- 产品明细表格 -->
      <div class="so-table-wrapper">
        <table class="so-table">
          <thead>
            <tr>
              <th style="width:28%">型号</th>
              <th style="width:12%">批号</th>
              <th style="width:10%">库存</th>
              <th style="width:10%">单价</th>
              <th style="width:10%">数量</th>
              <th style="width:14%">小计</th>
              <th style="width:6%"></th>
            </tr>
          </thead>
          <tbody id="ofItems">
            <tr class="item-row">
              <td>
                <select class="so-item-select of-prod" onchange="onOfProdChange(this)">
                  <option value="">请选择</option>
                </select>
              </td>
              <td>
                <select class="so-item-select of-inv" disabled>
                  <option value="">先选产品</option>
                </select>
              </td>
              <td><span id="stock_0" class="stock-warning">0</span></td>
              <td><input type="number" class="so-item-input of-price" step="0.01" value="0" oninput="updateOfTotal()" placeholder="0.00"></td>
              <td><input type="number" class="so-item-input of-qty" step="0.1" min="0.1" value="1" oninput="updateOfTotal()" style="text-align:center"></td>
              <td style="font-weight:600;color:#1E293B" class="of-subtotal">¥0.00</td>
              <td><button type="button" class="so-delete-btn" onclick="removeOfItem(this)">&times;</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button type="button" class="so-add-btn" onclick="addOfItem()">+ 添加产品</button>
      
      <div class="so-total-bar">
        <span class="so-total-label">总计:</span>
        <span class="so-total-value" id="ofTotal">¥0.00</span>
      </div>

      <!-- 备注和上传 -->
      <div class="so-row" style="margin-top:14px">
        <div class="so-col-2">
          <label class="so-label">备注</label>
          <textarea id="ofNotes" class="so-textarea" placeholder="请输入内容"></textarea>
        </div>
        <div class="so-col">
          <label class="so-label">上传文件</label>
          <div class="so-upload-area" onclick="document.getElementById('ofDocFile').click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
            <span class="so-upload-text">点击上传文件</span>
            <span class="so-upload-hint">支持 PDF、Word、图片</span>
          </div>
          <input type="file" id="ofDocFile" style="display:none" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" multiple onchange="ofAddFiles('doc', this)">
          <div class="so-file-list" id="ofDocList"></div>
        </div>
      </div>

      <!-- 选项区域 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 10px;padding-left:2px">订单选项:</div>

      <!-- 第一行开关 -->
      <div class="so-row">
        <div class="so-switch-group">
          <span class="so-switch-label">托盘:</span>
          <label class="so-radio"><input type="radio" name="tray" value="无" checked><label>无</label></label>
          <label class="so-radio"><input type="radio" name="tray" value="单层"><label>单面</label></label>
          <label class="so-radio"><input type="radio" name="tray" value="双层"><label>双面</label></label>
        </div>
        <div class="so-col"></div>
        <div class="so-switch-group">
          <span class="so-switch-label">防水:</span>
          <label class="so-switch"><input type="checkbox" id="ofWater"><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">COC:</span>
          <label class="so-switch"><input type="checkbox" id="ofCoc"><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">送货单:</span>
          <label class="so-switch"><input type="checkbox" id="ofDel"><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">回单:</span>
          <label class="so-switch"><input type="checkbox" id="ofRet"><span class="so-switch-track"></span></label>
        </div>
      </div>

      <!-- 第二行开关 -->
      <div class="so-row">
        <div class="so-switch-group">
          <span class="so-switch-label">抽检:</span>
          <label class="so-switch"><input type="checkbox" id="ofInsp" onchange="document.getElementById('ofShipSection').style.display=this.checked?'block':'none'"><span class="so-switch-track"></span></label>
        </div>
        <div class="so-col" id="ofShipSection" style="display:none">
          <label class="so-upload-area" style="cursor:pointer;display:block" onclick="document.getElementById('ofShipFile').click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span class="so-upload-text">上传抽检图片</span>
          </label>
          <input type="file" id="ofShipFile" style="display:none" accept="image/*" multiple onchange="ofAddFiles('ship', this)">
          <div class="so-file-list" id="ofShipList"></div>
        </div>
      </div>

      <!-- 财务信息 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 10px;padding-left:2px">财务信息:</div>

      <!-- 发票税率和付款条件 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label">发票:</label>
          <div class="so-radio-group">
            <label class="so-radio"><input type="radio" name="invoice" value="无" checked><label>无</label></label>
            <label class="so-radio"><input type="radio" name="invoice" value="1%"><label>1%</label></label>
            <label class="so-radio"><input type="radio" name="invoice" value="13%"><label>13%</label></label>
          </div>
        </div>
        <div class="so-col">
          <label class="so-label">付款:</label>
          <div class="so-radio-group">
            <label class="so-radio"><input type="radio" name="payment" value="已付"><label>已付</label></label>
            <label class="so-radio"><input type="radio" name="payment" value="月结30天" checked><label>缓付30天</label></label>
            <label class="so-radio"><input type="radio" name="payment" value="月结90天"><label>缓90天</label></label>
            <label class="so-radio"><input type="radio" name="payment" value="手动"><label>手动</label></label>
          </div>
        </div>
        <div class="so-col">
          <label class="so-label">快递:</label>
          <select id="ofExpress" class="so-select">
            <option value="顺丰">顺丰</option>
            <option value="中通">中通</option>
            <option value="圆通">圆通</option>
            <option value="申通">申通</option>
            <option value="韵达">韵达</option>
            <option value="EMS">EMS</option>
          </select>
        </div>
      </div>

      <!-- 付款方式 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label">付款方式</label>
          <input type="text" id="ofPayMethod" class="so-input" placeholder="如：转账 / 现金 / 支票">
        </div>
      </div>
    </div>
  `, `
    <button class="btn btn-outline" onclick="Modal.close();window._ofPendingFiles=null">清理表单</button>
    <button class="btn btn-primary btn-lg" onclick="execCreateOrder()">提交销售单</button>
  `);

  // 初始化待上传文件列表
  window._ofPendingFiles = { doc: [], ship: [] };

  // 异步加载产品列表
  try {
    const prodRes = await API.get('/products?limit=200&status=');
    window._ofProds = prodRes.data.list;
    const prodOpts = '<option value="">选产品</option>' + prodRes.data.list.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('');
    document.querySelectorAll('.of-prod').forEach(s => { s.innerHTML = prodOpts; });
  } catch (_) {}
}

// 附件选择处理
function ofAddFiles(type, input) {
  const listEl = document.getElementById(type === 'doc' ? 'ofDocList' : 'ofShipList');
  const files = Array.from(input.files);
  if (!window._ofPendingFiles) window._ofPendingFiles = { doc: [], ship: [] };
  window._ofPendingFiles[type].push(...files);

  listEl.innerHTML = window._ofPendingFiles[type].map((f, i) => `
    <div class="so-file-item">
      <span class="so-file-name">${escHtml(f.name)}</span>
      <span class="so-file-size">${(f.size/1024).toFixed(1)}KB</span>
      <span class="so-file-remove" onclick="ofRemoveFile('${type}',${i})">&times;</span>
    </div>`).join('');
  input.value = '';
}

function ofRemoveFile(type, index) {
  window._ofPendingFiles[type].splice(index, 1);
  const listEl = document.getElementById(type === 'doc' ? 'ofDocList' : 'ofShipList');
  listEl.innerHTML = window._ofPendingFiles[type].map((f, i) => `
    <div class="so-file-item">
      <span class="so-file-name">${escHtml(f.name)}</span>
      <span class="so-file-size">${(f.size/1024).toFixed(1)}KB</span>
      <span class="so-file-remove" onclick="ofRemoveFile('${type}',${i})">&times;</span>
    </div>`).join('');
}

function addOfItem() {
  const container = document.getElementById('ofItems');
  const rows = container.querySelectorAll('.item-row');
  const newIndex = rows.length;
  
  // 使用 insertRow 避免 innerHTML 导致表格重新解析
  const newRow = container.insertRow();
  newRow.className = 'item-row';
  
  const prodOpts = window._ofProds ? 
    '<option value="">选产品</option>' + window._ofProds.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('') : 
    '<option value="">选产品</option>';
  
  newRow.innerHTML = `
    <td>
      <select class="so-item-select of-prod" onchange="onOfProdChange(this)">${prodOpts}</select>
    </td>
    <td>
      <select class="so-item-select of-inv" disabled>
        <option value="">先选产品</option>
      </select>
    </td>
    <td><span id="stock_${newIndex}" class="stock-warning">0</span></td>
    <td><input type="number" class="so-item-input of-price" step="0.01" value="0" oninput="updateOfTotal()" placeholder="0.00"></td>
    <td><input type="number" class="so-item-input of-qty" step="0.1" min="0.1" value="1" oninput="updateOfTotal()" style="text-align:center"></td>
    <td style="font-weight:600;color:#1E293B" class="of-subtotal">¥0.00</td>
    <td><button type="button" class="so-delete-btn" onclick="removeOfItem(this)">&times;</button></td>
  `;
}

function removeOfItem(btn) {
  const row = btn.closest('.item-row');
  const container = document.getElementById('ofItems');
  const rows = container.querySelectorAll('.item-row');
  
  if (rows.length > 1) {
    row.remove();
    updateOfTotal();
  } else {
    Toast.warning('至少保留一条产品明细');
  }
}

let _invCache = {};
async function onOfProdChange(sel) {
  const prodId = sel.value;
  const row = sel.closest('.item-row');
  const invSel = row.querySelector('.of-inv');
  const stockSpan = row.querySelector('[id^="stock_"]');
  
  if (!prodId) {
    invSel.innerHTML = '<option value="">先选产品</option>';
    invSel.disabled = true;
    stockSpan.textContent = '0';
    return;
  }

  try {
    if (!_invCache[prodId]) {
      const res = await API.get('/inventory/batch-numbers/' + prodId);
      _invCache[prodId] = res.data;
    }
    const invs = _invCache[prodId];
    invSel.innerHTML = '<option value="">选批次</option>' + invs.map(i => `<option value="${i.id}" data-qty="${i.quantity}">${i.batch_number}</option>`).join('');
    invSel.disabled = false;
    
    const updateStock = () => {
      const selected = invSel.options[invSel.selectedIndex];
      const qty = selected ? selected.getAttribute('data-qty') : '0';
      stockSpan.textContent = qty;
    };
    invSel.onchange = updateStock;
  } catch (_) { 
    invSel.innerHTML = '<option value="">加载失败</option>'; 
    invSel.disabled = true;
  }
}

function updateOfTotal() {
  let total = 0;
  document.querySelectorAll('.item-row').forEach(el => {
    const qty = parseFloat(el.querySelector('.of-qty').value) || 0;
    const price = parseFloat(el.querySelector('.of-price').value) || 0;
    const sub = qty * price;
    el.querySelector('.of-subtotal').textContent = '¥' + sub.toFixed(2);
    total += sub;
  });
  const totalEl = document.getElementById('ofTotal');
  if (totalEl) totalEl.textContent = '¥' + total.toFixed(2);
}

async function execCreateOrder() {
  try {
    const items = [];
    const rows = document.querySelectorAll('.item-row');
    for (let idx = 0; idx < rows.length; idx++) {
      const el = rows[idx];
      const prodId = parseInt(el.querySelector('.of-prod').value);
      const invSel = el.querySelector('.of-inv');
      const qty = parseFloat(el.querySelector('.of-qty').value);
      const price = parseFloat(el.querySelector('.of-price').value);
      
      if (!prodId) {
        Toast.warning(`第 ${idx + 1} 条产品明细：请选择产品`);
        return;
      }
      if (invSel.disabled || !invSel.value) {
        Toast.warning(`第 ${idx + 1} 条产品明细：请选择批号`);
        return;
      }
      const invId = parseInt(invSel.value);
      if (!qty || qty < 0.1) {
        Toast.warning(`第 ${idx + 1} 条产品明细：数量（≥0.1）为必填项`);
        return;
      }
      if (price < 0) {
        Toast.warning(`第 ${idx + 1} 条产品明细：单价不能为负数`);
        return;
      }
      items.push({ product_id: prodId, inventory_id: invId, quantity: qty, unit_price: price });
    }

    if (items.length === 0) { Toast.warning('请至少添加一条产品明细'); return; }

    const customerId = parseInt(document.getElementById('ofCustomer').value);
    if (!customerId) { Toast.warning('请选择客户'); return; }

    const trayType = document.querySelector('input[name="tray"]:checked').value;
    const invoiceRate = document.querySelector('input[name="invoice"]:checked').value;
    const paymentTerms = document.querySelector('input[name="payment"]:checked').value;

    const body = {
      customer_id: customerId,
      sales_date: document.getElementById('ofDate').value,
      agent_name: document.getElementById('ofAgent').value.trim(),
      contact_phone: document.getElementById('ofPhone').value.trim(),
      express_company: document.getElementById('ofExpress').value.trim(),
      payment_method: document.getElementById('ofPayMethod').value.trim(),
      payment_terms: paymentTerms,
      tray_type: trayType,
      waterproof: document.getElementById('ofWater').checked ? '是' : '否',
      coc: document.getElementById('ofCoc').checked ? '是' : '否',
      delivery_note: document.getElementById('ofDel').checked ? '是' : '否',
      return_note: document.getElementById('ofRet').checked ? '是' : '否',
      inspection: document.getElementById('ofInsp').checked ? '是' : '否',
      invoice_rate: invoiceRate,
      notes: document.getElementById('ofNotes').value,
      items,
    };

    const res = await API.post('/orders', body);
    const orderId = res.data.id;
    Toast.success('订单创建成功');

    const pending = window._ofPendingFiles;
    if (pending && (pending.doc.length > 0 || pending.ship.length > 0)) {
      const token = Auth.getToken();
      for (const f of pending.doc) {
        const fd = new FormData(); fd.append('file', f);
        await fetch('/api/orders/' + orderId + '/files/document', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: fd });
      }
      for (const f of pending.ship) {
        const fd = new FormData(); fd.append('file', f);
        await fetch('/api/orders/' + orderId + '/files/shipment', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: fd });
      }
    }

    Modal.close();
    loadOrdList(document.getElementById('contentArea'), ordPage, ordSearch, ordStatus, ordPayStatus);
  } catch (err) { Toast.error(err.message); }
}

// --- 查看订单 ---
async function viewOrder(id) {
  const res = await API.get('/orders/' + id);
  const o = res.data;
  document.getElementById('modalBox').style.width = '860px';

  const itemsHtml = o.items.map(i => `
    <tr><td>${escHtml(i.product_model)}</td><td>${i.batch_number||'-'}</td><td>${i.quantity}</td><td>¥${Number(i.unit_price).toFixed(2)}</td><td>¥${Number(i.subtotal).toFixed(2)}</td><td>${i.bin_number ? escHtml(i.bin_number)+(i.bin_location?'('+escHtml(i.bin_location)+')':'') : '-'}</td></tr>
  `).join('');

  const docFiles = (o.files||[]).filter(f => f.file_type==='合同资质');
  const shipFiles = (o.files||[]).filter(f => f.file_type==='发货图片');
  const fileSection = (files, title) => files.length > 0 ? `
    <div style="margin-bottom:8px"><strong style="font-size:12px;color:#475569">${title} (${files.length})</strong></div>
    ${files.map(f => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#F8FAFC;border-radius:6px;margin-bottom:3px;font-size:13px">
        <span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><a href="${f.file_path}" target="_blank">${escHtml(f.file_name)}</a></span>
        <span style="color:#94A3B8;flex-shrink:0">${(f.file_size/1024).toFixed(1)}KB</span>
        <button onclick="deleteOrderFile(${o.id},${f.id})" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:14px;padding:2px 6px;flex-shrink:0">&times;</button>
      </div>`).join('')}` : `<p style="font-size:13px;color:#94A3B8">暂无${title}</p>`;

  const canTransition = { '待处理': ['处理中', '已取消'], '处理中': ['已完成', '已取消'] };
  const btns = (canTransition[o.status] || []).map(s => {
    const cls = s === '已取消' ? 'btn-danger' : 'btn-primary';
    return `<button class="btn btn-sm ${cls}" onclick="changeOrderStatus(${o.id},'${s}')">→ ${s}</button>`;
  }).join(' ');

  const badge = (v, map) => { for(const [k,cls] of Object.entries(map)) if(v===k) return cls; return 'badge-default'; };

  Modal.open('订单详情 — ' + o.order_number, `
    <div class="of-section"><div class="of-section-title">基本信息</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;font-size:13px">
        <div><span style="color:#64748B">客户：</span><strong>${escHtml(o.customer_name)}</strong></div>
        <div><span style="color:#64748B">订单号：</span><strong>${escHtml(o.order_number)}</strong></div>
        <div><span style="color:#64748B">日期：</span>${(o.sales_date||'').slice(0,10)||'-'}</div>
        <div><span style="color:#64748B">业务员：</span>${escHtml(o.agent_name||'-')}</div>
        <div><span style="color:#64748B">电话：</span>${escHtml(o.contact_phone||'-')}</div>
        <div><span style="color:#64748B">状态：</span><span class="badge ${badge(o.status,{'已完成':'badge-success','处理中':'badge-info','待处理':'badge-warning','已取消':'badge-default'})}">${o.status}</span></div>
        <div style="grid-column:1/-1"><span style="color:#64748B">合计：</span><strong style="font-size:18px;color:#3B82F6">¥${Number(o.total_amount).toFixed(2)}</strong></div>
      </div>
    </div>

    <div class="of-section"><div class="of-section-title">产品明细</div>
      <div class="table-container"><table style="width:100%">
        <thead><tr><th style="width:35%">型号</th><th style="width:15%">批号</th><th style="width:12%">数量</th><th style="width:12%">单价</th><th style="width:16%">小计</th><th style="width:10%">箱号</th></tr></thead>
        <tbody>${itemsHtml}</tbody></table></div>
    </div>

    <div class="of-section"><div class="of-section-title">订单选项</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:13px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid #E2E8F0;border-radius:6px;padding:8px 12px"><span style="color:#64748B">托盘</span><strong style="color:${(o.tray_type||'无')==='无'?'#94A3B8':'#3B82F6'}">${o.tray_type||'无'}</strong></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid ${o.waterproof==='是'?'#10B981':'#E2E8F0'};border-radius:6px;padding:8px 12px;background:${o.waterproof==='是'?'#F0FDF4':'#fff'}"><span style="color:#64748B">防水</span><strong style="color:${o.waterproof==='是'?'#059669':'#94A3B8'}">${o.waterproof||'否'}</strong></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid ${o.coc==='是'?'#10B981':'#E2E8F0'};border-radius:6px;padding:8px 12px;background:${o.coc==='是'?'#F0FDF4':'#fff'}"><span style="color:#64748B">COC</span><strong style="color:${o.coc==='是'?'#059669':'#94A3B8'}">${o.coc||'否'}</strong></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid ${o.delivery_note==='是'?'#10B981':'#E2E8F0'};border-radius:6px;padding:8px 12px;background:${o.delivery_note==='是'?'#F0FDF4':'#fff'}"><span style="color:#64748B">送货单</span><strong style="color:${o.delivery_note==='是'?'#059669':'#94A3B8'}">${o.delivery_note||'否'}</strong></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid ${o.return_note==='是'?'#10B981':'#E2E8F0'};border-radius:6px;padding:8px 12px;background:${o.return_note==='是'?'#F0FDF4':'#fff'}"><span style="color:#64748B">退货单</span><strong style="color:${o.return_note==='是'?'#059669':'#94A3B8'}">${o.return_note||'否'}</strong></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;border:1.5px solid ${o.inspection==='是'?'#10B981':'#E2E8F0'};border-radius:6px;padding:8px 12px;background:${o.inspection==='是'?'#F0FDF4':'#fff'}"><span style="color:#64748B">验货</span><strong style="color:${o.inspection==='是'?'#059669':'#94A3B8'}">${o.inspection||'否'}</strong></div>
      </div>
    </div>

    <div class="of-section"><div class="of-section-title">财务信息</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;font-size:13px">
        <div style="border:1.5px solid #E2E8F0;border-radius:6px;padding:10px 14px"><span style="color:#64748B;display:block;font-size:11px;margin-bottom:2px">发票税率</span><strong>${o.invoice_rate||'无'}</strong></div>
        <div style="border:1.5px solid #E2E8F0;border-radius:6px;padding:10px 14px"><span style="color:#64748B;display:block;font-size:11px;margin-bottom:2px">付款条件</span><strong>${o.payment_terms||'已付'}</strong><span style="font-size:11px;color:#94A3B8;margin-left:6px">${escHtml(o.payment_term_manual||'')}</span></div>
        <div style="border:1.5px solid #E2E8F0;border-radius:6px;padding:10px 14px"><span style="color:#64748B;display:block;font-size:11px;margin-bottom:2px">付款方式</span><strong>${escHtml(o.payment_method||'-')}</strong></div>
      </div>
      <div style="margin-top:8px;font-size:13px;text-align:right">
        付款状态：<span class="badge ${badge(o.payment_status,{'已付款':'badge-success','部分付款':'badge-warning','未付款':'badge-default'})}">${o.payment_status}</span>
      </div>
    </div>

    <div class="of-section"><div class="of-section-title">附件</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div>
          <div style="font-size:12px;font-weight:600;color:#475569;margin-bottom:8px">合同 / 资质 (${docFiles.length})</div>
          ${docFiles.length > 0 ? docFiles.map(f => `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;margin-bottom:4px;font-size:13px">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <a href="${f.file_path}" target="_blank" download style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#3B82F6;text-decoration:none">${escHtml(f.file_name)}</a>
              <span style="color:#94A3B8;flex-shrink:0;font-size:11px">${(f.file_size/1024).toFixed(1)}KB</span>
              <button onclick="deleteOrderFile(${o.id},${f.id})" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:14px;padding:2px 6px;flex-shrink:0" title="删除">&times;</button>
            </div>`).join('') : `<p style="font-size:13px;color:#94A3B8;padding:12px;background:#F8FAFC;border-radius:6px;text-align:center">暂无文件</p>`}
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:#475569;margin-bottom:8px">发货图片 (${shipFiles.length})</div>
          ${shipFiles.length > 0 ? shipFiles.map(f => `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;margin-bottom:4px;font-size:13px">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94A3B8" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <a href="${f.file_path}" target="_blank" style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#3B82F6;text-decoration:none">${escHtml(f.file_name)}</a>
              <span style="color:#94A3B8;flex-shrink:0;font-size:11px">${(f.file_size/1024).toFixed(1)}KB</span>
              <button onclick="deleteOrderFile(${o.id},${f.id})" style="background:none;border:none;color:#EF4444;cursor:pointer;font-size:14px;padding:2px 6px;flex-shrink:0" title="删除">&times;</button>
            </div>`).join('') : `<p style="font-size:13px;color:#94A3B8;padding:12px;background:#F8FAFC;border-radius:6px;text-align:center">暂无图片</p>`}
        </div>
      </div>
    </div>

    ${o.notes || o.express_company ? `<div class="of-section"><div class="of-section-title">备注 / 快递</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:12px 16px;background:#F8FAFC;border-radius:6px;font-size:13px">
        <div><span style="color:#64748B">备注：</span><span style="white-space:pre-wrap">${escHtml(o.notes||'无')}</span></div>
        <div><span style="color:#64748B">快递：</span><strong>${escHtml(o.express_company||'未指定')}</strong></div>
      </div></div>` : ''}
  `, `
    ${btns}
    <button class="btn btn-sm btn-outline" onclick="uploadOrderFile(${o.id})">上传文件</button>
    <button class="btn btn-outline" onclick="Modal.close()">关闭</button>
  `);
}

// --- 送货单弹窗 ---
async function showDeliveryNote(id) {
  const res = await API.get('/orders/' + id);
  const o = res.data;
  const today = new Date().toLocaleDateString('zh-CN');
  
  const itemsHtml = o.items.map((item, index) => `
    <tr>
      <td style="text-align:center;border-bottom:1px solid #E2E8F0;padding:8px 4px">${index + 1}</td>
      <td style="border-bottom:1px solid #E2E8F0;padding:8px 8px">${escHtml(item.product_model)}</td>
      <td style="text-align:center;border-bottom:1px solid #E2E8F0;padding:8px 4px">品牌</td>
      <td style="text-align:center;border-bottom:1px solid #E2E8F0;padding:8px 4px">${escHtml(item.batch_number||'-')}</td>
      <td style="text-align:center;border-bottom:1px solid #E2E8F0;padding:8px 4px">${item.quantity}</td>
    </tr>
  `).join('');

  document.getElementById('modalBox').style.width = '720px';
  document.getElementById('modalBox').style.maxHeight = '90vh';
  document.getElementById('modalBox').style.overflowY = 'auto';

  Modal.open('', `
    <style>
      .dn-container { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        padding: 24px;
        background: #fff;
      }
      .dn-title {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 20px;
        padding-bottom: 12px;
        border-bottom: 2px solid #3B82F6;
      }
      .dn-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
        padding: 12px 16px;
        background: #F8FAFC;
        border-radius: 8px;
      }
      .dn-header-item {
        font-size: 14px;
      }
      .dn-header-label {
        color: #64748B;
        margin-right: 8px;
      }
      .dn-header-value {
        font-weight: 600;
        color: #DC2626;
      }
      .dn-table-wrapper {
        margin: 16px 0;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        overflow: hidden;
      }
      .dn-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 13px;
      }
      .dn-table th {
        background: #F1F5F9;
        padding: 10px 8px;
        text-align: center;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #E2E8F0;
      }
      .dn-table td {
        padding: 10px 8px;
      }
      .dn-remarks {
        margin: 16px 0;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        overflow: hidden;
      }
      .dn-remarks-title {
        background: #F1F5F9;
        padding: 8px 12px;
        font-size: 13px;
        font-weight: 600;
        color: #475569;
        border-bottom: 1px solid #E2E8F0;
      }
      .dn-remarks-textarea {
        width: 100%;
        min-height: 80px;
        padding: 12px;
        border: none;
        resize: none;
        font-size: 13px;
        font-family: inherit;
        box-sizing: border-box;
      }
      .dn-remarks-textarea:focus {
        outline: none;
      }
      .dn-certification {
        margin: 16px 0;
        padding: 16px;
        background: #F8FAFC;
        border-radius: 8px;
      }
      .dn-certification-title {
        font-size: 13px;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 12px;
      }
      .dn-certification-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 13px;
      }
      .dn-certification-left, .dn-certification-right {
        flex: 1;
      }
      .dn-certification-right {
        text-align: right;
      }
      .dn-certification-label {
        color: #64748B;
        margin-right: 8px;
      }
      .dn-certification-value {
        font-weight: 500;
        color: #1E293B;
      }
      .dn-certification-input {
        border: 1px solid #E2E8F0;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 13px;
        font-family: inherit;
        width: 180px;
      }
      .dn-certification-input:focus {
        outline: none;
        border-color: #3B82F6;
      }
      .dn-footer-text {
        margin: 16px 0;
        padding: 12px 16px;
        background: #FEF3C7;
        border-radius: 8px;
        font-size: 13px;
        color: #92400E;
        text-align: center;
      }
      .dn-btn-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid #E2E8F0;
      }
      .dn-btn {
        padding: 10px 32px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .dn-btn-print {
        background: #DC2626;
        color: #fff;
      }
      .dn-btn-print:hover {
        background: #B91C1C;
      }
      .dn-btn-export {
        background: #3B82F6;
        color: #fff;
      }
      .dn-btn-export:hover {
        background: #2563EB;
      }
      .dn-btn-close {
        background: #94A3B8;
        color: #fff;
      }
      .dn-btn-close:hover {
        background: #64748B;
      }
      @media print {
        .dn-btn-container {
          display: none;
        }
        body * {
          visibility: hidden;
        }
        .dn-container, .dn-container * {
          visibility: visible;
        }
        .dn-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          box-shadow: none;
        }
      }
    </style>
    <div class="dn-container" id="deliveryNoteContent">
      <div class="dn-title">送货单</div>
      
      <div class="dn-header">
        <div class="dn-header-item">
          <span class="dn-header-label">收货单位：</span>
          <span class="dn-header-value">${escHtml(o.customer_name)}</span>
        </div>
        <div class="dn-header-item">
          <span class="dn-header-label">订单日期：</span>
          <span class="dn-header-value">${(o.sales_date||'').slice(0,10)||today}</span>
        </div>
      </div>

      <div class="dn-table-wrapper">
        <table class="dn-table">
          <thead>
            <tr>
              <th style="width:8%">序号</th>
              <th style="width:42%">型号</th>
              <th style="width:15%">品牌</th>
              <th style="width:18%">批号</th>
              <th style="width:17%">数量</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <div class="dn-remarks">
        <div class="dn-remarks-title">备注：</div>
        <textarea class="dn-remarks-textarea" id="dnRemarks" placeholder="请输入内容"></textarea>
      </div>

      <div class="dn-footer-text">
        以上材料外包装完整，且材料数量无误、外观无损坏。
      </div>

      <div class="dn-certification">
        <div class="dn-certification-title">双方签字盖章</div>
        <div class="dn-certification-row">
          <div class="dn-certification-left">
            <span class="dn-certification-label">发货单位及经手人（盖章）：</span>
            <span class="dn-certification-value">管理员</span>
          </div>
          <div class="dn-certification-right">
            <span class="dn-certification-label">收货单位及经手人（盖章）：</span>
            <span class="dn-certification-value">${escHtml(o.customer_name)}</span>
          </div>
        </div>
        <div class="dn-certification-row">
          <div class="dn-certification-left">
            <span class="dn-certification-label">发货日期：</span>
            <span class="dn-certification-value">${today}</span>
          </div>
          <div class="dn-certification-right">
            <span class="dn-certification-label">收货日期：</span>
            <input type="date" class="dn-certification-input" id="dnReceiveDate">
          </div>
        </div>
      </div>

      <div class="dn-btn-container">
        <button class="dn-btn dn-btn-print" onclick="printDeliveryNote()">打印送货单</button>
        <button class="dn-btn dn-btn-export" onclick="exportDeliveryExcel(${o.id})">导出详单</button>
        <button class="dn-btn dn-btn-close" onclick="Modal.close()">关闭窗口</button>
      </div>
    </div>
  `, '');
}

// --- 打印送货单（生成PDF下载）---
async function printDeliveryNote() {
  const content = document.getElementById('deliveryNoteContent');
  
  const pdfContent = content.cloneNode(true);
  const btnContainer = pdfContent.querySelector('.dn-btn-container');
  if (btnContainer) {
    btnContainer.remove();
  }

  const tempContainer = document.createElement('div');
  tempContainer.style.cssText = `
    position: fixed;
    left: -10000px;
    top: -10000px;
    width: 595px;
    padding: 24px;
    background: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  `;
  tempContainer.innerHTML = `
    <style>
      .dn-title {
        text-align: center;
        font-size: 22px;
        font-weight: 700;
        color: #1E293B;
        margin-bottom: 18px;
        padding-bottom: 10px;
        border-bottom: 2px solid #3B82F6;
      }
      .dn-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 14px;
        padding: 10px 14px;
        background: #F8FAFC;
        border-radius: 6px;
      }
      .dn-header-item {
        font-size: 13px;
      }
      .dn-header-label {
        color: #64748B;
        margin-right: 6px;
      }
      .dn-header-value {
        font-weight: 600;
        color: #DC2626;
      }
      .dn-table-wrapper {
        margin: 14px 0;
        border: 1px solid #E2E8F0;
        border-radius: 6px;
        overflow: hidden;
      }
      .dn-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
      }
      .dn-table th {
        background: #F1F5F9;
        padding: 8px 6px;
        text-align: center;
        font-weight: 600;
        color: #475569;
        border-bottom: 2px solid #E2E8F0;
      }
      .dn-table td {
        padding: 8px 6px;
        border-bottom: 1px solid #E2E8F0;
        text-align: center;
      }
      .dn-table td:first-child + td {
        text-align: left;
      }
      .dn-remarks {
        margin: 14px 0;
        border: 1px solid #E2E8F0;
        border-radius: 6px;
        min-height: 60px;
        padding: 10px;
      }
      .dn-remarks-title {
        font-weight: 600;
        color: #475569;
        margin-bottom: 6px;
      }
      .dn-footer-text {
        margin: 14px 0;
        padding: 10px 14px;
        background: #FEF3C7;
        border-radius: 6px;
        font-size: 12px;
        color: #92400E;
        text-align: center;
      }
      .dn-certification {
        margin: 14px 0;
        padding: 14px;
        background: #F8FAFC;
        border-radius: 6px;
      }
      .dn-certification-title {
        font-size: 12px;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 10px;
      }
      .dn-certification-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        font-size: 12px;
      }
      .dn-certification-left, .dn-certification-right {
        flex: 1;
      }
      .dn-certification-right {
        text-align: right;
      }
      .dn-certification-label {
        color: #64748B;
        margin-right: 6px;
      }
      .dn-certification-value {
        font-weight: 500;
        color: #1E293B;
      }
      .dn-certification-input {
        border: 1px solid #E2E8F0;
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 12px;
        font-family: inherit;
        width: 150px;
      }
    </style>
  `;
  tempContainer.appendChild(pdfContent);
  document.body.appendChild(tempContainer);

  try {
    const canvas = await html2canvas(tempContainer, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#FFFFFF'
    });

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

    const orderNumber = content.querySelector('.dn-header-value')?.textContent || '送货单';
    const today = new Date().toLocaleDateString('zh-CN').replace(/\//g, '-');
    pdf.save(`送货单_${orderNumber}_${today}.pdf`);
  } catch (error) {
    console.error('生成PDF失败:', error);
    alert('生成PDF失败，请重试');
  } finally {
    document.body.removeChild(tempContainer);
  }
}

// --- 导出送货单Excel ---
function exportDeliveryExcel(orderId) {
  API.get('/orders/' + orderId).then(res => {
    const o = res.data;
    const today = new Date().toLocaleDateString('zh-CN');
    
    let csvContent = '\uFEFF';
    csvContent += '送货单\n\n';
    csvContent += `收货单位,${o.customer_name}\n`;
    csvContent += `订单日期,${(o.sales_date||'').slice(0,10)||today}\n`;
    csvContent += '\n';
    csvContent += '序号,型号,品牌,批号,数量\n';
    
    o.items.forEach((item, index) => {
      csvContent += `${index + 1},${escHtml(item.product_model)},品牌,${escHtml(item.batch_number||'-')},${item.quantity}\n`;
    });
    
    csvContent += '\n';
    csvContent += `备注,${document.getElementById('dnRemarks')?.value || ''}\n`;
    csvContent += '\n';
    csvContent += '发货单位及经手人,管理员\n';
    csvContent += `发货日期,${today}\n`;
    csvContent += `收货单位及经手人,${o.customer_name}\n`;
    csvContent += `收货日期,${document.getElementById('dnReceiveDate')?.value || ''}\n`;
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `送货单_${o.order_number}_${today}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(err => {
    Toast.error('导出失败：' + err.message);
  });
}

// 删除订单文件
async function deleteOrderFile(orderId, fileId) {
  if (!confirm('确认删除该文件？')) return;
  try { await API.delete('/orders/' + orderId + '/files/' + fileId); Toast.success('文件已删除'); viewOrder(orderId); }
  catch (err) { Toast.error(err.message); }
}

// 编辑订单
async function editOrder(id) {
  const [ordRes, custRes, prodRes] = await Promise.all([
    API.get('/orders/' + id),
    API.get('/customers?limit=200'),
    API.get('/products?limit=200&status='),
  ]);
  const o = ordRes.data;
  const customers = custRes.data.list || [];
  const products = prodRes.data.list || [];
  window._efProds = products;
  
  const custOpts = '<option value="">请选择</option>' + customers.map(c => `<option value="${c.id}" ${c.id===o.customer_id?'selected':''}>${escHtml(c.name)}${c.company?' ('+escHtml(c.company)+')':''}</option>`).join('');

  // 为每个产品预加载其批号列表
  const batchMap = {};
  const invIds = (o.items || []).map(i => i.inventory_id).filter(x => x);
  try {
    for (const item of (o.items || [])) {
      if (item.product_id && !batchMap[item.product_id]) {
        const bRes = await API.get('/inventory/batch-numbers/' + item.product_id);
        batchMap[item.product_id] = bRes.data || [];
      }
    }
  } catch (_) {}

  // 构建产品明细行
  const items = o.items || [];
  let itemRows = items.map((item, idx) => {
    const prodOpts = '<option value="">选产品</option>' + products.map(p => `<option value="${p.id}" ${p.id===item.product_id?'selected':''}>${escHtml(p.model)}</option>`).join('');
    const batches = batchMap[item.product_id] || [];
    const currentInvId = item.inventory_id || '';
    const batchOpts = '<option value="">选批次</option>' + batches.map(b => `<option value="${b.id}" ${b.id===currentInvId?'selected':''} data-qty="${b.quantity}">${escHtml(b.batch_number)}</option>`).join('');
    const totalStock = batches.reduce((s, b) => s + parseFloat(b.quantity || 0), 0);
    const initialStock = currentInvId ? (batches.find(b => b.id === currentInvId)?.quantity || totalStock) : totalStock;
    return `
    <tr class="item-row">
      <td>
        <select class="so-item-select ef-prod" data-index="${idx}" onchange="onEfProdChange(this, ${idx})">
          ${prodOpts}
        </select>
      </td>
      <td>
        <select class="so-item-select ef-batch" data-index="${idx}">${batchOpts}</select>
      </td>
      <td><span id="efStock_${idx}" class="stock-warning">${parseFloat(initialStock).toFixed(1)}</span></td>
      <td><input type="number" class="so-item-input ef-price" step="0.01" value="${item.unit_price||0}" oninput="updateEfTotal()" placeholder="0.00"></td>
      <td><input type="number" class="so-item-input ef-qty" step="0.1" min="0.1" value="${item.quantity||1}" oninput="updateEfTotal()" style="text-align:center"></td>
      <td style="font-weight:600;color:#1E293B" class="ef-subtotal">¥${(parseFloat(item.subtotal)||0).toFixed(2)}</td>
      <td><button type="button" class="so-delete-btn" onclick="removeEfItem(this)">×</button></td>
    </tr>`;
  }).join('');

  if (!itemRows) {
    const prodOpts = '<option value="">选产品</option>' + products.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('');
    itemRows = `<tr class="item-row">
      <td>
        <select class="so-item-select ef-prod" data-index="0" onchange="onEfProdChange(this, 0)">
          ${prodOpts}
        </select>
      </td>
      <td>
        <select class="so-item-select ef-batch" data-index="0"><option value="">先选产品</option></select>
      </td>
      <td><span id="efStock_0" class="stock-warning">0</span></td>
      <td><input type="number" class="so-item-input ef-price" step="0.01" value="0" oninput="updateEfTotal()" placeholder="0.00"></td>
      <td><input type="number" class="so-item-input ef-qty" step="0.1" min="0.1" value="1" oninput="updateEfTotal()" style="text-align:center"></td>
      <td style="font-weight:600;color:#1E293B" class="ef-subtotal">¥0.00</td>
      <td><button type="button" class="so-delete-btn" onclick="removeEfItem(this)">×</button></td>
    </tr>`;
  }

  document.getElementById('modalBox').style.width = '860px';
  Modal.open('', `
    <style>
      .so-container { padding: 8px 0; }
      .so-title { text-align:center; font-size:18px; font-weight:700; color:#1E293B; margin:6px 0 10px; padding-bottom:8px; border-bottom:2px solid #3B82F6 }

      .so-row { display:flex; gap:16px; margin-bottom:10px }
      .so-col { flex:1 }
      .so-col-2 { flex:2 }
      .so-col-3 { flex:3 }
      .so-col-4 { flex:4 }

      .so-label { display:block; font-size:12px; font-weight:600; color:#475569; margin-bottom:4px; padding-left:2px }
      .so-label.required::after { content:' *'; color:#EF4444 }

      .so-input, .so-select { width:100%; height:36px; border:1.5px solid #E2E8F0; border-radius:6px; padding:0 10px; font-size:13px; font-family:inherit; background:#fff; outline:none; transition:all .2s }
      .so-input:focus, .so-select:focus { border-color:#3B82F6; box-shadow:0 0 0 2px rgba(59,130,246,.12) }
      .so-input::placeholder { color:#94A3B8 }

      /* 开关样式 */
      .so-switch-group { display:flex; align-items:center; gap:10px }
      .so-switch { position:relative; width:40px; height:22px; cursor:pointer }
      .so-switch input { opacity:0; width:0; height:0 }
      .so-switch-track { position:absolute; top:0; left:0; right:0; bottom:0; background:#CBD5E1; border-radius:11px; transition:all .3s }
      .so-switch-track::before { position:absolute; content:''; height:16px; width:16px; left:3px; bottom:3px; background:#fff; border-radius:50%; transition:all .3s; box-shadow:0 1px 3px rgba(0,0,0,.1) }
      .so-switch input:checked + .so-switch-track { background:#10B981 }
      .so-switch input:checked + .so-switch-track::before { transform:translateX(18px) }
      .so-switch-label { font-size:12px; color:#64748B }

      /* 单选按钮组 */
      .so-radio-group { display:flex; align-items:center; gap:12px }
      .so-radio { display:flex; align-items:center; gap:4px; cursor:pointer }
      .so-radio input { width:16px; height:16px; accent-color:#3B82F6 }
      .so-radio label { font-size:12px; color:#475569; cursor:pointer }

      /* 产品明细表格 */
      .so-table-wrapper { margin-top:6px; border:1.5px solid #94A3B8; border-radius:8px; overflow:hidden }
      .so-table { width:100%; border-collapse:collapse }
      .so-table th { background:#F8FAFC; padding:8px 10px; text-align:left; font-size:11px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:.5px }
      .so-table td { padding:8px 10px; border-top:1.5px solid #CBD5E1; vertical-align:middle }
      .so-table .item-row:hover { background:#F8FAFC }

      .so-item-input { width:100%; height:34px; border:1.5px solid #E2E8F0; border-radius:5px; padding:0 8px; font-size:12px; outline:none; transition:all .2s }
      .so-item-input:focus { border-color:#3B82F6 }
      .so-item-select { width:100%; height:34px; border:1.5px solid #E2E8F0; border-radius:5px; padding:0 8px; font-size:12px; outline:none; background:#fff }
      .so-item-select:focus { border-color:#3B82F6 }

      .so-delete-btn { width:26px; height:26px; border:none; background:#F1F5F9; border-radius:5px; color:#94A3B8; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; transition:all .2s }
      .so-delete-btn:hover { background:#FEE2E2; color:#EF4444 }

      .so-add-btn { margin-top:8px; padding:6px 14px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:5px; font-size:12px; font-weight:500; color:#64748B; cursor:pointer; transition:all .2s }
      .so-add-btn:hover { background:#EFF6FF; border-color:#3B82F6; color:#3B82F6 }

      /* 合计栏 */
      .so-total-bar { display:flex; justify-content:flex-end; align-items:center; margin-top:8px; padding:10px; background:#F0FDF4; border-radius:6px; border:1px solid #BBF7D0 }
      .so-total-label { font-size:13px; font-weight:500; color:#059669; margin-right:8px }
      .so-total-value { font-size:20px; font-weight:700; color:#059669 }
      
      /* 上传区域 */
      .so-upload-area { border:2px dashed #CBD5E1; border-radius:8px; padding:10px; text-align:center; cursor:pointer; transition:all .2s; background:#FAFBFC; min-height:60px; display:flex; align-items:center; justify-content:center; gap:8px }
      .so-upload-area:hover { border-color:#3B82F6; background:#EFF6FF }
      .so-upload-area svg { width:20px; height:20px; color:#94A3B8; flex-shrink:0 }
      .so-upload-text { font-size:11px; color:#475569; font-weight:500 }
      .so-upload-hint { font-size:10px; color:#94A3B8 }
      
      .so-file-item { display:flex; align-items:center; gap:6px; padding:6px 10px; background:#F1F5F9; border-radius:5px; margin-bottom:5px }
      .so-file-name { flex:1; font-size:12px; color:#475569; overflow:hidden; text-overflow:ellipsis; white-space:nowrap }
      .so-file-size { font-size:11px; color:#94A3B8 }
      .so-file-remove { color:#EF4444; cursor:pointer; font-size:14px }

      /* 备注 */
      .so-textarea { width:100%; min-height:60px; border:1.5px solid #E2E8F0; border-radius:6px; padding:10px 12px; font-size:13px; font-family:inherit; resize:vertical; outline:none; transition:all .2s }
      .so-textarea:focus { border-color:#3B82F6; box-shadow:0 0 0 2px rgba(59,130,246,.12) }
      .so-textarea::placeholder { color:#94A3B8 }

      /* 库存红色高亮 */
      .stock-warning { color:#EF4444; font-weight:700 }
    </style>

    <div class="so-container">
      <h1 class="so-title">编辑销售单 — ${escHtml(o.order_number)}</h1>

      <!-- 销售日期 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label required">销售日期</label>
          <input type="date" id="efDate" value="${(o.sales_date||'').slice(0,10)}" class="so-input">
        </div>
      </div>

      <!-- 采购单位、电话、经办人 -->
      <div class="so-row">
        <div class="so-col-2">
          <label class="so-label required">采购单位</label>
          <select id="efCustomer" class="so-select">${custOpts}</select>
        </div>
        <div class="so-col">
          <label class="so-label">电话</label>
          <input type="text" id="efPhone" value="${escHtml(o.contact_phone||'')}" class="so-input" placeholder="请输入">
        </div>
        <div class="so-col">
          <label class="so-label">经办人</label>
          <input type="text" id="efAgent" value="${escHtml(o.agent_name||'')}" class="so-input" placeholder="请输入">
        </div>
      </div>

      <!-- 数据录入标题 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 8px;padding-left:2px">数据录入:</div>

      <!-- 产品明细表格 -->
      <div class="so-table-wrapper">
        <table class="so-table">
          <thead>
            <tr>
              <th style="width:28%">型号</th>
              <th style="width:12%">批号</th>
              <th style="width:10%">库存</th>
              <th style="width:10%">单价</th>
              <th style="width:10%">数量</th>
              <th style="width:14%">小计</th>
              <th style="width:6%"></th>
            </tr>
          </thead>
          <tbody id="efItems">
            ${itemRows}
          </tbody>
        </table>
      </div>

      <button type="button" class="so-add-btn" onclick="addEfItem()">+ 添加产品</button>

      <div class="so-total-bar">
        <span class="so-total-label">总计:</span>
        <span class="so-total-value" id="efTotal">¥${(parseFloat(o.total_amount)||0).toFixed(2)}</span>
      </div>

      <!-- 备注和上传 -->
      <div class="so-row" style="margin-top:14px">
        <div class="so-col-2">
          <label class="so-label">备注</label>
          <textarea id="efNotes" class="so-textarea" placeholder="请输入内容">${escHtml(o.notes||'')}</textarea>
        </div>
        <div class="so-col">
          <label class="so-label">上传合同文档</label>
          <div class="so-upload-area" onclick="document.getElementById('efDocFile').click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
            <span class="so-upload-text">点击上传文件</span>
            <span class="so-upload-hint">支持 PDF、Word、图片</span>
          </div>
          <input type="file" id="efDocFile" style="display:none" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" multiple onchange="efAddFiles('doc', this)">
          <div class="so-file-list" id="efDocList"></div>
        </div>
      </div>

      <!-- 订单选项 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 10px;padding-left:2px">订单选项:</div>

      <!-- 第一行开关 -->
      <div class="so-row">
        <div class="so-switch-group">
          <span class="so-switch-label">托盘:</span>
          <label class="so-radio"><input type="radio" name="efTray" value="无" ${o.tray_type==='无'?'checked':''}><label>无</label></label>
          <label class="so-radio"><input type="radio" name="efTray" value="单层" ${o.tray_type==='单层'?'checked':''}><label>单面</label></label>
          <label class="so-radio"><input type="radio" name="efTray" value="双层" ${o.tray_type==='双层'?'checked':''}><label>双面</label></label>
        </div>
        <div class="so-col"></div>
        <div class="so-switch-group">
          <span class="so-switch-label">防水:</span>
          <label class="so-switch"><input type="checkbox" id="efWater" ${o.waterproof==='是'?'checked':''}><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">COC:</span>
          <label class="so-switch"><input type="checkbox" id="efCoc" ${o.coc==='是'?'checked':''}><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">送货单:</span>
          <label class="so-switch"><input type="checkbox" id="efDel" ${o.delivery_note==='是'?'checked':''}><span class="so-switch-track"></span></label>
        </div>
        <div class="so-switch-group">
          <span class="so-switch-label">回单:</span>
          <label class="so-switch"><input type="checkbox" id="efRet" ${o.return_note==='是'?'checked':''}><span class="so-switch-track"></span></label>
        </div>
      </div>

      <!-- 第二行开关 -->
      <div class="so-row">
        <div class="so-switch-group">
          <span class="so-switch-label">抽检:</span>
          <label class="so-switch"><input type="checkbox" id="efInsp" ${o.inspection==='是'?'checked':''} onchange="document.getElementById('efShipSection').style.display=this.checked?'block':'none'"><span class="so-switch-track"></span></label>
        </div>
        <div class="so-col" id="efShipSection" style="display:${o.inspection==='是'?'block':'none'}">
          <label class="so-upload-area" style="cursor:pointer;display:block" onclick="document.getElementById('efShipFile').click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span class="so-upload-text">上传抽检图片</span>
          </label>
          <input type="file" id="efShipFile" style="display:none" accept="image/*" multiple onchange="efAddFiles('ship', this)">
          <div class="so-file-list" id="efShipList"></div>
        </div>
      </div>

      <!-- 财务信息 -->
      <div style="font-size:13px;font-weight:600;color:#1E293B;margin:14px 0 10px;padding-left:2px">财务信息:</div>

      <!-- 发票税率和付款条件 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label">发票:</label>
          <div class="so-radio-group">
            <label class="so-radio"><input type="radio" name="efInvoice" value="无" ${o.invoice_rate==='无'?'checked':''}><label>无</label></label>
            <label class="so-radio"><input type="radio" name="efInvoice" value="1%" ${o.invoice_rate==='1%'?'checked':''}><label>1%</label></label>
            <label class="so-radio"><input type="radio" name="efInvoice" value="13%" ${o.invoice_rate==='13%'?'checked':''}><label>13%</label></label>
          </div>
        </div>
        <div class="so-col">
          <label class="so-label">付款:</label>
          <div class="so-radio-group">
            <label class="so-radio"><input type="radio" name="efPayment" value="已付" ${o.payment_terms==='已付'?'checked':''}><label>已付</label></label>
            <label class="so-radio"><input type="radio" name="efPayment" value="月结30天" ${o.payment_terms==='月结30天'?'checked':''}><label>缓付30天</label></label>
            <label class="so-radio"><input type="radio" name="efPayment" value="月结90天" ${o.payment_terms==='月结90天'?'checked':''}><label>缓90天</label></label>
            <label class="so-radio"><input type="radio" name="efPayment" value="手动" ${o.payment_terms==='手动'?'checked':''}><label>手动</label></label>
          </div>
        </div>
        <div class="so-col">
          <label class="so-label">快递:</label>
          <input type="text" id="efExpress" value="${escHtml(o.express_company||'')}" class="so-input" placeholder="请输入">
        </div>
      </div>

      <!-- 付款方式和付款状态 -->
      <div class="so-row">
        <div class="so-col">
          <label class="so-label">付款方式</label>
          <input type="text" id="efPayMethod" value="${escHtml(o.payment_method||'')}" class="so-input" placeholder="如：转账 / 现金 / 支票">
        </div>
        <div class="so-col">
          <label class="so-label">付款状态</label>
          <select id="efPayStatus" class="so-select">
            <option value="未付款" ${o.payment_status==='未付款'?'selected':''}>未付款</option>
            <option value="已付款" ${o.payment_status==='已付款'?'selected':''}>已付款</option>
            <option value="部分付款" ${o.payment_status==='部分付款'?'selected':''}>部分付款</option>
          </select>
        </div>
      </div>
    </div>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary btn-lg" onclick="execEditOrder(${o.id})">保存修改</button>
  `);

  window._efProds = products;
  
  // 加载已有附件
  try {
    const filesRes = await API.get('/orders/' + o.id + '/files');
    window._efDocFiles = (filesRes.data || []).filter(f => f.file_type === '合同资质');
    window._efShipFiles = (filesRes.data || []).filter(f => f.file_type === '发货图片');
  } catch (_) {
    window._efDocFiles = [];
    window._efShipFiles = [];
  }
  window._efCurrentOrderId = o.id;
  window._efPendingDocFiles = [];
  window._efPendingShipFiles = [];

  // 给已有行的批号 select 加上 onchange 事件，用于更新库存显示
  document.querySelectorAll('.ef-batch').forEach(batchSel => {
    const idx = batchSel.getAttribute('data-index');
    const stockEl = document.getElementById('efStock_' + idx);
    batchSel.onchange = () => {
      const opt = batchSel.options[batchSel.selectedIndex];
      const qty = opt ? opt.getAttribute('data-qty') : '';
      if (qty === '' || qty === null) {
        if (stockEl) {
          // 未选中具体批号，显示该产品总库存
          let total = 0;
          for (let i = 0; i < batchSel.options.length; i++) {
            const q = parseFloat(batchSel.options[i].getAttribute('data-qty') || '0');
            if (!isNaN(q)) total += q;
          }
          stockEl.textContent = total.toFixed(1);
        }
      } else {
        if (stockEl) stockEl.textContent = qty;
      }
    };
  });

  renderEfDocList();
  renderEfShipList();
}

// 编辑订单产品变更处理
async function onEfProdChange(select, index) {
  const prodId = parseInt(select.value);
  const row = select.closest('.item-row');
  const batchSel = row.querySelector('.ef-batch');
  const stockEl = document.getElementById('efStock_' + index);

  if (!prodId) {
    if (batchSel) batchSel.innerHTML = '<option value="">先选产品</option>';
    if (stockEl) stockEl.textContent = '0';
    return;
  }

  try {
    const res = await API.get('/inventory/batch-numbers/' + prodId);
    const batches = res.data || [];
    if (batchSel) {
      batchSel.innerHTML = '<option value="">选批次</option>' + batches.map(b => `<option value="${b.id}" data-qty="${b.quantity}">${escHtml(b.batch_number)}</option>`).join('');
      batchSel.onchange = () => {
        const opt = batchSel.options[batchSel.selectedIndex];
        const qty = opt ? opt.getAttribute('data-qty') : '';
        if (qty === '' || qty === null) {
          const totalStock = batches.reduce((sum, b) => sum + parseFloat(b.quantity || 0), 0);
          if (stockEl) stockEl.textContent = totalStock.toFixed(1);
        } else {
          if (stockEl) stockEl.textContent = qty;
        }
      };
    }
    const totalStock = batches.reduce((sum, b) => sum + parseFloat(b.quantity || 0), 0);
    if (stockEl) stockEl.textContent = totalStock.toFixed(1);
  } catch (_) {
    if (stockEl) stockEl.textContent = '0';
    if (batchSel) batchSel.innerHTML = '<option value="">加载失败</option>';
  }
}

// 添加编辑订单产品项
function addEfItem() {
  const container = document.getElementById('efItems');
  const rows = container.querySelectorAll('.item-row');
  const newIndex = rows.length;
  
  const prodOpts = window._efProds ? 
    '<option value="">选产品</option>' + window._efProds.map(p => `<option value="${p.id}">${escHtml(p.model)}</option>`).join('') :
    '<option value="">选产品</option>';
  
  const newRow = container.insertRow();
  newRow.className = 'item-row';
  newRow.innerHTML = `
    <td><select class="so-item-select ef-prod" data-index="${newIndex}" onchange="onEfProdChange(this, ${newIndex})">${prodOpts}</select></td>
    <td><select class="so-item-select ef-batch" data-index="${newIndex}"><option value="">先选产品</option></select></td>
    <td><span id="efStock_${newIndex}" class="stock-warning">0</span></td>
    <td><input type="number" class="so-item-input ef-price" step="0.01" value="0" oninput="updateEfTotal()" placeholder="0.00"></td>
    <td><input type="number" class="so-item-input ef-qty" step="0.1" min="0.1" value="1" oninput="updateEfTotal()" style="text-align:center"></td>
    <td style="font-weight:600;color:#1E293B" class="ef-subtotal">¥0.00</td>
    <td><button type="button" class="so-delete-btn" onclick="removeEfItem(this)">×</button></td>
  `;
  
  updateEfTotal();
}

// 删除编辑订单产品项
function removeEfItem(btn) {
  const row = btn.closest('.item-row');
  const container = document.getElementById('efItems');
  if (container.querySelectorAll('.item-row').length > 1) {
    row.remove();
    updateEfTotal();
  }
}

// 更新编辑订单总计
function updateEfTotal() {
  let total = 0;
  document.querySelectorAll('.ef-subtotal').forEach((el, idx) => {
    const priceEl = document.querySelectorAll('.ef-price')[idx];
    const qtyEl = document.querySelectorAll('.ef-qty')[idx];
    const price = parseFloat(priceEl.value) || 0;
    const qty = parseFloat(qtyEl.value) || 0;
    const subtotal = price * qty;
    el.textContent = '¥' + subtotal.toFixed(2);
    total += subtotal;
  });
  document.getElementById('efTotal').textContent = '¥' + total.toFixed(2);
}

// 编辑订单添加文件
function efAddFiles(type, input) {
  const listEl = document.getElementById(type === 'doc' ? 'efDocList' : 'efShipList');
  const files = Array.from(input.files);
  if (type === 'doc') {
    if (!window._efPendingDocFiles) window._efPendingDocFiles = [];
    window._efPendingDocFiles.push(...files);
    renderEfDocList();
  } else {
    if (!window._efPendingShipFiles) window._efPendingShipFiles = [];
    window._efPendingShipFiles.push(...files);
    renderEfShipList();
  }
  input.value = '';
}

// 删除待上传文件
function efRemovePendingFile(type, index) {
  if (type === 'doc') {
    window._efPendingDocFiles.splice(index, 1);
    renderEfDocList();
  } else {
    window._efPendingShipFiles.splice(index, 1);
    renderEfShipList();
  }
}

// 删除已有附件
function efDeleteExistingFile(fileId, type) {
  if (!confirm('确定要删除此附件吗？')) return;
  const orderId = window._efCurrentOrderId || document.querySelector('#efDocFile') ? parseInt(window.location.pathname.split('/').pop()) : 0;
  API.delete(`/orders/${orderId}/files/${fileId}`).then(() => {
    if (type === 'doc') {
      window._efDocFiles = window._efDocFiles.filter(f => f.id !== fileId);
      renderEfDocList();
    } else {
      window._efShipFiles = window._efShipFiles.filter(f => f.id !== fileId);
      renderEfShipList();
    }
    Toast.success('文件已删除');
  }).catch(err => Toast.error('删除失败: ' + err.message));
}

// 渲染合同文档列表
function renderEfDocList() {
  const listEl = document.getElementById('efDocList');
  if (!listEl) return;
  let html = '';
  
  // 已有文件
  if (window._efDocFiles) {
    window._efDocFiles.forEach(f => {
      html += `<div class="so-file-item">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#94A3B8" stroke-width="2" style="flex-shrink:0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <a href="${f.file_path}" target="_blank" class="so-file-name" style="color:#3B82F6;text-decoration:none">${escHtml(f.file_name)}</a>
        <span class="so-file-size">${(f.file_size/1024).toFixed(1)}KB</span>
        <span class="so-file-remove" onclick="efDeleteExistingFile(${f.id}, 'doc')">&times;</span>
      </div>`;
    });
  }
  
  // 新增待上传
  if (window._efPendingDocFiles) {
    window._efPendingDocFiles.forEach((f, i) => {
      html += `<div class="so-file-item">
        <span class="so-file-name">${escHtml(f.name)}</span>
        <span class="so-file-size">${(f.size/1024).toFixed(1)}KB</span>
        <span class="so-file-remove" onclick="efRemovePendingFile('doc', ${i})">&times;</span>
      </div>`;
    });
  }
  
  listEl.innerHTML = html;
}

// 渲染抽检图片列表
function renderEfShipList() {
  const listEl = document.getElementById('efShipList');
  if (!listEl) return;
  let html = '';
  
  // 已有文件
  if (window._efShipFiles) {
    window._efShipFiles.forEach(f => {
      html += `<div class="so-file-item">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#94A3B8" stroke-width="2" style="flex-shrink:0"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <a href="${f.file_path}" target="_blank" class="so-file-name" style="color:#3B82F6;text-decoration:none">${escHtml(f.file_name)}</a>
        <span class="so-file-size">${(f.file_size/1024).toFixed(1)}KB</span>
        <span class="so-file-remove" onclick="efDeleteExistingFile(${f.id}, 'ship')">&times;</span>
      </div>`;
    });
  }
  
  // 新增待上传
  if (window._efPendingShipFiles) {
    window._efPendingShipFiles.forEach((f, i) => {
      html += `<div class="so-file-item">
        <span class="so-file-name">${escHtml(f.name)}</span>
        <span class="so-file-size">${(f.size/1024).toFixed(1)}KB</span>
        <span class="so-file-remove" onclick="efRemovePendingFile('ship', ${i})">&times;</span>
      </div>`;
    });
  }
  
  listEl.innerHTML = html;
}

async function execEditOrder(id) {
  try {
    // 收集产品明细
    const items = [];
    const rows = document.querySelectorAll('.item-row');
    for (let idx = 0; idx < rows.length; idx++) {
      const row = rows[idx];
      const prodEl = row.querySelector('.ef-prod');
      const batchEl = row.querySelector('.ef-batch');
      const priceEl = row.querySelector('.ef-price');
      const qtyEl = row.querySelector('.ef-qty');
      
      if (!prodEl.value) {
        Toast.warning(`第 ${idx + 1} 条产品明细：请选择产品`);
        return;
      }
      if (!batchEl.value) {
        Toast.warning(`第 ${idx + 1} 条产品明细：请选择批号`);
        return;
      }
      const qty = parseFloat(qtyEl.value);
      if (!qty || qty < 0.1) {
        Toast.warning(`第 ${idx + 1} 条产品明细：数量（≥0.1）为必填项`);
        return;
      }
      const price = parseFloat(priceEl.value);
      if (price < 0) {
        Toast.warning(`第 ${idx + 1} 条产品明细：单价不能为负数`);
        return;
      }
      
      items.push({
        product_id: parseInt(prodEl.value),
        inventory_id: parseInt(batchEl.value),
        unit_price: price || 0,
        quantity: qty,
      });
    }

    const trayEl = document.querySelector('input[name="efTray"]:checked');
    const invoiceEl = document.querySelector('input[name="efInvoice"]:checked');
    const paymentEl = document.querySelector('input[name="efPayment"]:checked');
    
    const body = {
      customer_id: parseInt(document.getElementById('efCustomer').value),
      sales_date: document.getElementById('efDate').value,
      agent_name: document.getElementById('efAgent').value.trim(),
      contact_phone: document.getElementById('efPhone').value.trim(),
      express_company: document.getElementById('efExpress').value.trim(),
      payment_method: document.getElementById('efPayMethod').value.trim(),
      payment_status: document.getElementById('efPayStatus').value,
      tray_type: trayEl ? trayEl.value : '无',
      waterproof: document.getElementById('efWater').checked ? '是' : '否',
      coc: document.getElementById('efCoc').checked ? '是' : '否',
      delivery_note: document.getElementById('efDel').checked ? '是' : '否',
      return_note: document.getElementById('efRet').checked ? '是' : '否',
      inspection: document.getElementById('efInsp').checked ? '是' : '否',
      invoice_rate: invoiceEl ? invoiceEl.value : '无',
      payment_terms: paymentEl ? paymentEl.value : '已付',
      notes: document.getElementById('efNotes').value,
      items: items,
    };
    
    if (!body.customer_id) { Toast.warning('请选择客户'); return; }
    if (items.length === 0) { Toast.warning('请至少添加一个产品'); return; }
    
    await API.put('/orders/' + id, body);
    
    // 上传新附件
    const token = Auth.getToken();
    
    // 上传合同文档
    if (window._efPendingDocFiles && window._efPendingDocFiles.length > 0) {
      for (const f of window._efPendingDocFiles) {
        const formData = new FormData();
        formData.append('file', f);
        await fetch('/api/orders/' + id + '/files/document', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          body: formData
        });
      }
    }
    
    // 上传抽检图片
    if (window._efPendingShipFiles && window._efPendingShipFiles.length > 0) {
      for (const f of window._efPendingShipFiles) {
        const formData = new FormData();
        formData.append('file', f);
        await fetch('/api/orders/' + id + '/files/shipment', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          body: formData
        });
      }
    }
    
    Toast.success('订单更新成功');
    Modal.close();
    loadOrdList(document.getElementById('contentArea'), ordPage, ordSearch, ordStatus, ordPayStatus);
  } catch (err) { Toast.error(err.message); }
}

async function changeOrderStatus(id, newStatus) {
  try {
    await API.put('/orders/' + id + '/status', { status: newStatus });
    Toast.success('状态已更新为：' + newStatus);
    Modal.close();
    loadOrdList(document.getElementById('contentArea'), ordPage, ordSearch, ordStatus, ordPayStatus);
  } catch (err) { Toast.error(err.message); }
}

async function uploadOrderFile(orderId) {
  Modal.open('上传订单文件 — ' + orderId, `
    <form id="uploadForm" enctype="multipart/form-data">
      <div class="form-group"><label>文件类型</label><select id="ufType"><option value="合同资质">合同资质（合同/证书等）</option><option value="发货图片">发货图片</option></select></div>
      <div class="form-group"><label>选择文件</label><input type="file" id="ufFile" required></div>
      <div class="form-group"><label>说明</label><input type="text" id="ufDesc" placeholder="文件说明（可选）"></div>
    </form>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-primary" onclick="execUploadFile(${orderId})">上传</button>
  `);
}

async function execUploadFile(orderId) {
  try {
    const formData = new FormData();
    formData.append('file', document.getElementById('ufFile').files[0]);
    formData.append('description', document.getElementById('ufDesc').value);
    const fileType = document.getElementById('ufType').value;
    const typePath = fileType === '发货图片' ? 'shipment' : 'document';
    const token = Auth.getToken();
    await fetch('/api/orders/' + orderId + '/files/' + typePath, { method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: formData });
    Toast.success('文件上传成功'); Modal.close();
  } catch (err) { Toast.error('上传失败'); }
}

function deleteOrderConfirm(id, orderNumber) {
  Modal.open('确认删除', `
    <p>确定要删除订单 <strong>${escHtml(orderNumber)}</strong> 吗？</p>
    <p style="color:var(--color-success);font-size:13px;margin-top:8px">删除后库存将自动恢复</p>
  `, `
    <button class="btn btn-outline" onclick="Modal.close()">取消</button>
    <button class="btn btn-danger" onclick="deleteOrderExec(${id})">确认删除</button>
  `);
}

async function deleteOrderExec(id) {
  try { await API.delete('/orders/' + id); Toast.success('订单已删除，库存已恢复'); Modal.close(); loadOrdList(document.getElementById('contentArea'), ordPage, ordSearch, ordStatus, ordPayStatus); }
  catch (err) { Toast.error(err.message); }
}

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
    <div class="table-container" style="margin-top:12px"><table style="width:100%"><thead><tr><th style="width:38%">型号</th><th style="width:18%">批号</th><th style="width:14%">数量</th><th style="width:15%">单价</th><th style="width:15%">箱号</th></tr></thead><tbody>${itemsHtml}</tbody></table></div>
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
document.getElementById('loginUsername').addEventListener('input', (e) => {
  e.target.closest('.input-wrapper').classList.toggle('has-content', e.target.value.length > 0);
});
document.getElementById('loginPassword').addEventListener('input', (e) => {
  e.target.closest('.input-wrapper').classList.toggle('has-content', e.target.value.length > 0);
});
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
