import Image from "next/image";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import AnimalCard from "../../components/AnimalCard";
import type { Animal } from "../../components/AnimalCard";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });

const animals: Animal[] = [
  {
    id: 1,
    name: "Lucy",
    breed: "Golden Retriever",
    owner: "Jordan Lee",
    hoursTrained: 24,
    photoUrl: "/images/sample-animal.png",
  },
  {
    id: 2,
    name: "Scout",
    breed: "Golden Retriever",
    owner: "Taylor Brooks",
    hoursTrained: 12,
    photoUrl: "/images/sample-animal.png",
  },
];

export default function AllAnimals() {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName="Jordan Lee"
          isAdmin={true}
          activePage="/admin/animals"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              All animals
            </h1>
          </div>

          <div className="mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:px-12 xl:grid-cols-3">
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