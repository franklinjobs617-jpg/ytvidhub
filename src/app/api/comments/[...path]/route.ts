// 评论 API 公开代理（免登录）。
// ⚠️ 本目录下只能有这一个 route 文件（[...path] catch-all），
//    再添加静态路由（如 /api/comments/health）会导致 Next 构建冲突。
//
// 白名单校验 + 转发到 Flask 后端 ${FLASK_BACKEND}/api/v1/<path>。
// 后端错误体已是规范形状 {"error": {code, reason, message}}，直接透传。
import { NextRequest, NextResponse } from "next/server";
import { FLASK_BACKEND } from "@/lib/backend";

const VIDEO_ID = "[A-Za-z0-9_-]{6,16}";
const COMMENT_ID = "[A-Za-z0-9_.\\-]{8,160}";

// 允许的 (方法, 路径模式) 白名单 —— 防开放代理滥用
const WHITELIST: Array<{ method: string; pattern: RegExp }> = [
  { method: "POST", pattern: new RegExp(`^resolve$`) },
  { method: "POST", pattern: new RegExp(`^videos/${VIDEO_ID}/fetch$`) },
  { method: "POST", pattern: new RegExp(`^resolve/comment$`) },
  { method: "GET", pattern: new RegExp(`^videos/${VIDEO_ID}$`) },
  { method: "GET", pattern: new RegExp(`^videos/${VIDEO_ID}/fetch/status$`) },
  { method: "GET", pattern: new RegExp(`^videos/${VIDEO_ID}/comments$`) },
  { method: "GET", pattern: new RegExp(`^videos/${VIDEO_ID}/stats$`) },
  { method: "GET", pattern: new RegExp(`^videos/${VIDEO_ID}/stats/graph$`) },
  { method: "GET", pattern: new RegExp(`^comments/${COMMENT_ID}/replies$`) },
  { method: "DELETE", pattern: new RegExp(`^videos/${VIDEO_ID}/fetch$`) },
  { method: "DELETE", pattern: new RegExp(`^videos/${VIDEO_ID}$`) },
];

function isAllowed(method: string, path: string): boolean {
  return WHITELIST.some((w) => w.method === method && w.pattern.test(path));
}

async function proxy(req: NextRequest, method: string, path: string) {
  // 后端地址 + 查询串（保持编码，minDate/maxDate 等大数字原样转发）
  const backendUrl = new URL(`${FLASK_BACKEND}/api/v1/${path}`);
  for (const [k, v] of req.nextUrl.searchParams) {
    backendUrl.searchParams.append(k, v);
  }

  const headers: Record<string, string> = {};
  let body: BodyInit | undefined;
  if (method === "POST" || method === "DELETE") {
    // 请求体都很小（{url}），整读避免 duplex 问题
    const text = await req.text().catch(() => "");
    if (text) {
      headers["content-type"] =
        req.headers.get("content-type") ?? "application/json";
      body = text;
    }
  }

  const upstream = await fetch(backendUrl.toString(), {
    method,
    headers,
    body,
  });

  // 流式透传（大 graph 数组不二次缓冲）
  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function handler(
  req: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  try {
    // Next 16: 动态路由 params 是 Promise
    const { path } = await ctx.params;
    const joined = path.join("/");
    const method = req.method;

    if (!isAllowed(method, joined)) {
      // 路径存在但方法不符 → 405；完全不在白名单 → 404
      const pathKnown = WHITELIST.some((w) => w.pattern.test(joined));
      return NextResponse.json(
        {
          error: {
            code: pathKnown ? 405 : 404,
            reason: pathKnown ? "methodNotAllowed" : "notFound",
            message: pathKnown
              ? "Method not allowed for this comments API path"
              : "Not a valid comments API path",
          },
        },
        { status: pathKnown ? 405 : 404 }
      );
    }

    return await proxy(req, method, joined);
  } catch (error) {
    console.error("Comments API proxy error:", error);
    return NextResponse.json(
      {
        error: {
          code: 500,
          reason: "internal",
          message: `Internal server error: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      },
      { status: 500 }
    );
  }
}

export { handler as GET, handler as POST, handler as DELETE };
