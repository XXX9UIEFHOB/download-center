const state = {
  categories: [],
  tools: [],
  activeCategory: "all",
};

const categoryList = document.getElementById("categoryList");
const toolsGrid = document.getElementById("toolsGrid");
const sectionTitle = document.getElementById("sectionTitle");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");
let toastTimer;

const downloadIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M5 21h14"></path>
  </svg>`;

const defaultToolIcon = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="4"></rect>
    <path d="M12 7v6"></path><path d="m9 10 3 3 3-3"></path><path d="M8 17h8"></path>
  </svg>`;

function getCategoryName(id) {
  return state.categories.find((category) => category.id === id)?.name || "工具";
}

function allCategories() {
  return [
    { id: "all", name: "全部工具", count: state.tools.length },
    ...state.categories,
  ];
}

function renderCategories() {
  categoryList.innerHTML = allCategories()
    .map((category) => {
      const active = category.id === state.activeCategory;
      return `
      <button class="category-btn ${active ? "active" : ""}" data-category="${category.id}" aria-pressed="${active}">
        <span>${category.name}</span>
        <span class="category-count">${category.count}</span>
      </button>`;
    })
    .join("");
}

function renderTools() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filteredTools = state.tools.filter((tool) => {
    const inCategory =
      state.activeCategory === "all" || tool.category_id === state.activeCategory;
    const matchesKeyword =
      !keyword ||
      `${tool.name} ${tool.description} ${tool.category_name || getCategoryName(tool.category_id)}`
        .toLowerCase()
        .includes(keyword);
    return inCategory && matchesKeyword;
  });

  sectionTitle.textContent = getCategoryName(state.activeCategory);
  resultCount.textContent = `共 ${filteredTools.length} 款工具`;
  clearSearch.classList.toggle("visible", keyword.length > 0);
  emptyState.classList.toggle("visible", filteredTools.length === 0);
  toolsGrid.style.display = filteredTools.length === 0 ? "none" : "grid";

  toolsGrid.innerHTML = filteredTools
    .map(
      (tool, index) => `
    <article class="tool-card" style="animation-delay: ${Math.min(index * 30, 180)}ms">
      <div class="tool-header">
        <div class="tool-icon">
          ${tool.icon ? `<img src="${tool.icon}" alt="${tool.name}图标" loading="lazy">` : defaultToolIcon}
        </div>
        <div class="tool-top">
          <h2 class="tool-name">${tool.name}</h2>
          <span class="tool-tag">${tool.category_name || getCategoryName(tool.category_id)}</span>
        </div>
      </div>
      <p class="tool-description">${tool.description}</p>
      <div class="tool-meta">
        <span>${tool.version}</span><i class="meta-dot"></i>
        <span>${tool.size}</span><i class="meta-dot"></i>
        <span>${tool.platform}</span>
      </div>
      <a class="download-btn" href="${tool.url}" target="_blank" rel="noopener noreferrer" data-tool="${tool.name}" aria-label="前往 ${tool.name} 官网下载">
        ${downloadIcon}<span>点我下载</span>
      </a>
    </article>`,
    )
    .join("");
}

function renderLoadError(message) {
  emptyState.classList.add("visible");
  emptyState.querySelector("h3").textContent = "数据加载失败";
  emptyState.querySelector("p").textContent = message;
  toolsGrid.style.display = "none";
}

async function loadData() {
  try {
    const [catRes, toolRes] = await Promise.all([
      fetch("/api/categories"),
      fetch("/api/tools"),
    ]);
    if (!catRes.ok || !toolRes.ok) throw new Error("接口返回异常");
    state.categories = await catRes.json();
    state.tools = await toolRes.json();
    renderCategories();
    renderTools();
  } catch {
    renderLoadError("请确认已通过 wrangler pages dev 或 Cloudflare Pages 运行本站。");
  }
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".category-btn");
  if (!button) return;
  state.activeCategory = button.dataset.category;
  renderCategories();
  renderTools();
  if (window.innerWidth <= 720) {
    document
      .querySelector(".main")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

searchInput.addEventListener("input", renderTools);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  renderTools();
});

toolsGrid.addEventListener("click", (event) => {
  const link = event.target.closest(".download-btn");
  if (link) showToast(`正在打开 ${link.dataset.tool} 官方下载页`);
});

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

loadData();
