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

  // Step 3: Fetch top 10 players' user IDs and streaks from the 'points' table
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from("points")
    .select("userid, streak") // Get the userid and streak
    .order("streak", { ascending: false }) // Order by streak in descending order
    .limit(10); // Only fetch top 10 players

  if (leaderboardError) {
    console.error("Error fetching leaderboard data:", leaderboardError.message);
  }

  // Step 4: Fetch usernames for the top 10 players using the user ids from the leaderboard data
  const userIds = leaderboardData?.map(entry => entry.userid) || [];
  
  const { data: usersData, error: usersError } = await supabase
    .from("username") // Assuming your users table contains the usernames
    .select("userid, username") // Select the 'userid' and 'username'
    .in("userid", userIds); // Fetch only users whose IDs match those in leaderboard

  if (usersError) {
    console.error("Error fetching users data:", usersError.message);
  }

  // Log the full usersData to inspect it
  console.log("Users Data:", usersData); 

  // Log just the usernames to inspect them individually
  const usernames = usersData?.map(user => user.username);
  console.log("Usernames:", usernames);

  // Step 5: Combine leaderboard data with corresponding usernames
  const playersToDisplay = leaderboardData?.map(entry => {
    // Find the username by matching the user ID
    const user = usersData?.find(user => user.userid === entry.userid);  // Ensure matching field name
    return {
      username: user?.username || "Unknown", // Fallback to "Unknown" if no username is found
      streak: entry.streak,
    };
  }) || [];

  // Step 6: If no leaderboard data, use dummy data
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

  const finalPlayers = playersToDisplay.length ? playersToDisplay : dummyPlayers;

  return (
    <main className="flex w-full h-screen flex-col items-center py-16">
      <Leaderboard players={finalPlayers} />
    </main>
  );
}
