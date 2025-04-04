import { NextResponse } from "next/server";
import { verifyPayment } from "@/lib/flutterwave";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const transaction_id = searchParams.get('transaction_id');

    if (!transaction_id) {
      return NextResponse.json({
        error: "Missing transaction ID"
      }, { status: 400 });
    }

    const verificationResponse = await verifyPayment(transaction_id);

    if (verificationResponse.status === "success") {
      return NextResponse.json({
        success: true,
        data: verificationResponse.data
      });
    } else {
      return NextResponse.json({
        error: "Payment verification failed",
        details: verificationResponse
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({
      error: "Payment verification failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 