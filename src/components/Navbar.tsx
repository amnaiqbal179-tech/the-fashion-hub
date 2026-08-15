'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Image */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo/logo.png" 
                alt="The Fashion Hub" 
                width={140} 
                height={45} 
                className="h-10 md:h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <Link href="/shop" className="hover:text-black transition">All Products</Link>
            <Link href="/category/women" className="hover:text-black transition">Women</Link>
            <Link href="/category/men" className="hover:text-black transition">Men</Link>
            <Link href="/category/kids" className="hover:text-black transition">Kids</Link>
            <Link href="/about" className="hover:text-black transition">About Us</Link>
            <Link href="/contact" className="hover:text-black transition">Contact</Link>
          </nav>

          {/* Right Icons (Auth, Cart & Mobile Menu Button) */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <UserButton />
              )}
            </div>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-black transition">
              <span className="sr-only">Cart</span>
              🛒
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Home
          </Link>
          <Link href="/shop" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            All Products
          </Link>
          <Link href="/category/women" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Women
          </Link>
          <Link href="/category/men" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Men
          </Link>
          <Link href="/category/kids" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Kids
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            About Us
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
            Contact
          </Link>

          {/* Mobile Auth View */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between px-3">
            <span className="text-sm font-medium text-gray-600">Account:</span>
            <div>
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-medium">
                    Sign In
                  </button>
                </SignInButton>
              ) : (
                <UserButton />
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}