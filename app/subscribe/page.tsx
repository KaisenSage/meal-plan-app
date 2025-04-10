'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { availablePlans } from "@/lib/plans";
import toast, { Toaster } from "react-hot-toast";
import { initializePayment as makePayment } from "@/lib/flutterwave";


export default function SubscribePage() {
  const { user } = useUser();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planType: string) => {
    if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress || !user.fullName) {
      router.push("/sign-up");
      return;
    }

    try {
      setLoadingPlan(planType);
      toast.loading("Initializing payment...", { id: "checkout" });

      const selectedPlan = availablePlans.find((plan) => plan.interval === planType);
      if (!selectedPlan) throw new Error("Invalid plan selected");

      await makePayment({
        amount: selectedPlan.amount,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName,
      });

      toast.success("Payment successful!", { id: "checkout" });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : String(error),
        { id: "checkout" }
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="px-4 py-8 sm:py-12 lg:py-16">
      <Toaster position="top-right" />
      <div>
        <h2 className="text-3xl font-bold text-center mt-12 sm:text-5xl tracking-tight">
          Pricing
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
          Get started on our weekly plan or upgrade to monthly or yearly when you're ready.
        </p>
      </div>

      <div className="mt-12 container mx-auto space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {availablePlans.map((plan, key) => (
          <div
            key={key}
            className="relative p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col hover:shadow-md hover:scale-[1.02] transition-transform duration-200 ease-out"
          >
            <div className="flex-1">
              {plan.isPopular && (
                <p className="absolute top-0 py-1.5 px-4 bg-emerald-500 text-white rounded-full text-xs font-semibold uppercase tracking-wide transform -translate-y-1/2">
                  Most popular
                </p>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${plan.amount}
                </span>
                <span className="ml-1 text-xl font-semibold">/{plan.interval}</span>
              </p>
              <p className="mt-6">{plan.description}</p>
              <ul role="list" className="mt-6 space-y-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 w-6 h-6 text-emerald-500"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`${
                plan.interval === "month"
                  ? "bg-emerald-500 text-white hover:bg-emerald-600"
                  : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              } mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium disabled:bg-gray-400 disabled:cursor-not-allowed`}
              onClick={() => handleSubscribe(plan.interval)}
              disabled={loadingPlan === plan.interval}
            >
              {loadingPlan === plan.interval
                ? "Processing..."
                : `Subscribe ${plan.name}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
