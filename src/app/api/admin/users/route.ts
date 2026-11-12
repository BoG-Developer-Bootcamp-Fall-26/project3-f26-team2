import type { NextRequest } from "next/server";

import { getSignedInUser } from "@/lib/auth";
import User from "@/models/User";

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

    const users = await User.find({}, "fullName email admin");

    return Response.json(users, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return Response.json({ error: "Could not load users." }, { status: 500 });
  }
}