import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";
import { useRouter } from "next/router";

import appLogo from "../../public/images/appLogo.png";

const heebo = Heebo({ subsets: ["latin"] });

const inputClassName =
  "w-full border-b-2 border-[#D21312] bg-transparent px-1 py-2 text-xl font-light placeholder:text-black sm:text-[25px]";

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

export default function CreateAccount() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setError("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          password,
          confirmPassword,
          isAdmin,
          adminCode: formData.get("adminCode"),
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Could not create the account.");
        return;
      }

      await router.push("/training-logs");
    } catch {
      setError("Could not complete signup. Try again.");
    } finally {
      setSaving(false);
    }
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

          <h1 className="text-center text-4xl font-bold sm:text-[64px]">
            Create Account
          </h1>

          <form onSubmit={handleSignUp} className="mt-8 sm:mt-10">
            <div className="space-y-5 sm:space-y-8">
              <div>
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  minLength={8}
                  maxLength={128}
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <label className="mt-8 flex w-fit cursor-pointer items-center gap-3 text-xl font-light sm:text-[25px]">
              <input
                name="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={function (event) {
                  setIsAdmin(event.target.checked);
                }}
                className="h-5 w-5 accent-[#D21312] sm:h-[25px] sm:w-[25px]"
              />
              Admin access
            </label>

            {isAdmin && (
              <div className="mt-4">
                <label htmlFor="adminCode" className="sr-only">
                  Admin signup code
                </label>
                <input
                  id="adminCode"
                  name="adminCode"
                  type="password"
                  placeholder="Admin signup code"
                  required
                  className={inputClassName}
                />
              </div>
            )}

            {error && (
              <p role="alert" className="mt-4 text-[#B51010]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="mt-8 flex h-14 w-full cursor-pointer items-center justify-center rounded-[20px] bg-[#D21312] text-2xl font-medium text-white hover:bg-[#B51010] disabled:opacity-50 sm:mt-10 sm:h-[70px] sm:text-[40px]"
            >
              {saving ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="mt-8 text-center text-lg font-light sm:text-[25px]">
            Already have an account?{" "}
            <Link href="/" className="font-medium hover:underline">
              Sign in
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