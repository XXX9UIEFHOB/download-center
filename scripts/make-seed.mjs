// 从 script.js 里的硬编码数据生成 seed.sql（一次性迁移用）
// 用法：node scripts/make-seed.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const src = readFileSync(resolve(root, "script.js"), "utf8");

function extractArray(name) {
  const marker = `const ${name} = [`;
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`未找到 ${marker}`);
  const bodyStart = start + marker.length;
  const end = src.indexOf("];", bodyStart);
  if (end === -1) throw new Error(`${name} 数组未闭合`);
  const expr = src.slice(bodyStart, end);
  return new Function(`return [${expr}];`)();
}

function escapeSql(s) {
  return String(s ?? "").replace(/'/g, "''");
}

// 过滤掉前端专用的“全部工具”伪分类
const categories = extractArray("categories").filter((c) => c.id !== "all");
const tools = extractArray("tools");

const lines = [];
lines.push("-- 由 scripts/make-seed.mjs 生成，勿手改");
lines.push("");

lines.push("INSERT INTO categories (id, name, sort) VALUES");
categories.forEach((c, i) => {
  const sep = i === categories.length - 1 ? ";" : ",";
  lines.push(`  ('${c.id}', '${escapeSql(c.name)}', ${i})${sep}`);
});

lines.push("");
lines.push(
  "INSERT INTO tools (id, name, category_id, description, version, size, platform, icon, url, sort) VALUES"
);
tools.forEach((t, i) => {
  const sep = i === tools.length - 1 ? ";" : ",";
  const icon = t.icon || "";
  lines.push(
    `  ('t-${i + 1}', '${escapeSql(t.name)}', '${escapeSql(t.category)}', '${escapeSql(t.description)}', '${escapeSql(t.version)}', '${escapeSql(t.size)}', '${escapeSql(t.platform)}', '${escapeSql(icon)}', '${escapeSql(t.url)}', ${i})${sep}`
  );
});

writeFileSync(resolve(root, "seed.sql"), lines.join("\n") + "\n", "utf8");
console.log(
  `已生成 seed.sql：分类 ${categories.length} 个，工具 ${tools.length} 个`
);
