'use client';


import Navbar from "./components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedBlob from "./components/motion/AnimatedBlob";

export default function Home() {
  return (
    
    <main className="relative min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 text-center space-y-6">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-gray-800"
        >
          Welcome
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-500"
        >
          Please choose your role to continue
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex space-x-4"
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition cursor-pointer"
            >
              Sign In
            </motion.button>
          </Link>

        </motion.div>
      </div>
      <AnimatedBlob />
    </main>
    
  );
}
