import { requireAuth } from "../../../_lib/auth.js";

// GET /api/admin/tools —— 管理端列表（全量）
export async function onRequestGet({ env, request }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;
  const { results } = await env.DB.prepare(
    `SELECT t.*, c.name AS category_name
     FROM tools t JOIN categories c ON t.category_id = c.id
     ORDER BY c.sort ASC, t.sort ASC, t.name ASC`
  ).all();
  return Response.json(results);
}

// POST /api/admin/tools —— 新增工具
export async function onRequestPost({ env, request }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.category_id || !body.url) {
    return Response.json(
      { ok: false, error: "名称、分类、下载链接为必填项" },
      { status: 400 }
    );
  }

  const id = body.id || crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO tools (id, name, category_id, description, version, size, platform, icon, url, sort)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      id,
      String(body.name).trim(),
      body.category_id,
      body.description || "",
      body.version || "官方最新版",
      body.size || "以官网为准",
      body.platform || "Windows",
      body.icon || "",
      String(body.url).trim(),
      Number(body.sort) || 0
    )
    .run();

  return Response.json({ ok: true, id });
}
