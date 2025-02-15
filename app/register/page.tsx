import { Cigarette, Beer, Laptop, Dices } from "lucide-react";
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import subjects from "@/utils/subjects";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Register() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-white text-gray-800 rounded-xl">
      <div className="container flex flex-col items-center justify-center gap-16 px-10 py-10">
        <h1 className="mt-10 text-center text-5xl font-extrabold tracking-tight text-[#3D8D7A] sm:text-6xl">
          I need help with...
        </h1>

        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Link
              key={subject.name}
              href="/learn"
              className="flex flex-col items-center gap-5 rounded-3xl border-2 border-[#B3D8A8] px-6 py-8 text-xl font-semibold transition-all duration-200 hover:scale-105 hover:bg-gray-200 hover:bg-opacity-50"
            >
              <div className="flex justify-center items-center bg-[#FBFFE4] rounded-full p-4">
                {subject.name === "Smoking" && (
                  <Cigarette size={48} className="text-[#3D8D7A]" />
                )}
                {subject.name === "Drinking" && (
                  <Beer size={48} className="text-[#3D8D7A]" />
                )}
                {subject.name === "Screen Time" && (
                  <Laptop size={48} className="text-[#3D8D7A]" />
                )}
                {subject.name === "Gambling" && (
                  <Dices size={48} className="text-[#3D8D7A]" />
                )}
              </div>
              <span>{subject.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
