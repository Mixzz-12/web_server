import NextAuth from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"; // ✅ ชื่อไฟล์เป็น user.js (ตัวเล็ก)

export const { auth, handlers } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        user: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("AUTH CREDENTIALS (server):", credentials);
        if (!credentials?.user || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        console.log("Connecting to MongoDB...");
        await connectMongoDB();
        console.log("Looking for user:", credentials.user);
        
        const user = await User.findOne({ name: credentials.user });
        console.log("User from DB:", user);
        if (!user || user.password !== credentials.password) {
          console.log("Login failed: user not found or password mismatch");
          return null;
        }

        console.log("Login success!");
        return {
          id: user._id.toString(),
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
