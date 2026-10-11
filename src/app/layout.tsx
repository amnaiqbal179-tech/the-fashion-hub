import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "The Fashion Hub | Luxury & Premium Apparel",
  description: "Exclusive Men, Women, and Kids collections at The Fashion Hub.",
  keywords: ["fashion", "clothing", "unstitched", "ready to wear", "luxury lawn", "festive"],
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
        className={cn("h-full scroll-smooth", geist.variable, inter.variable)}
      >
        <body 
          className="min-h-screen bg-[#f1f5f9] text-slate-900 antialiased selection:bg-amber-500 selection:text-white flex flex-col justify-between"
        >
          <CartProvider>
            {/* Top Navigation */}
            <Navbar />
            
            {/* Main Page Content */}
            <main className="flex-1 min-h-[calc(100vh-80px)]">
              {children}
            </main>

            {/* Global Storefront Footer */}
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}