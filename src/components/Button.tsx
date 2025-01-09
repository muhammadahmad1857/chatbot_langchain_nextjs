"use client";

import { cva } from "class-variance-authority";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { HTMLAttributes, useEffect, useState } from "react";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const classes = cva(
  "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg",
  {
    variants: {
      block: {
        true: "w-full",
      },
      variant: {
        //primary: "border-2 border-transparent [background:linear-gradient(_var(--color-gray-950),_var(--color-gray-950))_padding-box,conic-gradient(from_45deg,_var(--color-violet-400),_var(--color-fuchsia-400),_var(--color-amber-300),_var(--color-teal-300),_var(--color-violet-400))_border-box]",
        primary: "border-gradient",
        secondary: "bg-gray-100 text-gray-950",
        tertiary: "bg-gray-800 text-gray-200",
      },
    },
    defaultVariants: {
      variant: "primary",
      block: false,
    },
  }
);

export const Button = (props: ButtonProps) => {
  const {
    className = "focus:outline-none", // className prop is passed to the button
    variant = "primary", // variant por defecto es primary
    children, // children prop is passed to the button
    onClick, // onClick prop is passed to the button
    disabled = false,
    ...otherProps // other props are passed by cva
  } = props;

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
    <motion.button
      className={classes({ ...otherProps, variant, className })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      onClick={onClick}
      style={
        variant === "primary"
          ? {
              background: background,
            }
          : undefined
      }
    >
      {children}
    </motion.button>
  );
};
