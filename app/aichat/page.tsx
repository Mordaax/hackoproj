// app/chat/page.tsx (Server Component)
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Server-only module
import _bgSnow from "../../public/bg-snow.svg";
import ChatWindow from "@/app/aichat/ChatWindow"; // Client Component

import type { StaticImageData } from "next/image";

const bgSnow = _bgSnow as StaticImageData;

export default async function AIChatPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // ✅ Correct: Await headers()
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || "Unknown";

  return (
    <main
      className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <div className="container flex grow flex-col gap-10 px-4 py-16 max-w-2xl">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-white">
          AI Chat Interface
        </h1>
        {/* ✅ Correctly passing userAgent */}
        <ChatWindow userAgent={userAgent} />
      </div>
    </main>
  );
}
