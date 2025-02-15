import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Pledge from "./components/pledge";

export default async function PledgePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userId = user.id;
  
  // Fetch user's streak, points, and cooldown
  const { data: userPoints, error } = await supabase
    .from("points")
    .select("streak, points, cooldown")
    .eq("userid", userId)
    .single();

  if (error) {
    console.error("Error fetching points data:", error.message);
  }

  // DEVELOPMENT FEATURE: Reset cooldown on page load
  if (process.env.NODE_ENV !== "production") {
    await supabase
      .from("points")
      .update({ cooldown: null }) // Reset cooldown
      .eq("userid", userId);
  }

  return (
    <main className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white">
      <Pledge 
        userId={userId}
        initialStreak={userPoints?.streak || 0} 
        initialPoints={userPoints?.points || 0} 
        initialCooldown={process.env.NODE_ENV !== "production" ? null : userPoints?.cooldown || null}
      />
    </main>
  );
}
