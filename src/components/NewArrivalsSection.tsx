'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
}

export default function NewArrivalsSection() {
  const router = useRouter();
  const { addToCart } = useCart() || {};

  // State for Wishlist and Quick Cart Feedback
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  // Exact matching product data according to real image contents
  const newArrivals: Product[] = [
    { id: 1, title: '3-Piece Embroidered Lawn Suit', category: 'Women', price: 'Rs. 4,500', image: '/images/new-arrivals/arrival1.jpg' },
    { id: 2, title: 'Embroidered Pastel Green Suit', category: 'Women', price: 'Rs. 3,800', image: '/images/new-arrivals/arrival2.jpg' },
    { id: 3, title: 'Luxury Embroidered Royal Blue Suit', category: 'Women', price: 'Rs. 5,400', image: '/images/new-arrivals/arrival3.jpg' },
    { id: 4, title: 'Designer Men Maroon Kurta', category: 'Men', price: 'Rs. 3,200', image: '/images/new-arrivals/arrival4.jpg' },
    { id: 5, title: 'Vibrant Floral Print Dress', category: 'Women', price: 'Rs. 5,200', image: '/images/new-arrivals/arrival5.jpg' },
    { id: 6, title: 'Luxury Festive Formal Gown', category: 'Women', price: 'Rs. 6,800', image: '/images/new-arrivals/arrival6.jpg' },
  ];

  // Function to handle Add To Cart
  const handleAddToCart = (product: Product) => {
    if (addToCart) {
      addToCart({
        id: String(product.id),
        title: product.title,
        price: product.price,
        image: product.image,
       quantity:  1,
      });
    }

    // Temporary Feedback Trigger
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  // Function to toggle Wishlist
  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Function to open Product Detail Page
  const openDetailPage = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <section className="bg-gray-50 py-12 sm:py-20 border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Freshly Dropped</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mt-1">New Arrivals</h2>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-black underline underline-offset-4 hover:text-gray-700">
            View All Products &rarr;
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {newArrivals.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = addedProductId === product.id;

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col group"
              >
                
                {/* Image Container with Hover Animations */}
                <div className="relative h-80 bg-gray-100 overflow-hidden cursor-pointer">
                  
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    onClick={() => openDetailPage(product.id)}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />

                  {/* Top Right Floating Action Icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    
                    {/* Wishlist Button */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
                        isWishlisted 
                          ? 'bg-red-500 text-white opacity-100' 
                          : 'bg-white/90 hover:bg-white text-gray-700 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:text-red-500'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-0 6.364-4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Quick View / Detail Page Icon */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailPage(product.id);
                      }}
                      title="View Details"
                      className="w-9 h-9 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-md opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:text-black cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                  </div>

                  {/* Quick Shop / Add to Cart Floating Button */}
                  <div className="absolute bottom-4 left-0 right-0 px-4 z-10 flex justify-center">
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className={`font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2 cursor-pointer border ${
                        isAdded 
                          ? 'bg-green-600 text-white border-green-600' 
                          : 'bg-white hover:bg-black hover:text-white text-gray-900 border-gray-100'
                      }`}
                    >
                      {isAdded ? (
                        <>✓ Added to Cart</>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Quick Shop
                        </>
                      )}
                    </button>
                  </div>

                </div>

                {/* Product Info & Direct WhatsApp Order */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 
                      onClick={() => openDetailPage(product.id)}
                      className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 cursor-pointer hover:text-gray-600 transition"
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-900 font-extrabold mt-1 text-sm sm:text-base">{product.price}</p>
                  </div>
                  
                  <a 
                    href={`https://wa.me/923364202400?text=${encodeURIComponent(`Hi, I want to order ${product.title} (${product.price})`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 w-full bg-black text-white text-center py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>💬</span> Order via WhatsApp
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}