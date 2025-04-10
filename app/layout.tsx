import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/Components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryClientProvider } from "@/Components/react-query-client-provider";
import { Inter } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased bg-gray-50 text-gray-900`}
      >
        <head>
          {/* ✅ Font Awesome */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
            integrity="sha512-5sRFThP5zz7OAfBsfAiF3VWqumduWh8hEHa7ML1BlNsxg7XhXWrPkp+GzzHln8pMSMdpgWZc5MyDbG3zjLI8Fg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body>
          {/* ✅ Flutterwave Script */}
          <Script
            src="https://checkout.flutterwave.com/v3.js"
            strategy="afterInteractive"
          />

          <ReactQueryClientProvider>
            <NavBar />
            <div className="max-w-7xl mx-auto pt-16 p-4 min-h-screen">
              {children}
            </div>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
