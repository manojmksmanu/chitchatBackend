// LoadingAnimation.js
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: [0, -2, 0],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

const Loader = () => {
  const letters = "Let's ChitChat".split("");

  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="flex"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            style={{
              display: "inline-block",
              margin: "0 2px",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#black", // Customize color
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Loader;
