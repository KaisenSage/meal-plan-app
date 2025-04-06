'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');
    const tx_ref = searchParams.get('tx_ref');

    if (status === 'successful') {
      toast.success('Payment successful!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      toast.error('Payment failed');
      setTimeout(() => {
        router.push('/subscribe');
      }, 2000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Processing your payment...
        </h1>
        <p>Please wait while we verify your payment.</p>
      </div>
    </div>
  );
} 