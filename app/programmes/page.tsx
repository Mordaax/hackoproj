import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Donations from "./components/donations";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userId = user.id;

  // Fetch user points
  const { data: userData, error: userError } = await supabase
    .from("points")
    .select("points")
    .eq("userid", user.id)
    .single();

  if (userError) {
    console.error("Error fetching user points:", userError.message);
    return;
  }

  const userPoints = userData?.points || 0;

  // Fetch XP count data (for donation tracking)
  const { data: xpData, error: xpError } = await supabase
    .from("xpcount")
    .select("xp1, xp2, xp3, xp4")
    .eq("id", 1)
    .single();

  if (xpError) {
    console.error("Error fetching XP data:", xpError.message);
    return;
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <Donations userPoints={userPoints} xpData={xpData} userId={user.id} />
      </div>
    </div>
  );
}
