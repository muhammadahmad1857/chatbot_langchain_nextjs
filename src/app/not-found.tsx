"use client";
import { motion } from "framer-motion";
import React from "react";

const variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const NotFound = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
        <p className="mb-8">The page you are looking for does not exist.</p>
        <p>
          It&apos;s possible that the page you&apos;re looking for has been
          removed, or the URL is incorrect.
        </p>
        <p>If you think this is an error, please contact us.</p>
      </div>
    </motion.div>
  );
};

export default NotFound;
