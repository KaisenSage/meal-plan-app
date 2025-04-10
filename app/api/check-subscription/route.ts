import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Test DB connection
    await db.$queryRaw`SELECT 1`;

    const profile = await db.profile.findUnique({
      where: { userId },
      select: {
        subscriptionActive: true,
        subscriptionTier: true,
      },
    });

    if (!profile) {
      await db.profile.create({
        data: {
          userId,
          email: "", // You may want to get this from Clerk
          subscriptionActive: false,
          subscriptionTier: null,
        },
      });

      return NextResponse.json({
        subscription: {
          subscriptionActive: false,
          subscriptionTier: null,
        },
      });
    }

    return NextResponse.json({
      subscription: {
        subscriptionActive: profile.subscriptionActive,
        subscriptionTier: profile.subscriptionTier,
      },
    });
  } catch (error) {
    console.error("Subscription check error:", error);
    return NextResponse.json(
      { error: "Failed to check subscription" },
      { status: 500 }
    );
  }
}
