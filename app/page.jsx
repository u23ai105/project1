import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Helper Buddy</h1>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200"
          >
            Login
          </Link>
          <Link 
            href="/signup" 
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full border border-blue-600 hover:bg-blue-50 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}