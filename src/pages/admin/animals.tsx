import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Heebo } from "next/font/google";
import type { Model, Types } from "mongoose";

import appLogo from "../../../public/images/appLogo.png";
import AnimalCard from "../../components/AnimalCard";
import type { Animal } from "../../components/AnimalCard";
import Sidebar from "../../components/Sidebar";
import { getSignedInUser } from "@/lib/auth";
import AnimalModel from "@/models/Animal";
import User from "@/models/User";

const heebo = Heebo({ subsets: ["latin"] });

type AnimalRecord = {
  name: string;
  breed: string;
  owner: Types.ObjectId;
  hoursTrained: number;
  profilePicture?: string;
};

type AllAnimalsProps = {
  currentUser: {
    fullName: string;
    isAdmin: boolean;
  };
  animals: Animal[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader("Cache-Control", "private, no-store");

  const currentUser = await getSignedInUser(context.req.cookies.session);

  if (!currentUser) {
    return { redirect: { destination: "/", permanent: false } };
  }

  if (!currentUser.isAdmin) {
    return { redirect: { destination: "/animals", permanent: false } };
  }

  const animalsModel = AnimalModel as Model<AnimalRecord>;
  const records = await animalsModel
    .find()
    .sort({ name: 1 })
    .populate<{ owner: { fullName: string } | null }>({
      path: "owner",
      model: User,
      select: "fullName",
    });

  const animals: Animal[] = records.map(function (animal) {
    return {
      id: animal._id.toString(),
      name: animal.name,
      breed: animal.breed,
      owner: animal.owner?.fullName ?? "Unknown owner",
      hoursTrained: animal.hoursTrained,
      photoUrl: animal.profilePicture || "/images/sample-animal.png",
    };
  });

  return { props: { currentUser, animals } };
}

export default function AllAnimals({ currentUser, animals }: AllAnimalsProps) {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.fullName}
          isAdmin={currentUser.isAdmin}
          activePage="/admin/animals"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              All animals
            </h1>
          </div>

          <div className="mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:px-12 xl:grid-cols-3">
            {animals.length === 0 && (
              <p className="text-gray-600">No animals have been added yet.</p>
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