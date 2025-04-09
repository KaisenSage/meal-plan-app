import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { transactionId } = await req.json();

  try {
    const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status === "success" && data.data.status === "successful") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
