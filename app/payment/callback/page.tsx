'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function PaymentCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get('status');
    const tx_ref = searchParams.get('tx_ref');
    const transaction_id = searchParams.get('transaction_id');

    if (status === 'successful') {
      setStatus('success');
      // You might want to verify the payment with your backend here
      setTimeout(() => {
        router.push('/dashboard'); // or wherever you want to redirect after success
      }, 3000);
    } else {
      setStatus('failed');
      setTimeout(() => {
        router.push('/subscribe'); // redirect back to subscribe page on failure
      }, 3000);
    }
  }, [searchParams, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Processing your payment...</h1>
          <p>Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p>Thank you for your subscription. Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p>Sorry, your payment could not be processed. Redirecting back to subscribe page...</p>
      </div>
    </div>
  );
} 