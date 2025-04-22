// middleware.js
import { middleware as authMiddleware } from "./auth.middleware";

export const config = {
  matcher: ["/welcome:path*"], // หรือใช้ ["/welcome", "/dashboard/:path*"]
};

export default authMiddleware;
