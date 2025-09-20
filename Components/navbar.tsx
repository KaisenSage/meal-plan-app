"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  const emeraldButtonStyles =
    "flex items-center justify-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-all text-sm";

  // Use your Cloudflare logo URL directly
  const logoUrl = "https://pub-323e019863a3440ba6f23aaf494422d3.r2.dev/ChatGPT%20Image%20Sep%2020%2C%202025%20at%2008_44_46%20AM.png";

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - Always Visible */}
        
        <Link href="/">
          <Image
            src={logoUrl}
            alt="Meal Plan Logo"
            width={100}
            height={100}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
          >
            Home
          </Link>

          {isSignedIn && (
            <Link
              href="/mealplan"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Mealplan
            </Link>
          )}

          <SignedOut>
            {/* Subscribe Link */}
            <Link
              href="/subscribe"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Subscribe
            </Link>
          </SignedOut>

          <SignedIn>
            {/* Profile Section */}
            <Link href="/profile">
              <Image
                src={user?.imageUrl || "/default-avatar.png"}
                alt="User Profile"
                width={36}
                height={36}
                className="rounded-full border border-emerald-500 hover:scale-105 transition-transform"
              />
            </Link>

            {/* Sign Out Button */}
            <SignOutButton>
              <button className={emeraldButtonStyles}>Sign Out</button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            {/* Sign Up Button */}
            <Link href="/sign-up" className={emeraldButtonStyles}>
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}