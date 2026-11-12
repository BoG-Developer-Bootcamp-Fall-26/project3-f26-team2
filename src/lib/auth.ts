import { createHash } from "node:crypto";

import { connectDB } from "@/lib/db";
import Session from "../models/Session";
import User from "@/models/User";

export function hashSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function getSignedInUser(token?: string) {
  if (!token) return null;

  await connectDB();

  const session = await Session.findOne({
    tokenHash: hashSessionToken(token),
    expiresAt: { $gt: new Date() },
  });

  if (!session) return null;

  const user = await User.findById(session.userId).select("fullName admin");

  if (!user) return null;

  return {
    id: user._id.toString(),
    fullName: user.fullName,
    isAdmin: user.admin,
  };
}