"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";

const PledgePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [animationActive, setAnimationActive] = useState(false);

  const handlePledgeClick = () => {
    setShowPopup(true);
  };

  const handlePopupAnswer = (answer: boolean) => {
    setShowPopup(false);

    if (answer) {
      // Increase streak and points
      setStreak(streak + 1);
      setPoints(points + (streak + 1) * 10); // Sample points: 10 points per streak increment
      setAnimationActive(true);

      setTimeout(() => {
        setAnimationActive(false); // Reset animation after a short time
      }, 1500); // Animation lasts for 1.5 seconds
    } else {
      // Reset streak and points
      setStreak(0);
      setPoints(0);
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

export default PledgePage;
