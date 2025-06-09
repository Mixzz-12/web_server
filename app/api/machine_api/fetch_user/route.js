import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import user from "@/models/user";

export async function POST(req) {
    try {
        const {critizen_id } = await req.json()
        if (!critizen_id ) {
            return NextResponse.json({message:"Missing name"}, {status:400})
        }

        await connectMongoDB()

        const User_find = await user.findOne({name: critizen_id})
        if (!User_find) {
            return NextResponse.json({found:false, message:"name not found"}, {status:404})
        }

        return NextResponse.json({
            found:true,
            User_find:{
                name: User_find.name,
                device_id: User_find.device_id,
                medications: User_find.medications || [],
            }
        })
        console.log(medications)
    }catch(err){
        console.error("api search-user error:", err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


