import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";



export async function POST(req) {
    const data = await req.json()
    const { citizen_id } = data

    if (!citizen_id) {
        NextResponse.json({message:"Missing citizen_id"}, {status:400})  
    }

    await connectMongoDB()

    const existingClient = await Patient.findOne({citizen_id})

    if (existingClient) {
        return NextResponse.json({
            message:"Client already exists",
            client: existingClient
        }, {status:200})
    }

    const newClient = new Patient({...data, history:[]})
    await newClient.save()

    return NextResponse.json({
        message: "Patient added successfully"
    })



}
