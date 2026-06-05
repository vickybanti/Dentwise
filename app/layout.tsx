import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {UserSync} from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dentwise - AI Powered Dental Assistant",
  description: "AI Powered Dental Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <TanStackProvider>
      <ClerkProvider
      appearance={{
          variables: {
              colorPrimary: "#e78a53",
              colorBackground: "#f3f4f6",
              colorText: "#111827",
              colorTextSecondary: "#6b7280",
              colorInputBackgroundColor: "#ef3f4f6",
              colorBackgroundHoverColor: "#ef3f4f6",
              backgroundColor: "#ef3f4f6",
          }
      }}
      >
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <UserSync />
      {children}

      </body>
    </html>
      </ClerkProvider>
      </TanStackProvider>
  );
}
