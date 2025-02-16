import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AIChatPage() {
  const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Mock data for progress and achievements
  const progress = 75; // Progress percentage
  const achievements = [
    { id: 1, title: "10-Day Streak", completed: true },
    { id: 2, title: "Complete 50 Lessons", completed: false },
    { id: 3, title: "Master 100 Words", completed: false },
  ];

  return (
    <main className="flex w-full h-screen flex-col items-center bg-[#FBFFE4] dark:bg-[#3D8D7A] text-black dark:text-white p-8">
      {/* Profile Section */}

      {/* Progress Section */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
          <div
            className="bg-[#58CC02] h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{progress}% completed</p>
      </div>

      {/* Achievements Section */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <span className="text-lg">{achievement.title}</span>
              {achievement.completed ? (
                <span className="text-green-500">✔️ Completed</span>
              ) : (
                <span className="text-gray-400">🔒 Locked</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}