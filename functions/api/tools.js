// GET /api/tools —— 公开工具列表，支持 ?category= 和 ?q= 筛选
export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const category = (url.searchParams.get("category") || "").trim();
  const q = (url.searchParams.get("q") || "").trim().toLowerCase();

  let sql = `SELECT t.*, c.name AS category_name
             FROM tools t JOIN categories c ON t.category_id = c.id`;
  const where = [];
  const params = [];

  if (category && category !== "all") {
    where.push("t.category_id = ?");
    params.push(category);
  }
  if (q) {
    where.push("(lower(t.name) LIKE ? OR lower(t.description) LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
  }
  if (where.length) sql += " WHERE " + where.join(" AND ");
  sql += " ORDER BY c.sort ASC, t.sort ASC, t.name ASC";

  const { results } = await env.DB.prepare(sql).bind(...params).all();
  return Response.json(results);
}
