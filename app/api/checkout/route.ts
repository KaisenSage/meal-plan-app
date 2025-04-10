// app/api/checkout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planType, userId, email } = body;

    console.log("📩 Received request:", { planType, userId, email });

    if (!planType || !userId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.FLW_SECRET_KEY) {
      console.error("❌ Flutterwave secret key is missing");
      return NextResponse.json({ error: "Payment configuration error" }, { status: 500 });
    }

    // Get amount based on plan type
    let amount;
    switch (planType) {
      case "weekly":
        amount = "9.99";
        break;
      case "monthly":
        amount = "39.99";
        break;
      case "yearly":
        amount = "299.99";
        break;
      default:
        return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    const paymentData = {
      tx_ref: `tx-${Date.now()}-${userId}`,
      amount,
      currency: "USD",
      payment_options: "card",
      redirect_url: process.env.FLW_CALLBACK_URL || "https://yourdomain.com/payment/callback",
      customer: {
        email,
        name: email.split("@")[0],
        phonenumber: "0900000000"
      },
      customizations: {
        title: "Meal Plan Subscription",
        description: `${planType} Plan Subscription`,
        logo: "https://your-logo-url.com/logo.png"
      }
    };

    console.log("⚙️ Payment config:", paymentData);

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentData)
    });

    const rawResponse = await response.text();

    console.log("🌐 Flutterwave response:", rawResponse);
    console.log("📦 Status:", response.status);

    let data;
    try {
      data = JSON.parse(rawResponse);
    } catch (err) {
      return NextResponse.json({
        error: "Invalid response from payment provider",
        details: rawResponse.substring(0, 200)
      }, { status: 500 });
    }

    if (data.status === "success" && data.data?.link) {
      return NextResponse.json({ url: data.data.link });
    }

    console.error("🛑 Payment failed:", data);
    return NextResponse.json({
      error: data.message || "Payment initialization failed",
      details: data
    }, { status: 400 });

  } catch (err: any) {
    console.error("🚨 Unexpected error:", err);
    return NextResponse.json({
      error: "Internal server error",
      details: err?.message || "Unknown error"
    }, { status: 500 });
  }
}
