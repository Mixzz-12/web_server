// middleware.js
import { middleware as authMiddleware } from "./auth.middleware";

export const config = {
  matcher: ["/welcome", "/welcome/:path*", "/client/:path*"], // หรือใช้ ["/welcome", "/dashboard/:path*"]
};

export default authMiddleware;
