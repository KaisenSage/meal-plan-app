"use client";

import { useUser, SignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/subscribe"); // 👈 redirect to subscription page
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="px-4 py-8 sm:py-12 lg:py-16 max-w-7xl mx-auto flex justify-center items-center min-h-screen">
      <SignUp forceRedirectUrl="/subscribe" />
    </div>
  );
}
