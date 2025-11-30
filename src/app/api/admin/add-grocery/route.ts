import { auth } from "@/auth";
import { connectDb } from "@/db/db";
import { uploadOnCloudinaryImage } from "@/lib/cloudinary";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const session = await auth()

        if(session?.user?.role != "admin"){
            return NextResponse.json({message: "You are not admin"}, {status: 400})
        }

        const formData = await req.formData()
        const name = formData.get("name") as string
        const category = formData.get("category") as string
        const unit = formData.get("unit") as string
        const price = formData.get("price") as string
        const file = formData.get("image") as Blob | null
        let imageUrl; 
        if(file){
          imageUrl = await uploadOnCloudinaryImage(file)
        }

        const grocery = await Grocery.create({
            name,
            category, 
            unit,
            price,
            image: imageUrl
        })

        return NextResponse.json(grocery, {status: 201})

    } catch (error) {
        return NextResponse.json(error, {status: 500})
    }
}