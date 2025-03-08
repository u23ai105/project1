'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cookies] = useCookies(['token']);
  const [isProcessing, setIsProcessing] = useState(false);

  // Read the amount from query params; default to 100 if not provided
  const amount = Number(searchParams.get("amount"));

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded successfully");
      script.onerror = () => console.error("Failed to load Razorpay script");
      document.body.appendChild(script);
      return () => document.body.removeChild(script);
    }
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Create Razorpay order on the server using the total amount
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount })
      });
      if (!response.ok) throw new Error("Failed to initiate payment");

      const data = await response.json();
      if (!data.orderId) throw new Error("Invalid order ID from server");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // in paise
        currency: "INR",
        name: "Helper Buddy",
        description: "Payment for services",
        order_id: data.orderId,
        handler: async (razorpayResponse) => {
          console.log("Payment successful", razorpayResponse);
          // After payment, call your checkout API to move cart to current orders
          const checkoutResponse = await fetch("/api/cart/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.token}`
            }
          });
          if (!checkoutResponse.ok) {
            throw new Error("Checkout failed");
          }
          alert(
            "Payment Successful! Transaction ID: " +
              razorpayResponse.razorpay_payment_id
          );
          // Redirect to orders page (or receipt)
          router.push("/orders");
        },
        prefill: {
          name: "Helper Buddy",
          email: "helperbuddy@gmail.com",
          contact: "9999999999"
        },
        notes: {
          purpose: "Service Payment"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        console.error("Payment failed", response);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment Failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">Amount to pay: {amount} INR</p>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`px-4 py-2 text-white rounded ${
            isProcessing ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;



// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";
// import User from "@/models/User"; // Ensure correct path
// import Employee from "@/models/Employee"; // Ensure correct path
// import nodemailer from "nodemailer";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { amount, userId } = body; // Accept userId from request

//     if (!amount || !userId) {
//       return NextResponse.json({ error: "Amount and User ID are required" }, { status: 400 });
//     }

//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: amount * 100, // amount in paise (INR * 100)
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     // Fetch user details and ordered services
//     const user = await User.findById(userId);
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const orderDetails = user.currentOrders.map((order) => `
//       <li>
//         <strong>${order.title}</strong> - ${order.quantity} x ₹${order.discountedprice} <br />
//         Booking Date: ${order.bookingDate} | Time: ${order.bookingTime}
//         <br />
//         <a href="${process.env.BASE_URL}/accept-job?orderId=${order._id}">Will you accept it?</a>
//       </li>
//     `).join("");

//     // Get all employees
//     const employees = await Employee.find({}, "serviceEmail");
//     const employeeEmails = employees.map(emp => emp.serviceEmail).filter(email => email);

//     // Send email to all employees
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: employeeEmails,
//       subject: "New Service Request - Helper Buddy",
//       html: `
//         <h2>New Order Assigned</h2>
//         <ul>${orderDetails}</ul>
//         <p>Click on the link to accept the job. Once accepted, the link will be disabled for others.</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);

//     return NextResponse.json({ orderId: order.id, message: "Order created & email sent" }, { status: 200 });
//   } catch (error) {
//     console.error("Error in payment process:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }