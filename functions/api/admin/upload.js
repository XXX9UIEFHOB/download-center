import { requireAuth } from "../../_lib/auth.js";

// POST /api/admin/upload —— 上传文件到 R2，返回公开访问 URL
// 要求 R2 桶已开启 Public access（或绑定自定义域名），
// 并在环境变量 R2_PUBLIC_URL 配置公共访问根地址（结尾带 /）。
export async function onRequestPost({ env, request }) {
  const unauthorized = await requireAuth(request, env);
  if (unauthorized) return unauthorized;

  const base = (env.R2_PUBLIC_URL || "").trim();
  if (!base) {
    return Response.json(
      { ok: false, error: "服务端未配置 R2_PUBLIC_URL" },
      { status: 500 }
    );
  }

  const form = await request.formData().catch(() => null);
  const file = form && form.get("file");
  if (!file || typeof file === "string" || !(file instanceof File)) {
    return Response.json({ ok: false, error: "未选择文件" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext || "bin"}`;
  await env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || "application/octet-stream" },
  });

  const url = new URL(key, base.endsWith("/") ? base : base + "/").toString();
  return Response.json({ ok: true, url, key });
}
