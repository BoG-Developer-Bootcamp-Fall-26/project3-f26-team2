import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";
import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";
import TrainingLogCard from "../../components/TrainingLogCard";

const heebo = Heebo({ subsets: ["latin"] });

const currentUser = {
  name: "Jordan Lee",
  isAdmin: true,
};

const trainingLogs = [
  {
    id: 1,
    title: "Practice loose-leash walking",
    date: "2026-11-08",
    userName: "Jordan Lee",
    animalName: "Lucy",
    breed: "Golden Retriever",
    hours: 2,
    description: "Lucy stayed close on the trail and checked in at each turn.",
  },
  {
    id: 2,
    title: "Complete sit lessons",
    date: "2026-11-10",
    userName: "Jordan Lee",
    animalName: "Lucy",
    breed: "Golden Retriever",
    hours: 1,
    description: "Lucy practiced sitting on cue in a new environment.",
  },
  {
    id: 3,
    title: "Practice recall",
    date: "2026-11-09",
    userName: "Jordan Lee",
    animalName: "Milo",
    breed: "Labrador Retriever",
    hours: 1.5,
    description: "Milo returned on cue during short training sessions in the yard.",
  },
];

export default function TrainingLogsDashboard() {
  const sortedLogs = [...trainingLogs].sort(function (firstLog, secondLog) {
    return secondLog.date.localeCompare(firstLog.date);
  });

  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.name}
          isAdmin={currentUser.isAdmin}
          activePage="/training-logs"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              Training logs
            </h1>

            <Link
              href="/training-logs/new"
              className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              <Image
                src="/images/createNewLogo.png"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
              />
              Create new
            </Link>
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