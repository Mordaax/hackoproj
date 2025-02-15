
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon, Send } from "lucide-react";
import { redirect } from "next/navigation";

import Profile from "./components/profile";
import DonatePage from "./components/donate";
  


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
    .single(); // Use single() if you expect only one result
  console.log(data)
  return (
    <main
      className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white"
    >
      <DonatePage displayName={data?.username}/>
    
    </main>
  );
}