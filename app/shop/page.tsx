// Mark the component as a client-side component
"use client";

import { useRouter } from "next/navigation";  // Import from next/navigation for client-side routing
import { HeartHandshake, CigaretteOff, Dices, HeartHandshakeIcon } from "lucide-react";

const Shop: React.FC = () => {
  const router = useRouter(); // Using the client-side router hook
  const recoveryXp = 1250;

  const handleDonationClick = (title: string) => {
    // Navigate to the transaction page when a donation is made
    router.push(`/transaction?programTitle=${encodeURIComponent(title)}`);
  };

  return (
    <div>
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10">
        <div className="px-4 pb-20">
          <div className="py-7">
            <h2 className="mb-5 text-2xl font-bold">Support Recovery Programs</h2>
            <p className="mb-4 text-gray-500">
              Use your earned Recovery XP to make microdonations and support recovery initiatives.
            </p>
            <div className="grid gap-5">
              <DonationOption
                icon={<CigaretteOff size={24} />}
                title="Smoke Recovery Program"
                description="Help individuals quit smoking through support groups and counseling."
                cost={100}
                onDonate={handleDonationClick}
              />
              <DonationOption
                icon={<Dices size={24} />}
                title="Gambling Recovery Program"
                description="Support gambling addiction recovery programs and helplines."
                cost={150}
                onDonate={handleDonationClick}
              />
              <DonationOption
                icon={<HeartHandshakeIcon size={24} />}
                title="Counseling Services"
                description="Fund professional counseling for those in need of mental health support."
                cost={200}
                onDonate={handleDonationClick}
              />
              <DonationOption
                icon={<HeartHandshake size={24} />}
                title="General Recovery Fund"
                description="Contribute to a general fund supporting various recovery programs."
                cost={250}
                onDonate={handleDonationClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;

const DonationOption = ({
  icon,
  title,
  description,
  cost,
  onDonate,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  cost: number;
  onDonate: (title: string) => void;
}) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-300 p-4">
      <div className="text-blue-500">{icon}</div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <button
          onClick={() => onDonate(title)} // Trigger donation with the program title
          className="mt-2 flex items-center gap-2 rounded-2xl border-2 border-b-4 border-blue-400 bg-blue-500 px-4 py-2 text-sm font-bold uppercase text-white hover:brightness-110"
        >
          Donate {cost} XP
        </button>
      </div>
    </div>
  );
};
