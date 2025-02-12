'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextInput from '../components/shared/textinput';
import Password from '../components/shared/password';
import PhoneInput from '../components/shared/phoneinput';
import Logo from '../../public/icons/buddy.svg';

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [hasLetter, setHasLetter] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecial, setHasSpecial] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const buttonRef = useRef(null);

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPhone = (phone) => phone.length === 10;

  const validatePassword = (password) => {
    setHasLetter(/[a-zA-Z]/.test(password));
    setHasNumber(/[0-9]/.test(password));
    setHasSpecial(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  const handleSignUp = async () => {
    setError('');

    if (!username) return setError('Username is required.');
    if (!email) return setError('Email is required.');
    if (!isValidEmail(email)) return setError('Invalid email address.');
    if (!isValidPhone(phone)) return setError('Invalid phone number.');
    if (!password) return setError('Password is required.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== rePassword) return setError('Passwords do not match.');
    if (!hasLetter || !hasNumber || !hasSpecial) {
      return setError('Password must contain a letter, a number, and a special character.');
    }

    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          phonenumber: phone
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        router.push('/');
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during registration:', error);
      setError('Something went wrong. Please try again.');
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
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gray-100">
      {/* Form Container */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md sm:w-96 min-h-[80vh] sm:min-h-fit overflow-y-auto">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/home">
            <Logo width={160} height={80} priority />
          </Link>
        </div>

        <div className="text-2xl font-semibold text-gray-800 mb-4">Sign up for Helper Buddy</div>

        <TextInput label="Username" placeholder="Enter your username" value={username} setValue={setUsername} className="mb-4" />
        <TextInput label="Email Address" placeholder="name@domain.com" value={email} setValue={setEmail} className="mb-4" />
        <PhoneInput label="Phone Number" placeholder="Enter your phone number" value={phone} setValue={setPhone} />
        <Password label="Password" placeholder="Create a password" value={password} setValue={setPassword} className="mb-4" />
        <Password label="Re-enter Password" placeholder="Re-enter your password" value={rePassword} setValue={setRePassword} className="mb-4" />

        <div className="text-gray-600 text-sm mb-2">Your password must contain at least:</div>
        <div className="flex flex-col text-gray-600 text-sm space-y-2 mb-4">
          {[
            { id: 'letter', text: 'One letter (A-Z, a-z)', checked: hasLetter },
            { id: 'number', text: 'One number (0-9)', checked: hasNumber },
            { id: 'special', text: 'One special character (!@#$%^&*)', checked: hasSpecial },
          ].map(({ id, text, checked }) => (
            <div key={id} className="flex items-center">
              <input type="checkbox" id={`checkbox-${id}`} checked={checked} readOnly />
              <label htmlFor={`checkbox-${id}`} className="ml-2">{text}</label>
            </div>
          ))}
        </div>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          ref={buttonRef}
          onClick={handleSignUp}
          className="magnetic-button bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition duration-200"
        >
          <span>{loading ? 'Signing up...' : 'Sign Up'}</span>
        </button>

        <div className="mt-4 text-gray-600">
          Already have an account?
          <Link href="/login" className="text-blue-600 font-semibold"> Log in instead</Link>
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