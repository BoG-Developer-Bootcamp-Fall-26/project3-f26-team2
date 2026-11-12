import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return Response.json({ message: "Connected to MongoDB" });
  } catch (error) {
    console.error(
      "Database connection failed:",
      error instanceof Error ? error.name : "Unknown error"
    );

    return Response.json(
      { message: "Could not connect to MongoDB" },
      { status: 500 }
    );
  }
}