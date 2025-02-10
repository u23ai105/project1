'use client';

import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();

  useEffect(() => {
    removeCookie('token', { path: '/' });
    router.push('/login');
  }, [removeCookie, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl">Logging out...</p>
    </div>
  );
}