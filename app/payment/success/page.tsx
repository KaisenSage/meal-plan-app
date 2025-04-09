'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

function PaymentSuccessContent() {
  const [verifyingPlan, setVerifyingPlan] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const transaction_id = searchParams.get('transaction_id');
      const plan = searchParams.get('plan'); // Get plan type (weekly, monthly, yearly)

      if (!transaction_id || !plan) {
        toast.error('Invalid payment details');
        router.push('/subscribe');
        return;
      }

      setVerifyingPlan(plan); // Set the correct plan as "Processing"

      try {
        const response = await fetch(`/api/payment/verify?transaction_id=${transaction_id}`);
        const data = await response.json();

        if (data.success) {
          toast.success('Payment successful!');
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
        setVerifyingPlan(null); // Reset verifying state after verification
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center text-lg font-medium">
        {verifyingPlan === 'weekly' && <p>Processing Weekly Payment...</p>}
        {verifyingPlan === 'monthly' && <p>Processing Monthly Payment...</p>}
        {verifyingPlan === 'yearly' && <p>Processing Yearly Payment...</p>}
        {!verifyingPlan && <p>Verifying your payment...</p>}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading payment info...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
