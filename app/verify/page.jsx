"use client";

import { useEffect, useState } from "react";

export default function VerifyPage({ searchParams }) {
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("Something went wrong!");
      }
    };

    verifyEmail();
  }, []);

  return <div>{message}</div>;
}
