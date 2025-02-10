'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextInput from '../components/shared/textinput';
import Password from '../components/shared/password';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Manage loading state
  const router = useRouter();

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleLogin = async () => {
    setError('');
    if (!email) return setError('Email is required.');
    if (!isValidEmail(email)) return setError('Invalid email address.');
    if (!password) return setError('Password is required.');

    try {
      setLoading(true); // ✅ Start loading state

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false); // ✅ Stop loading after response

      if (response.ok) {
        router.push('/home');
      } else {
        setError(data.error || 'Invalid email or password');
      }
    } catch (error) {
      setLoading(false); // ✅ Stop loading on error
      console.error('Login error:', error);
      setError('Something went wrong. Please try again');
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96">
        <Image src="/icons/buddy.svg" alt="Helper Icon" width={160} height={80} priority />
        <div className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Log in to Helper Buddy</div>

        <div className="w-full mb-4">
          <TextInput label="Email Address" placeholder="name@domain.com" value={email} setValue={setEmail} />
          <div className="text-sm text-blue-600 hover:underline flex justify-start mt-1">
            <Link href="/mobile">log in with phone number</Link>
          </div>
        </div>

        <Password label="Password" placeholder="Enter your password" value={password} setValue={setPassword} className="mb-4" />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
          className={`bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Log In'} {/* ✅ Show loading text */}
        </button>

        <Link href="/forgot" className="mt-4 text-sm text-blue-600 hover:underline">
          Forgot your password?
        </Link>

        <div className="mt-6 text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up for Helper Buddy
          </Link>
        </div>
      </div>
    </div>
  );
}