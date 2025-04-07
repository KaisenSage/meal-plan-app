import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/flutterwave";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transaction_id = searchParams.get("transaction_id");

    if (!transaction_id) {
      return NextResponse.json({
        error: "Missing transaction ID",
      }, { status: 400 });
    }

    const verificationResponse = await verifyPayment(transaction_id);

    if (verificationResponse.status === "success") {
      const data = verificationResponse.data;
      const userId = data.meta?.userId;
      const plan = data.meta?.plan;
      const email = data.customer?.email;

      if (!userId || !plan) {
        return NextResponse.json({
          error: "Missing metadata from payment verification",
        }, { status: 400 });
      }

      // ✅ Update or create user profile
      await prisma.profile.upsert({
        where: { userId },
        update: {
          subscriptionActive: true,
          subscriptionTier: plan,
        },
        create: {
          userId,
          email: email || "",
          subscriptionActive: true,
          subscriptionTier: plan,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified and subscription updated.",
        data,
      });
    } else {
      return NextResponse.json({
        error: "Payment verification failed",
        details: verificationResponse,
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({
      error: "Payment verification failed",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
