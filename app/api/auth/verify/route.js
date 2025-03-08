import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    // ✅ Fix the redirection issue
    return NextResponse.redirect(new URL("/verify-email", request.url).toString());
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
