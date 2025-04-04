'use client';

import { useState } from 'react';
import { Plan } from '@/lib/plans';

interface PaymentButtonProps {
  plan: Plan;
  email: string;
  name?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export default function PaymentButton({
  plan,
  email,
  name,
  onSuccess,
  onError
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interval: plan.interval,
          email,
          name
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      if (data.data?.link) {
        window.location.href = data.data.link;
        onSuccess?.();
      } else {
        throw new Error('No payment link received');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors disabled:bg-green-300"
    >
      {loading ? 'Processing...' : 'Subscribe Now'}
    </button>
  );
} 