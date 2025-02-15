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
  
  // Fetch user's streak and points
  const { data: userPoints, error } = await supabase
    .from("points")
    .select("streak, points")
    .eq("userid", userId)
    .single();

  if (error) {
    console.error("Error fetching points data:", error.message);
  }

  return (
    <main className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white">
      <Pledge 
        userId={userId}
        initialStreak={userPoints?.streak || 0} 
        initialPoints={userPoints?.points || 0} 
      />
    </main>
  );
}
