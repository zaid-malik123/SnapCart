import { connectDb } from "@/db/db";
import Order from "@/models/oder.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb()

        const {userId, items, paymentMethod, address, totalAmount} = await req.json()

        if(!userId || !items || !paymentMethod || !address || !totalAmount){
            return NextResponse.json(
                {message: "All fields are required"},
                {status: 400}
            )
        }
        const user = await User.findById(userId)

        if(!user) {
            return NextResponse.json(
                {message: "user not found"},
                {status: 400}
            )
        }

        const newOrder = await Order.create({
            user: user._id,
            items,
            paymentMethod,
            totalAmount,
            address
        })
        return NextResponse.json(
                {message: newOrder},
                {status: 201}
            )
        
    } catch (error) {
        return NextResponse.json(
                {message: error},
                {status: 500}
            )
    }
}