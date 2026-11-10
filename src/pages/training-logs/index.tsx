import Image from "next/image";
import Link from "next/link";
import { Heebo, Oswald } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });
const oswald = Oswald({ subsets: ["latin"] });

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

const monthAndYear = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

type TrainingLog = (typeof trainingLogs)[number];

function TrainingLogCard({ log }: { log: TrainingLog }) {
  const date = new Date(log.date);

  return (
    <article className="flex overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-md">
      <time
        dateTime={log.date}
        className={`${oswald.className} flex w-20 shrink-0 flex-col items-center justify-center bg-[#2C2D68] px-2 py-4 text-center text-white sm:w-[139px]`}
      >
        <span className="text-3xl font-medium sm:text-5xl">
          {date.getUTCDate()}
        </span>
        <span className="mt-2 text-sm sm:text-xl">
          {monthAndYear.format(date)}
        </span>
      </time>

      <div className="min-w-0 flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-xl font-bold text-[#260101] sm:text-[30px]">
            {log.title}
          </h2>
          <span className="font-medium text-gray-600">
            {log.hours} {log.hours === 1 ? "hour" : "hours"}
          </span>
        </div>

        <p className="mt-1 text-gray-600">
          {log.userName} · {log.breed} · {log.animalName}
        </p>
        <p className="mt-3">{log.description}</p>
      </div>
    </article>
  );
}

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