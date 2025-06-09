'use client';

import Navbar from "./components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-white to-gray-100">
      <Navbar />
      <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 text-center space-y-10">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl font-semibold text-gray-900 leading-tight tracking-tight max-w-4xl"
        >
          PharmaNetix  
          
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl"
        >
          เพื่อความสะดวกและความปลอดภัยในการดูแลสุขภาพผู้สูงอายุและผู้ป่วยในบ้าน
          CareMate ช่วยให้คุณจัดการการจ่ายยาได้อย่างแม่นยำ ไม่ลืม ไม่ผิดเวลา
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
        >
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition cursor-pointer"
            >
              เริ่มใช้งาน
            </motion.button>
          </Link>

          <Link href="https://drive.google.com/file/d/1Efv_sLhhGAmpdInFI2KirRJpELNP6By9/view?usp=sharing" target="_blank">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              ดูคู่มือ
            </motion.button>
          </Link>
        </motion.div>
      </div>

      
    </main>
  );
}
