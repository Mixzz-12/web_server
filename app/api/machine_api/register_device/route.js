import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const { username, password, device_id, role } = await req.json();

    if (!username || !password || !device_id || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectMongoDB();

    let user = await User.findOne({ username });

    if (user) {
      // ✅ ถ้า user มีอยู่ --> Update device_id และ role
      user.device_id = device_id;
      user.role = role;
      await user.save();
      
      return NextResponse.json({ message: "User updated successfully" });
    } else {
      // ✅ ถ้า user ไม่มี --> Create ใหม่
      const newUser = new User({
        name: username,
        password: password,
        device_id: device_id,
        role: role,
      });
      await newUser.save();

      return NextResponse.json({ message: "Device registered successfully" });
    }

  } catch (error) {
    console.error("❌ Register/Update device error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
