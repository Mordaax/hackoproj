import type { NextPage } from "next";
import Link from "next/link";
import { Medal, Flame, Star, SmilePlus } from "lucide-react";

const Profile: NextPage = (props) => {
  return (
    <div>
      <ProfileTopBar />
      <div className="flex justify-center gap-3 pt-14">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection
            email={props.useremail}
            joindate={props.joindate}
          />
          <ProfileStatsSection streak={props.streak} points={props.points} />
          <ProfileSupportNetwork />
        </div>
      </div>
    </div>
  );
};

export default Profile;

const ProfileTopBar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex h-16 items-center justify-between border-b-2 border-gray-200 bg-white px-5 text-xl font-bold text-gray-300 md:hidden">
      <div className="invisible" aria-hidden={true}></div>
      <span className="text-gray-400">Profile</span>
      <Link href="/settings/account">
        <span className="sr-only">Settings</span>
      </Link>
    </div>
  );
};

const ProfileTopSection = (props: any) => {
  const name = "Koo Wenqi";
  const username = props.email;
  const joinedAt = props.joindate;
  const followersCount = 15;
  const followingCount = 8;
  const language = "en";

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
        {username.charAt(1).toUpperCase()}
      </div>
      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{username}</h1>
            {/* <div className="text-sm dark:text-white-400">{username}</div> */}
          </div>
          <div className="flex items-center gap-3">
            <span className="dark:text-white">{`Joined ${joinedAt}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="dark:text-white-500">{`${followingCount} Following / ${followersCount} Supporters`}</span>
          </div>
        </div>
      </div>
      {/* <Link
        href="/settings/account"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        Edit profile
      </Link> */}
    </section>
  );
};

const ProfileStatsSection = (props: any) => {
  const daysSober = props.streak;
  const totalXp = props.points;
  const topMilestones = 3;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Recovery Stats</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 p-4">
          <SmilePlus className="text-orange-500" size={28} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{daysSober}</span>
            <span className="text-sm dark:text-white-500 md:text-base">
              Days Sober
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 p-4">
          <Star className="text-yellow-500" size={28} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm dark:text-white-500 md:text-base">
              Recovery XP
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 p-4">
          <Medal className="text-blue-500" size={28} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{topMilestones}</span>
            <span className="text-sm dark:text-white-500 md:text-base">
              Major Milestones
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileSupportNetwork = () => {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Support Network</h2>
      <div className="rounded-2xl border-2 border-gray-200">
        <div className="flex items-center justify-center py-10 text-center">
          No support members added yet
        </div>
      </div>
    </section>
  );
};
