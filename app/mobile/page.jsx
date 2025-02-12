'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Password from '../components/shared/password';
import PhoneInput from '../components/shared/phoneinput'; // Import PhoneInput component
import Logo from '../../public/icons/buddy.svg';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Manage loading state
  const router = useRouter();
  const buttonRef = useRef(null);

  const isValidPhone = (phone) => phone.length === 10;

  const handleLogin = async () => {
    setError('');
    if (!phone) return setError('phone number is required.');
    if (!isValidPhone(phone)) return setError('Invalid phone number.');
    if (!password) return setError('Password is required.');

    try {
      setLoading(true); // ✅ Start loading state

      const response = await fetch('/api/auth/mobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();
      setLoading(false); // ✅ Stop loading after response

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.error || 'Invalid phone number or password');
      }
    } catch (error) {
      setLoading(false); // ✅ Stop loading on error
      console.error('Login error:', error);
      setError('Something went wrong. Please try again');
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    };

    const handleMouseLeave = () => {
      const button = buttonRef.current;
      if (!button) return;

      button.style.transform = 'translate(0, 0)';
    };

    const button = buttonRef.current;
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-96">
        <Link href='/'><Logo width={160} height={80} priority /></Link>
        <div className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Log in to Helper Buddy</div>

        <div className="w-full mb-4">
          <PhoneInput label="Phone Number" placeholder="Enter your phone number" value={phone} setValue={setPhone} />
          <div className="text-sm text-blue-600 hover:underline flex justify-start mt-1">
            <Link href="/login">log in with email</Link>
          </div>
        </div>

        <Password label="Password" placeholder="Enter your password" value={password} setValue={setPassword} className="mb-4" />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          ref={buttonRef}
          onClick={handleLogin}
          disabled={loading} // Disable button when loading
          className={`magnetic-button bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full transition duration-200 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
        >
          <span>{loading ? 'Logging in...' : 'Log In'}</span> {/* ✅ Show loading text */}
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

      <style jsx>{`
        .magnetic-button {
          position: relative;
          display: inline-block;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .magnetic-button span {
          display: inline-block;
          transition: transform 0.2s ease;
        }

        .magnetic-button:hover span {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}