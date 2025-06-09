// /app/api/find_medication/route.js
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";

export async function POST(req) {
  try {
    const body = await req.json();
    const { critizen_id } = body;

    if (!critizen_id) {
      return Response.json({ message: "critizen_id is required" }, { status: 400 });
    }

    await connectMongoDB();
    const patient = await Patient.findOne({ critizen_id }).select("medications");

    if (!patient) {
      return Response.json({ message: "Patient not found" }, { status: 404 });
    }

    return Response.json({ medications: patient.medications || [] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching medications:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
