// app/api/payment/route.ts
import { NextResponse } from "next/server";
import { initializePayment, createPaymentConfig } from "@/lib/flutterwave";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.interval) {
      return NextResponse.json({
        error: "Missing required fields",
        details: "Email and interval are required"
      }, { status: 400 });
    }

    const paymentConfig = createPaymentConfig(
      body.interval,
      body.email,
      body.name
    );

    const response = await initializePayment(paymentConfig);

    if (response.status === "success") {
      return NextResponse.json({ success: true, data: response.data });
    } else {
      return NextResponse.json({
        error: "Payment initialization failed",
        details: response
      }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json({
      error: "Payment initialization failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
