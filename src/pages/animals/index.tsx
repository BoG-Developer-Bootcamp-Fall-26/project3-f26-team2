import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });

const currentUser = {
  name: "Jordan Lee",
  isAdmin: true,
};

type Animal = {
  id: number;
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  photoUrl: string;
};

const animals: Animal[] = [
  {
    id: 1,
    name: "Lucy",
    breed: "Golden Retriever",
    owner: currentUser.name,
    hoursTrained: 24,
    photoUrl: "/images/sample-animal.png",
  },
];

function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-md">
      <div className="relative aspect-[20/13] bg-gray-100">
        <Image
          src={animal.photoUrl}
          alt={`${animal.name}, a ${animal.breed}`}
          fill
          unoptimized
          className="object-cover object-top"
        />
      </div>

      <div className="flex items-start gap-3 p-4 sm:p-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D21312] text-xl font-bold text-white"
        >
          {animal.name.charAt(0).toUpperCase()}
        </span>

        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#260101]">
            {animal.name} · {animal.breed}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {animal.owner} · Trained {animal.hoursTrained}{" "}
            {animal.hoursTrained === 1 ? "hour" : "hours"}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function AnimalsDashboard() {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.name}
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