import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../public/images/appLogo.png";
import quarterCircle from "../../public/images/quarterCircle.png";

const heebo = Heebo({ subsets: ["latin"] });

export default function Home() {
  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Connect this form to the team's login endpoint when it's ready.
  }

  return (
    <div
      className={`${heebo.className} relative flex min-h-screen flex-col bg-white text-black`}
    >
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <section className="w-full max-w-[700px]">
          <h1 className="text-center text-5xl font-bold sm:text-[64px]">
            Login
          </h1>

          <form onSubmit={handleLogin} className="mt-8 sm:mt-10">
            <div className="space-y-7 sm:space-y-9">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  className="w-full border-b-2 border-[#D21312] bg-transparent px-1 py-2 text-xl font-light placeholder:text-black sm:text-[25px]"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                  className="w-full border-b-2 border-[#D21312] bg-transparent px-1 py-2 text-xl font-light placeholder:text-black sm:text-[25px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-12 flex h-14 w-full items-center justify-center rounded-[20px] bg-[#D21312] text-2xl font-medium text-white hover:bg-[#B51010] sm:mt-20 sm:h-[70px] sm:text-[40px]"
            >
              Log in
            </button>
          </form>

          <p className="mt-8 text-center text-lg font-light sm:text-[25px]">
            Don’t have an account?{" "}
            <Link href="/create-account" className="font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </section>
      </main>

      <footer className="relative z-10 px-6 pb-6 pt-4 text-center text-sm text-black/70 sm:min-h-[102px] sm:text-xl">
        <p>Fall 2026 BOG Developer Bootcamp Group 2</p>
      </footer>

      <Image
        src={quarterCircle}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 hidden h-auto w-[229px] md:block"
      />
    </div>
  );
}