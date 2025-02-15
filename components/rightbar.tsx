"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";
import { createClient } from "@/utils/supabase/client"; // Adjust path if needed

export default function RightBar() {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const level = Math.floor(xp / 100); // Each level = 100 XP
  const xpProgress = xp % 100; // XP progress within the level

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data: userPoints, error } = await supabase
        .from("points")
        .select("streak, points")
        .eq("userid", user.id)
        .single();

      if (error) {
        console.error("Error fetching points data:", error.message);
        return;
      }

      setStreak(userPoints?.streak || 0);
      setXp(userPoints?.points || 0);
    };

    fetchUserData();
  }, []);

  return (
    <aside className="fixed right-4 top-4 h-[80vh] w-72 flex flex-col gap-6">
      {/* Streak Tracker Card */}
      <div className="bg-[#B3D8A8] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-1/2">
        <div className="flex items-center gap-3">
          <Flame className="text-[#3D8D7A]" size={40} />
          <span className="text-2xl font-bold text-[#3D8D7A]">
            Streak: {streak} 🔥
          </span>
        </div>
      </div>

      {/* XP Bar Card */}
      <div className="bg-[#B3D8A8] p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center h-1/2">
        <span className="text-2xl font-bold flex items-center gap-2 text-[#3D8D7A]">
          <Star className="text-[#3D8D7A]" size={36} />
          Level {level}
        </span>
        <div className="w-full bg-[#FBFFE4] rounded-full h-6 mt-4">
          <motion.div
            className="h-6 bg-[#3D8D7A] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <span className="text-lg mt-2 text-[#3D8D7A]">{xpProgress}/100 XP</span>
      </div>
    </aside>
  );
}
