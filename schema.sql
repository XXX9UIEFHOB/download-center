-- 下载中心 D1 数据库结构
-- 执行：npx wrangler d1 execute <db-name> --remote --file=schema.sql

DROP TABLE IF EXISTS tools;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id    TEXT PRIMARY KEY,               -- slug，如 "remote"
  name  TEXT NOT NULL,                  -- 显示名，如 "远程工具"
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE tools (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT NOT NULL DEFAULT '',
  version     TEXT NOT NULL DEFAULT '官方最新版',
  size        TEXT NOT NULL DEFAULT '以官网为准',
  platform    TEXT NOT NULL DEFAULT 'Windows',
  icon        TEXT NOT NULL DEFAULT '', -- 图标 URL（R2 链接或 Pages 静态路径）
  url         TEXT NOT NULL,            -- 下载链接
  sort        INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_tools_category ON tools(category_id);
