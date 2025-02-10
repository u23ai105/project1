'use client';

import React from 'react';

const TextInput = ({ label, placeholder, value, setValue, className = '' }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label className="font-semibold text-gray-800 text-sm">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-2.5 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
