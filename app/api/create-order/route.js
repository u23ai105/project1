import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

await connectDB();

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, amount, currency, receipt, payment_capture, serviceId, title, discount = 0 } = body;

    if (!userId || !amount || !currency) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create order in Razorpay
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || "receipt_" + Math.random().toString(36).substring(7),
      payment_capture: payment_capture ?? 1, // Default to automatic capture
    });

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark order as completed in user's history
    const orderDetails = {
      serviceId: serviceId || null,
      title: title || "Service Purchase",
      price: amount / 100,
      discount,
      bookingDate: new Date(),
      bookingTime: "",
      status: "completed",
    };

    user.previousOrders.push(orderDetails);
    await user.save();

    // Referral Bonus Logic (only applies to first successful order)
    if (user.referredBy && user.previousOrders.length === 1) {
      const referrer = await User.findOne({ referralCode: user.referredBy });

      if (referrer && referrer.referralEarnings < 1000) {
        referrer.walletBalance += 100;
        referrer.referralEarnings += 100;
        await referrer.save();
      }
    }

    return NextResponse.json({ orderId: order.id, message: "Order placed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Order creation failed", details: error.message }, { status: 500 });
  }
}