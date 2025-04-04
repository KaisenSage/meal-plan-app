import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    // Ensure Flutterwave Secret Key is set
    if (!process.env.FLW_SECRET_KEY) {
      throw new Error("Flutterwave secret key is missing in .env.local");
    }

    // Log the API key (first few characters only for security)
    const apiKeyPreview = process.env.FLW_SECRET_KEY.substring(0, 4) + '...';
    console.log('Using API key starting with:', apiKeyPreview);

    const payloadToFlutterwave = {
      tx_ref: `tx-${Date.now()}`,
      amount: body.amount,
      currency: body.currency || "NGN",
      redirect_url: "http://localhost:3000/payment-success",
      payment_options: "card,mobilemoney,ussd",
      customer: {
        email: body.email,
        phone_number: body.phone_number || "",
        name: body.name || "Anonymous",
      },
      customizations: {
        title: "My Store",
        description: "Payment for items in cart",
        logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
      },
    };
    console.log('Sending to Flutterwave:', payloadToFlutterwave);

    // First, check if the API key is working by making a test request
    const testResponse = await fetch("https://api.flutterwave.com/v3/transactions", {
      headers: {
        "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log('Test API response status:', testResponse.status);
    console.log('Test API response headers:', Object.fromEntries(testResponse.headers.entries()));

    // Now make the actual payment request
    const flutterwaveResponse = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadToFlutterwave),
    });

    // Log response status and headers
    console.log('Payment API response status:', flutterwaveResponse.status);
    console.log('Payment API response headers:', Object.fromEntries(flutterwaveResponse.headers.entries()));

    // Get the raw response
    const rawResponse = await flutterwaveResponse.text();
    console.log('Raw Flutterwave response:', rawResponse);

    // If we got HTML instead of JSON, return a more helpful error
    if (rawResponse.trim().startsWith('<!DOCTYPE')) {
      return NextResponse.json({
        error: "Invalid API response",
        details: "Received HTML instead of JSON. Please check your API key and configuration.",
        status: flutterwaveResponse.status
      }, { status: 500 });
    }

    // Try to parse the response as JSON
    let flutterwaveData;
    try {
      flutterwaveData = JSON.parse(rawResponse);
    } catch (parseError) {
      console.error('Failed to parse Flutterwave response:', parseError);
      return NextResponse.json({
        error: "Invalid response from Flutterwave",
        details: rawResponse.substring(0, 200) // Only return first 200 characters for safety
      }, { status: 500 });
    }

    if (flutterwaveData.status === "success") {
      return NextResponse.json({
        message: "Payment initialized",
        data: flutterwaveData,
      }, { status: 200 });
    } else {
      return NextResponse.json({
        error: "Flutterwave payment initialization failed",
        details: flutterwaveData,
      }, { status: 400 });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Payment error:', errorMessage);
    return NextResponse.json({ 
      error: "Something went wrong", 
      details: errorMessage 
    }, { status: 500 });
  }
}