'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [specialInstruction, setSpecialInstruction] = useState('');
  const [loading, setLoading] = useState(false);

  // Safe Total Calculation
  const calculateTotal = (): number => {
    const items = cartItems || [];
    return items.reduce((acc: number, item: CartItem) => {
      const priceStr = item.price ? item.price.toString() : '0';
      const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
      return acc + priceNum * (item.quantity || 1);
    }, 0);
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    const safeCartItems = cartItems || [];

    // WhatsApp Message Formatting
    const orderText = safeCartItems
      .map((item: CartItem) => `• ${item.title} (Qty: ${item.quantity || 1}) - ${item.price}`)
      .join('\n');

    const whatsappMessage = `*NEW ORDER PLACED*\n\n` +
      `*Name:* ${fullName}\n` +
      `*Phone:* ${phone}\n` +
      `*Address:* ${address}, ${city}\n` +
      `*Instructions:* ${specialInstruction || 'None'}\n\n` +
      `*Items Ordered:*\n${orderText}\n\n` +
      `*Total Amount:* Rs. ${calculateTotal().toLocaleString()}`;

    const storePhoneNumber = '923001234567';
    const whatsappUrl = `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fullName,
          phone,
          address: `${address}, ${city}`,
          items: safeCartItems,
          totalAmount: calculateTotal(),
        }),
      });

      let orderId = `ORD-${Date.now().toString().slice(-5)}`;

      if (res.ok) {
        const orderData = await res.json();
        if (orderData?.id) {
          orderId = orderData.id;
        }
      }

      window.open(whatsappUrl, '_blank');
      if (clearCart) clearCart();
      router.push(`/order-success/${orderId}`);
    } catch (error) {
      console.error('Order save error:', error);
      window.open(whatsappUrl, '_blank');
      if (clearCart) clearCart();
      router.push(`/order-success/ORD-${Date.now().toString().slice(-5)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">Complete Your Order</h1>
        <p className="text-gray-500 text-center mb-8">Fill in your delivery details to place your order directly via WhatsApp</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Delivery Form */}
          <form onSubmit={handleWhatsAppOrder} className="lg:col-span-2 space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sana Ali"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">Complete Address *</label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Street, Area name..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lahore, Gujrat, Karachi..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Special Instruction (Optional)</label>
                <input
                  type="text"
                  value={specialInstruction}
                  onChange={(e) => setSpecialInstruction(e.target.value)}
                  placeholder="e.g. Call before delivery"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50"
            >
              💬 {loading ? 'Processing Order...' : 'Confirm Order via WhatsApp'}
            </button>
          </form>

          {/* Cart Summary */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
              Order Items ({cartItems?.length || 0})
            </h2>
            
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item: CartItem, index: number) => (
                  <div key={item.id || index} className="flex items-center gap-3">
                    <img src={item.image} alt={item.title || 'Product'} className="w-12 h-12 object-cover rounded-lg bg-gray-200" />
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-gray-600">{item.price} × {item.quantity || 1}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Cart is empty</p>
              )}
            </div>

            <div className="border-t pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
                <span>Total Amount:</span>
                <span>Rs. {calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}