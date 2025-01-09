"use client";
import { motion, useMotionValue } from "framer-motion";
import { useMotionTemplate } from "framer-motion";
import { animate } from "framer-motion";
import React, { useEffect, useState } from "react";

const Card = ({ serviceName, desc }: { serviceName: string; desc: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const angle = useMotionValue(180);

  const background = useMotionTemplate`
      linear-gradient(var(--color-gray-950), var(--color-gray-950)) padding-box,
      conic-gradient(from ${angle}deg, var(--color-violet-400), var(--color-fuchsia-400), var(--color-amber-300), var(--color-teal-300), var(--color-violet-400)) border-box
    `;

  useEffect(() => {
    if (isHovered) {
      animate(angle, angle.get() + 360, {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      animate(angle, 45, { duration: 0.5 });
    }
  }, [isHovered, angle]);

  return (
    <motion.div
      className="border-gradient px-10 py-6 rounded-lg text-center hover:scale-105 transition-all duration-500 cursor-pointer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: background,
      }}
    >
      <h2 className="text-2xl font-bold text-white tracking-tight uppercase">
        {serviceName}
      </h2>
      <p className="text-lg text-gray-300">{desc}</p>
    </motion.div>
  );
};

export default Card;
