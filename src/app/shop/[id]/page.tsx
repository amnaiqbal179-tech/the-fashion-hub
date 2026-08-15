'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Complete products array taake ID match ki ja sake
const allProducts = [
  // --- Women Products (20) ---
  { id: 1, title: 'Embroidered Lawn Suit', category: 'Women', price: 'Rs. 4,500', image: '/images/shop/women/women1.jpg', description: 'Exquisite embroidered lawn suit designed for elegance and comfort during the summer season.' },
  { id: 2, title: 'Summer Casual Kurti', category: 'Women', price: 'Rs. 3,200', image: '/images/shop/women/women2.jpg', description: 'Lightweight and breathable summer casual kurti for everyday styling.' },
  { id: 3, title: 'Formal Party Wear Dress', category: 'Women', price: 'Rs. 6,500', image: '/images/shop/women/women3.jpg', description: 'Stunning formal party wear dress featuring intricate detailing and premium fabric.' },
  { id: 4, title: 'Chiffon Embroidered Maxi', category: 'Women', price: 'Rs. 7,200', image: '/images/shop/women/women4.jpg', description: 'Graceful chiffon embroidered maxi perfect for weddings and formal gatherings.' },
  { id: 5, title: 'Printed Cotton Tunics', category: 'Women', price: 'Rs. 2,800', image: '/images/shop/women/women5.jpg', description: 'Vibrant printed cotton tunic offering a trendy and casual look.' },
  { id: 6, title: 'Luxury Velvet Ensemble', category: 'Women', price: 'Rs. 9,500', image: '/images/shop/women/women6.jpg', description: 'Opulent luxury velvet ensemble tailored for winter festivities and special events.' },
  { id: 7, title: 'Daily Wear Cotton Suit', category: 'Women', price: 'Rs. 3,500', image: '/images/shop/women/women7.jpg', description: 'Comfortable daily wear cotton suit crafted for all-day ease.' },
  { id: 8, title: 'Designer Organza Outfit', category: 'Women', price: 'Rs. 8,000', image: '/images/shop/women/women8.jpg', description: 'Designer organza outfit with sophisticated work and elegant flair.' },
  { id: 9, title: 'Traditional Gharara Set', category: 'Women', price: 'Rs. 10,200', image: '/images/shop/women/women9.jpg', description: 'Classic traditional gharara set showcasing rich cultural heritage and style.' },
  { id: 10, title: 'Contemporary Pret Kurti', category: 'Women', price: 'Rs. 3,900', image: '/images/shop/women/women10.jpg', description: 'Modern contemporary pret kurti designed for the urban fashionista.' },
  { id: 11, title: 'Block Printed Slub Suit', category: 'Women', price: 'Rs. 4,100', image: '/images/shop/women/women11.jpg', description: 'Traditional block printed slub suit with unique patterns and rich texture.' },
  { id: 12, title: 'Jacquard Festive Wear', category: 'Women', price: 'Rs. 6,800', image: '/images/shop/women/women12.jpg', description: 'Festive jacquard wear designed to make you stand out at celebrations.' },
  { id: 13, title: 'Casual Linen Kurti', category: 'Women', price: 'Rs. 3,100', image: '/images/shop/women/women13.jpg', description: 'Durable and chic casual linen kurti for everyday wear.' },
  { id: 14, title: 'Bridal Heavy Lehenga', category: 'Women', price: 'Rs18,500', image: '/images/shop/women/women14.jpg', description: 'Magnificent bridal heavy lehenga embellished with premium hand embroidery.' },
  { id: 15, title: 'Net Embroidered Frock', category: 'Women', price: 'Rs. 7,500', image: '/images/shop/women/women15.jpg', description: 'Dreamy net embroidered frock with a flowing silhouette.' },
  { id: 16, title: 'Digital Print Cambric Suit', category: 'Women', price: 'Rs. 4,300', image: '/images/shop/women/women16.jpg', description: 'Eye-catching digital print cambric suit for vibrant seasonal styling.' },
  { id: 17, title: 'Embroided Organza Dupatta Suit', category: 'Women', price: 'Rs. 6,200', image: '/images/shop/women/women17.jpg', description: 'Graceful suit paired with an exquisitely embroidered organza dupatta.' },
  { id: 18, title: 'Minimalist Daily Kurti', category: 'Women', price: 'Rs. 2,500', image: '/images/shop/women/women18.jpg', description: 'Simple, minimalist daily kurti focused on clean lines and comfort.' },
  { id: 19, title: 'Royal Silk Suit', category: 'Women', price: 'Rs. 8,900', image: '/images/shop/women/women19.jpg', description: 'Luxurious royal silk suit that exudes sophistication and grace.' },
  { id: 20, title: 'Classic White Chikankari Suit', category: 'Women', price: 'Rs. 5,500', image: '/images/shop/women/women20.jpg', description: 'Timeless classic white chikankari suit with delicate hand embroidery.' },

  // --- Men Products (8) ---
  { id: 21, title: 'Designer Men Kurta Shalwar', category: 'Men', price: 'Rs. 3,800', image: '/images/shop/men/men1.jpg', description: 'Smart designer men kurta shalwar tailored for a sharp, traditional look.' },
  { id: 22, title: 'Classic Formal Gents Suit', category: 'Men', price: 'Rs. 5,200', image: '/images/shop/men/men2.jpg', description: 'Sophisticated classic formal gents suit for professional and formal events.' },
  { id: 23, title: 'Casual Cotton Shirt', category: 'Men', price: 'Rs. 2,500', image: '/images/shop/men/men3.jpg', description: 'Versatile casual cotton shirt for everyday comfort and style.' },
  { id: 24, title: 'Embroidered Waistcoat Set', category: 'Men', price: 'Rs. 6,000', image: '/images/shop/men/men4.jpg', description: 'Elegant embroidered waistcoat set perfect for festive occasions.' },
  { id: 25, title: 'Linen Kurta for Men', category: 'Men', price: 'Rs. 3,400', image: '/images/shop/men/men5.jpg', description: 'Airy linen kurta for men designed for warm weather elegance.' },
  { id: 26, title: 'Formal Business Suit', category: 'Men', price: 'Rs. 12,500', image: '/images/shop/men/men6.jpg', description: 'Premium formal business suit tailored for a commanding presence.' },
  { id: 27, title: 'Casual Denim Shirt', category: 'Men', price: 'Rs. 2,900', image: '/images/shop/men/men7.jpg', description: 'Rugged yet stylish casual denim shirt for casual outings.' },
  { id: 28, title: 'Festive Sherwani Collection', category: 'Men', price: 'Rs. 14,000', image: '/images/shop/men/men8.jpg', description: 'Regal festive sherwani collection crafted for weddings and grand celebrations.' },

  // --- Kids Products (6) ---
  { id: 29, title: 'Kids Festive Party Wear', category: 'Kids', price: 'Rs. 2,900', image: '/images/shop/kids/kids1.jpg', description: 'Adorable festive party wear designed keeping kids comfort in mind.' },
  { id: 30, title: 'Kids Everyday Casual Outfit', category: 'Kids', price: 'Rs. 2,400', image: '/images/shop/kids/kids2.jpg', description: 'Soft and durable everyday casual outfit for active kids.' },
  { id: 31, title: 'Boys Traditional Kurta Shalwar', category: 'Kids', price: 'Rs. 2,200', image: '/images/shop/kids/kids3.jpg', description: 'Cute traditional kurta shalwar set for young boys.' },
  { id: 32, title: 'Girls Cute Party Frock', category: 'Kids', price: 'Rs. 3,100', image: '/images/shop/kids/kids4.jpg', description: 'Charming and bright party frock for little girls.' },
  { id: 33, title: 'Kids Summer Cotton Set', category: 'Kids', price: 'Rs. 1,900', image: '/images/shop/kids/kids5.jpg', description: 'Lightweight summer cotton set to keep kids cool and happy.' },
  { id: 34, title: 'Boys Formal Waistcoat Suit', category: 'Kids', price: 'Rs. 4,500', image: '/images/shop/kids/kids6.jpg', description: 'Dapper formal waistcoat suit for boys attending family weddings.' },
];

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  const productId = Number(params.id);
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
        <Link href="/shop" className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      id: String(product.id), // <-- ID ko string mein convert kiya taake type match ho
      quantity, 
      selectedSize 
    });
    alert("Added to Cart successfully!");
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/shop" className="text-sm font-medium text-gray-500 hover:text-black transition">
            &larr; Back to All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-gray-100 h-[450px] sm:h-[550px] w-full relative rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover object-center" 
            />
            <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
              {product.category}
            </span>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{product.title}</h1>
              <p className="text-2xl font-semibold mt-3 text-gray-900">{product.price}</p>
            </div>

            <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Select Size</h3>
              <div className="flex gap-3 mt-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border rounded-xl font-medium transition ${
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

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <div className="flex items-center justify-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-5 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition">-</button>
                <span className="px-6 py-3.5 font-semibold text-gray-900">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="px-5 py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition">+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition shadow-sm text-center"
              >
                🛒 Add to Cart
              </button>
            </div>

            <div>
              <a 
                href={`https://wa.me/923001234567?text=Hi, I want to order ${product.title} (${product.price}) - Size: ${selectedSize} - Qty: ${quantity}`}
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