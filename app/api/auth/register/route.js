import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { connectDB } from '../../../../lib/db';
import User from '../../../../models/User';

export const runtime = "nodejs";

await connectDB();

const JWT_SECRET = process.env.JWT_SECRET || 'thisKeyIsSupposedToBeSecret';

export async function POST(request) {
  try {
    const { email, password, username, phonenumber } = await request.json();

    if (!email || !password || !username || !phonenumber) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 403 });
    }

    const userExistsPhone = await User.findOne({ phonenumber });
    if (userExistsPhone) {
      return NextResponse.json({ error: "A user with this phone number already exists" }, { status: 403 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      phonenumber
    });

    // Generate token
    const token = await new SignJWT({ userId: newUser._id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15d")
      .sign(new TextEncoder().encode(JWT_SECRET));

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return NextResponse.json(userToReturn, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}