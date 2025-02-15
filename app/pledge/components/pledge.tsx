"use client";

import { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const Pledge = ({ userId, initialStreak, initialPoints }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [streak, setStreak] = useState(initialStreak);
  const [points, setPoints] = useState(initialPoints);
  const [animationActive, setAnimationActive] = useState(false);
  const supabase = createClient();

  const handlePledgeClick = () => {
    setShowPopup(true);
  };

  const updatePoints = async (newStreak, newPoints) => {
    const { error } = await supabase
      .from("points")
      .update({ streak: newStreak, points: newPoints })
      .eq("userid", userId);

    if (error) {
      console.error("Error updating points:", error.message);
    }
  };

  const handlePopupAnswer = async (answer: boolean) => {
    setShowPopup(false);

    if (answer) {
      // Increase streak and calculate new points
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
      // Reset streak
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
        className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-full shadow-xl text-xl font-bold hover:bg-blue-400 transition-all"
      >
        <ThumbsUp size={40} />
        <span className="mt-2">Pledge</span>
      </button>

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
