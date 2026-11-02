const categories = [
  { id: "all", name: "全部工具" },
  { id: "remote", name: "远程工具" },
  { id: "system", name: "系统检测" },
  { id: "driver", name: "驱动" },
  { id: "clean", name: "清理杀毒" },
  { id: "install", name: "装机工具" },
  { id: "system-image", name: "系统镜像" },
  { id: "archive", name: "解压工具" },
  { id: "proxy", name: "代理工具" },
  { id: "common", name: "常用软件" },
];

const tools = [
  {
    name: "连连控",
    category: "remote",
    description:
      "免费易用的远程控制工具，支持远程桌面、文件传输和远程协助，连接快速稳定。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/LLK.png",
    url: "https://dlj.1788.fit/llkyc",
  },
  {
    name: "向日葵",
    category: "remote",
    description:
      "功能成熟的远程控制软件，支持远程桌面、远程文件和设备管理，操作简单易上手。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/XRK.png",
    url: "https://dlj.1788.fit/xrkyc",
  },
  {
    name: "UU远程",
    category: "remote",
    description:
      "网易出品的免费远程控制工具，支持高清画质、低延迟连接和跨平台远程协助。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/UUYC.png",
    url: "https://dlj.1788.fit/uuyc",
  },
  {
    name: "ToDesk",
    category: "remote",
    description:
      "跨平台远程控制软件，支持远程桌面、文件传输与远程协助，适合办公和技术支持。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/TODESK.png",
    url: "https://dlj.1788.fit/td",
  },

  {
    name: "图吧工具箱",
    category: "system",
    description:
      "集成多种硬件检测、性能测试与系统工具，适合电脑验机、硬件检测和日常维护。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/TBGJX.png",
    url: "https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/%E5%9B%BE%E5%90%A7%E5%B7%A5%E5%85%B7%E7%AE%B1202309.zip",
  },

  {
    name: "万能网卡驱动",
    category: "driver",
    description:
      "内置多种常见有线与无线网卡驱动，适合装机后无法联网时恢复网络连接。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    url: "https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/360%E4%B8%87%E8%83%BD%E7%BD%91%E5%8D%A1%E9%A9%B1%E5%8A%A8.exe?sign=0.c779f838d79654b1340e9d0a526281f8b167468990be0fdca329bb12fd55cfb4",
  },
  {
    name: "火绒安全",
    category: "clean",
    description:
      "轻量安静的安全防护软件，提供病毒查杀、实时防护、弹窗拦截和启动项管理等功能。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/HUOTONG.png",
    url: "https://huorong.cn/person5.html",
  },
  {
    name: "AutoRemove",
    category: "clean",
    description:
      "集成多种硬件检测、性能测试与系统工具，适合电脑验机、硬件检测和日常维护。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    url: "https://download.1788.fit/d/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/%E8%BD%AF%E4%BB%B6/1_%E5%B8%B8%E7%94%A8%E8%BD%AF%E4%BB%B6/lcx/%E5%8D%B8%E8%BD%BDCAD.rar",
  },

  {
    name: "XXClean",
    category: "clean",
    description:
      "集成多种硬件检测、性能测试与系统工具，适合电脑验机、硬件检测和日常维护。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    url: "https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/XXClean0.2.4(%E8%A7%A3%E5%8E%8B%E5%90%8E%E8%BF%90%E8%A1%8C)%E5%8D%B8%E8%BD%BDsw.rar",
  },

  {
    name: "Ezrc",
    category: "install",
    description:
      "面向电脑装机与系统维护的实用工具，可帮助完成系统部署、重装和常见维护操作。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/EZRC.png",
    url: "https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/EasyRCV3.exe",
  },

  {
    name: "FirPe",
    category: "install",
    description:
      "简洁纯净的 Windows PE 维护工具，支持系统安装、磁盘分区、数据备份与故障修复。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/FIRPE.png",
    url: "https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/FirPE-V2.1.1.exe",
  },

  {
    name: "win11 23h2",
    category: "system-image",
    description:
      "Windows 11 23H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。",
    version: "23h2",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/win11.png",
    url: "https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_23h2_updated_sep_2024_x64_dvd_22316bf2.iso?sign=0.eb632b8d5534a8b1a3cae31b319c3ecfd086ae985d5f2684bf69a51bbb33c1b8",
  },

  {
    name: "win11 24h2",
    category: "system-image",
    description:
      "Windows 11 24H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。",
    version: "24h2",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/win11.png",
    url: "https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_24h2_updated_sep_2025_x64_dvd_84877922.iso?sign=0.4ff51a1f7661278bc4168f01b96f7a99ae7bb30d1af60289a8d5121bb52408c1",
  },

  {
    name: "win11 25h2",
    category: "system-image",
    description:
      "Windows 11 25H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。",
    version: "25h2",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/win11.png",

    url: "https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_25h2_updated_sep_2026_x64_dvd_e10f7b29.iso?sign=0.00e06df986d9aeaf59c8d32aa55324b38fa44875e7c0060e9102f95e3d861163",
  },
  {
    name: "win11 26h2",
    category: "system-image",
    description:
      "Windows 11 26H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。",
    version: "26h2",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/win11.png",

    url: "https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_26h2_x64_dvd_74d48a06.iso?sign=0.ec51599257e5004431be64586fcd2abc7dffed3f4deeefcba7f5700e05f40a60",
  },

  {
    name: "win10 23h2",
    category: "system-image",
    description:
      "Windows 10 系统镜像，适用于系统安装或重装；下载前请核对版本号、系统架构和镜像来源。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/win10.png",
    url: "https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN10/zh-cn_windows_10_business_editions_version_22h2_updated_sep_2025_x64_dvd_86874d1c.iso?sign=0.0f5f99f71020490ff9d1a94db5c5b536dae589840e535470b575f574a0b163e9",
  },

  {
    name: "WinRAR",
    category: "archive",
    description:
      "经典的压缩与解压缩软件，支持 RAR、ZIP 等常见格式，并提供分卷压缩与加密功能。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/WinRAR.png",
    url: "https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/winrar.exe?sign=0.5a3f3e6db411d2a3ab7e26445463af8b5bdcda0ab0602a94c293793b545eebd9",
  },

  {
    name: "7zip",
    category: "archive",
    description:
      "免费开源的压缩与解压缩工具，支持 7z、ZIP 等多种格式，体积小巧且压缩率高。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/7zip.png",
    url: "https://ds.334344.xyz/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/7z.exe",
  },

  {
    name: "Bandizip",
    category: "archive",
    description:
      "界面简洁的压缩与解压缩工具，支持多种常见格式、快速拖放和压缩包内容预览。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/Bandizip.png",
    url: "https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/BANDIZIP-SETUP-STD-X64.EXE?sign=0.b8b92e74ea14a92a476742ed283aefafc022b3bb6ba53f67048e4e12298cdb67",
  },

  {
    name: "QQ",
    category: "common",
    description:
      "腾讯推出的即时通信软件，支持文字与语音聊天、视频通话、文件传输和群聊。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/QQ.png",
    url: "https://im.qq.com/index/#/",
  },

  {
    name: "微信",
    category: "common",
    description:
      "常用的即时通信工具，支持聊天、语音视频通话、文件传输以及小程序等功能。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/Wechat.png",
    url: "https://weixin.qq.com/",
  },

  {
    name: "steam",
    category: "common",
    description:
      "知名的数字游戏平台，提供游戏购买、下载更新、云存档、好友互动和社区功能。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/steam.png",
    url: "https://store.steampowered.com/about/",
  },

  {
    name: "UU加速器",
    category: "common",
    description:
      "网易出品的游戏网络加速工具，可降低延迟与丢包，支持多款国内外热门游戏。",
    version: "官方最新版",
    size: "以官网为准",
    platform: "Windows",
    icon: "images/uu.png",
    url: "https://uu.163.com/download/",
  },
];

const categoryList = document.getElementById("categoryList");
const toolsGrid = document.getElementById("toolsGrid");
const sectionTitle = document.getElementById("sectionTitle");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const emptyState = document.getElementById("emptyState");
const toast = document.getElementById("toast");
let activeCategory = "all";
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
  return categories.find((category) => category.id === id)?.name || "工具";
}

function renderCategories() {
  categoryList.innerHTML = categories
    .map((category) => {
      const count =
        category.id === "all"
          ? tools.length
          : tools.filter((tool) => tool.category === category.id).length;
      return `
      <button class="category-btn ${category.id === activeCategory ? "active" : ""}" data-category="${category.id}" aria-pressed="${category.id === activeCategory}">
        <span>${category.name}</span>
        <span class="category-count">${count}</span>
      </button>`;
    })
    .join("");
}

function renderTools() {
  const keyword = searchInput.value.trim().toLowerCase();
  const filteredTools = tools.filter((tool) => {
    const inCategory =
      activeCategory === "all" || tool.category === activeCategory;
    const matchesKeyword =
      !keyword ||
      `${tool.name} ${tool.description} ${getCategoryName(tool.category)}`
        .toLowerCase()
        .includes(keyword);
    return inCategory && matchesKeyword;
  });

  sectionTitle.textContent = getCategoryName(activeCategory);
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
          <span class="tool-tag">${getCategoryName(tool.category)}</span>
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

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest(".category-btn");
  if (!button) return;
  activeCategory = button.dataset.category;
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

document
  .getElementById("adminBtn")
  .addEventListener("click", () =>
    showToast("后台管理为导航示例，可继续接入管理系统"),
  );

renderCategories();
renderTools();
