'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = (cartItems || []).reduce((acc: number, item: CartItem) => {
    const priceStr = item.price ? item.price.toString() : '0';
    const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + priceNum * (item.quantity || 1);
  }, 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/shop"
          className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item: CartItem) => {
            const qty = item.quantity || 1;
            const title = item.title || 'Product';

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-2xl border border-gray-200 gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity && updateQuantity(item.id, Math.max(1, qty - 1))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold">{qty}</span>
                    <button
                      onClick={() => updateQuantity && updateQuantity(item.id, qty + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart && removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit space-y-4">
          <h2 className="text-xl font-bold text-gray-900 border-b pb-3">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
          </div>

          <div className="border-t pt-3 flex justify-between text-base font-bold text-gray-900">
            <span>Total</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-black hover:bg-gray-800 text-white py-3.5 rounded-xl font-bold transition shadow-sm"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}