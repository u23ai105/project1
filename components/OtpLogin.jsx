"use client";

import { useState, useEffect, useTransition } from "react";
import { auth } from "@/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./ui/input-otp";
import { Button } from "./ui/button";

export default function OtpLogin({ phoneNumber, onSuccess }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
      setRecaptchaVerifier(verifier);
    }
  }, []);

  useEffect(() => {
    if (otp.length === 6) {
      verifyOtp();
    }
  }, [otp]);

  const requestOtp = async () => {
    setError("");
    try {
      if (!recaptchaVerifier) throw new Error("Recaptcha not initialized");
      const confirmation = await signInWithPhoneNumber(auth, `+1${phoneNumber}`, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setSuccess("OTP sent successfully.");
    } catch (err) {
      setError("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");
      if (!confirmationResult) return setError("Request OTP first.");
      try {
        await confirmationResult.confirm(otp);
        setSuccess("OTP verified successfully.");
        onSuccess();
      } catch {
        setError("Invalid OTP.");
      }
    });
  };

  return (
    <div className="flex flex-col items-center">
      {!confirmationResult && (
        <Button onClick={requestOtp} className="mb-4">Send OTP</Button>
      )}

      {confirmationResult && (
        <InputOTP maxLength={6} value={otp} onChange={setOtp} className="mb-4">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}

      <div id="recaptcha-container"></div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </div>
  );
}
