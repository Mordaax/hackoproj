import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import _bgSnow from "../../public/bg-snow.svg";
import Link from "next/link";

import type { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";

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


      <div className="container flex grow flex-col gap-20 px-4 py-16">
        <h1 className="mt-20 text-center text-3xl font-extrabold tracking-tight text-white">
          I am a  ______  addict.....
        </h1>
        {<div className="flex flex-col items-center gap-4">
          <Link
          href="/register"
          className="w-40 mx-auto rounded-2xl border-b-4 border-green-700 bg-green-600 px-10 py-3 text-center font-bold uppercase transition hover:border-green-600 hover:bg-green-500 md:min-w-[320px]"
        >
          Get started
        </Link><Link
          href="/aichat"
          className="w-40 mx-auto mt-4 rounded-2xl border-b-4 border-blue-700 bg-blue-600 px-10 py-3 text-center font-bold uppercase transition hover:border-blue-600 hover:bg-blue-500 md:min-w-[320px]"
        >
            AI Chat
          </Link>
        </div>
            }
      </div>
    </main>
  );
}
