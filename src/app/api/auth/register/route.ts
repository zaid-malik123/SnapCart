import { connectDb } from "@/db/db";
import User from "@/models/user.model";
import next from "next";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
try {
    await connectDb()
    const { name, email, password } = await req.json()

    const isExist = await User.findOne({email})
    if(isExist){
        return NextResponse.json({message: "User already exist"},{status:400} )
    }
    if(password.length < 6){
        return NextResponse.json({message: "Password must be atleast 6 characters or long"},{status:400} )
    }
   const hash = await bcrypt.hash(password, 10)

   const user = await User.create({
    name,
    email,
    password: hash,
   })

   return NextResponse.json({message: user}, {status:201})

} catch (error) {
    return NextResponse.json({message: error},{status:400})
}
    

}