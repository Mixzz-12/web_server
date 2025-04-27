import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user"; // <-- U ใหญ่

export async function POST(req) {
  try {
    const { name, password, device_id, role } = await req.json(); // << ชื่อที่ ESP32 ส่งมา: device_id

    if (!name || !password || !device_id || !role) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await connectMongoDB();

    const user = await User.findOne({ name });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // ✅ Map ค่า device_id --> deviceId
    user.device_id = device_id;
    user.role = role
    await user.save();

    return NextResponse.json({ message: "Device registered successfully" });
  } catch (error) {
    console.error("❌ Register device error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
