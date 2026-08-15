'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const products = [
  {
    id: 1,
    title: '3-Piece Embroidered Lawn Suit',
    category: 'Women',
    price: 'Rs. 4,500',
    image: '/images/new-arrivals/arrival1.jpg',
    description: 'Premium quality 3-piece embroidered lawn suit with pure silk dupatta. Breathable fabric designed for maximum comfort and style.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    title: 'Embroidered Pastel Green Suit',
    category: 'Women',
    price: 'Rs. 3,800',
    image: '/images/new-arrivals/arrival2.jpg',
    description: 'Elegant light pastel green traditional suit with refined neckline embroidery.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 3,
    title: 'Luxury Embroidered Royal Blue Suit',
    category: 'Women',
    price: 'Rs. 5,400',
    image: '/images/new-arrivals/arrival3.jpg',
    description: 'Exclusive 3-piece luxury embroidered dress in rich royal blue with intricate lace detailing.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    title: 'Designer Men Maroon Kurta',
    category: 'Men',
    price: 'Rs. 3,200',
    image: '/images/new-arrivals/arrival4.jpg',
    description: 'Traditional designer men kurta crafted from rich maroon cotton blend.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 5,
    title: 'Vibrant Floral Print Dress',
    category: 'Women',
    price: 'Rs. 5,200',
    image: '/images/new-arrivals/arrival5.jpg',
    description: 'Eye-catching colorful floral print long gown styled on a vibrant green base.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 6,
    title: 'Luxury Festive Formal Gown',
    category: 'Women',
    price: 'Rs. 6,800',
    image: '/images/new-arrivals/arrival6.jpg',
    description: 'Heavy designer pinkish-lilac bridal and party wear gown with intricate net embroidery.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart() || {};
  
  const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const productId = Number(rawId);
  const product = products.find((p) => p.id === productId);

  // States
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Ayesha Khan',
      rating: 5,
      comment: 'Kapry ki quality bohot zabardast hai! Fitting exact hai aur delivery bhi fast thi.',
      date: '12 Aug 2026',
    },
    {
      id: '2',
      name: 'Sana Ahmed',
      rating: 4,
      comment: 'Color and stitching quality is very good. Recommended!',
      date: '10 Aug 2026',
    },
  ]);

  // Review Form States
  const [userName, setUserName] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState('');

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <Link href="/" className="mt-4 text-black underline font-semibold">Back to Home</Link>
      </div>
    );
  }

  // Handle New Review Submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: userName,
      rating: userRating,
      comment: userComment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setReviews([newReview, ...reviews]);
    setUserName('');
    setUserComment('');
    setUserRating(5);
  };

  // Calculate Average Rating
  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="bg-white min-h-screen py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        {/* Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square relative">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col space-y-6">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category} Collection</span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">{product.title}</h1>
              
              {/* Rating Summary */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-yellow-400 text-lg">
                  {'★'.repeat(Math.round(Number(averageRating)))}
                  {'☆'.repeat(5 - Math.round(Number(averageRating)))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{averageRating} ({reviews.length} reviews)</span>
              </div>

              <p className="text-2xl font-bold text-gray-900 mt-3">{product.price}</p>
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Select Size</label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                      selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-gray-900 border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 border border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50">-</button>
                <span className="text-base font-bold text-gray-900">{quantity}</span>
                <button type="button" onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 border border-gray-300 rounded-xl font-bold text-gray-900 hover:bg-gray-50">+</button>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (addToCart) {
                    addToCart({
                      id: String(product.id),
                      title: `${product.title} (${selectedSize})`,
                      price: product.price,
                      image: product.image,
                      quantity: quantity || 1,
                    });
                  }
                  setAdded(true);
                  setTimeout(() => setAdded(false), 2000);
                }}
                className={`flex-1 py-4 rounded-xl font-bold transition cursor-pointer ${added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS SECTION ================= */}
        <div className="mt-20 border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Customer Reviews</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Review Form */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 h-fit">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Leave a Review</h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sana Ali"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Rating</label>
                  <select
                    value={userRating}
                    onChange={(e) => setUserRating(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black cursor-pointer"
                  >
                    <option value={5} className="text-gray-900 bg-white">⭐⭐⭐⭐⭐ (5 Stars - Excellent)</option>
                    <option value={4} className="text-gray-900 bg-white">⭐⭐⭐⭐☆ (4 Stars - Good)</option>
                    <option value={3} className="text-gray-900 bg-white">⭐⭐⭐☆☆ (3 Stars - Average)</option>
                    <option value={2} className="text-gray-900 bg-white">⭐⭐☆☆☆ (2 Stars - Poor)</option>
                    <option value={1} className="text-gray-900 bg-white">⭐☆☆☆☆ (1 Star - Terrible)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Your Review</label>
                  <textarea
                    rows={4}
                    required
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder="Aap ko product kaisa laga?"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>

            {/* Displaying Submitted Reviews */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <p className="text-gray-700 font-medium">Abhi tak koi review nahi hai. Pehle customer banein aur review submit karein!</p>
              ) : (
                reviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-extrabold text-sm uppercase">
                          {rev.name[0]}
                        </div>
                        <span className="font-bold text-gray-900 text-base">{rev.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-500">{rev.date}</span>
                    </div>

                    <div className="text-yellow-400 text-base">
                      {'★'.repeat(rev.rating)}
                      {'☆'.repeat(5 - rev.rating)}
                    </div>

                    <p className="text-gray-900 font-medium text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}