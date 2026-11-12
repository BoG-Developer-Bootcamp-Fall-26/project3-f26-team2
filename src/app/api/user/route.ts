import { createHash, randomBytes } from "node:crypto";
import * as argon2 from "argon2";

import { connectDB } from "@/lib/db";
import { hashSessionToken } from "@/lib/auth";
import Session from "../../../models/Session";
import User from "@/models/User";

export async function POST(request: Request) {
  const body = await request.json().catch(function () {
    return null;
  });

  const fullName = body?.fullName;
  const email = body?.email;
  const password = body?.password;
  const isAdmin = body?.isAdmin === true;

  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    return Response.json(
      { error: "Enter a name, a valid email, and a password of 8–128 characters." },
      { status: 400 }
    );
  }

  if (body.confirmPassword !== undefined && password !== body.confirmPassword) {
    return Response.json({ error: "Passwords do not match." }, { status: 400 });
  }

  const adminSignupCode = process.env.ADMIN_SIGNUP_CODE;

  if (isAdmin && (!adminSignupCode || body.adminCode !== adminSignupCode)) {
    return Response.json(
      { error: "Enter the correct admin signup code." },
      { status: 403 }
    );
  }

  try {
    await connectDB();
    await User.init();

    const user = await User.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      password: await argon2.hash(password),
      admin: isAdmin,
    });

    const token = randomBytes(32).toString("hex");
    const maxAge = 60 * 60 * 24 * 7;

    await Session.create({
      tokenHash: hashSessionToken(token),
      userId: user._id,
      expiresAt: new Date(Date.now() + maxAge * 1000),
    });

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

    return Response.json(
      {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.admin,
      },
      {
        headers: {
          "Set-Cookie": `session=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${secure}`,
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return Response.json(
        { error: "An account already exists for this email." },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Could not complete signup. If your account was created, try signing in." },
      { status: 500 }
    );
  }
}