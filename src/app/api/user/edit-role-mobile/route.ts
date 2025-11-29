import { auth } from "@/auth";
import { connectDb } from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    await connectDb()
    try {
        const { role, mobile } = await req.json()
        
        const session = await auth()

        const user = await User.findById(session?.user?.id)
        if(!user){
            return NextResponse.json({message: "User does not exist"}, {status: 400})
        }

        user.role = role
        user.mobile = mobile
        await user.save()

        return NextResponse.json(user, {status: 200})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error}, {status: 500})
       
    }

}