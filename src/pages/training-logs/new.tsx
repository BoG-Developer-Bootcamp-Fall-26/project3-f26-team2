import { useState } from "react";
import type { FormEvent } from "react";
import type { GetServerSidePropsContext } from "next";
import Image from "next/image";
import Link from "next/link";
import { Heebo } from "next/font/google";
import { useRouter } from "next/router";

import appLogo from "../../../public/images/appLogo.png";
import Sidebar from "../../components/Sidebar";
import { getSignedInUser } from "@/lib/auth";
import Animal from "@/models/Animal";

const heebo = Heebo({ subsets: ["latin"] });

const inputClassName =
  "mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-lg focus:border-[#D21312] focus:outline-2 focus:outline-[#D21312]";

type CreateTrainingLogProps = {
  currentUser: {
    fullName: string;
    isAdmin: boolean;
  };
  animals: { id: string; name: string }[];
};

type AnimalRecord = {
  _id: { toString(): string };
  name: string;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentUser = await getSignedInUser(context.req.cookies.session);

  if (!currentUser) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const records: AnimalRecord[] = await Animal.find({
    owner: currentUser.id,
  }).sort({ name: 1 });

  const animals = records.map(function (animal) {
    return { id: animal._id.toString(), name: animal.name };
  });

  return { props: { currentUser, animals } };
}

export default function CreateTrainingLog({
  currentUser,
  animals,
}: CreateTrainingLogProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving || animals.length === 0) return;

    const formData = new FormData(event.currentTarget);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    setMessage("");
    setSaving(true);

    try {
      const response = await fetch("/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          animalId: String(formData.get("animalId")).trim(),
          hours: Number(formData.get("hours")),
          description: formData.get("description"),
          date: `${year}-${month}-${day}`,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setMessage(result.error || "Could not save the training log.");
        return;
      }

      await router.push("/training-logs");
    } catch {
      setMessage("Could not save the training log. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={`${heebo.className} flex min-h-screen flex-col bg-white text-black`}>
      <header className="relative z-10 flex h-20 shrink-0 items-center bg-white px-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:h-[102px] sm:px-[49px]">
        <Image src={appLogo} alt="Progress" className="h-[50px] w-auto" />
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar
          userName={currentUser.fullName}
          isAdmin={currentUser.isAdmin}
          activePage="/training-logs"
        />

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
                Animal ID
              </label>
              <input
                id="animalId"
                name="animalId"
                type="text"
                placeholder="Enter the animal’s ID"
                required
                className={inputClassName}
              />

              {animals.length === 0 ? (
                <Link href="/animals/new" className="mt-2 block text-sm text-red-700 underline">
                  Add an animal before creating a training log.
                </Link>
              ) : (
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  {animals.map(function (animal) {
                    return (
                      <li key={animal.id} className="break-words">
                        {animal.name} · <code>{animal.id}</code>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div>
              <label htmlFor="hours" className="block text-lg font-medium">
                Hours trained
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
                disabled={saving || animals.length === 0}
                className="cursor-pointer rounded-md bg-[#D21312] px-8 py-3 font-medium text-white hover:bg-[#B51010] disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

            {message && (
              <p role="alert" className="text-sm text-red-700">
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