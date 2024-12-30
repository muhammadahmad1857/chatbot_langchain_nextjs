"use client";
import React, { useState, useEffect } from "react";
import { animate, useMotionTemplate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion";

interface InputProps {
  label: string;
  placeholder?: string; // Optional placeholder for additional guidance
  type?: string;
  id: string;
  setText: (value: string) => void;
  value?:string,

  disabled?: boolean; // Added disabled prop
}

const Input = ({
  label,
  placeholder = "",
  type = "text",
  id,
  setText,
  disabled = true, // Default value for disabled prop
  value=""
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const angle = useMotionValue(180);

  const background = useMotionTemplate`linear-gradient(var(--color-gray-950), var(--color-gray-950)) padding-box,
    conic-gradient(from ${angle}deg, var(--color-violet-400), var(--color-fuchsia-400), var(--color-amber-300), var(--color-teal-300), var(--color-violet-400)) border-box
`;

  useEffect(() => {
    if (isFocused) {
      animate(angle, angle.get() + 360, {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      animate(angle, 45, { duration: 0.5 });
    }
  }, [isFocused, angle]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Label at the Top */}
      <motion.label
        htmlFor={id}
        className="block text-lg   font-thin text-gray-300 mb-2 transition-all duration-500"
        animate={{
          y: isFocused ? -4 : 0,
        }}
      >
        {label}
      </motion.label>

      {/* Input Field */}
      <motion.input
        id={id}
        type={type}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ background }}
        value={value}
        className={`w-full px-4 py-3 rounded-lg outline-none border-gradient hover:shadow-xl transition-all duration-500 ${
          disabled && " opacity-50 cursor-not-allowed"
        }`}
        disabled={disabled} // Added disabled attribute
      />
    </div>
  );
};

export default Input;
