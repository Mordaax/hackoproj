import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import _bgSnow from "../../public/bg-snow.svg";

import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main
      className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >

      <div className="container flex grow flex-col items-center justify-center gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          I am a ... addict
        </h1>
        {/* Write code under here */}
      </div>
    </main>
  );
}
