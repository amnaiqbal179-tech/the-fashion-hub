'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export interface Product {
  id: string;
  name?: string;
  title?: string;
  category?: any;
  categoryName?: string;
  price: number | string;
  salePrice?: number | string | null;
  images?: string[];
  coverImage?: string;
  image?: string;
  quantity?: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Database se dynamic products fetch karna
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Category Name Safe Extraction (Fixes null object bug)
  const extractCategoryName = (product: Product): string => {
    if (product.category && typeof product.category === 'object' && product.category.name) {
      return product.category.name;
    }
    if (typeof product.category === 'string' && product.category) {
      return product.category;
    }
    if (product.categoryName) {
      return product.categoryName;
    }
    return '';
  };

  // Filter products based on selected category (Women, Men, Kids)
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'All') return true;
    const catName = extractCategoryName(product);
    return catName.trim().toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleAddToCart = (product: Product) => {
    const productTitle = product.name || product.title || 'Outfit';
    const displayPrice = product.salePrice 
      ? `Rs. ${Number(product.salePrice).toLocaleString()}` 
      : typeof product.price === 'number' 
        ? `Rs. ${product.price.toLocaleString()}` 
        : product.price;

    const coverImg = product.coverImage || product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
    const catName = extractCategoryName(product) || 'Fashion';

    addToCart({
      id: String(product.id),
      title: productTitle,
      price: displayPrice,
      image: coverImg,
      category: catName,
      quantity: 1,
    });

    setAddedProductId(String(product.id));
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">All Products</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Explore our complete exclusive collection for the family</p>
      </div>

      {/* Category Filter Buttons */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
        {['All', 'Women', 'Men', 'Kids'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-sm cursor-pointer ${
              selectedCategory === category
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-900 border-t-transparent"></div>
          <p className="text-gray-500 text-sm mt-3 font-semibold">Loading real products...</p>
        </div>
      ) : (
        /* Products Grid */
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => {
            const isAdded = addedProductId === String(product.id);
            const productTitle = product.name || product.title || 'Untitled Outfit';
            const coverImg = product.coverImage || product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80';
            const catName = extractCategoryName(product) || 'Fashion';
            
            const rawPrice = product.salePrice || product.price;
            const formattedPrice = typeof rawPrice === 'number' 
              ? `Rs. ${rawPrice.toLocaleString()}` 
              : rawPrice;

            return (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col group"
              >
                {/* Image Click -> Open Product Details */}
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="relative h-72 sm:h-80 bg-gray-200 overflow-hidden cursor-pointer">
                    <img 
                      src={coverImg} 
                      alt={productTitle} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                      {catName}
                    </span>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg hover:underline cursor-pointer line-clamp-1">{productTitle}</h3>
                    </Link>
                    
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-gray-900 font-bold text-sm sm:text-base">{formattedPrice}</p>
                      {product.salePrice && product.price && (
                        <p className="text-gray-400 line-through text-xs">
                          Rs. {Number(product.price).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-5 space-y-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className={`w-full py-2.5 rounded-xl text-sm font-medium transition shadow-sm cursor-pointer ${
                        isAdded 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-900 text-white hover:bg-black'
                      }`}
                    >
                      {isAdded ? '✓ Added to Cart' : '🛒 Add to Cart'}
                    </button>

                    <a 
                      href={`https://wa.me/923364202400?text=${encodeURIComponent(`Hi, I want to order ${productTitle} (${formattedPrice})`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white text-center py-2.5 rounded-xl text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>💬</span> WhatsApp Order
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 max-w-md mx-auto my-10 p-8 shadow-sm">
          <p className="text-gray-800 font-bold text-lg">No products found</p>
          <p className="text-gray-500 text-sm mt-1">Is category mein abhi koi product add nahi hua hai. Admin Dashboard se add karein.</p>
        </div>
      )}

    </div>
  );
}