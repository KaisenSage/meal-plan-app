// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/api/checkout(.*)",
  "/api/payment(.*)",
  "/payment/callback(.*)",
  "/api/check-subscription(.*)",
  "/mealplan(.*)",
  "/profile(.*)",
  "/api/profile/subscription-status(.*)", // ✅ add this so it works
]);

const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);
const isMealPlanRoute = createRouteMatcher(["/mealplan(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const userAuth = await auth();
    const { userId } = userAuth;
    const { pathname, origin } = req.nextUrl;

    console.log("🛡️ Middleware Info:", { userId, pathname, origin });

    // ✅ Allow public routes without auth
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // 🔐 Redirect unauthenticated users
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-up", origin));
    }

    // 🚫 Prevent signed-in users from going back to sign-up
    if (isSignUpRoute(req) && userId) {
      return NextResponse.redirect(new URL("/mealplan", origin));
    }

    // ✅ Check subscription status for restricted routes
    if (isMealPlanRoute(req)) {
      try {
        const checkSubRes = await fetch(
          `${origin}/api/check-subscription?userId=${userId}`,
          {
            method: "GET",
            headers: {
              cookie: req.headers.get("cookie") || "",
            },
          }
        );

        if (!checkSubRes.ok) {
          console.error("❌ Subscription check failed:", await checkSubRes.text());
          return NextResponse.redirect(new URL("/subscribe", origin));
        }

        const data = await checkSubRes.json();
        if (!data.subscriptionActive) {
          return NextResponse.redirect(new URL("/subscribe", origin));
        }
      } catch (error) {
        console.error("⚠️ Error checking subscription:", error);
        return NextResponse.redirect(new URL("/subscribe", origin));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("🛑 Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-up", req.nextUrl.origin));
  }
});

export const config = {
  matcher: [
    // Include everything except Next static assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
