import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../../../../lib/mailer.js";

// Function to generate a secure token
function generateVerificationToken() {
  const array = new Uint8Array(16);
  globalThis.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Function to generate a unique referral code
function generateReferralCode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase(); // Generates an 8-character code
}

export async function POST(request) {
  try {
    const { email, password, username, phonenumber, referralCode } = await request.json();

    console.log("Referral code:", referralCode);

    if (!email || !password || !username || !phonenumber) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists by email or username
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json({ error: "User with this email already exists!" }, { status: 409 });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json({ error: "User with this username already exists!" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateVerificationToken();
    const newReferralCode = generateReferralCode();

    // Initialize referral earnings and wallet balance
    let referralEarnings = 0;
    let walletBalance = 0;

    // If a valid referral code is used, find the referring user
    if (referralCode) {
      console.log("Looking for referrer with code:", referralCode);
      const referrer = await User.findOne({ referralCode: referralCode });

      console.log("Referrer found:", referrer);

      if (referrer) {
        // Check if the referrer has not exceeded ₹1000 referral earnings
        if (referrer.referralEarnings < 1000) {
          // Add ₹50 to referrer’s earnings and update wallet balance
          const earningsToAdd = Math.min(50, 1000 - referrer.referralEarnings); // Ensure limit is not exceeded
          referrer.referralEarnings += earningsToAdd;
          referrer.walletBalance += earningsToAdd;
          await referrer.save();
          console.log("Referrer updated:", referrer);
        } else {
          console.log("Referrer has exceeded the referral earnings limit.");
        }
      } else {
        console.log("No referrer found with the provided referral code.");
      }
    }

    // Create a new user
    await User.create({
      email,
      password: hashedPassword,
      username,
      phonenumber,
      referralCode: newReferralCode,
      referralEarnings,
      walletBalance,
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    return NextResponse.json({ message: "Verification email sent! Please check your inbox." }, { status: 200 });

  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}