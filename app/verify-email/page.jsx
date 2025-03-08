import Image from 'next/image';

export default function VerifyEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Image
        src="/helper-buddy-logo.png"
        alt="Helper Buddy Logo"
        width={200}
        height={200}
        className="mb-6"
      />
      <h1 className="text-2xl font-semibold text-gray-800 text-center">
        For further procedure, please verify your email.
      </h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Check your inbox for the verification email and follow the instructions to complete the process.
      </p>
    </div>
  );
}
