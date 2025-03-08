import { NextResponse } from 'next/server';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import admin from '../../../../lib/firebaseAdmin';

export async function POST(request) {
  const { email, password } = await request.json();
  const auth = getAuth();

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send verification email
    await user.sendEmailVerification();

    return NextResponse.json({ message: 'User registered successfully. Verification email sent.' });
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return NextResponse.json({ error: 'Email is already in use. Please use a different email.' }, { status: 400 });
    }
    console.error('Error sending verification email:', error);
    return NextResponse.json({ error: 'An error occurred during registration. Please try again later.' }, { status: 500 });
  }
}