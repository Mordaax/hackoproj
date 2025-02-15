// Mark the component as a client-side component
"use client";

import { useRouter } from "next/navigation";  // Import from next/navigation for client-side routing
import { HeartHandshake, CigaretteOff, Dices, HeartHandshakeIcon } from "lucide-react";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

const Donations: React.FC = (props) => {
  const router = useRouter();
  const [xpcount, setXpcount] = useState<{ [key: string]: number }>({});
  const [totalxp, setTotalXp] = useState<number>(0);

  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {

      const { data } = await supabase.from('xpcount').select();
      if (data && data.length > 0) {
        setXpcount(data[0]);
        setTotalXp(data[0]["xp1"] + data[0]["xp2"] + data[0]["xp3"] + data[0]["xp4"]);
      }
    };
    getData();
  }, []);

  const handleDonationClick = async (title: string) => {
    const {
        data: { user },
      } = await supabase.auth.getUser();
    let { data } = await supabase
    .from('points')
    .select('*')
    .eq('userid', user.id)

    data[0]["points"] = data[0]["points"]-100 
    const { error } = await supabase
      .from('points')
      .update(data)
      .eq('userid', user.id)
    
    
    router.push(`/transaction?programTitle=${encodeURIComponent(title)}`);
  };

  return (
    <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10">
      <div className="px-4 pb-20">
        <h2 className="mb-5 text-2xl font-bold">Support Recovery Programs</h2>
        <p className="mb-4 text-gray-500 dark:text-white">
          Use your earned Recovery XP to make microdonations and support recovery initiatives.
        </p>
        <div className="grid gap-5">
          {[
            { id:1,key: 'xp1', title: "Smoke Recovery Program", description: "Help individuals quit smoking through support groups and counseling.", cost: 100 },
            { id:2,key: 'xp2', title: "Gambling Recovery Program", description: "Support gambling addiction recovery programs and helplines.", cost: 100 },
            {id:3, key: 'xp3', title: "Counseling Services", description: "Fund professional counseling for those in need of mental health support.", cost: 100 },
            {id:4, key: 'xp4', title: "General Recovery Fund", description: "Contribute to a general fund supporting various recovery programs.", cost: 100 },
          ].map(({ id, key, title, description, cost }) => (
            <DonationOption
              key={key}
              title={title}
              description={description}
              cost={cost}
              onDonate={handleDonationClick(title)}
              xpcount={xpcount[key] || 0}
              totalxp={totalxp}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donations;

const DonationOption = ({
  title,
  description,
  cost,
  onDonate,
  xpcount,
  totalxp
}: {
  title: string;
  description: string;
  cost: number;
  onDonate: (title: string) => void;
  xpcount: number;
  totalxp: number;
}) => {
  const buttonWidth = totalxp > 0 ? Math.max(10, (xpcount / totalxp) * 100) : 10; // Normalize width with min of 10%

  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-gray-300 p-4">
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm dark:text-white text-gray-500">{description}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onDonate(title)}
            style={{ minWidth:"30%", width: `${buttonWidth*2}%` }}
            className=" rounded-2xl border-2 border-b-4 border-blue-400 bg-blue-500 px-4 py-2 text-sm font-bold uppercase text-white hover:brightness-110"
          >
            Donate
          </button>
          <span className="ml-2 text-sm font-bold">{xpcount} Total XP</span>
        </div>
      </div>
    </div>
  );
};
