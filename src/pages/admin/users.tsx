import Image from "next/image";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });

type User = {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
};

const users: User[] = [
  {
    id: 1,
    name: "Jordan Lee",
    email: "jordan@example.com",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Taylor Brooks",
    email: "taylor@example.com",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Morgan Patel",
    email: "morgan@example.com",
    isAdmin: false,
  },
];

function UserCard({ user }: { user: User }) {
  return (
    <article className="flex min-h-[114px] items-center gap-3 rounded-[20px] border border-gray-100 bg-white p-5 shadow-md">
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D21312] text-2xl font-bold text-white"
      >
        {user.name.charAt(0).toUpperCase()}
      </span>

      <div className="min-w-0">
        <h2 className="break-words text-xl font-bold text-[#260101]">
          {user.name}
        </h2>

        <p className="mt-1 break-words text-sm text-gray-600">
          {user.isAdmin ? "Admin" : "Trainer"} · {user.email}
        </p>
      </div>
    </article>
  );
}

export default function AllUsers() {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName="Jordan Lee"
          isAdmin={true}
          activePage="/admin/users"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              All users
            </h1>
          </div>

          <div className="mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:px-12 xl:grid-cols-3">
            {users.map(function (user) {
              return <UserCard key={user.id} user={user} />;
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