"use client";

import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Orbit } from "@/components/Orbit";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const navItems = [
  {
    name: "Technologies",
    href: "/#technology",
  },
  {
    name: "Developers",
    href: "/#devs",
  },
];

export const btnItems = [
  {
    buttonVariant: "primary",
    name: "Projects",
    href: "/#projects",
  },
] satisfies {
  buttonVariant: ButtonProps["variant"];
  name: string;
  href: string;
}[];

export const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header
        className={`border-b ${
          isMobileNavOpen
            ? "fixed w-screen left-0 right-0 bg-black"
            : "relative"
        } border-gray-200/20 z-40`}
      >
        <div className="container">
          <div className="h-18 lg:h-20 flex justify-between items-center">
            <Link href={"/"} className="flex gap-4 items-center">
              <Logo />
              <div className="font-extrabold text-2xl">cognify labz</div>
            </Link>

            <div className="h-full hidden lg:block">
              <nav className="h-full flex items-center">
                {navItems.map(({ name, href }) => (
                  <motion.a
                    href={href}
                    key={href}
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
                      transition: { duration: 0.3 },
                    }}
                    className="relative font-bold text-xs tracking-widest text-gray-400 uppercase px-4 inline-flex items-center h-full"
                  >
                    {name}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex gap-4">
              {btnItems.map(({ buttonVariant, name, href }) => (
                <a href={href} key={name}>
                  <Button variant={buttonVariant}>{name}</Button>
                </a>
              ))}
            </div>

            <div className="flex items-center lg:hidden">
              <button
                className="
                  size-10 rounded-lg relative border-2 border-transparent
                  [background:linear-gradient(_var(--color-gray-950),_var(--color-gray-950))_content-box,conic-gradient(from_45deg,_var(--color-violet-400),_var(--color-fuchsia-400),_var(--color-amber-300),_var(--color-teal-300),_var(--color-violet-400))_border-box]
                  "
                onClick={() => setIsMobileNavOpen((curr) => !curr)}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 -translate-y-1 transition duration-300",
                      isMobileNavOpen && "translate-y-0 rotate-45"
                    )}
                  ></div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className={twMerge(
                      "w-4 h-0.5 bg-gray-100 translate-y-1 transition duration-300",
                      isMobileNavOpen && "translate-y-0 -rotate-45"
                    )}
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileNavOpen && (
        <motion.div
          className="fixed lg:hidden top-18 left-0 bottom-0 right-0 bg-gray-950 z-50 overflow-hidden"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background Glow */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-violet-800/20 to-transparent z-10 pointer-events-none"
            animate={{
              opacity: [0.8, 0.5, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          {/* Animated Orbits */}
          <div className="absolute-center isolate -z-10 pointer-events-none">
            <Orbit />
          </div>
          <div className="absolute-center isolate -z-10 pointer-events-none">
            <Orbit className="size-[350px]" />
          </div>
          <div className="absolute-center isolate -z-10 pointer-events-none">
            <Orbit className="size-[500px]" />
          </div>

          {/* Nav Items */}
          <div className="container h-full">
            <motion.nav
              className="flex flex-col items-center gap-6 py-8 h-full justify-center z-20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {navItems.map(({ name, href }) => (
                <motion.a
                  href={href}
                  key={href}
                  whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
                    transition: { duration: 0.3 },
                  }}
                  className="relative font-bold text-lg tracking-widest text-gray-200 uppercase inline-flex items-center"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {name}
                </motion.a>
              ))}
              {btnItems.map(({ name, href, buttonVariant }) => (
                <Link
                  href={href}
                  key={name}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="w-full max-w-xs"
                >
                  <Button variant={buttonVariant} block>
                    {name}
                  </Button>
                </Link>
              ))}
            </motion.nav>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
