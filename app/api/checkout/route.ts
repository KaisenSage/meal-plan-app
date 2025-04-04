import { NextResponse } from "next/server";
import { createPaymentConfig, initializePayment } from "@/lib/flutterwave";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planType, userId, email } = body;

    if (!planType || !userId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get payment configuration for the plan
    const paymentConfig = createPaymentConfig(planType, email, userId);

    // Initialize payment with Flutterwave
    const response = await initializePayment(paymentConfig);

    if (response.status === "success" && response.data?.link) {
      return NextResponse.json({ url: response.data.link });
    }

    throw new Error("Failed to initialize payment");
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}

function getPlanAmount(planType: string): number {
  const normalized = planType.toLowerCase();

  switch (normalized) {
    case "weekly":
      return 999;
    case "monthly":
      return 3999;
    case "yearly":
      return 29999;
    default:
      throw new Error("Invalid plan type");
  }
}
