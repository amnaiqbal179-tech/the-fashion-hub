import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ClerkProvider } from "@clerk/nextjs"; // 1. Clerk import kiya

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Fashion Hub | Premium Clothing",
  description: "Your ultimate fashion destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> {/* 2. Root layout ko wrap kiya */}
      <html lang="en">
        <body className={inter.className}>
          <CartProvider>
            <Navbar />
            {/* Navbar ki height (h-20) ke hisaab se margin top diya hai */}
            <main className="pt-20"> 
              {children}
            </main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}