import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { prisma } from "@/lib/prisma";

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY as string;

export async function GET(req: NextRequest) {
  try {
    const transactionId = req.nextUrl.searchParams.get("transaction_id");
    if (!transactionId) {
      return NextResponse.redirect("/error");
    }

    // 1. Verify the transaction
    const verifyRes = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
      }
    );

    const data = verifyRes.data.data;
    const userId = data.meta?.userId;
    const plan = data.meta?.plan;
    const flwTransactionRef = data.tx_ref;
    const flwCustomerId = data.customer?.id;

    if (data.status !== "successful") {
      return NextResponse.redirect("/error");
    }

    // 2. Update user profile in DB
    await prisma.profile.upsert({
      where: { userId },
      update: {
        subscriptionActive: true,
        subscriptionTier: plan,
        flwTransactionRef,
        flwCustomerId,
        lastPaymentDate: new Date(),
      },
      create: {
        userId,
        email: data.customer.email,
        subscriptionActive: true,
        subscriptionTier: plan,
        flwTransactionRef,
        flwCustomerId,
        lastPaymentDate: new Date(),
      },
    });

    return NextResponse.redirect("/dashboard");

  } catch (error: any) {
    console.error("Flutterwave verification error:", error.message);
    return NextResponse.redirect("/error");
  }
}
