// GET /api/categories —— 分类列表（含每个分类下的工具数量）
export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    `SELECT c.id, c.name, c.sort, COUNT(t.id) AS count
     FROM categories c LEFT JOIN tools t ON t.category_id = c.id
     GROUP BY c.id
     ORDER BY c.sort ASC, c.name ASC`
  ).all();
  return Response.json(results);
}
