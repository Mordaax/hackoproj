"use client"; // Important: This is a client component
import React, { useEffect, useState } from 'react'


function CatCards() {

  const [displayName, setDisplayName] = useState("Guest");
  const [transactions, setTransactions] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({
    "Smoke Recovery Program": 900,
    "Gambling Recovery Program": 400,
    "Counseling Services Fund": 300,
    "General Recovery Fund": 300,
  });

  const calculatePercentage = (amount) => {
    const totalXP = Object.values(categoryTotals).reduce((sum, xp) => sum + xp, 0);
    return (amount / totalXP) * 100;
  };

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4 mb-10 ">
    {Object.entries(categoryTotals).map(([category, amount]) => (
      <div key={category} className="bg-[#A3D1C6] rounded-lg p-6 shadow-md w-64">


        <h3 className="text-xl font-bold mb-2 text-white dark:text-gray-700">{category}</h3>
        <p className="text-lg dark:text-gray-700">Total: ${amount}</p>
        <p className="text-lg dark:text-gray-600">Total: {amount} XP</p>
        <p className="text-md dark:text-gray-500">
          Percentage: {calculatePercentage(amount).toFixed(1)}%
        </p>
      </div>
    ))}
  </div>
  )
}

export default CatCards