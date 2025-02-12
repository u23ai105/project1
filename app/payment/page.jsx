"use client";

import React , { useState} from 'react';
import script from "next/script";
import { Currency } from 'lucide-react';
declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentPage = () => {
    const AMOUNT =100;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePaymnet = async () => {
        setIsProcessing(true);

        try{
            const response = await fetch('/api/payment', {method: 'POST'});
            const data = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: AMOUNT*100,
                currency: 'INR',
                name: "Helper Buddy",
                order_id: data.orderId,
                handler: function(response) {
                    console.log("Payment successful",response);
                },
                prefill: {
                    name: "Helper Buddy",
                    email: "helperbuddy@gmail.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                },
        };

        const rzp = new window.Razorpay(options);
        rezp.open();
    } catch (error) {
        console.error("Payment error:", error);
        setIsProcessing(false);
    } finally {
        setIsProcessing(false);
    }
};

return(
    <div className='flex flex-col items-center justify-center min-h-screenbg-gray-100'>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className='p-6 bg-white rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-4'>Payment Page</h1>
            <p className='md-4'>Amount to pay: {AMOUNT} INR</p>
            <button onClick={handlePaymnet} disabled={isProcessing} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled bg-gray-400'>
                {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    </div>
);
};

export default PaymentPage;