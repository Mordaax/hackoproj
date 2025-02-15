"use client";

import PulsingCircle from "@/components/pulse-circle";
import { useState } from "react";
import { Trees } from "lucide-react";
import RandomContent from "./cycle-element";

export default function ClientSideComponent() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]); // The array of levels

  const handleLevelClick = (level: number) => {
    // Remove the clicked level from the array
    setArr((prevArr) => prevArr.filter((item) => item !== level));
    setSelectedLevel(level); // Set the selected level
  };

  const handleClosePopup = () => {
    setSelectedLevel(null); // Reset the selected level when "I'm committed" is clicked
  };

  return (
    <main className="flex w-full h-screen flex-col items-center text-white">
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          I am a gooning addict
        </h1>

        <div className="flex flex-col items-center gap-20">
          {arr.map((level, index) => (
            <div
              key={level}
              className={`w-24 h-24 flex items-center justify-center cursor-pointer rounded-full 
        ${selectedLevel === level ? "bg-[#B3D8A8]" : "bg-[#FBFFE4]"} 
        transition-all duration-200 
        ${index % 2 === 0 ? "ml-40" : "mr-16"}`}
              onClick={() => handleLevelClick(level)}
            ></div>
          ))}
        </div>

        {selectedLevel !== null && (
          <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FBFFE4] p-8 rounded-lg shadow-lg text-black w-80 text-center">
            <h2 className="text-xl font-bold">Day {selectedLevel}</h2>
            <RandomContent />
            <button
              className="mt-4 px-4 py-2 bg-[#3D8D7A] text-white rounded-lg"
              onClick={handleClosePopup}
            >
              I'm committed
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
