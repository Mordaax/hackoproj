"use client"; // Add this at the top

import type { NextPage } from "next";
import React from "react";
import { HeartHandshake, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation"; // Correct import for Next.js 13+

const DonationPage: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-lg text-center">
        <HeartHandshake size={48} className="text-blue-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4 text-black">Support Addiction Recovery</h1>
        <p className="text-gray-600 mb-6">
          Your donations help fund vital programs, including smoking cessation, gambling recovery, and mental health counseling.
          By converting your Recovery XP into real impact, you can make a difference in people's lives.
        </p>
        <p className="text-gray-700 font-semibold mb-6">
          XP will determine money spent on recovery programmes
        </p>
        <button 
          onClick={() => router.push("/programmes")}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white font-bold uppercase px-6 py-3 rounded-2xl text-lg shadow-md hover:bg-blue-600 transition"
        >
          <span>Donate Now</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default DonationPage;
