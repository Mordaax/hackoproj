"use client";

import { useState } from "react";

export default function ClientSideComponent() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [levelText, setLevelText] = useState<string>("");

  const handleLevelClick = (level: number) => {
    setSelectedLevel(level);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevelText(e.target.value);
  };

  return (
    <main className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white">
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          I am a gooning addict
        </h1>

        <div className="flex flex-col items-center gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((level, index) => (
            <div
              key={level}
              className={`w-16 h-16 flex items-center justify-center cursor-pointer rounded-full 
        ${selectedLevel === level ? "bg-[#B3D8A8]" : "bg-[#FBFFE4]"} 
        transition-all duration-200 
        ${index % 2 === 0 ? "ml-0" : "ml-12"}`} // Adjust left margin for zigzag
              onClick={() => handleLevelClick(level)}
            ></div>
          ))}
        </div>

        {/* Dynamically displayed textbox */}
        {selectedLevel !== null && (
          <div className="mt-6">
            <h2 className="text-xl text-white">
              Enter details for Level {selectedLevel}:
            </h2>
            <input
              type="text"
              value={levelText}
              onChange={handleTextChange}
              placeholder="Your input here"
              className="mt-2 p-2 rounded-lg border-2 border-gray-300"
            />
          </div>
        )}
      </div>
    </main>
  );
}
