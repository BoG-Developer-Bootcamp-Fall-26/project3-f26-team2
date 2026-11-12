import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";
import TrainingLogCard from "../../components/TrainingLogCard";
import type { TrainingLog as TrainingLogCardData } from "../../components/TrainingLogCard";
import { getSignedInUser } from "@/lib/auth";
import Animal from "@/models/Animal";
import TrainingLog from "@/models/TrainingLog";

const heebo = Heebo({ subsets: ["latin"] });

type DashboardProps = {
  currentUser: {
    id: string;
    fullName: string;
    isAdmin: boolean;
  };
  trainingLogs: TrainingLogCardData[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader("Cache-Control", "private, no-store");

  const currentUser = await getSignedInUser(context.req.cookies.session);

  if (!currentUser) {
    return {
      redirect: { destination: "/", permanent: false },
    };
  }

  const records = await TrainingLog.find({ user: currentUser.id })
    .sort({ date: -1, _id: -1 })
    .populate<{ animal: { name: string; breed: string } | null }>({
      path: "animal",
      model: Animal,
      select: "name breed",
    });

  const trainingLogs: TrainingLogCardData[] = records.map(function (log) {
    return {
      id: log._id.toString(),
      title: log.title,
      date: log.date.toISOString(),
      userName: currentUser.fullName,
      animalName: log.animal?.name ?? "Unknown animal",
      breed: log.animal?.breed ?? "Unknown breed",
      hours: log.hours,
      description: log.description,
    };
  });

  return { props: { currentUser, trainingLogs } };
}

export default function TrainingLogsDashboard({
  currentUser,
  trainingLogs,
}: DashboardProps) {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.fullName}
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
            {trainingLogs.length === 0 && (
              <p className="text-gray-600">
                No training logs yet. Use Create new to add one.
              </p>
            )}

            {trainingLogs.map(function (log) {
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