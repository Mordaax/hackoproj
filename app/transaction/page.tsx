// Mark the component as a client-side component
"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Loader } from "lucide-react";
import { useRouter } from "next/navigation";  // Use next/navigation for client-side navigation

const TransactionPage = ({ programTitle }: { programTitle: string }) => {
  const [loading, setLoading] = useState(true);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0.1); // You can change this based on cost
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay for transaction processing (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setLoading(false);  // Stop loading after a delay
      setTransactionComplete(true);  // Set transaction as complete
    }, 3000); // 3 seconds for demo purposes

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader size={48} className="animate-spin text-blue-500" />
            <p className="text-lg font-semibold">Processing your donation...</p>
            <p className="text-gray-500">Transferring {programTitle} funds...</p>
          </div>
        ) : (
          <div>
            {transactionComplete ? (
              <div className="flex flex-col items-center gap-4">
                <CheckCircle size={48} className="text-green-500" />
                <p className="text-lg font-semibold text-green-600">Transaction Complete!</p>
                <p className="text-gray-500">Your donation of ${transactionAmount.toFixed(2)} has been successfully processed to the {programTitle} wallet.</p>
                <button
                  onClick={() => router.push('/shop')} // Redirect back to the shop page
                  className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400"
                >
                  Return to Shop
                </button>
              </div>
            ) : (
              <div>
                {/* You can add additional content here for intermediate steps if needed */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
