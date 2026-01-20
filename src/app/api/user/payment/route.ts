import { connectDb } from "@/db/db";
import Order from "@/models/oder.model";
import { User } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `${process.env.NEXT_BASE_URL}/user/order-success`,
            cancel_url: `${process.env.NEXT_BASE_URL}/user/order-cancel`,
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "SnapCard Order Payment"
                        },
                        unit_amount: totalAmount * 100,
                    },
                    quantity: 1
                }
            ],
            metadata: {orderId: newOrder._id}

        })

        return NextResponse.json({url: session.url}, {status: 200})
    } catch (error) {
        return NextResponse.json(
                {message: error},
                {status: 500}
            )
    }
}