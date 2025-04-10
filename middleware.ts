import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// ✅ Public paths
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/sign-in(.*)",
  "/subscribe(.*)",
  "/api/checkout(.*)",
  "/api/payment(.*)",
  "/payment/callback(.*)",
  "/api/check-subscription(.*)",
  "/api/profile/subscription-status(.*)",
]);

const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);
const isMealPlanRoute = createRouteMatcher(["/mealplan(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();
    const { pathname, origin } = req.nextUrl;

    console.log("🛡️ Middleware Info:", { userId, pathname, origin });

    // ✅ Allow public routes
    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    // ❌ Redirect unauthenticated users to sign-up
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-up", origin));
    }

    // 🔄 Prevent signed-in users from seeing sign-up again
    if (isSignUpRoute(req) && userId) {
      return NextResponse.redirect(new URL("/mealplan", origin));
    }

    // 🔐 Mealplan requires an active subscription
    if (isMealPlanRoute(req)) {
      try {
        const checkRes = await fetch(
          `${origin}/api/check-subscription?userId=${userId}`,
          {
            method: "GET",
            headers: {
              cookie: req.headers.get("cookie") || "",
            },
          }
        );

        if (!checkRes.ok) {
          console.error("⚠️ Subscription check failed:", await checkRes.text());
          return NextResponse.redirect(new URL("/subscribe", origin));
        }

        const data = await checkRes.json();
        if (!data.subscriptionActive) {
          return NextResponse.redirect(new URL("/subscribe", origin));
        }
      } catch (err) {
        console.error("❌ Subscription API error:", err);
        return NextResponse.redirect(new URL("/subscribe", origin));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("🛑 Global middleware error:", error);
    return NextResponse.redirect(new URL("/sign-up", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
