import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.id || !user.emailAddresses[0]?.emailAddress) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount, plan } = await req.json();

    const paymentPayload = {
      tx_ref: `ref_${Date.now()}`,
      amount,
      currency: "NGN",
      redirect_url: "http://localhost:3000/api/flutterwave/verify", // 👈 Your verify endpoint
      payment_options: "card",
      customer: {
        email: user.emailAddresses[0].emailAddress,
      },
      meta: {
        userId: user.id,
        plan,
      },
      customizations: {
        title: "Meal Plan App Subscription",
        description: `Subscription for ${plan} plan`,
        logo: "https://yourapp.com/logo.png",
      },
    };

    const flwRes = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      paymentPayload,
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentLink = flwRes.data?.data?.link;
    return NextResponse.json({ link: paymentLink });
  } catch (error: any) {
    console.error("Flutterwave payment init error:", error.message);
    return NextResponse.json({ error: "Failed to start payment" }, { status: 500 });
  }
}
