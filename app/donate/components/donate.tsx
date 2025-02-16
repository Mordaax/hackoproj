"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface DonatePageProps {
  displayName: string;
}
export default function DonatePage({ displayName }: DonatePageProps) {
  const [sendingWalletAddressUrl, setSendingWalletAddressUrl] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setRedirectUrl("");

    if (!sendingWalletAddressUrl || !amount) {
      setErrorMessage("Please fill in both fields.");
      return;
    }
    try {
      const response = await fetch("/api/send-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sendingWalletAddressUrl,
          email: "cepic77@gmail.com", // Use email from user object
          amount,
          displayName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      setSuccessMessage(data.message || "Request sent successfully!");
      if (data.redirectUrl) {
        setRedirectUrl(data.redirectUrl);
      }
    } catch (error: any) {
      console.error("Error sending request:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="flex w-full flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white">
      <form onSubmit={handleSubmit} className="p-6 bg-[#A3D1C6] rounded-lg shadow-md w-full max-w-md"> {/* Form styling */}
  <div className="mb-4"> {/* Input container */}
    <label htmlFor="sendingWalletAddressUrl" className="block text-gray-600 text-sm font-medium mb-2">
      Sending Wallet Address URL
    </label> {/* Label */}
    <Input
      type="text"
      id="sendingWalletAddressUrl" // Add ID for label association
      placeholder="Sending Wallet Address URL"
      value={sendingWalletAddressUrl}
      onChange={(e) => setSendingWalletAddressUrl(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styling
      required
    />
  </div>
  <div className="mb-6"> {/* Input container */}
    <label htmlFor="amount" className="block text-gray-600 text-sm font-medium mb-2">
      Amount
    </label> {/* Label */}
    <Input
      type="number"
      id="amount" // Add ID for label association
      placeholder="Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" // Input styling
      required
    />
  </div>
  {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>} {/* Error message styling */}
  {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>} {/* Success message styling */}
  {redirectUrl && (
    <p className="text-yellow-400 mb-4"> {/* Redirect message styling */}
      You have 1 minute to approve the transaction. 
    </p>
  )}
  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"> {/* Button styling */}
    Send
  </Button>
</form>
    </main>
  );
}
