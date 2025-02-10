"use client"

import {auth} from "@/firebase";
import{
    confirmationResult,
    RecaptchVerifier,
    signInWithPhoneNumber,
} from "firebase/auth"
import React, { FromEvent, useEffect, useState, useTransition} from 'react';
import{
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "./ui/input-otp";
import {button} from "./ui/button";
import {useRouter} from "next/navigation";

function OtpLogin() {
    return <div>OtpLogin</div>;
}

export default OtpLogin;