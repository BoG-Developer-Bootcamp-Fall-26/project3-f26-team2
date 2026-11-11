import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });

const inputClassName =
  "mt-1 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-3 text-base focus:border-[#D21312] focus:outline-2 focus:outline-[#D21312] sm:text-lg";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CreateAnimal() {
  const [message, setMessage] = useState("");

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const month = Number(formData.get("birthMonth"));
    const day = Number(formData.get("birthDay"));
    const year = Number(formData.get("birthYear"));

    if (month || day || year) {
      if (!month || !day || !year) {
        setMessage("Enter the month, day, and year for the birth date.");
        return;
      }

      const birthDate = new Date(year, month - 1, day);

      if (birthDate.getMonth() !== month - 1 || birthDate.getDate() !== day) {
        setMessage("Enter a valid birth date.");
        return;
      }
    }

    // Connect the create-animal endpoint here when it's ready 
    
    setMessage("The form is valid. Saving will be available once the API is connected.");
  }

  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar userName="Jordan Lee" isAdmin={true} activePage="/animals" />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              Animals
            </h1>
          </div>

          <form
            aria-label="Create animal"
            onSubmit={handleSave}
            className="mx-auto w-full max-w-[920px] space-y-4 px-6 py-8 lg:w-[70%]"
          >
            <div>
              <label htmlFor="name" className="block text-lg font-medium">
                Animal Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="breed" className="block text-lg font-medium">
                Breed
              </label>
              <input
                id="breed"
                name="breed"
                type="text"
                placeholder="Breed"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="hoursTrained" className="block text-lg font-medium">
                Total hours trained
              </label>
              <input
                id="hoursTrained"
                name="hoursTrained"
                type="number"
                min="0"
                step="any"
                placeholder="0"
                required
                className={inputClassName}
              />
            </div>


            <div className="grid grid-cols-[1.4fr_1fr_1.4fr] gap-3 sm:gap-5">
              <div className="min-w-0">
                <label htmlFor="birthMonth" className="block font-medium sm:text-lg">
                  Birth Month
                </label>
                <select
                  id="birthMonth"
                  name="birthMonth"
                  defaultValue=""
                  className={inputClassName}
                >
                  <option value="">Month</option>
                  {months.map(function (month, index) {
                    return (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="min-w-0">
                <label htmlFor="birthDay" className="block font-medium sm:text-lg">
                  Date
                </label>
                <input
                  id="birthDay"
                  name="birthDay"
                  type="number"
                  min="1"
                  max="31"
                  placeholder="20"
                  className={inputClassName}
                />
              </div>

              <div className="min-w-0">
                <label htmlFor="birthYear" className="block font-medium sm:text-lg">
                  Year
                </label>
                <input
                  id="birthYear"
                  name="birthYear"
                  type="number"
                  min="1000"
                  max="9999"
                  placeholder="2023"
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-lg font-medium">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                rows={5}
                placeholder="Note"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/animals"
                className="rounded-md border border-[#D21312] px-8 py-3 font-medium text-[#D21312] hover:bg-red-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="cursor-pointer rounded-md bg-[#D21312] px-8 py-3 font-medium text-white hover:bg-[#B51010]"
              >
                Save
              </button>
            </div>

            {message && (
              <p role="status" className="text-sm text-gray-600">
                {message}
              </p>
            )}
          </form>

          <footer className="mt-auto px-6 py-5 text-center text-sm text-black/70">
            <p>2026 Fall BOG Developer Bootcamp Group 2</p>
          </footer>
        </main>
      </div>
    </div>
  );
}