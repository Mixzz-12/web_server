'use client';
import { motion } from 'framer-motion';

export default function AnimatedWave() {
  return (
    <motion.div
      className="absolute bottom-0 left-0 w-full h-40 z-0 overflow-hidden"
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill="#e3e4e6"
          d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,96C840,85,960,107,1080,128C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 2 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}
