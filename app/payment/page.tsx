"use client"; // Required for React components in Next.js App Router
import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

const FLW_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY; // Load API key from .env.local

export default function PaymentPage() {
  if (!FLW_PUBLIC_KEY) {
    console.error("Missing Flutterwave Public Key. Check .env.local file.");
    return <h1>Payment system is currently unavailable.</h1>;
  }

  const config = {
    public_key: FLW_PUBLIC_KEY,  // Use environment variable
    tx_ref: `tx-${Date.now()}`, // Ensure tx_ref is unique
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phone_number: "070********",
      name: "John Doe",
    },
    customizations: {
      title: "My Store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log("Payment Response:", response);
      
      if (response.status === "successful") {
        alert("✅ Payment successful! Transaction ID: " + response.transaction_id);
      } else {
        alert("❌ Payment failed: " + (response.message || "Unknown error"));
      }

      closePaymentModal();
    },
    onClose: () => {
      alert("Payment window closed.");
    },
  };

  return (
    <div className="App">
      <h1>Hello, Test User</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}
