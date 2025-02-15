"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trees } from "lucide-react";
import RandomContent from "./cycle-element";

interface ClientSideComponentProps {
  cooldownActive: boolean;
  remainingTime: string | null;
}

export default function ClientSideComponent({
  cooldownActive,
  remainingTime,
}: ClientSideComponentProps) {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const router = useRouter();
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]); // The array of levels

  const handleLevelClick = (level: number) => {
    setArr((prevArr) => prevArr.filter((item) => item !== level));
    setSelectedLevel(level);
  };

  return (
    <main className="flex w-full min-h-screen flex-col items-center">
      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="text-center text-3xl font-extrabold tracking-tight">
          I am a gooning addict
        </h1>

        <div className="flex flex-col items-center gap-20">
          {arr.map((level, index) => (
            <div
              key={level}
              className={`w-24 h-24 flex items-center justify-center cursor-pointer rounded-full 
        ${selectedLevel === level ? "bg-[var(--circle-selected)]" : "bg-[var(--circle-unselected)]"} 
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
            {/* Display cooldown or "Go to Pledge" button */}
            {cooldownActive ? (
              <p className="mt-4 text-red-600 font-bold">
                Cooldown: {remainingTime}
              </p>
            ) : (
              <button
                className="mt-4 px-4 py-2 bg-[#3D8D7A] text-white rounded-lg"
                onClick={() => router.push("/pledge")}
              >
                Go to Pledge
              </button>
            )}
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
              onClick={() => setSelectedLevel(null)}
            >
              I'm committed
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
