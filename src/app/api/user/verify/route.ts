import { createHash, randomBytes } from "node:crypto";
import * as argon2 from "argon2";

import { connectDB } from "@/lib/db";
import Session from "../../../../models/Session";
import User from "@/models/User";

export async function POST(request: Request) {
  const body = await request.json().catch(function () {
    return null;
  });

  const email = body?.email;
  const password = body?.password;

  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password ||
    password.length > 128
  ) {
    return Response.json(
      { error: "Enter a valid email and password." },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user || !(await argon2.verify(user.password, password))) {
      return Response.json(
        { error: "Incorrect email or password." },
        { status: 401 }
      );
    }

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const maxAge = 60 * 60 * 24 * 7;

    await Session.create({
      tokenHash,
      userId: user._id,
      expiresAt: new Date(Date.now() + maxAge * 1000),
    });

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

    return Response.json(
      {
        id: user._id.toString(),
        fullName: user.fullName,
        isAdmin: user.admin,
      },
      {
        headers: {
          "Set-Cookie": `session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`,
          "Cache-Control": "no-store",
        },
      }
    );
  } catch {
    return Response.json(
      { error: "Could not sign in." },
      { status: 500 }
    );
  }
}