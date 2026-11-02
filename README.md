# 工具库 · 软件下载中心

一个部署在 Cloudflare Pages 上的软件下载导航站。前台展示工具卡片，后台支持登录后对分类和工具做增删改查，图标可上传到 R2。

## 线上环境

| 项目 | 地址 / 配置 |
|---|---|
| 前台 | https://download-center-385.pages.dev |
| 后台 | https://download-center-385.pages.dev/admin.html |
| Pages 项目 | `download-center` |
| D1 数据库 | `download-center-db` |
| R2 桶 | `download-center`（公共地址 `https://data.334344.xyz/`） |

## 技术栈

- **Pages** 托管静态前端（`index.html` / `admin.html`）
- **Pages Functions**（即 Workers）提供 `/api/*` 接口
- **D1**（SQLite）存储分类与工具数据
- **R2** 存储管理员上传的图标/文件
- **wrangler 4** 负责本地开发与部署
- 认证：管理密码 + HttpOnly 签名 Cookie

## 目录结构

```
├─ index.html / admin.html      前台 / 后台页面
├─ script.js / admin.js         前台 / 后台逻辑
├─ style.css / admin.css        样式
├─ images/                      静态图标（历史数据仍引用这里的相对路径）
├─ functions/
│  ├─ api/tools.js              GET  工具列表（支持 ?category= & ?q=）
│  ├─ api/categories.js         GET  分类列表
│  ├─ api/auth/                 登录 / 退出
│  └─ api/admin/                分类、工具增删改、文件上传
├─ schema.sql                   数据库结构
├─ seed.sql                     初始数据（由脚本生成）
├─ scripts/make-seed.mjs        从 script.js 旧数据生成 seed.sql（一次性）
├─ wrangler.toml                部署配置（D1 / R2 绑定、环境变量）
└─ .assetsignore                部署时排除的文件（node_modules、SQL、脚本等）
```

## 本地开发

需要 Node.js 20+。

1. 安装依赖：`npm install`
2. 登录 Cloudflare：`npx wrangler login`
3. 创建 D1 数据库并拿到 `database_id`：
   ```bash
   npx wrangler d1 create download-center-db
   ```
   把输出的 `database_id` 填入 [wrangler.toml](wrangler.toml)。已创建过的跳过。
4. 创建 R2 桶：`npx wrangler r2 bucket create download-center`
5. 在项目根目录新建 `.dev.vars`（已 gitignore）：
   ```
   ADMIN_PASSWORD=你的管理密码
   SESSION_SECRET=一段很长的随机字符串
   R2_PUBLIC_URL=https://你的R2公共访问地址/
   ```
   > `R2_PUBLIC_URL` 需要先在 Cloudflare 控制台把 R2 桶设为 Public access（或绑定自定义域名）。
6. 初始化本地数据库：
   ```bash
   npx wrangler d1 execute download-center-db --local --file=schema.sql
   npx wrangler d1 execute download-center-db --local --file=seed.sql
   ```
7. 启动：`npm run dev`，访问 `http://localhost:8788`。

## 部署到 Cloudflare

### 方式 A：wrangler 命令行（当前使用）

首次部署：

```bash
npx wrangler pages project create download-center --production-branch main
```

初始化线上数据库（只执行一次）：

```bash
npx wrangler d1 execute download-center-db --remote --file=schema.sql
npx wrangler d1 execute download-center-db --remote --file=seed.sql
```

部署：

```bash
npx wrangler pages deploy . --project-name download-center --branch main --commit-dirty=true
```

设置密钥（首次部署后项目已存在才能执行）：

```bash
npx wrangler pages secret put ADMIN_PASSWORD --project-name download-center
npx wrangler pages secret put SESSION_SECRET --project-name download-center
```

> ⚠️ **修改密钥或环境变量后必须重新执行一次 `pages deploy` 才会生效。**
>
> ⚠️ `schema.sql` 开头包含 `DROP TABLE`，**只能在首次初始化时执行一次**；之后修改表结构请单独写迁移 SQL，避免清空线上数据。

`wrangler.toml` 中需要填写的值：

- `database_id`：D1 数据库创建后返回的 ID
- `R2_PUBLIC_URL`：R2 公共访问地址，结尾带 `/`
- `ADMIN_PASSWORD`、`SESSION_SECRET` 不要写入 `wrangler.toml`，用上面的 secret 命令设置

### 方式 B：Git 集成

1. 把仓库推到 GitHub/GitLab，在 Cloudflare Pages 新建项目并连接仓库。
2. 构建命令留空、输出目录填 `.`。
3. 在 **Settings → Functions → D1/R2 database bindings** 绑定：
   - 变量名 `DB` → 你的 D1 数据库
   - 变量名 `BUCKET` → 你的 R2 桶
4. 在 **Settings → Environment variables** 添加 `R2_PUBLIC_URL`，以及用 **加密** 方式添加 `ADMIN_PASSWORD`、`SESSION_SECRET`。
5. 首次部署后，执行远程迁移与灌数据：
   ```bash
   npx wrangler d1 execute download-center-db --remote --file=schema.sql
   npx wrangler d1 execute download-center-db --remote --file=seed.sql
   ```

### 自定义域名

1. 在 Pages 项目 → **Custom domains** 添加域名（如 `dl.334344.xyz`），等待状态变为 Active。
2. 保持 R2 的 `data.334344.xyz` 不动，图标上传会继续使用它。

## 后台安全建议

WAF 规则只对经过自定义域名的流量生效，`*.pages.dev` 默认域名不经过 WAF。

在 Cloudflare 控制台 → 域名 → **Security → WAF → Custom rules** 新建规则，表达式：

```
(http.request.uri.path eq "/admin.html") or (starts_with(http.request.uri.path, "/api/admin/"))
```

动作选择 **Managed Challenge（托管质询）**。效果：

- 后台页面和 `/api/admin/*` 需先通过人机验证，验证失败无法进入
- 前台页面和 `/api/tools`、`/api/categories` 不受影响

> `*.pages.dev` 地址仍可绕过该规则（但仍需登录密码），建议只对外公布自定义域名，或使用 Cloudflare Access 保护整个 Pages 项目。

## 接口一览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/tools` | 工具列表，`?category=&q=` 筛选 |
| GET | `/api/categories` | 分类列表（含数量） |
| POST | `/api/auth/login` | 登录，返回 Set-Cookie |
| POST | `/api/auth/logout` | 退出 |
| GET/POST | `/api/admin/tools` | 工具列表 / 新增 |
| PUT/DELETE | `/api/admin/tools/:id` | 修改 / 删除工具 |
| GET/POST | `/api/admin/categories` | 分类列表 / 新增 |
| PUT/DELETE | `/api/admin/categories/:id` | 修改 / 删除分类 |
| POST | `/api/admin/upload` | 上传文件到 R2，返回 URL |

除 `/api/auth/*` 外，`/api/admin/*` 均需登录态，未登录返回 401。

## 常见问题

- **后台登录一直提示密码错误**：确认 `ADMIN_PASSWORD` 已设置，且设置后重新部署过。
- **改了代码但线上没变化**：先 `Ctrl + F5` 强制刷新；确认部署命令输出 `Deployment complete`。
- **后台弹窗一进来就显示**：已于 `admin.css` 增加 `[hidden] { display: none !important; }`，如仍出现请强制刷新。
- **`wrangler` 报 `fetch failed`**：多为网络问题，重试即可；也建议保持 wrangler 为最新版本。
