import type { NextRequest } from "next/server";

import { getSignedInUser } from "@/lib/auth";
import Animal from "@/models/Animal";

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getSignedInUser(
      request.cookies.get("session")?.value
    );

    if (!currentUser) {
      return Response.json({ error: "Log in first." }, { status: 401 });
    }

    if (!currentUser.isAdmin) {
      return Response.json({ error: "Admin access required." }, { status: 403 });
    }

    const animals = await Animal.find();

    return Response.json(animals, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return Response.json({ error: "Could not load animals." }, { status: 500 });
  }
}