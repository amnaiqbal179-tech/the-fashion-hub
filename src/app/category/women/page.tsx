'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function WomenCategoryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchWomenProducts() {
      try {
        const res = await fetch('/api/products?category=Women');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching women collection:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWomenProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Women's Collection</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Explore our exclusive women outfits</p>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
          <p className="text-gray-500 text-sm font-semibold mt-3">Loading Women Collection...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto p-8 shadow-sm">
          <p className="text-gray-800 font-bold text-lg">No Women Products Available</p>
          <p className="text-gray-500 text-sm mt-1">Admin dashboard se Women category ke outfits add karein.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => {
            const productTitle = product.name || product.title || 'Women Suit';
            const coverImg = product.coverImage || product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
            const price = product.salePrice ? `Rs. ${product.salePrice.toLocaleString()}` : `Rs. ${product.price.toLocaleString()}`;

            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col p-4">
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="relative h-72 sm:h-80 bg-gray-100 rounded-xl overflow-hidden mb-4">
                    <img src={coverImg} alt={productTitle} className="w-full h-full object-cover object-center hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                      Women
                    </span>
                  </div>
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1 hover:underline">{productTitle}</h3>
                    </Link>
                    <p className="text-gray-900 font-bold text-sm mt-1">{price}</p>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Link 
                      href={`/shop/${product.id}`}
                      className="block w-full bg-gray-900 text-white text-center py-2.5 rounded-xl text-sm font-medium hover:bg-black transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}