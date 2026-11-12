import mongoose from "mongoose";
import type { NextRequest } from "next/server";

import { getSignedInUser } from "@/lib/auth";
import Animal from "@/models/Animal";
import TrainingLog from "@/models/TrainingLog";

export async function POST(request: NextRequest) {
  try {
    const user = await getSignedInUser(request.cookies.get("session")?.value);

    if (!user) {
      return Response.json({ error: "Log in to save a training log." }, { status: 401 });
    }

    const body = await request.json().catch(function () {
      return null;
    });

    const animalId = body?.animalId;
    const title = body?.title;
    const description = body?.description;
    const hours = body?.hours;
    const dateText = body?.date;

    if (
      typeof animalId !== "string" ||
      !mongoose.isObjectIdOrHexString(animalId) ||
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof hours !== "number" ||
      !Number.isFinite(hours) ||
      hours < 0 ||
      typeof dateText !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dateText)
    ) {
      return Response.json(
        { error: "Enter an animal, title, description, hours, and date." },
        { status: 400 }
      );
    }

    const date = new Date(dateText);

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== dateText
    ) {
      return Response.json({ error: "Enter a valid date." }, { status: 400 });
    }

    const logId = await mongoose.connection.transaction(async function (session) {
      const update = await Animal.updateOne(
        { _id: animalId, owner: user.id },
        { $inc: { hoursTrained: hours } },
        { session }
      );

      if (update.matchedCount === 0) return null;

      const [log] = await TrainingLog.create(
        [{ user: user.id, animal: animalId, title, date, description, hours }],
        { session }
      );

      return log._id.toString();
    });

    if (!logId) {
      return Response.json(
        { error: "Select an animal from your own dashboard." },
        { status: 400 }
      );
    }

    return Response.json({ id: logId }, { status: 201 });
  } catch {
    return Response.json(
      { error: "Could not save the training log." },
      { status: 500 }
    );
  }
}