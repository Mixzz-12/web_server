import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";

export async function POST(req) {
  try {
    const { critizen_id } = await req.json();

    if (!critizen_id) {
      return NextResponse.json({ message: "Missing critizen_id" }, { status: 400 });
    }

    await connectMongoDB();

    // ✅ ใช้ .lean() เพื่อให้ได้ plain JS object (ไม่ใช่ Mongoose document)
    const patient = await Patient.findOne({ critizen_id }).lean();

    if (!patient) {
      return NextResponse.json({ found: false, message: "User not found" }, { status: 404 });
    }

    console.log("📦 patient.history from Mongo:", patient.history);

    return NextResponse.json({
      found: true,
      patient: {
        critizen_id: patient.critizen_id,
        name: patient.name,
        age: patient.age,
        height: patient.height,
        weight: patient.weight,
        gender: patient.gender,
        nation: patient.nation,
        religion: patient.religion,

        // ✅ แปลง medical เป็น plain object เสมอ
        history: Array.isArray(patient.history)
          ? patient.history.map((entry) => ({
              date: entry.date,
              medical: { ...entry.medical },
            }))
          : [],
      },
    });

  } catch (error) {
    console.error("❌ api search-user error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
