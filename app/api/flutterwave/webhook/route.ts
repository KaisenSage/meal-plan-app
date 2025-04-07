import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate it came from Flutterwave (you can implement signature validation here)

    const { status, tx_ref, customer, flw_ref } = body.data;

    if (status === "successful") {
      const userId = body.data.meta?.userId;
      const plan = body.data.meta?.plan;

      // Update user subscription in DB
      await prisma.profile.update({
        where: { userId },
        data: {
          subscriptionActive: true,
          subscriptionTier: plan,
          flwTransactionRef: flw_ref,
          lastPaymentDate: new Date(),
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        },
      });

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ status: "Not successful" }, { status: 400 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
