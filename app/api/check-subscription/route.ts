import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    try {
      // Test database connection
      await db.$queryRaw`SELECT 1`;
    } catch (connectionError) {
      console.error("Database connection error:", connectionError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 503 }
      );
    }

    try {
      // Get user's profile from database
      const profile = await db.profile.findUnique({
        where: { userId },
        select: { subscriptionActive: true },
      });

      // If no profile exists, create one
      if (!profile) {
        const newProfile = await db.profile.create({
          data: {
            userId,
            email: "", // You might want to get this from Clerk
            subscriptionActive: false,
          },
        });
        return NextResponse.json({ subscriptionActive: false });
      }

      return NextResponse.json({
        subscriptionActive: profile.subscriptionActive,
      });
    } catch (dbError) {
      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("Prisma error:", dbError.code, dbError.message);
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Check subscription error:", error);
    return NextResponse.json(
      { error: "Failed to check subscription" },
      { status: 500 }
    );
  }
}