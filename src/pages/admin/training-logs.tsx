import Image from "next/image";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";
import TrainingLogCard from "../../components/TrainingLogCard";
import type { TrainingLog } from "../../components/TrainingLogCard";

const heebo = Heebo({ subsets: ["latin"] });

const sampleLogs: TrainingLog[] = [
  {
    id: 1,
    title: "Complete sit lessons",
    date: "2026-11-10",
    userName: "Jordan Lee",
    animalName: "Lucy",
    breed: "Golden Retriever",
    hours: 1,
    description: "Lucy practiced sitting on cue in a new environment.",
  },
  {
    id: 2,
    title: "Practice leash walking",
    date: "2026-11-09",
    userName: "Taylor Brooks",
    animalName: "Scout",
    breed: "Border Collie",
    hours: 1.5,
    description: "Scout practiced keeping the leash loose during a walk.",
  },
];

export default function AllTrainingLogs() {
  const sortedLogs = [...sampleLogs].sort(function (firstLog, secondLog) {
    return secondLog.date.localeCompare(firstLog.date);
  });

  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName="Jordan Lee"
          isAdmin={true}
          activePage="/admin/training-logs"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              All training logs
            </h1>
          </div>

          <div className="mx-auto w-full max-w-[1260px] space-y-6 px-6 py-8 lg:px-12">
            {sortedLogs.map(function (log) {
              return <TrainingLogCard key={log.id} log={log} />;
            })}
          </div>

          <footer className="mt-auto px-6 py-5 text-center text-sm text-black/70">
            <p>2026 Fall BOG Developer Bootcamp Group 2</p>
          </footer>
        </main>
      </div>
    </div>
  );
}