import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import AnimalCard from "../../components/AnimalCard";
import type { Animal } from "../../components/AnimalCard";
import Sidebar from "../../components/Sidebar";
import { getSignedInUser } from "@/lib/auth";
import AnimalModel from "@/models/Animal";

const heebo = Heebo({ subsets: ["latin"] });

type AnimalsDashboardProps = {
  currentUser: {
    fullName: string;
    isAdmin: boolean;
  };
  animals: Animal[];
};

type AnimalRecord = {
  _id: { toString(): string };
  name: string;
  breed: string;
  hoursTrained: number;
  profilePicture?: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = await getSignedInUser(context.req.cookies.session);

  if (!currentUser) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const records: AnimalRecord[] = await AnimalModel.find({
    owner: currentUser.id,
  }).sort({ name: 1 });

  const animals = records.map(function (animal) {
    return {
      id: animal._id.toString(),
      name: animal.name,
      breed: animal.breed,
      owner: currentUser.fullName,
      hoursTrained: animal.hoursTrained,
      photoUrl: animal.profilePicture || "/images/sample-animal.png",
    };
  });

  return { props: { currentUser, animals } };
}

export default function AnimalsDashboard({
  currentUser,
  animals,
}: AnimalsDashboardProps) {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.fullName}
          isAdmin={currentUser.isAdmin}
          activePage="/animals"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              Animals
            </h1>

            <Link
              href="/animals/new"
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

          <div className="mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:px-12 xl:grid-cols-3">
            {animals.length === 0 && (
              <p className="text-gray-600">
                No animals yet. Use Create new to add one.
              </p>
            )}

            {animals.map(function (animal) {
              return <AnimalCard key={animal.id} animal={animal} />;
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