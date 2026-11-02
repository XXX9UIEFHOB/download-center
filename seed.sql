-- 由 scripts/make-seed.mjs 生成，勿手改

INSERT INTO categories (id, name, sort) VALUES
  ('remote', '远程工具', 0),
  ('system', '系统检测', 1),
  ('driver', '驱动', 2),
  ('clean', '清理杀毒', 3),
  ('install', '装机工具', 4),
  ('system-image', '系统镜像', 5),
  ('archive', '解压工具', 6),
  ('proxy', '代理工具', 7),
  ('common', '常用软件', 8);

INSERT INTO tools (id, name, category_id, description, version, size, platform, icon, url, sort) VALUES
  ('t-1', '连连控', 'remote', '免费易用的远程控制工具，支持远程桌面、文件传输和远程协助，连接快速稳定。', '官方最新版', '以官网为准', 'Windows', 'images/LLK.png', 'https://dlj.1788.fit/llkyc', 0),
  ('t-2', '向日葵', 'remote', '功能成熟的远程控制软件，支持远程桌面、远程文件和设备管理，操作简单易上手。', '官方最新版', '以官网为准', 'Windows', 'images/XRK.png', 'https://dlj.1788.fit/xrkyc', 1),
  ('t-3', 'UU远程', 'remote', '网易出品的免费远程控制工具，支持高清画质、低延迟连接和跨平台远程协助。', '官方最新版', '以官网为准', 'Windows', 'images/UUYC.png', 'https://dlj.1788.fit/uuyc', 2),
  ('t-4', 'ToDesk', 'remote', '跨平台远程控制软件，支持远程桌面、文件传输与远程协助，适合办公和技术支持。', '官方最新版', '以官网为准', 'Windows', 'images/TODESK.png', 'https://dlj.1788.fit/td', 3),
  ('t-5', '图吧工具箱', 'system', '集成多种硬件检测、性能测试与系统工具，适合电脑验机、硬件检测和日常维护。', '官方最新版', '以官网为准', 'Windows', 'images/TBGJX.png', 'https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/%E5%9B%BE%E5%90%A7%E5%B7%A5%E5%85%B7%E7%AE%B1202309.zip', 4),
  ('t-6', '万能网卡驱动', 'driver', '内置多种常见有线与无线网卡驱动，适合装机后无法联网时恢复网络连接。', '官方最新版', '以官网为准', 'Windows', '', 'https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/360%E4%B8%87%E8%83%BD%E7%BD%91%E5%8D%A1%E9%A9%B1%E5%8A%A8.exe?sign=0.c779f838d79654b1340e9d0a526281f8b167468990be0fdca329bb12fd55cfb4', 5),
  ('t-7', '火绒安全', 'clean', '轻量安静的安全防护软件，提供病毒查杀、实时防护、弹窗拦截和启动项管理等功能。', '官方最新版', '以官网为准', 'Windows', 'images/HUOTONG.png', 'https://huorong.cn/person5.html', 6),
  ('t-8', 'AutoRemove', 'clean', '用于卸载 CAD 类软件的清理工具，可清除残留文件和注册表项，方便重新安装或修复。', '官方最新版', '以官网为准', 'Windows', '', 'https://download.1788.fit/d/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/%E8%BD%AF%E4%BB%B6/1_%E5%B8%B8%E7%94%A8%E8%BD%AF%E4%BB%B6/lcx/%E5%8D%B8%E8%BD%BDCAD.rar', 7),
  ('t-9', 'XXClean', 'clean', '针对 SolidWorks 的清理卸载工具，解压后运行可清除安装残留，便于重新安装或修复。', '官方最新版', '以官网为准', 'Windows', '', 'https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/XXClean0.2.4(%E8%A7%A3%E5%8E%8B%E5%90%8E%E8%BF%90%E8%A1%8C)%E5%8D%B8%E8%BD%BDsw.rar', 8),
  ('t-10', 'Ezrc', 'install', '面向电脑装机与系统维护的实用工具，可帮助完成系统部署、重装和常见维护操作。', '官方最新版', '以官网为准', 'Windows', 'images/EZRC.png', 'https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/EasyRCV3.exe', 9),
  ('t-11', 'FirPe', 'install', '简洁纯净的 Windows PE 维护工具，支持系统安装、磁盘分区、数据备份与故障修复。', '官方最新版', '以官网为准', 'Windows', 'images/FIRPE.png', 'https://download.1788.fit/d/%E7%A7%BB%E5%8A%A8%E4%BA%91%E7%9B%98/1%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7/lcx/FirPE-V2.1.1.exe', 10),
  ('t-12', 'win11 23h2', 'system-image', 'Windows 11 23H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。', '23h2', '以官网为准', 'Windows', 'images/win11.png', 'https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_23h2_updated_sep_2024_x64_dvd_22316bf2.iso?sign=0.eb632b8d5534a8b1a3cae31b319c3ecfd086ae985d5f2684bf69a51bbb33c1b8', 11),
  ('t-13', 'win11 24h2', 'system-image', 'Windows 11 24H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。', '24h2', '以官网为准', 'Windows', 'images/win11.png', 'https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_24h2_updated_sep_2025_x64_dvd_84877922.iso?sign=0.4ff51a1f7661278bc4168f01b96f7a99ae7bb30d1af60289a8d5121bb52408c1', 12),
  ('t-14', 'win11 25h2', 'system-image', 'Windows 11 25H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。', '25h2', '以官网为准', 'Windows', 'images/win11.png', 'https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_25h2_updated_sep_2026_x64_dvd_e10f7b29.iso?sign=0.00e06df986d9aeaf59c8d32aa55324b38fa44875e7c0060e9102f95e3d861163', 13),
  ('t-15', 'win11 26h2', 'system-image', 'Windows 11 26H2 系统镜像，适用于全新安装、系统重装或升级，安装前请备份重要数据。', '26h2', '以官网为准', 'Windows', 'images/win11.png', 'https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN11/zh-cn_windows_11_business_editions_version_26h2_x64_dvd_74d48a06.iso?sign=0.ec51599257e5004431be64586fcd2abc7dffed3f4deeefcba7f5700e05f40a60', 14),
  ('t-16', 'win10 22h2', 'system-image', 'Windows 10 22H2 系统镜像，适用于系统安装或重装；下载前请核对版本号、系统架构和镜像来源。', '22h2', '以官网为准', 'Windows', 'images/win10.png', 'https://list.334344.xyz/d/OneDrive/%E7%B3%BB%E7%BB%9F%E9%95%9C%E5%83%8F/WIN10/zh-cn_windows_10_business_editions_version_22h2_updated_sep_2025_x64_dvd_86874d1c.iso?sign=0.0f5f99f71020490ff9d1a94db5c5b536dae589840e535470b575f574a0b163e9', 15),
  ('t-17', 'WinRAR', 'archive', '经典的压缩与解压缩软件，支持 RAR、ZIP 等常见格式，并提供分卷压缩与加密功能。', '官方最新版', '以官网为准', 'Windows', 'images/WinRAR.png', 'https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/winrar.exe?sign=0.5a3f3e6db411d2a3ab7e26445463af8b5bdcda0ab0602a94c293793b545eebd9', 16),
  ('t-18', '7zip', 'archive', '免费开源的压缩与解压缩工具，支持 7z、ZIP 等多种格式，体积小巧且压缩率高。', '官方最新版', '以官网为准', 'Windows', 'images/7zip.png', 'https://ds.334344.xyz/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/7z.exe', 17),
  ('t-19', 'Bandizip', 'archive', '界面简洁的压缩与解压缩工具，支持多种常见格式、快速拖放和压缩包内容预览。', '官方最新版', '以官网为准', 'Windows', 'images/Bandizip.png', 'https://list.334344.xyz/d/cloudflare/%E5%B7%A5%E5%85%B7/%E8%A7%A3%E5%8E%8B%E5%B7%A5%E5%85%B7/BANDIZIP-SETUP-STD-X64.EXE?sign=0.b8b92e74ea14a92a476742ed283aefafc022b3bb6ba53f67048e4e12298cdb67', 18),
  ('t-20', 'QQ', 'common', '腾讯推出的即时通信软件，支持文字与语音聊天、视频通话、文件传输和群聊。', '官方最新版', '以官网为准', 'Windows', 'images/QQ.png', 'https://im.qq.com/index/#/', 19),
  ('t-21', '微信', 'common', '常用的即时通信工具，支持聊天、语音视频通话、文件传输以及小程序等功能。', '官方最新版', '以官网为准', 'Windows', 'images/Wechat.png', 'https://weixin.qq.com/', 20),
  ('t-22', 'steam', 'common', '知名的数字游戏平台，提供游戏购买、下载更新、云存档、好友互动和社区功能。', '官方最新版', '以官网为准', 'Windows', 'images/steam.png', 'https://store.steampowered.com/about/', 21),
  ('t-23', 'UU加速器', 'common', '网易出品的游戏网络加速工具，可降低延迟与丢包，支持多款国内外热门游戏。', '官方最新版', '以官网为准', 'Windows', 'images/uu.png', 'https://uu.163.com/download/', 22);
