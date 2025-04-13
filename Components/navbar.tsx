// app/components/NavBar.js

"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";

export default function NavBar() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Meal Plan Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/sign-up"
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
            <Link
              href="/subscribe"
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              Subscribe
            </Link>
          </SignedOut>

          <SignedIn>
            {/* Profile Image */}
            <Link href="/profile">
              <Image
                src={user?.imageUrl || "/default-avatar.png"}
                alt="User Profile"
                width={36}
                height={36}
                className="rounded-full border border-emerald-500 hover:scale-105 transition-transform"
              />
            </Link>

            <SignOutButton>
              <button className="ml-2 px-4 py-1.5 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600 transition">
                Sign Out
              </button>
            </SignOutButton>
          </SignedIn>

          <SignedOut>
            <Link
              href="/sign-up"
              className="px-4 py-1.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
