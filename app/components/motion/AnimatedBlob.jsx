'use client';

import { motion } from "framer-motion";

export default function AnimatedBlob() {
  return (
    <>
      {/* Purple Blob */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Pink Blob */}
      <motion.div
        className="absolute top-20 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, -20, 30, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Yellow Blob */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{
          x: [0, 20, -25, 0],
          y: [0, 30, -15, 0],
          scale: [1, 0.95, 1.05, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
    </>
  );
}
