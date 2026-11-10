import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";
import appLogo from "../../public/images/appLogo.png";

const heebo = Heebo({ subsets: ["latin"] });

function CornerWave({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      className={`pointer-events-none absolute hidden h-auto w-40 md:block lg:w-[229px] ${className}`}
    >
      <path
        d="M0 0H220V140C193 101 164 85 123 82C72 79 34 58 0 0Z"
        fill="#FDE8E5"
      />
      <path
        d="M28 0H220V111C194 80 165 68 129 66C86 64 54 45 28 0Z"
        fill="#D21312"
      />
      <path
        d="M9 0C43 52 75 74 124 76C167 79 194 93 220 128"
        fill="none"
        stroke="#781712"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Home() {
  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // backend logic goes here
  }

  return (
    <div className={`${heebo.className} relative flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <CornerWave className="right-0 top-[102px]" />
      <CornerWave className="bottom-0 left-0 rotate-180" />

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-12">
        <section className="relative w-full max-w-[798px] rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-sm sm:px-12 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-xl border border-[#E9B9B5]"
          />

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
              className="mt-12 flex h-14 w-full cursor-pointer items-center justify-center rounded-[20px] bg-[#D21312] text-2xl font-medium text-white hover:bg-[#B51010] sm:mt-20 sm:h-[70px] sm:text-[40px]"
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
        <p>2026 Fall BOG Developer Bootcamp Group 2</p>
      </footer>
    </div>
  );
}