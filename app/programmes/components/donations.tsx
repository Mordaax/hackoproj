"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface DonationsProps {
  userPoints: number;
  xpData: { xp1: number; xp2: number; xp3: number; xp4: number };
  userId: string;
}

const Donations: React.FC<DonationsProps> = ({ userPoints, xpData, userId }) => {
  const router = useRouter();
  const supabase = createClient();
  const [confirmDonation, setConfirmDonation] = useState<{ title: string; newPoints: number; key: keyof typeof xpData } | null>(null);

  const donationOptions = [
    { key: "xp1", title: "Smoke Recovery Program", description: "Help individuals quit smoking through support groups and counseling." },
    { key: "xp2", title: "Gambling Recovery Program", description: "Support gambling addiction recovery programs and helplines." },
    { key: "xp3", title: "Counseling Services", description: "Fund professional counseling for those in need of mental health support." },
    { key: "xp4", title: "General Recovery Fund", description: "Contribute to a general fund supporting various recovery programs." },
  ];

  const handleDonationClick = (title: string, key: keyof typeof xpData) => {
    if (userPoints < 100) return;
    setConfirmDonation({ title, newPoints: userPoints - 100, key });
  };

  const confirmDonationAction = async () => {
    if (!confirmDonation) return;

    const { key, newPoints } = confirmDonation;

    // Deduct 100 points from user
    await supabase.from("points").update({ points: newPoints }).eq("userid", userId);

    // Add 100 XP to the relevant category
    await supabase.from("xpcount").update({ [key]: xpData[key] + 100 }).eq("id", 1);

    // Close popup and redirect to transaction page
    setConfirmDonation(null);
    router.push(`/transaction?programTitle=${encodeURIComponent(confirmDonation.title)}`);
  };

  return (
    <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10">
      <div className="px-4 pb-20">
        <h2 className="mb-5 text-2xl font-bold">Support Recovery Programs</h2>
        <p className="mb-4 text-gray-500 dark:text-white">
          Use your earned Recovery XP to make microdonations and support recovery initiatives.
        </p>
        <div className="grid gap-5">
          {donationOptions.map(({ key, title, description }) => (
            <DonationOption
              key={key}
              title={title}
              description={description}
              onDonate={() => handleDonationClick(title, key)}
              xpcount={xpData[key] || 0}
              totalxp={Object.values(xpData).reduce((acc, val) => acc + val, 0)}
              isDisabled={userPoints < 100}
            />
          ))}
        </div>

        {/* Confirmation Popup */}
        {confirmDonation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-bold mb-2">Confirm Donation</h3>
              <p className="mb-4">Points after donation: {confirmDonation.newPoints}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDonationAction}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDonation(null)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donations;

const DonationOption = ({
  title,
  description,
  onDonate,
  xpcount,
  totalxp,
  isDisabled,
}: {
  title: string;
  description: string;
  onDonate: () => void;
  xpcount: number;
  totalxp: number;
  isDisabled: boolean;
}) => {
  const buttonWidth = totalxp > 0 ? Math.max(10, (xpcount / totalxp) * 100) : 10;

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-300 p-4">
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm dark:text-white text-gray-500">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={onDonate}
            disabled={isDisabled}
            style={{ minWidth: "120px", width: `${Math.max(30, buttonWidth * 2)}%` }}
            className={`h-12 rounded-2xl border-2 border-b-4 px-4 py-2 text-sm font-bold uppercase flex items-center justify-center whitespace-nowrap ${
              isDisabled
                ? "bg-red-500 border-red-600 text-white cursor-not-allowed"
                : "bg-blue-500 border-blue-400 text-white hover:brightness-110"
            }`}
          >
            {isDisabled ? "Insufficient points!" : "Donate"}
          </button>
          <span className="ml-2 text-sm font-bold">{xpcount} Total XP</span>
        </div>
      </div>
    </div>
  );
};
