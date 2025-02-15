import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon, Send } from "lucide-react";
import { redirect } from "next/navigation";

import Profile from "./components/profile";

export default async function AIChatPage() {
  const supabase = await createClient();

  // Step 1: Get the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userId = user.id; // Get user ID
  const userEmail = user.email;

  // Step 2: Query the "points" table for the user's streak and points
  const { data: userPoints, error } = await supabase
    .from("points")
    .select("streak, points") // Select only the needed fields
    .eq("userid", userId) // Filter by user ID
    .single(); // Expecting a single row

  if (error) {
    console.error("Error fetching points data:", error.message);
  }

  // Step 3: Assign queried data to constants
  const streak = userPoints?.streak || 0; // Default to 0 if no data
  const points = userPoints?.points || 0;

  // Step 4: Format the join date
  const joinDate = new Date(user.confirmation_sent_at);
  const joinMonthName = joinDate.toLocaleString("en-US", { month: "short" });
  const joinDay = joinDate.getDate();

  return (
    <main className="flex w-full h-screen flex-col items-center">
      <Profile
        useremail={userEmail}
        joindate={`${joinDay} ${joinMonthName}`}
        streak={streak}
        points={points}
      />
    </main>
  );
}
