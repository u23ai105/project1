import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import { connectDB } from '../../../lib/db';

export async function GET(request) {
  await connectDB();

  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean(); // Convert Mongoose object to plain JSON for performance

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      email: user.email,
      username: user.username,
      phonenumber: user.phonenumber,
      walletBalance: user.walletBalance,
      referralCode: user.referralCode, // ✅ User's unique referral code
      referredBy: user.referredBy || null, // ✅ Who referred them
      referralEarnings: user.referralEarnings || 0, // ✅ Total earned from referrals
      cart: user.cart || [], // (Optional) User's cart details
      previousOrders: user.previousOrders || [], // (Optional) Order history
      currentOrders: user.currentOrders || [], // (Optional) Active orders
    }, { status: 200 });``
    
  } catch (error) {
    console.error('Error fetching user profile:', error);

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}