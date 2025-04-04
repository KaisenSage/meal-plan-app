'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function PaymentSuccessPage() {
  const [verifying, setVerifying] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const transaction_id = searchParams.get('transaction_id');
      
      if (!transaction_id) {
        toast.error('No transaction ID found');
        router.push('/subscribe');
        return;
      }

      try {
        const response = await fetch(`/api/payment/verify?transaction_id=${transaction_id}`);
        const data = await response.json();

        if (data.success) {
          toast.success('Payment successful!');
          // Redirect to dashboard or appropriate page
          router.push('/dashboard');
        } else {
          toast.error('Payment verification failed');
          router.push('/subscribe');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Failed to verify payment');
        router.push('/subscribe');
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying your payment...</h1>
          <p>Please wait while we confirm your payment.</p>
        </div>
      </div>
    );
  }

  return null;
} 