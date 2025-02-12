import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
    const body = await request.json();
    console.log("Request body:", body);
    const { amount, currency, receipt, payment_capture } = body;
    console.log("Amount:", amount);
    console.log("Currency:", currency);
    console.log("Receipt:", receipt);
    console.log("Payment capture:", payment_capture);
    const options = {
        amount: amount,
        currency: currency,
        receipt: receipt,
        payment_capture: payment_capture,
    };
    try {
        const order = await razorpay.orders.create({
            amount: options.amount,
            currency: options.currency,
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        });
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
}