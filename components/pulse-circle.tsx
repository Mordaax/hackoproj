"use client";

import { motion } from "framer-motion";

export default function PulsingCircle() {
  return (
    <div className="flex h-40 items-center justify-center">
      <motion.div
        className="w-28 h-28 border-[15px] border-[#B3D8A8] rounded-full absolute"
        animate={{
          scale: [0.1, 1.1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          ease: "easeOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
