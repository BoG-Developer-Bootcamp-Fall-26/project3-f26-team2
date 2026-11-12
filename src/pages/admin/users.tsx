import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import { Heebo } from "next/font/google";
import type { Model } from "mongoose";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";
import { getSignedInUser } from "@/lib/auth";
import UserModel from "@/models/User";

const heebo = Heebo({ subsets: ["latin"] });

type UserRecord = {
  fullName: string;
  email: string;
  admin: boolean;
};

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

type AllUsersProps = {
  currentUser: {
    fullName: string;
    isAdmin: boolean;
  };
  users: User[];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader("Cache-Control", "private, no-store");

  const currentUser = await getSignedInUser(context.req.cookies.session);

  if (!currentUser) {
    return { redirect: { destination: "/", permanent: false } };
  }

  if (!currentUser.isAdmin) {
    return { redirect: { destination: "/training-logs", permanent: false } };
  }

  const usersModel = UserModel as Model<UserRecord>;
  const records = await usersModel
    .find()
    .select("fullName email admin")
    .sort({ fullName: 1 });

  const users: User[] = records.map(function (user) {
    return {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      isAdmin: user.admin === true,
    };
  });

  return { props: { currentUser, users } };
}

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

export default function AllUsers({ currentUser, users }: AllUsersProps) {
  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.fullName}
          isAdmin={currentUser.isAdmin}
          activePage="/admin/users"
        />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              All users
            </h1>
          </div>

          <div className="mx-auto grid w-full max-w-[1380px] grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 lg:px-12 xl:grid-cols-3">
            {users.length === 0 && (
              <p className="text-gray-600">No users found.</p>
            )}

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