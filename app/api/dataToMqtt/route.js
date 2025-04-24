import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Patient from "@/models/patient";

export async function POST(req) {
    try {
        const data = await req.json()
        const { critizen_id} = data


    }catch(error){

    }

}


