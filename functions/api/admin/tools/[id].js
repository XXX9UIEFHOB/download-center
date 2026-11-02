import { requireAuth } from "../../../_lib/auth.js";

// PUT /api/admin/tools/:id —— 修改工具
export async function onRequestPut({ env, request, params }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const body = await request.json().catch(() => null);
  if (!body || !body.name || !body.category_id || !body.url) {
    return Response.json(
      { ok: false, error: "名称、分类、下载链接为必填项" },
      { status: 400 }
    );
  }

  const result = await env.DB.prepare(
    `UPDATE tools SET
       name = ?, category_id = ?, description = ?, version = ?,
       size = ?, platform = ?, icon = ?, url = ?, sort = ?,
       updated_at = datetime('now')
     WHERE id = ?`
  )
    .bind(
      String(body.name).trim(),
      body.category_id,
      body.description || "",
      body.version || "官方最新版",
      body.size || "以官网为准",
      body.platform || "Windows",
      body.icon || "",
      String(body.url).trim(),
      Number(body.sort) || 0,
      params.id
    )
    .run();

  if (result.meta.changes === 0) {
    return Response.json({ ok: false, error: "工具不存在" }, { status: 404 });
  }
  return Response.json({ ok: true });
}

// DELETE /api/admin/tools/:id —— 删除工具
export async function onRequestDelete({ env, request, params }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const result = await env.DB.prepare("DELETE FROM tools WHERE id = ?")
    .bind(params.id)
    .run();
  if (result.meta.changes === 0) {
    return Response.json({ ok: false, error: "工具不存在" }, { status: 404 });
  }
  return Response.json({ ok: true });
}
