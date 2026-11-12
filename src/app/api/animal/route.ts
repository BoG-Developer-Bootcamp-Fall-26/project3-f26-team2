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
      typeof name !== "string" || !name.trim() ||
      typeof breed !== "string" || !breed.trim() ||
      typeof hoursTrained !== "number" ||
      !Number.isFinite(hoursTrained) || hoursTrained < 0
    ) {
      return Response.json(
        { error: "Enter a name, breed, and valid training hours." },
        { status: 400 }
      );
    }

    const animal = await Animal.create({
      name,
      breed,
      hoursTrained,
      owner: user.id,
      birthDate: body.birthDate || null,
      note: typeof body.note === "string" ? body.note.trim() : "",
    });

    return Response.json({ id: animal._id.toString() }, { status: 201 });
  } catch {
    return Response.json({ error: "Could not save the animal." }, { status: 500 });
  }
}