// Flask 后端地址（新增约定，仅评论 API 代理使用）
// 本地开发默认 localhost:5000；生产部署时必须设置环境变量:
//   FLASK_BACKEND_URL=https://ytdlp.vistaflyer.com
export const FLASK_BACKEND =
  process.env.FLASK_BACKEND_URL ?? "http://localhost:5000";
