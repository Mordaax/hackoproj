import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import subjects from "@/utils/subjects";
import { createClient } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Addiction } from "@/components/addiction";
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
    <main className="flex min-h-screen flex-col items-center bg-[#235390] text-white">
      <div className="container flex grow flex-col items-center justify-center gap-16 px-6 py-20">
        <h1 className="mt-10 text-center text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          I need help with...
        </h1>

        <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Link
              key={subject.name}
              href="/learn"
              className="flex flex-col items-center gap-5 rounded-3xl border-2 border-gray-400 px-6 py-10 text-2xl font-semibold transition-all duration-200 hover:scale-105 hover:bg-gray-300 hover:bg-opacity-30"
            >
              {
                //onClick={() => setsubject(subject)}
              }
              <Addiction subject={subject} />
              <span>{subject.name}</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
