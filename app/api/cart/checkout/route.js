import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../models/User';
import { connectDB } from '../../../../lib/db';

export async function POST(request) {
  await connectDB();

  try {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Move all cart items to currentOrders
    user.currentOrders.push(...user.cart);
    // Clear the cart
    user.cart = [];
    await user.save();

    return NextResponse.json({ message: "Checkout successful", orders: user.currentOrders });
  } catch (error) {
    console.error("Error in checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}