"use client"; // Important: This is a client component
import React, { useEffect, useState } from 'react'


function CatCards(props) {

  const [displayName, setDisplayName] = useState("Guest");
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, settotalAmount] = useState(props.totalAmount)
  const [xpcount, setxpcount] = useState(props.xpcount)

  const [categoryTotals, setCategoryTotals] = useState({
    "Smoke Recovery Program": xpcount[0]["xp1"],
    "Gambling Recovery Program": xpcount[0]["xp2"],
    "Counseling Services Fund": xpcount[0]["xp3"],
    "General Recovery Fund": xpcount[0]["xp4"],
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
        <p className="text-lg dark:text-gray-700">Total: ${parseFloat((calculatePercentage(amount).toFixed(1)/100*totalAmount).toFixed(2))}</p>
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