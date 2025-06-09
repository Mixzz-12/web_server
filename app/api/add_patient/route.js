import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";

export async function POST(req) {
  try {
    const data = await req.json();
    const { critizen_id } = data;

    if (!critizen_id) {
      return NextResponse.json({ message: "Missing critizen_id" }, { status: 400 });
    }

    await connectMongoDB();

    // ตรวจสอบว่ามี patient นี้อยู่แล้วหรือไม่
    const existingPatient = await Patient.findOne({ critizen_id });

    if (existingPatient) {
      // อัพเดตข้อมูล patient ด้วยข้อมูลใหม่ที่ส่งมา
      Object.assign(existingPatient, data);
      await existingPatient.save();

      return NextResponse.json({
        message: "Patient updated successfully",
        patient: existingPatient,
      }, { status: 200 });
    } else {
      // สร้าง patient ใหม่ถ้าไม่พบ
      const newPatient = new Patient({ ...data, history: [] });
      await newPatient.save();

      return NextResponse.json({
        message: "Patient added successfully",
        patient: newPatient,
      }, { status: 201 });
    }

  } catch (err) {
    console.error("❌ Error in add_patient:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
