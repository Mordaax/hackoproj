"use client";

import { motion } from "framer-motion";

export default function PulsingCircle() {
  return (
    <div className="flex h-40 items-center justify-center">
      <motion.div
        className="w-32 h-32 border-[10px] border-[#B3D8A8] rounded-full"
        animate={{
          scale: [1, 1.5, 1.5, 1], // Expand → Hold → Contract → Hold
          opacity: [1, 0.8, 0.8, 1], // Slight fade effect
        }}
        transition={{
          duration: 16, // Total breath cycle: 4s inhale, 4s hold, 4s exhale, 4s hold
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
