// 后台管理逻辑：登录、分类/工具的增删改、图标上传

const loginView = document.getElementById("loginView");
const adminView = document.getElementById("adminView");
const loginForm = document.getElementById("loginForm");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

const categoryAdminList = document.getElementById("categoryAdminList");
const toolAdminList = document.getElementById("toolAdminList");
const addCategoryBtn = document.getElementById("addCategoryBtn");
const addToolBtn = document.getElementById("addToolBtn");

const toolModal = document.getElementById("toolModal");
const toolModalTitle = document.getElementById("toolModalTitle");
const toolModalClose = document.getElementById("toolModalClose");
const toolCancel = document.getElementById("toolCancel");
const toolForm = document.getElementById("toolForm");
const fId = document.getElementById("f-id");
const fName = document.getElementById("f-name");
const fCategory = document.getElementById("f-category");
const fUrl = document.getElementById("f-url");
const fDescription = document.getElementById("f-description");
const fVersion = document.getElementById("f-version");
const fSize = document.getElementById("f-size");
const fPlatform = document.getElementById("f-platform");
const fSort = document.getElementById("f-sort");
const fIcon = document.getElementById("f-icon");
const iconUploadBtn = document.getElementById("iconUploadBtn");
const iconFile = document.getElementById("iconFile");

const catModal = document.getElementById("catModal");
const catModalTitle = document.getElementById("catModalTitle");
const catModalClose = document.getElementById("catModalClose");
const catCancel = document.getElementById("catCancel");
const catForm = document.getElementById("catForm");
const cId = document.getElementById("c-id");
const cIdNew = document.getElementById("c-id-new");
const cName = document.getElementById("c-name");
const cSort = document.getElementById("c-sort");

const toastEl = document.getElementById("toast");
let toastTimer;

let categories = [];
let tools = [];

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function api(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  let data = {};
  try {
    data = await res.json();
  } catch {}
  if (res.status === 401) throw new HttpError("未登录或登录已过期", 401);
  if (!res.ok) throw new HttpError(data.error || `请求失败 (${res.status})`, res.status);
  return data;
}

function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch])
  );
}

function toast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2400);
}

function showLogin() {
  loginView.hidden = false;
  adminView.hidden = true;
}

function showAdmin() {
  loginView.hidden = true;
  adminView.hidden = false;
}

async function loadAll() {
  [categories, tools] = await Promise.all([
    api("/api/admin/categories"),
    api("/api/admin/tools"),
  ]);
  renderCategoryList();
  renderToolList();
  populateCategorySelect();
}

function renderCategoryList() {
  categoryAdminList.innerHTML = categories
    .map(
      (c) => `
    <li>
      <div class="admin-item-main">
        <div class="admin-item-title">${esc(c.name)}</div>
        <div class="admin-item-sub">${esc(c.id)} · ${c.count} 个工具</div>
      </div>
      <div class="admin-item-actions">
        <button class="mini-btn" data-edit-cat="${esc(c.id)}">编辑</button>
        <button class="mini-btn danger" data-del-cat="${esc(c.id)}">删除</button>
      </div>
    </li>`
    )
    .join("");
}

function renderToolList() {
  toolAdminList.innerHTML = tools
    .map(
      (t) => `
    <li>
      <div class="admin-item-main">
        <div class="admin-item-title">${esc(t.name)}</div>
        <div class="admin-item-sub">${esc(t.category_name || "")} · ${esc(t.url)}</div>
      </div>
      <div class="admin-item-actions">
        <button class="mini-btn" data-edit-tool="${esc(t.id)}">编辑</button>
        <button class="mini-btn danger" data-del-tool="${esc(t.id)}">删除</button>
      </div>
    </li>`
    )
    .join("");
}

function populateCategorySelect() {
  fCategory.innerHTML = categories
    .map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`)
    .join("");
}

// ---- 工具弹窗 ----
function openToolModal(tool) {
  toolModalTitle.textContent = tool ? "编辑工具" : "新增工具";
  fId.value = tool ? tool.id : "";
  fName.value = tool ? tool.name : "";
  fCategory.value = tool ? tool.category_id : categories[0]?.id || "";
  fUrl.value = tool ? tool.url : "";
  fDescription.value = tool ? tool.description : "";
  fVersion.value = tool ? tool.version || "官方最新版" : "官方最新版";
  fSize.value = tool ? tool.size || "以官网为准" : "以官网为准";
  fPlatform.value = tool ? tool.platform || "Windows" : "Windows";
  fSort.value = tool ? tool.sort : 0;
  fIcon.value = tool ? tool.icon : "";
  toolModal.hidden = false;
}

function closeToolModal() {
  toolModal.hidden = true;
}

toolForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    name: fName.value.trim(),
    category_id: fCategory.value,
    url: fUrl.value.trim(),
    description: fDescription.value.trim(),
    version: fVersion.value.trim() || "官方最新版",
    size: fSize.value.trim() || "以官网为准",
    platform: fPlatform.value.trim() || "Windows",
    icon: fIcon.value.trim(),
    sort: Number(fSort.value) || 0,
  };
  try {
    if (fId.value) {
      await api(`/api/admin/tools/${encodeURIComponent(fId.value)}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    } else {
      await api("/api/admin/tools", { method: "POST", body: JSON.stringify(body) });
    }
    closeToolModal();
    toast("已保存");
    await loadAll();
  } catch (err) {
    toast(err.message);
  }
});

async function deleteTool(id) {
  if (!confirm("确定删除该工具？")) return;
  try {
    await api(`/api/admin/tools/${encodeURIComponent(id)}`, { method: "DELETE" });
    toast("已删除");
    await loadAll();
  } catch (err) {
    toast(err.message);
  }
}

// ---- 分类弹窗 ----
function openCatModal(cat) {
  catModalTitle.textContent = cat ? "编辑分类" : "新增分类";
  cId.value = cat ? cat.id : "";
  cIdNew.value = cat ? cat.id : "";
  cIdNew.disabled = !!cat;
  cName.value = cat ? cat.name : "";
  cSort.value = cat ? cat.sort : 0;
  catModal.hidden = false;
}

function closeCatModal() {
  catModal.hidden = true;
}

catForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    if (cId.value) {
      await api(`/api/admin/categories/${encodeURIComponent(cId.value)}`, {
        method: "PUT",
        body: JSON.stringify({ name: cName.value.trim(), sort: Number(cSort.value) || 0 }),
      });
    } else {
      await api("/api/admin/categories", {
        method: "POST",
        body: JSON.stringify({
          id: cIdNew.value.trim(),
          name: cName.value.trim(),
          sort: Number(cSort.value) || 0,
        }),
      });
    }
    closeCatModal();
    toast("已保存");
    await loadAll();
  } catch (err) {
    toast(err.message);
  }
});

async function deleteCategory(id) {
  if (!confirm("确定删除该分类？")) return;
  try {
    await api(`/api/admin/categories/${encodeURIComponent(id)}`, { method: "DELETE" });
    toast("已删除");
    await loadAll();
  } catch (err) {
    toast(err.message);
  }
}

// ---- 图标上传 ----
iconUploadBtn.addEventListener("click", () => iconFile.click());

iconFile.addEventListener("change", async () => {
  const file = iconFile.files[0];
  if (!file) return;
  const fd = new FormData();
  fd.append("file", file);
  iconUploadBtn.textContent = "上传中…";
  try {
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "上传失败");
    fIcon.value = data.url;
    toast("图标已上传");
  } catch (err) {
    toast(err.message);
  } finally {
    iconUploadBtn.textContent = "上传";
    iconFile.value = "";
  }
});

// ---- 事件绑定 ----
addToolBtn.addEventListener("click", () => openToolModal(null));
toolModalClose.addEventListener("click", closeToolModal);
toolCancel.addEventListener("click", closeToolModal);

addCategoryBtn.addEventListener("click", () => openCatModal(null));
catModalClose.addEventListener("click", closeCatModal);
catCancel.addEventListener("click", closeCatModal);

toolAdminList.addEventListener("click", (e) => {
  const editBtn = e.target.closest("[data-edit-tool]");
  const delBtn = e.target.closest("[data-del-tool]");
  if (editBtn) openToolModal(tools.find((t) => t.id === editBtn.dataset.editTool));
  else if (delBtn) deleteTool(delBtn.dataset.delTool);
});

categoryAdminList.addEventListener("click", (e) => {
  const editBtn = e.target.closest("[data-edit-cat]");
  const delBtn = e.target.closest("[data-del-cat]");
  if (editBtn) openCatModal(categories.find((c) => c.id === editBtn.dataset.editCat));
  else if (delBtn) deleteCategory(delBtn.dataset.delCat);
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loginError.textContent = "";
  try {
    await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password: loginPassword.value }),
    });
    await loadAll();
    showAdmin();
    loginPassword.value = "";
  } catch (err) {
    loginError.textContent = err.message;
  }
});

logoutBtn.addEventListener("click", async () => {
  await api("/api/auth/logout", { method: "POST" }).catch(() => {});
  showLogin();
});

// ---- 初始化 ----
(async function init() {
  try {
    await loadAll();
    showAdmin();
  } catch (err) {
    showLogin();
    if (!(err instanceof HttpError && err.status === 401)) {
      loginError.textContent = err.message;
    }
  }
})();
