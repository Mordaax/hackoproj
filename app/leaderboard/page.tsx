
import { createClient } from "@/utils/supabase/server"; // Import Supabase client creation
import Leaderboard from "./components/leaderboard"; // Import Leaderboard component
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const supabase = await createClient();

  // Step 1: Get the authenticated user (this might be optional depending on your requirements)
  const { data: { user } } = await supabase.auth.getUser();

  // Step 2: If no user is logged in, redirect to the sign-in page
  if (!user) {
    return redirect("/sign-in");
  }

  // Step 3: Fetch top 10 players from the 'points' table
  const { data: leaderboardData, error } = await supabase
    .from("points")
    .select("username, streak")
    .order("streak", { ascending: false }) // Order by streak in descending order
    .limit(10); // Only fetch top 10 players

  if (error) {
    console.error("Error fetching leaderboard data:", error.message);
  }

  // Step 4: Generate dummy data if no data is available (for now)
  const dummyPlayers = [
    { username: "player_1", streak: 30 },
    { username: "player_2", streak: 25 },
    { username: "player_3", streak: 20 },
    { username: "player_4", streak: 18 },
    { username: "player_5", streak: 15 },
    { username: "player_6", streak: 10 },
    { username: "player_7", streak: 8 },
    { username: "player_8", streak: 6 },
    { username: "player_9", streak: 4 },
    { username: "player_10", streak: 3 },
  ];

  // Use fetched data or dummy data if fetching fails
  const playersToDisplay = leaderboardData || dummyPlayers;

  return (
    <main className="flex w-full h-screen flex-col items-center py-16 bg-gray-100">
      <Leaderboard players={playersToDisplay} />
    </main>
  );
}
