"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import OtpLogin from "@/components/OtpLogin";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OtpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const phone = searchParams.get("phone");
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const password = searchParams.get("password");

  const [resendCountdown, setResendCountdown] = useState(0);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleOtpSuccess = async () => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username, phonenumber: phone }),
      });

      if (response.ok) {
        router.push("/home");
      } else {
        console.error("Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image src="/icons/buddy.svg" alt="Helper Icon" width={160} height={80} priority />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Enter OTP</h2>

        <OtpLogin phoneNumber={phone} onSuccess={handleOtpSuccess} />

        <div className="mt-4 text-center">
          <Button 
            onClick={() => setResendCountdown(60)} 
            variant="outline" 
            disabled={resendCountdown > 0}
          >
            {resendCountdown > 0 ? `Resend OTP in ${resendCountdown}s` : "Resend OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
}
