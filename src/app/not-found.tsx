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
    >
      <h1>404: Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </motion.div>
  );
};

export default NotFound;
