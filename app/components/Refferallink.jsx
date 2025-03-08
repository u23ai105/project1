import { useState } from 'react';

export default function Refferallink({ user }) {
  const [copied, setCopied] = useState(false);

  const referralLink = `http://localhost:3000/signup?referralCode=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0d031b] rounded-lg shadow-xl p-8 space-y-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 tracking-wide">Referral Link</h2>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="w-full p-2 rounded bg-gray-800 text-gray-300"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}