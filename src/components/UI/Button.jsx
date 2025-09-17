import React from "react";

function Button({
  children,
  variant = "outline",
  disabled = false,
  onClick,
}) {
  let base =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200";

  const variants = {
    outline:
      "border border-white text-white hover:bg-white hover:text-black hover:cursor-pointer",
    primary: "bg-white text-black hover:opacity-80 hover:cursor-pointer",
  };

  const responsiveSize = `
    px-3 py-1.5 text-xs
    sm:px-4 sm:py-2 sm:text-sm
    md:px-6 md:py-2.5 md:text-base
  `;

  return (
    <button
      className={`${base} ${variants[variant]} ${responsiveSize} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
