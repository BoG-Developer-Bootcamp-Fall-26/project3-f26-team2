import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";

const heebo = Heebo({ subsets: ["latin"] });

const inputClassName =
  "mt-2 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-3 text-base focus:border-[#D21312] focus:outline-2 focus:outline-[#D21312] sm:px-4 sm:text-lg";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CreateTrainingLog() {
  const [message, setMessage] = useState("");

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const month = Number(formData.get("month"));
    const day = Number(formData.get("day"));
    const year = Number(formData.get("year"));

    const logDate = new Date(year, month - 1, day);

    if (logDate.getMonth() !== month - 1 || logDate.getDate() !== day) {
      setMessage("Enter a valid training date.");
      return;
    }

    // Connect the create-log endpoint here when it's ready
    
    setMessage(
      `Log date: ${logDate.toLocaleDateString()}. Saving will be available once the API is connected.`
    );
  }

  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar userName="Jordan Lee" isAdmin={true} activePage="/training-logs" />

        <main className="flex min-w-0 flex-1 flex-col">
          <div className="border-b border-gray-200 px-6 py-5 lg:px-12">
            <h1 className="text-2xl font-bold text-gray-800 sm:text-[30px]">
              Create Training Log
            </h1>
          </div>

          <form
            onSubmit={handleSave}
            className="mx-auto w-full max-w-[920px] space-y-5 px-6 py-8"
          >
            <div>
              <label htmlFor="title" className="block text-lg font-medium">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Practice recall"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="animalId" className="block text-lg font-medium">
                Select Animal
              </label>
              <select
                id="animalId"
                name="animalId"
                defaultValue=""
                required
                className={inputClassName}
              >
                <option value="" disabled>Choose an animal</option>
                <option value="1">Lucy - Golden Retriever</option>
              </select>
            </div>

            <div>
              <label htmlFor="hours" className="block text-lg font-medium">
                Total hours trained
              </label>
              <input
                id="hours"
                name="hours"
                type="number"
                min="0"
                step="any"
                placeholder="1.5"
                required
                className={inputClassName}
              />
            </div>

            <div className="grid grid-cols-[1.4fr_1fr_1.4fr] gap-3 sm:gap-6">
              <div>
                <label htmlFor="month" className="block text-lg font-medium">
                  Month
                </label>
                <select
                  id="month"
                  name="month"
                  defaultValue=""
                  required
                  className={inputClassName}
                >
                  <option value="" disabled>Month</option>
                  {months.map(function (month, index) {
                    return (
                      <option key={month} value={index + 1}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label htmlFor="day" className="block text-lg font-medium">
                  Date
                </label>
                <input
                  id="day"
                  name="day"
                  type="number"
                  min="1"
                  max="31"
                  placeholder="20"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="year" className="block text-lg font-medium">
                  Year
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  min="1000"
                  max="9999"
                  placeholder="2026"
                  required
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Describe what you worked on."
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/training-logs"
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