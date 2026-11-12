import { NextRequest, NextResponse } from "next/server";

import { hashSessionToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Session from "../../../../models/Session";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  try {
    if (token) {
      await connectDB();
      await Session.deleteOne({ tokenHash: hashSessionToken(token) });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("session", "", { path: "/", maxAge: 0 });
    return response;
  } catch {
    return NextResponse.json(
      { error: "Could not log out." },
      { status: 500 }
    );
  }
}