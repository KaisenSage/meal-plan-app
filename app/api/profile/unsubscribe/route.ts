import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import fetch from "node-fetch";

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY!;

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's current subscription record
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });

    if (!profile?.flutterwaveSubscriptionId) {
      throw new Error("No active subscription found.");
    }

    const subscriptionId = profile.flutterwaveSubscriptionId;

    // Cancel the subscription via Flutterwave API
    const response = await fetch(
      `https://api.flutterwave.com/v3/payment-plans/${subscriptionId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      throw new Error(data.message || "Failed to cancel subscription.");
    }

    // Update the database
    await prisma.profile.update({
      where: { userId: clerkUser.id },
      data: {
        subscriptionTier: null,
        flutterwaveSubscriptionId: null,
        subscriptionActive: false,
      },
    });

    return NextResponse.json({ subscription: data });
  } catch (error: any) {
    console.error("Error unsubscribing:", error);
    return NextResponse.json(
      { error: error.message || "Failed to unsubscribe." },
      { status: 500 }
    );
  }
}
