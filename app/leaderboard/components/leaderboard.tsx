import { FC } from "react";
import { Star, Shield, Award } from "lucide-react"; // Import Lucide React icons

type Player = {
  username: string;
  streak: number;
};

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard: FC<LeaderboardProps> = ({ players }) => {
  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Leaderboard</h1>
      
      <table className="w-full table-auto text-left border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Streak</th>
            <th className="px-4 py-2 border-b">Badges</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{player.username}</td>
              <td className="px-4 py-2">{player.streak}</td>
              <td className="px-4 py-2">
                {index < 3 && (
                  <div className="flex gap-2">
                    <Star size={24} className="text-yellow-500" />
                    <Shield size={24} className="text-blue-500" />
                    <Award size={24} className="text-green-500" />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
