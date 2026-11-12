import mongoose from "mongoose";

export async function connectDB() {
  const databaseUrl = process.env.DB_URL;

  if (!databaseUrl) {
    throw new Error("DB_URL is missing from .env.local");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(databaseUrl, {
    dbName: "animal_training",
    serverSelectionTimeoutMS: 5000,
  });
}