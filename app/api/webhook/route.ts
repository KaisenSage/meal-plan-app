import { NextRequest, NextResponse } from 'next/server';

const FLW_SECRET_HASH = process.env.FLW_SECRET_HASH || '';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const headers = req.headers;

  const flutterwaveSignature = headers.get('verif-hash');

  // ✅ Verify the webhook signature
  if (!flutterwaveSignature || flutterwaveSignature !== FLW_SECRET_HASH) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  // ✅ Parse JSON payload
  let event;
  try {
    event = JSON.parse(rawBody);
  } catch (error) {
    return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
  }

  // ✅ Handle charge completed (payment)
  if (event.event === 'charge.completed') {
    const data = event.data;

    // You can access metadata here if you added any during checkout
    const txRef = data.tx_ref;
    const status = data.status;
    const email = data.customer.email;
    const plan = data.meta?.planType; // if you passed planType in meta

    if (status === 'successful') {
      // 👉 Update your DB to mark user as paid
      console.log(`✅ Payment success for ${email}, txRef: ${txRef}, plan: ${plan}`);
    } else {
      // ❌ Failed or cancelled payment
      console.log(`⚠️ Payment failed for ${email}, txRef: ${txRef}, status: ${status}`);
    }
  }

  return NextResponse.json({ received: true });
}
