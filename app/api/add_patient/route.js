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

    const existingPatient = await Patient.findOne({ critizen_id }).lean();

    if (existingPatient) {
      return NextResponse.json({
        message: "Patient already exists",
        patient: existingPatient,
      }, { status: 200 });
    }

    const newPatient = new Patient({ ...data, history: [] });
    await newPatient.save();

    return NextResponse.json({
      message: "Patient added successfully",
      patient: {
        critizen_id: newPatient.critizen_id,
        name: newPatient.name,
        age: newPatient.age,
        height: newPatient.height,
        weight: newPatient.weight,
        gender: newPatient.gender,
        nation: newPatient.nation,
        religion: newPatient.religion,
        history: [],
      },
    }, { status: 201 });

  } catch (err) {
    console.error("❌ Error in add_patient:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
