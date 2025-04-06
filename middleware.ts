import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that don't need authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/subscribe(.*)",
  "/api/payment",
  "/api/checkout", // ✅ Add this line
]);

const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"]);
const isMealPlanRoute = createRouteMatcher(["/mealplan(.*)"]);
const isProfileRoute = createRouteMatcher(["/profile(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const { userId } = userAuth;
  const { pathname, origin } = req.nextUrl;

  console.log("Middleware Info: ", userId, pathname, origin);

  // Allow public access to webhook & payment routes
  if (
    pathname.startsWith("/api/payment") ||
    pathname.startsWith("/payment/callback") ||
    pathname.startsWith("/api/flutterwave-webhook") ||
    pathname === "/api/check-subscription"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to sign-up page
  if (!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", origin));
  }

  // Redirect logged-in users away from sign-up
  if (isSignUpRoute(req) && userId) {
    return NextResponse.redirect(new URL("/mealplan", origin));
  }

  // Protect /mealplan and /profile if subscription is inactive
  if ((isMealPlanRoute(req) || isProfileRoute(req)) && userId) {
    try {
      const checkSubRes = await fetch(`${origin}/api/check-subscription?userId=${userId}`, {
        method: "GET",
        headers: {
          cookie: req.headers.get("cookie") || "",
        },
      });

      if (checkSubRes.ok) {
        const data = await checkSubRes.json();
        if (!data.subscriptionActive) {
          return NextResponse.redirect(new URL("/subscribe", origin));
        }
      } else {
        console.warn("check-subscription failed response");
        return NextResponse.redirect(new URL("/subscribe", origin));
      }
    } catch (error) {
      console.error("Error calling /api/check-subscription:", error);
      return NextResponse.redirect(new URL("/subscribe", origin));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
