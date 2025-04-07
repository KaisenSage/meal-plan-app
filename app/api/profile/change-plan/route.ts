import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { availablePlans } from "@/lib/plans";

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY!;

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPlan } = await req.json();
    const plan = availablePlans.find(p => p.interval === newPlan);

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const flutterwaveRes = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: `change-sub-${user.id}-${Date.now()}`,
        amount: plan.amount,
        currency: plan.currency || "USD",
        redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/flutterwave/verify-payment`,
        customer: {
          email: user.primaryEmailAddress?.emailAddress || "no-email@example.com",
          name: `${user.firstName} ${user.lastName}`,
        },
        customizations: {
          title: `Upgrade to ${plan.name}`,
          description: `You're upgrading to the ${plan.name} plan.`,
        },
        meta: {
          userId: user.id,
          plan: newPlan,
        }
      })
    });

    const paymentData = await flutterwaveRes.json();

    if (!paymentData?.data?.link) {
      return NextResponse.json({ error: "Failed to create payment link." }, { status: 500 });
    }

    return NextResponse.json({ paymentLink: paymentData.data.link });

  } catch (err: any) {
    console.error("Flutterwave change plan error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
