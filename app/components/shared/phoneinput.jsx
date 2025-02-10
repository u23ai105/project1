'use client';

import React from 'react';

const PhoneInput = ({ label, placeholder, value, setValue, className = '' }) => {
  const handleInputChange = (e) => {
    const inputVal = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (inputVal.length <= 10) {
      setValue(inputVal);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      <label className="font-semibold text-gray-800 text-sm">{label}</label>
      <input
        type="tel"
        placeholder={placeholder}
        className="p-2.5 placeholder-gray-400 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-black"
        value={value}
        onChange={handleInputChange}
        maxLength={10} // Restrict input length to 10 digits
      />
    </div>
  );
};

export default PhoneInput;
