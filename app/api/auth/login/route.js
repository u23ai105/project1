import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/db"; // Adjust based on folder depth
import User from "../../../../models/User";

export const runtime = "nodejs";

await connectDB();

const JWT_SECRET = process.env.JWT_SECRET || "thisKeyIsSupposedToBeSecret";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request body:", body);

    const { email, password } = body; // Use email instead of identifier

    console.log("Email:", email);
    console.log("Password:", password);

    // Find user by email or username
    const user = await User.findOne({ $or: [{ email: email }, { username: email }] });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
    }

    console.log("User found:", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
    }

    console.log("Password is valid");

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "15d" });

    // const cookieStore = cookies();
    // cookieStore.set("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 60 * 60 * 24 * 15,
    //   path: "/",
    // });

    const response = NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: false, // Change to true if you don’t need access from frontend
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 15,
      path: "/",
    });

    console.log(response.cookies.get("token"));

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}