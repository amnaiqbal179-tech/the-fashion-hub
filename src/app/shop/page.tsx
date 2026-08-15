'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  quantity?: number;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Complete products array with explicit Product[] typing and string IDs
  const allProducts: Product[] = [
    // --- Women Products (20) ---
    { id: '1', title: 'Embroidered Lawn Suit', category: 'Women', price: 'Rs. 4,500', image: '/images/shop/women/women1.jpg' },
    { id: '2', title: 'Summer Casual Kurti', category: 'Women', price: 'Rs. 3,200', image: '/images/shop/women/women2.jpg' },
    { id: '3', title: 'Formal Party Wear Dress', category: 'Women', price: 'Rs. 6,500', image: '/images/shop/women/women3.jpg' },
    { id: '4', title: 'Chiffon Embroidered Maxi', category: 'Women', price: 'Rs. 7,200', image: '/images/shop/women/women4.jpg' },
    { id: '5', title: 'Printed Cotton Tunics', category: 'Women', price: 'Rs. 2,800', image: '/images/shop/women/women5.jpg' },
    { id: '6', title: 'Luxury Velvet Ensemble', category: 'Women', price: 'Rs. 9,500', image: '/images/shop/women/women6.jpg' },
    { id: '7', title: 'Daily Wear Cotton Suit', category: 'Women', price: 'Rs. 3,500', image: '/images/shop/women/women7.jpg' },
    { id: '8', title: 'Designer Organza Outfit', category: 'Women', price: 'Rs. 8,000', image: '/images/shop/women/women8.jpg' },
    { id: '9', title: 'Traditional Gharara Set', category: 'Women', price: 'Rs. 10,200', image: '/images/shop/women/women9.jpg' },
    { id: '10', title: 'Contemporary Pret Kurti', category: 'Women', price: 'Rs. 3,900', image: '/images/shop/women/women10.jpg' },
    { id: '11', title: 'Block Printed Slub Suit', category: 'Women', price: 'Rs. 4,100', image: '/images/shop/women/women11.jpg' },
    { id: '12', title: 'Jacquard Festive Wear', category: 'Women', price: 'Rs. 6,800', image: '/images/shop/women/women12.jpg' },
    { id: '13', title: 'Casual Linen Kurti', category: 'Women', price: 'Rs. 3,100', image: '/images/shop/women/women13.jpg' },
    { id: '14', title: 'Bridal Heavy Lehenga', category: 'Women', price: 'Rs. 18,500', image: '/images/shop/women/women14.jpg' },
    { id: '15', title: 'Net Embroidered Frock', category: 'Women', price: 'Rs. 7,500', image: '/images/shop/women/women15.jpg' },
    { id: '16', title: 'Digital Print Cambric Suit', category: 'Women', price: 'Rs. 4,300', image: '/images/shop/women/women16.jpg' },
    { id: '17', title: 'Embroided Organza Dupatta Suit', category: 'Women', price: 'Rs. 6,200', image: '/images/shop/women/women17.jpg' },
    { id: '18', title: 'Minimalist Daily Kurti', category: 'Women', price: 'Rs. 2,500', image: '/images/shop/women/women18.jpg' },
    { id: '19', title: 'Royal Silk Suit', category: 'Women', price: 'Rs. 8,900', image: '/images/shop/women/women19.jpg' },
    { id: '20', title: 'Classic White Chikankari Suit', category: 'Women', price: 'Rs. 5,500', image: '/images/shop/women/women20.jpg' },

    // --- Men Products (8) ---
    { id: '21', title: 'Designer Men Kurta Shalwar', category: 'Men', price: 'Rs. 3,800', image: '/images/shop/men/men1.jpg' },
    { id: '22', title: 'Classic Formal Gents Suit', category: 'Men', price: 'Rs. 5,200', image: '/images/shop/men/men2.jpg' },
    { id: '23', title: 'Casual Cotton Shirt', category: 'Men', price: 'Rs. 2,500', image: '/images/shop/men/men3.jpg' },
    { id: '24', title: 'Embroidered Waistcoat Set', category: 'Men', price: 'Rs. 6,000', image: '/images/shop/men/men4.jpg' },
    { id: '25', title: 'Linen Kurta for Men', category: 'Men', price: 'Rs. 3,400', image: '/images/shop/men/men5.jpg' },
    { id: '26', title: 'Formal Business Suit', category: 'Men', price: 'Rs. 12,500', image: '/images/shop/men/men6.jpg' },
    { id: '27', title: 'Casual Denim Shirt', category: 'Men', price: 'Rs. 2,900', image: '/images/shop/men/men7.jpg' },
    { id: '28', title: 'Festive Sherwani Collection', category: 'Men', price: 'Rs. 14,000', image: '/images/shop/men/men8.jpg' },

    // --- Kids Products (6) ---
    { id: '29', title: 'Kids Festive Party Wear', category: 'Kids', price: 'Rs. 2,900', image: '/images/shop/kids/kids1.jpg' },
    { id: '30', title: 'Kids Everyday Casual Outfit', category: 'Kids', price: 'Rs. 2,400', image: '/images/shop/kids/kids2.jpg' },
    { id: '31', title: 'Boys Traditional Kurta Shalwar', category: 'Kids', price: 'Rs. 2,200', image: '/images/shop/kids/kids3.jpg' },
    { id: '32', title: 'Girls Cute Party Frock', category: 'Kids', price: 'Rs. 3,100', image: '/images/shop/kids/kids4.jpg' },
    { id: '33', title: 'Kids Summer Cotton Set', category: 'Kids', price: 'Rs. 1,900', image: '/images/shop/kids/kids5.jpg' },
    { id: '34', title: 'Boys Formal Waistcoat Suit', category: 'Kids', price: 'Rs. 4,500', image: '/images/shop/kids/kids6.jpg' },
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: 1,
    });

    setAddedProductId(product.id);
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const isAdded = addedProductId === product.id;

          return (
            <div 
              key={product.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col group"
            >
              {/* Clickable Image & Category Badge */}
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative h-72 sm:h-80 bg-gray-200 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                    {product.category}
                  </span>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg hover:underline cursor-pointer">{product.title}</h3>
                  </Link>
                  <p className="text-gray-600 font-semibold mt-1 text-sm sm:text-base">{product.price}</p>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 space-y-2">
                  {/* Add to Cart Button */}
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

                  {/* WhatsApp Order Button */}
                  <a 
                    href={`https://wa.me/923364202400?text=${encodeURIComponent(`Hi, I want to order ${product.title} (${product.price})`)}`}
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

      {/* Empty State Check */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}

    </div>
  );
}