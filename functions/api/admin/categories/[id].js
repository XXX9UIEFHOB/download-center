import { requireAuth } from "../../../_lib/auth.js";

// PUT /api/admin/categories/:id —— 修改分类
export async function onRequestPut({ env, request, params }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !body.name) {
    return Response.json({ ok: false, error: "分类名称为必填项" }, { status: 400 });
  }

  const result = await env.DB.prepare(
    "UPDATE categories SET name = ?, sort = ? WHERE id = ?"
  )
    .bind(String(body.name).trim(), Number(body.sort) || 0, params.id)
    .run();

  if (result.meta.changes === 0) {
    return Response.json({ ok: false, error: "分类不存在" }, { status: 404 });
  }
  return Response.json({ ok: true });
}

// DELETE /api/admin/categories/:id —— 删除分类（有工具时拒绝）
export async function onRequestDelete({ env, request, params }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const { results } = await env.DB.prepare(
    "SELECT COUNT(*) AS c FROM tools WHERE category_id = ?"
  )
    .bind(params.id)
    .all();
  if (results[0].c > 0) {
    return Response.json(
      { ok: false, error: "该分类下仍有工具，请先删除或移动它们" },
      { status: 400 }
    );
  }

  const result = await env.DB.prepare("DELETE FROM categories WHERE id = ?")
    .bind(params.id)
    .run();
  if (result.meta.changes === 0) {
    return Response.json({ ok: false, error: "分类不存在" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
