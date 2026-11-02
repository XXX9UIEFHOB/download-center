import { sessionCookie } from "../../_lib/auth.js";

// POST /api/auth/logout —— 清除会话 cookie
export async function onRequestPost({ request }) {
  return new Response(null, {
    status: 204,
    headers: { "Set-Cookie": sessionCookie("", 0, request) },
  });
}
