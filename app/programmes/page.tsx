import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import TransactionPage from "./components/donations";
import Donations from "./components/donations";

export default async function ProtectedPage({ programTitle }: { programTitle: string }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  
  
  

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <Donations/>
      </div>
      
    </div>
  );
}