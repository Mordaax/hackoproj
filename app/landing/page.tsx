"use client";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { Users, ThumbsUp, Heart, Bean, Star, BicepsFlexedIcon } from "lucide-react"; // Added the necessary Lucide icons
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

const Home: NextPage = () => {
  const [authCount, setAuthCount] = useState(0); // To hold the count of auth entries
  const targetCount = 254; // Replace with actual API call count when ready

  const router = useRouter();

  // Count-up effect
  useEffect(() => {
    let start = 1; // Start the count from 1
    const end = targetCount;
    const duration = 2500; // Duration in milliseconds (5 seconds)
    const incrementTime = duration / end; // Time interval for each increment

    const timer = setInterval(() => {
      if (start <= end) {
        setAuthCount(start); // Update count
        start += 1;
      } else {
        clearInterval(timer); // Clear interval when the count reaches the target
      }
    }, incrementTime);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [targetCount]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen dark:text-white white:text-black px-4 py-16">
      <div className="max-w-2xl p-8 rounded-2xl shadow-lg text-center space-y-6">
        {/* Heading */}
        <h1 className="text-5xl font-bold mb-4">
          <Bean className="inline-block mr-2 text-yellow-500" /> Heng Ong Huat Foundation
        </h1>
        
        <p className="text-lg mb-4">
          Helping individuals recover and rebuild their lives. <Star className="inline-block ml-2 text-yellow-500" />
        </p>

        {/* Animated counter */}
        <p className="text-xl font-semibold">
          <span className="text-8xl font-bold">
            {authCount} {/* Directly show the number as it increments */}
          </span>{" "}
          people have already started their recovery journey!
        </p>
        <p></p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-8">
          <button
            onClick={() => router.push("/sign-up")}
            className="flex items-center gap-2 bg-green-600 text-white font-bold uppercase px-6 py-3 rounded-2xl text-lg shadow-md hover:bg-green-500 transition"
          >
            Sign Up <ThumbsUp />
          </button>

          <button
            onClick={() => router.push("/donate")}
            className="flex items-center gap-2 bg-red-600 text-white font-bold uppercase px-6 py-3 rounded-2xl text-lg shadow-md hover:bg-red-500 transition"
          >
            Donate <Heart />
          </button>
        </div>
        <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center text-grey-400">
            Fighting Addiction with{" "}
            <span className="font-bold">Interledger</span> and{" "}
            <span className="font-bold" rel="noreferrer">
                Hackomania
            </span>
        </p>

      </div>

      {/* Additional Footer */}
      <div className="mt-16 text-center text-lg">
        <p>Your support can help make a real difference in someone's recovery journey. <BicepsFlexedIcon className="inline-block ml-2 text-yellow-500" /></p>
      </div>
    </main>
  );
};

export default Home;
