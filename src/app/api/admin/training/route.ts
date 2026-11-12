import type { NextRequest } from "next/server";

import { getSignedInUser } from "@/lib/auth";
import TrainingLog from "@/models/TrainingLog";

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

    const logs = await TrainingLog.find().sort({ date: -1, _id: -1 });

    return Response.json(logs, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return Response.json(
      { error: "Could not load training logs." },
      { status: 500 }
    );
  }
}