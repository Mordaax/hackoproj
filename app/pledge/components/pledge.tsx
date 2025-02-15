"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Timer } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Pledge = ({ userId, initialStreak, initialPoints, initialCooldown }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [streak, setStreak] = useState(initialStreak);
  const [points, setPoints] = useState(initialPoints);
  const [cooldown, setCooldown] = useState(initialCooldown ? new Date(initialCooldown) : null);
  const [animationActive, setAnimationActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const supabase = createClient();

  useEffect(() => {
    if (cooldown) {
      const interval = setInterval(() => {
        const now = new Date();
        const diff = Math.max(0, 24 * 60 * 60 * 1000 - (now - cooldown)); // 24 hours in ms
        setTimeLeft(diff > 0 ? formatTime(diff) : "");
        if (diff === 0) setCooldown(null);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [cooldown]);

  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handlePledgeClick = () => {
    if (!cooldown) setShowPopup(true);
  };

  const updatePoints = async (newStreak, newPoints) => {
    const newCooldown = new Date();
    const { error } = await supabase
      .from("points")
      .update({ 
        streak: newStreak, 
        points: newPoints, 
        cooldown: newCooldown.toISOString() 
      })
      .eq("userid", userId);

    if (error) {
      console.error("Error updating points:", error.message);
    } else {
      setCooldown(newCooldown);
    }
  };

  const handlePopupAnswer = async (answer: boolean) => {
    setShowPopup(false);

    if (answer) {
      const newStreak = streak + 1;
      const newPoints = points + newStreak * 10;

      setStreak(newStreak);
      setPoints(newPoints);
      setAnimationActive(true);

      await updatePoints(newStreak, newPoints);

      setTimeout(() => {
        setAnimationActive(false);
      }, 1500);
    } else {
      setStreak(0);
      await updatePoints(0, points);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Combat Addiction: Make a Pledge</h1>
        <p className="text-gray-500 mt-2">Every pledge counts toward your recovery journey.</p>
      </div>

      <button
        onClick={handlePledgeClick}
        className={`flex flex-col items-center justify-center p-6 rounded-full shadow-xl text-xl font-bold transition-all 
          ${cooldown ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-400"} text-white`}
        disabled={!!cooldown}
      >
        <ThumbsUp size={40} />
        <span className="mt-2">{cooldown ? "On Cooldown" : "Pledge"}</span>
      </button>

      {cooldown && (
        <div className="mt-4 flex items-center gap-2 text-lg text-red-500">
          <Timer size={20} />
          <span>Next pledge in: {timeLeft}</span>
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg mb-4">Do you want to pledge and increase your streak?</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handlePopupAnswer(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => handlePopupAnswer(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        {animationActive && (
          <div className="text-4xl font-semibold animate-pulse text-blue-600">
            +{streak} Streak!
          </div>
        )}
        <div className="mt-4 text-2xl font-bold text-gray-700">
          Current Streak: {streak}
        </div>
        <div className="mt-2 text-xl font-semibold text-gray-600">
          Points Earned: {points}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-2 text-yellow-400 text-lg">
            <Star size={20} />
            <span>Points are awarded based on your streak!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pledge;
