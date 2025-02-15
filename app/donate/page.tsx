
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon, Send } from "lucide-react";
import { redirect } from "next/navigation";

import DonatePage from "./components/donate";
import CatCards from "./components/cards";


export default async function AIChatPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  
  if (!user) {
    return redirect("/sign-in");
  }
  const { data, error } = await supabase
    .from("username")
    .select("username")
    .eq("email", user.email)
  const displayName = data?.[0]?.username || "Guest";
  
  const { data: transactions, error: transactionsError } = await supabase
    .from("transactionhistory")
    .select("displayName, amount, created_at")
    .order("created_at", { ascending: false });

  return (
    <main
      className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white"
    >
      <CatCards />
      <DonatePage displayName={displayName}/>
    {/* Transaction History Table */}
    <div className="w-full max-w-3xl mt-10 p-6 bg-[#A3D1C6] rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-5">💰 Transaction History</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-700 text-white text-left text-sm uppercase">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Display Name</th>
                <th className="px-4 py-3">Amount ($)</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((tx, index) => (
                <tr key={index} className="border-b border-gray-600 bg-gray-900 hover:bg-gray-700 transition">
                  <td className="px-4 py-3 text-center font-semibold">{index + 1}</td>
                  <td className="px-4 py-3 text-center">{tx.displayName}</td>
                  <td className="px-4 py-3 text-center font-semibold text-green-400">${tx.amount}</td>
                  <td className="px-4 py-3 text-center text-gray-400">
                    {new Date(tx.created_at).toLocaleDateString("en-CA")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}