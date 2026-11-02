import { safeEqual, signSession, sessionCookie } from "../../_lib/auth.js";

const SESSION_MAX_AGE = 7 * 24 * 60 * 60; // 7 天

// POST /api/auth/login —— 校验管理密码，签发会话 cookie
export async function onRequestPost({ env, request }) {
  let password = "";
  try {
    ({ password } = await request.json());
  } catch {
    return Response.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }

  const expected = env.ADMIN_PASSWORD || "";
  if (!expected || !(await safeEqual(String(password), expected))) {
    return Response.json({ ok: false, error: "密码错误" }, { status: 401 });
  }

  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const token = await signSession(env, expires);
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": sessionCookie(token, SESSION_MAX_AGE, request),
      },
    }
  );
}
