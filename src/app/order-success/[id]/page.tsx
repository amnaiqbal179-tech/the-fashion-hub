'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = (params.id as string) || 'ORD-98421';

  // Order Status state: 'IN_TRANSIT' or 'DELIVERED'
  const [isReceived, setIsReceived] = useState(false);

  // Review Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setLoading(true);

    try {
      // Review DB mein save karne ki API call
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: '1', // Selected Product ID
          name: 'Verified Customer',
          rating: rating,
          comment: comment,
        }),
      });

      setReviewSubmitted(true);
    } catch (error) {
      setReviewSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* ================= 1. ORDER CONFIRMATION BANNER ================= */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold">
            ✓
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Aap Ka Order Confirm Ho Gaya Hai!
          </h1>

          <p className="text-gray-700 font-medium text-sm sm:text-base max-w-lg mx-auto">
            Aap ka order successful receive ho gaya hai. Hum jald hi aap se contact karke parcel dispatch kar dein ge.
          </p>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl inline-block text-emerald-900 font-bold text-sm">
            🚚 Estimated Delivery: <span className="underline">3 se 5 Working Days</span> mein aap ko receive ho jaye ga.
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-6 border-t border-gray-100 text-sm">
            <div>
              <span className="text-gray-500 font-medium block">Order ID</span>
              <span className="font-bold text-gray-900">#{orderId}</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium block">Status</span>
              <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                isReceived ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {isReceived ? 'DELIVERED & COMPLETED' : 'IN TRANSIT (DISPATCHED)'}
              </span>
            </div>
          </div>
        </div>

        {/* ================= 2. ORDER RECEIPT & REVIEW SECTION ================= */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Order Confirmation & Product Feedback
          </h2>

          {!isReceived ? (
            /* Order Not Delivered Yet State */
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-center space-y-4">
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
                Kya aap ko aap ka parcel/order receive ho gaya hai?
              </p>
              <button
                onClick={() => setIsReceived(true)}
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition cursor-pointer text-sm"
              >
                Yes, Mujhy Order Receive Ho Gaya Hai!
              </button>
            </div>
          ) : (
            /* Order Delivered - Write Review Section */
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-sm font-bold">
                🎉 Shukriya! Aap ka order delivered mark ho gaya hai. Baraye karam product ke baare mein apna review share karein!
              </div>

              {reviewSubmitted ? (
                <div className="p-6 bg-emerald-100 border border-emerald-300 rounded-2xl text-center text-emerald-900 font-bold">
                  ✓ Aap ka review successfully submit ho gaya hai! Yeh review ab Product Page par sab customers ko show hoga.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                  <h3 className="text-lg font-bold text-gray-900">Write Product Review</h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Rating Select Karein</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                      <option value={4}>⭐⭐⭐⭐☆ (4 Stars - Good)</option>
                      <option value={3}>⭐⭐⭐☆☆ (3 Stars - Average)</option>
                      <option value={2}>⭐⭐☆☆☆ (2 Stars - Poor)</option>
                      <option value={1}>⭐☆☆☆☆ (1 Star - Terrible)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Aap Ko Product Kaisa Laga?</label>
                    <textarea
                      rows={4}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Kapre ki quality, fitting aur overall Experience kaisa raha?"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer"
                  >
                    {loading ? 'Submitting...' : 'Submit Product Review'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Back to Home Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-white border border-gray-300 px-8 py-3 rounded-xl font-bold text-gray-900 hover:bg-gray-100 transition"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}