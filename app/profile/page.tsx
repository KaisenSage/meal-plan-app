"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { availablePlans, Plan } from "@/lib/plans";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/Components/spinner";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // Fetch Subscription Details
  const {
    data: subscription,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await fetch("/api/profile/subscription-status");
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch subscription.");
      }
      return res.json();
    },
    enabled: isLoaded && isSignedIn,
    staleTime: 5 * 60 * 1000,
  });

  const subscriptionPlanId = subscription?.subscription?.subscription_tier;
  const currentPlan = availablePlans.find(
    (plan) =>
      plan.priceId === subscriptionPlanId ||
      plan.id === subscriptionPlanId ||
      plan.interval === subscriptionPlanId
  );

  // Mutation: Change Subscription Plan
  const changePlanMutation = useMutation<any, Error, string>({
    mutationFn: async (newPlan: string) => {
      const res = await fetch("/api/profile/change-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPlan }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to change subscription plan."
        );
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      toast.success("Subscription plan updated successfully.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Mutation: Unsubscribe
  const unsubscribeMutation = useMutation<any, Error, void>({
    mutationFn: async () => {
      const res = await fetch("/api/profile/unsubscribe", {
        method: "POST",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to unsubscribe.");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      router.push("/subscribe");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleConfirmChangePlan = () => {
    if (selectedPlan) {
      changePlanMutation.mutate(selectedPlan);
      setSelectedPlan("");
    }
  };

  const handleChangePlan = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedPlan = e.target.value;
    if (newSelectedPlan) {
      setSelectedPlan(newSelectedPlan);
    }
  };

  const handleUnsubscribe = () => {
    if (
      confirm(
        "Are you sure you want to unsubscribe? You will lose access to premium features."
      )
    ) {
      unsubscribeMutation.mutate();
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-white">
        <Spinner />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-50 to-white">
        <p className="text-lg text-gray-700 bg-white p-6 rounded-xl shadow-md">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-emerald-50 to-white p-4 font-sans">
      <Toaster position="top-center" />
      <div className="w-full max-w-5xl bg-white bg-opacity-80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-emerald-100">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel: Profile Information */}
          <div className="w-full md:w-1/3 p-8 bg-gradient-to-br from-emerald-500 to-emerald-400 text-white flex flex-col items-center justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <div className="relative">
              <Image
                src={user.imageUrl || "/default-avatar.png"}
                alt="User Avatar"
                width={110}
                height={110}
                className="rounded-full border-4 border-white shadow-lg"
              />
              <span className="absolute bottom-2 right-2 bg-emerald-600 rounded-full px-2 py-1 text-xs font-semibold text-white shadow">PRO</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold mb-1 mt-5 drop-shadow-sm text-center">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mb-4 text-sm md:text-base opacity-90">{user.primaryEmailAddress?.emailAddress}</p>
          </div>

          {/* Right Panel: Subscription Details */}
          <div className="w-full md:w-2/3 p-8 bg-white/60">
            <h2 className="text-2xl font-bold mb-8 text-emerald-700 text-center md:text-left">
              Subscription Details
            </h2>

            {isLoading ? (
              <div className="flex items-center">
                <Spinner />
                <span className="ml-2">Loading subscription details...</span>
              </div>
            ) : isError ? (
              <p className="text-red-500">{error?.message}</p>
            ) : subscription ? (
              <div className="space-y-8">
                {/* Current Subscription Info */}
                <div className="bg-white/80 shadow-xl rounded-xl p-6 border border-emerald-200 hover:shadow-emerald-100 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600">
                    Current Plan
                  </h3>
                  {currentPlan ? (
                    <div className="space-y-1">
                      <p>
                        <span className="font-semibold text-gray-700">Plan:</span> {currentPlan.name}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">Amount:</span> ${currentPlan.amount} {currentPlan.currency}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">Status:</span>{" "}
                        <span className={`${subscription.subscription.subscription_active ? "text-emerald-600" : "text-red-500"} font-bold`}>
                          {subscription.subscription.subscription_active
                            ? "ACTIVE"
                            : "INACTIVE"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-red-500">No matching plan found.</p>
                  )}
                </div>

                {/* Change Subscription Plan */}
                <div className="bg-white/80 shadow-xl rounded-xl p-6 border border-emerald-200 hover:shadow-emerald-100 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600">
                    Change Subscription Plan
                  </h3>
                  <select
                    onChange={handleChangePlan}
                    defaultValue={currentPlan?.priceId || currentPlan?.id || ""}
                    className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white/90"
                    disabled={changePlanMutation.isPending}
                  >
                    <option value="" disabled>
                      Select a new plan
                    </option>
                    {availablePlans.map((plan, key) => (
                      <option key={key} value={plan.priceId || plan.id}>
                        {plan.name} - ${plan.amount} / {plan.interval}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleConfirmChangePlan}
                    className="mt-4 p-2 w-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-lg text-white font-semibold shadow hover:scale-105 hover:from-emerald-600 transition-all"
                  >
                    Save Change
                  </button>
                  {changePlanMutation.isPending && (
                    <div className="flex items-center mt-3">
                      <Spinner />
                      <span className="ml-2 text-sm">Updating plan...</span>
                    </div>
                  )}
                </div>

                {/* Unsubscribe */}
                <div className="bg-white/80 shadow-xl rounded-xl p-6 border border-emerald-200 hover:shadow-emerald-100 transition-all">
                  <h3 className="text-lg font-semibold mb-2 text-emerald-600">
                    Unsubscribe
                  </h3>
                  <button
                    onClick={handleUnsubscribe}
                    disabled={unsubscribeMutation.isPending}
                    className={`w-full bg-gradient-to-r from-red-500 to-red-400 text-white py-2 px-4 rounded-lg font-semibold shadow hover:scale-105 hover:from-red-600 transition-all ${
                      unsubscribeMutation.isPending
                        ? "opacity-60 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {unsubscribeMutation.isPending
                      ? "Unsubscribing..."
                      : "Unsubscribe"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">You are not subscribed to any plan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}