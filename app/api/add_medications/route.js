import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Patient from '@/models/patient';

export async function POST(req) {
  try {
    const { critizen_id, medication } = await req.json();

    if (!critizen_id || !Array.isArray(medication)) {
      return NextResponse.json({ message: "Missing or invalid data" }, { status: 400 });
    }

    await connectMongoDB();

    // แปลง medications array → เป็น object สำหรับ medical ใน history
    const medicalData = {};
    medication.forEach((med) => {
      if (med.name && med.quantity) {
        // ดึงเลขจากจำนวน เช่น "1 เม็ด" → 1
        const amount = parseInt(med.quantity);
        if (!isNaN(amount)) {
          medicalData[med.name] = amount;
        }
      }
    });

    const historyEntry = {
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      medical: medicalData
    };

    // อัปเดตทั้ง medications และเพิ่ม history พร้อมกัน
    const updated = await Patient.findOneAndUpdate(
      { critizen_id },
      {
        $set: { medications: medication },
        $push: { history: historyEntry }
      },
      { new: true }
    ).select('critizen_id name medications history');

    if (!updated) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Medications updated & history recorded",
      patient: updated
    });

  } catch (error) {
    console.error("Error in add-medication:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
