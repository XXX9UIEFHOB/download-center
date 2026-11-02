import { requireAuth } from "../../../_lib/auth.js";

// GET /api/admin/categories —— 管理端分类列表
export async function onRequestGet({ env, request }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;
  const { results } = await env.DB.prepare(
    `SELECT c.id, c.name, c.sort, COUNT(t.id) AS count
     FROM categories c LEFT JOIN tools t ON t.category_id = c.id
     GROUP BY c.id ORDER BY c.sort ASC, c.name ASC`
  ).all();
  return Response.json(results);
}

// POST /api/admin/categories —— 新增分类
export async function onRequestPost({ env, request }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !body.id || !body.name) {
    return Response.json(
      { ok: false, error: "分类 ID 和名称为必填项" },
      { status: 400 }
    );
  }

  try {
    await env.DB.prepare(
      "INSERT INTO categories (id, name, sort) VALUES (?, ?, ?)"
    )
      .bind(body.id.trim(), String(body.name).trim(), Number(body.sort) || 0)
      .run();
  } catch {
    return Response.json(
      { ok: false, error: "分类 ID 已存在" },
      { status: 409 }
    );
  }

  return Response.json({ ok: true, id: body.id });
}
