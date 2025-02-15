import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientSideComponent from "@/components/open-box";
import RightBar from "@/components/rightbar";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch the cooldown timestamp from the "points" table
  const { data, error } = await supabase
    .from("points")
    .select("cooldown")
    .eq("userid", user.id)
    .single();

  if (error) {
    console.error("Error fetching cooldown data:", error.message);
  }

  let remainingTime: string | null = null;
  let cooldownActive = false;

  if (data?.cooldown) {
    const cooldownTime = new Date(data.cooldown); // The timestamp of the last pledge
    const now = new Date();
    const timeDiff =
      cooldownTime.getTime() + 24 * 60 * 60 * 1000 - now.getTime(); // 24 hours after the last pledge

    if (timeDiff > 0) {
      cooldownActive = true;
      remainingTime = formatTimeLeft(timeDiff);
    }
  }

  function formatTimeLeft(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <div className="flex justify-center relative">
      
      {/* Main Content */}  
      <div className="flex-1 ml-20">
        <ClientSideComponent cooldownActive={cooldownActive} remainingTime={remainingTime} />
      </div>

      {/* Right Sidebar - Streak & Level Info */}
      <div className="w-full md:w-1/4 ">
        <RightBar />
      </div>
    </div>
  );
}
