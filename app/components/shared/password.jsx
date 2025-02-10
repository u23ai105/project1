'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Importing eye icons from Lucide

const PasswordInput = ({ label, placeholder, value, setValue, className = '' }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label className="font-semibold text-gray-800 text-sm">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className="p-2.5 placeholder-gray-400 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
