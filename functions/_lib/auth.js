// 认证共享工具：密码校验、会话签名 cookie 的签发与校验
const encoder = new TextEncoder();

async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

// 常数时间比较，避免时序侧信道
export async function safeEqual(a, b) {
  const ea = encoder.encode(a);
  const eb = encoder.encode(b);
  if (ea.length !== eb.length) return false;
  let diff = 0;
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i];
  return diff === 0;
}

export function sessionCookie(value, maxAge, request) {
  const parts = [`admin=${value}`, "HttpOnly", "Path=/", "SameSite=Lax"];
  if (request.url.startsWith("https://")) parts.push("Secure");
  if (maxAge != null) parts.push(`Max-Age=${maxAge}`);
  return parts.join("; ");
}

export async function signSession(env, expires) {
  const secret = env.SESSION_SECRET || "";
  const sig = await hmacHex(secret, String(expires));
  return `${expires}.${sig}`;
}

export async function verifySession(request, env) {
  const secret = env.SESSION_SECRET || "";
  if (!secret) return false;
  const token = parseCookies(request.headers.get("Cookie") || "").admin;
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return false;
  const expires = Number(token.slice(0, dot));
  const sig = token.slice(dot + 1);
  if (!Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = await hmacHex(secret, String(expires));
  return sig === expected;
}

// 管理端接口鉴权：未登录返回 401 响应，已登录返回 null
export async function requireAuth(request, env) {
  if (await verifySession(request, env)) return null;
  return Response.json(
    { ok: false, error: "未登录或登录已过期" },
    { status: 401 }
  );
}
