import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import user from "@/models/user"; // 

export async function POST(req) {
    try {
        await connectMongoDB()
        const {user} = await req.json()
        console.log("User : ", user)
        return NextResponse.json({user})
    }catch (error) {
        console.log("user not found", error)
    }
}
