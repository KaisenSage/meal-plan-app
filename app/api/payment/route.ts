'use client';

import { useEffect, useState } from 'react';
import Spinner from './spinner';

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById("flutterwave-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.id = "flutterwave-script";
      document.body.appendChild(script);
    }
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({
        email: "test@example.com",
        name: "Kaisen Sage",
        interval: "monthly"
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "An error occurred");
      return;
    }

    const { link } = data.data; // Flutterwave redirect link
    if (link) {
      window.location.href = link; // Redirect
