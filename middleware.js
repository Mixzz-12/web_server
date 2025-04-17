// middleware.js
import { middleware  } from "./auth.middleware";

export const config = {
  matcher: ["/welcome"], // ✅ หรือใช้ ["/welcome", "/dashboard/:path*"]
};

export default middleware;
