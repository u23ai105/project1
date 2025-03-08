"use client";

import { useState } from "react";

export default function SupportPage() {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer:
        "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions sent to your email.",
    },
    {
      question: "How can I contact support?",
      answer:
        "Our support team is available weekdays from 09:00 to 12:00. You can email us at support@yourbrand.com or call our hotline.",
    },
    {
      question: "Where can I update my profile?",
      answer:
        "Profile settings are available in your account dashboard. Log in and click on 'Account Settings' to update your details.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day money-back guarantee for unused products. Please ensure products are returned in their original packaging.",
    },
    {
      question: "Can I change my subscription plan?",
      answer:
        "Yes, you can change your subscription plan anytime via your account settings under the 'Billing' section.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, please contact our support team directly and we will assist you with the process.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-500 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Support</h1>
        </div>
      </header>
      <main className="py-10 bg-zinc-500 border-t-2 border-neutral-400">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FAQ Section */}
          <section className="p-6 rounded-lg shadow mb-8 bg-slate-300">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-4">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="font-semibold text-lg">
                      {faq.question}
                    </span>
                    <span className="text-2xl">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </button>
                  <div
                    className={`mt-2 overflow-hidden transition-all duration-300 ${
                      activeIndex === index ? "max-h-screen py-2" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* Contact Section */}
          <section className="bg-slate-300 p-8 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="mb-6 text-gray-950">
              If you have further questions or require additional support, please get in touch with our team.
            </p>
            <button
              onClick={() => (window.location.href = "mailto:support@yourbrand.com")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Contact Us
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}