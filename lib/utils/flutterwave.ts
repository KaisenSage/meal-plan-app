// lib/flutterwave.ts

export interface PaymentParams {
    amount: number;
    email: string;
    name: string;
  }
  
  export const makePayment = ({ amount, email, name }: PaymentParams) => {
    const FlutterwaveCheckout = (window as any).FlutterwaveCheckout;
  
    if (!FlutterwaveCheckout) {
      console.error("Flutterwave script not loaded yet.");
      return;
    }
  
    FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
      tx_ref: Date.now().toString(),
      amount,
      currency: "NGN",
      payment_options: "card,ussd",
      customer: {
        email,
        name,
      },
      callback: (response: any) => {
        console.log("✅ Payment callback:", response);
        // Send response.transaction_id to your backend to verify
      },
      onclose: () => {
        console.log("❌ Payment popup closed");
      },
      customizations: {
        title: "Meal Plan App",
        description: "Payment for subscription",
        logo: "/logo.png", // customize this
      },
    });
  };
  