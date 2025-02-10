import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'thisKeyIsSupposedToBeSecret';

// Ensure database connection
connectDB();

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const route = url.pathname.split('/').pop();
    const body = await request.json();

    switch (route) {
      case 'register':
        return handleRegister(body);
      case 'login':
        return handleLogin(body);
      default:
        return NextResponse.json({ error: 'Invalid route' }, { status: 404 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ✅ Handle User Registration
async function handleRegister(body) {
  const { email, password, username, phonenumber } = body;

  if (!email || !password || !username || !phonenumber) {
    return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 403 });
    }

    const userExistsPhone = await User.findOne({ phonenumber });
    if (userExistsPhone) {
      return NextResponse.json({ error: "A user with this phone number already exists" }, { status: 403 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, username, phonenumber });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '15d' });

    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;

    return NextResponse.json(userToReturn, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ✅ Handle User Login
async function handleLogin(body) {
  const { email, password } = body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 403 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15d' });
    const userToReturn = { ...user.toJSON(), token };
    delete userToReturn.password;

    // Set token in cookies
    const response = NextResponse.json(userToReturn);
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 15, // 15 days
      path: '/',
    });

    console.log("Login successful, token set in cookies");
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
