import mongoose from "mongoose";
import type { NextRequest } from "next/server";

import { getSignedInUser } from "@/lib/auth";
import Animal from "@/models/Animal";

export async function POST(request: NextRequest) {
  try {
    const user = await getSignedInUser(request.cookies.get("session")?.value);

    if (!user) {
      return Response.json({ error: "Log in to add an animal." }, { status: 401 });
    }

    const body = await request.json().catch(function () {
      return null;
    });

    const name = body?.name;
    const breed = body?.breed;
    const hoursTrained = body?.hoursTrained;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof breed !== "string" ||
      !breed.trim() ||
      typeof hoursTrained !== "number" ||
      !Number.isFinite(hoursTrained) ||
      hoursTrained < 0
    ) {
      return Response.json(
        { error: "Enter a name, breed, and valid training hours." },
        { status: 400 }
      );
    }

    const profilePicture = body.profilePicture;
    let pictureUrl = "";

    if (profilePicture !== undefined && profilePicture !== null && profilePicture !== "") {
      if (typeof profilePicture !== "string") {
        return Response.json({ error: "Enter a valid image URL." }, { status: 400 });
      }

      try {
        const url = new URL(profilePicture.trim());

        if (url.protocol !== "https:" && url.protocol !== "http:") {
          return Response.json(
            { error: "Use an HTTP or HTTPS image URL." },
            { status: 400 }
          );
        }

        pictureUrl = url.href;
      } catch {
        return Response.json({ error: "Enter a valid image URL." }, { status: 400 });
      }
    }

    const animal = await Animal.create({
      name: name.trim(),
      breed: breed.trim(),
      hoursTrained,
      owner: user.id,
      profilePicture: pictureUrl,
      birthDate: body.birthDate || null,
      note: typeof body.note === "string" ? body.note.trim() : "",
    });

    return Response.json({ id: animal._id.toString() });
  } catch {
    return Response.json({ error: "Could not save the animal." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getSignedInUser(request.cookies.get("session")?.value);

    if (!user) {
      return Response.json(
        { error: "Log in to update an animal." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(function () {
      return null;
    });

    const animalId = body?.animalId;
    const hoursTrained = body?.hoursTrained;

    if (
      typeof animalId !== "string" ||
      !mongoose.isObjectIdOrHexString(animalId) ||
      typeof hoursTrained !== "number" ||
      !Number.isFinite(hoursTrained) ||
      hoursTrained < 0
    ) {
      return Response.json(
        { error: "Enter a valid animal ID and total training hours." },
        { status: 400 }
      );
    }

    const result = await Animal.updateOne(
      { _id: animalId, owner: user.id },
      { $set: { hoursTrained } }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { error: "Select an animal you own." },
        { status: 400 }
      );
    }

    return Response.json({ id: animalId, hoursTrained });
  } catch {
    return Response.json(
      { error: "Could not update the animal's hours." },
      { status: 500 }
    );
  }
}