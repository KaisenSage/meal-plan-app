// app/api/profile/subscription-status/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // ← you're using `db`, not `prisma` directly

export async function GET() {
  try {
    console.log("🔐 Fetching current user...");
    const user = await currentUser();

    if (!user) {
      console.warn("⚠️ No Clerk user found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("✅ Clerk user ID:", user.id);

    const profile =  db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      console.warn("❗ No profile found for user:", user.id);
      return NextResponse.json({ subscription: null }, { status: 200 });
    }

    console.log("📦 Subscription profile found:", profile);

    return NextResponse.json({
      subscription: {
        subscription_active: profile.subscriptionActive,
        subscription_tier: profile.subscriptionTier,
        next_payment_date: profile.nextPaymentDate,
      },
    });
  } catch (error) {
    console.error("❌ Internal server error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
