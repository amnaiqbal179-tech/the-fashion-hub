'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: any;
  categoryName?: string;
  price: number | string;
  salePrice?: number | string | null;
  description?: string;
  images?: string[];
  coverImage?: string;
  image?: string;
  sizes?: string[] | any[];
  fabric?: string;
  stitchStatus?: string;
}

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const productId = params?.id ? String(params.id) : '';

  // Database se specific product details fetch karna
  useEffect(() => {
    async function fetchProduct() {
      if (!productId) return;
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const allProducts = await res.json();
          const found = allProducts.find((p: any) => String(p.id) === productId);
          if (found) {
            setProduct(found);
            
            // Set initial selected size from database sizes array
            if (Array.isArray(found.sizes) && found.sizes.length > 0) {
              const firstSize = typeof found.sizes[0] === 'object' ? found.sizes[0].size : found.sizes[0];
              setSelectedSize(firstSize || "M");
            }
          }
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent mb-3"></div>
        <p className="text-gray-500 font-bold text-sm">Loading Product Details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been deleted.</p>
        <Link href="/shop" className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Dynamic values formatting
  const productTitle = product.name || product.title || 'Outfit';
  const displayCategory = typeof product.category === 'object' 
    ? product.category?.name 
    : (product.category || product.categoryName || 'Fashion');

  const mainImage = product.coverImage || product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
  
  const rawPrice = product.salePrice || product.price;
  const formattedPrice = typeof rawPrice === 'number' ? `Rs. ${rawPrice.toLocaleString()}` : rawPrice;

  const availableSizes = Array.isArray(product.sizes) && product.sizes.length > 0 
    ? product.sizes.map((s: any) => typeof s === 'object' ? s.size : s)
    : ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id),
      title: productTitle,
      price: formattedPrice,
      image: mainImage,
      category: displayCategory,
      quantity,
      selectedSize,
    });
    alert("Added to Cart successfully!");
  };

  const whatsappText = encodeURIComponent(
    `Hi, I want to order ${productTitle} (${formattedPrice}) - Size: ${selectedSize}, Qty: ${quantity}`
  );

  return (
    <div className="bg-white min-h-screen text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition">
            &larr; Back to All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Main Image View */}
          <div className="bg-gray-100 h-[450px] sm:h-[550px] w-full relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={mainImage} 
              alt={productTitle} 
              className="w-full h-full object-cover object-center" 
            />
            <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
              {displayCategory}
            </span>
          </div>

          {/* Product Details & Controls */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              {product.fabric && (
                <p className="text-xs text-amber-600 font-extrabold uppercase tracking-widest mb-1">
                  {product.fabric} {product.stitchStatus ? `• ${product.stitchStatus}` : ''}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{productTitle}</h1>
              <div className="flex items-baseline gap-3 mt-3">
                <p className="text-2xl font-semibold text-gray-900">{formattedPrice}</p>
                {product.salePrice && product.price && (
                  <p className="text-lg text-gray-400 line-through">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base">
              {product.description || 'No detailed description provided for this article.'}
            </p>

            {/* Size Options */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Select Size</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {availableSizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 h-12 flex items-center justify-center border rounded-xl font-medium transition ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black shadow-sm' 
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center justify-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                  className="px-5 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                >
                  -
                </button>
                <span className="px-6 py-3.5 font-semibold text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)} 
                  className="px-5 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm text-center"
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* WhatsApp Order Button */}
            <div>
              <a 
                href={`https://wa.me/923364202400?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white text-center py-3.5 rounded-xl font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>💬</span> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}