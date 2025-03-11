import React from "react";

const Button = ({ children, disabled, ...props }) => {
  return (
    <button
      className={`${
        disabled
          ? "bg-gray-600 text-white opacity-50 cursor-not-allowed"
          : "bg-yellow-500 text-black shadow-lg hover:bg-yellow-400 cursor-pointer"
      } px-6 py-3 rounded-full text-lg font-bold`}
      disabled={disabled}
      {...props}
    >
      {...children}
    </button>
  );
};

export default Button;
