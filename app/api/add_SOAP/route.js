import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Patient from '@/models/patient';

export async function POST(req) {
  try {
    const { critizen_id, soap } = await req.json();

    if (
      !critizen_id ||
      !soap ||
      !soap.subjective ||
      !soap.objective ||
      !soap.assessment ||
      !soap.plan
    ) {
      return NextResponse.json({ message: "Missing or invalid SOAP data" }, { status: 400 });
    }

    await connectMongoDB();
    const now = new Date();
    const formattedDateTime = now.toLocaleString("th-TH", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const soapEntry = {
      subjective: soap.subjective,
      objective: soap.objective,
      assessment: soap.assessment,
      plan: soap.plan,
      date: formattedDateTime
    };
    

    
    const updated = await Patient.findOneAndUpdate(
        { critizen_id },
        { $push: { soap: soapEntry } }, 
        { new: true }
      ).select('critizen_id name soap');
    console.log(soapEntry)
    if (!updated) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }
    
    return NextResponse.json({
      message: "SOAP added successfully",
      patient: updated
    });

  } catch (error) {
    console.error("Error in add-SOAP:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
