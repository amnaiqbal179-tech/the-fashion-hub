export default function WomenCategoryPage() {
  // All 20 Women products pointing to your public/images/shop/women/ folder
  const womenProducts = [
    { id: 1, title: 'Embroidered Lawn Suit', price: 'Rs. 4,500', image: '/images/shop/women/women1.jpg' },
    { id: 2, title: 'Summer Casual Kurti', price: 'Rs. 3,200', image: '/images/shop/women/women2.jpg' },
    { id: 3, title: 'Formal Party Wear Dress', price: 'Rs. 6,500', image: '/images/shop/women/women3.jpg' },
    { id: 4, title: 'Chiffon Embroidered Maxi', price: 'Rs. 7,200', image: '/images/shop/women/women4.jpg' },
    { id: 5, title: 'Printed Cotton Tunics', price: 'Rs. 2,800', image: '/images/shop/women/women5.jpg' },
    { id: 6, title: 'Luxury Velvet Ensemble', price: 'Rs. 9,500', image: '/images/shop/women/women6.jpg' },
    { id: 7, title: 'Daily Wear Cotton Suit', price: 'Rs. 3,500', image: '/images/shop/women/women7.jpg' },
    { id: 8, title: 'Designer Organza Outfit', price: 'Rs. 8,000', image: '/images/shop/women/women8.jpg' },
    { id: 9, title: 'Traditional Gharara Set', price: 'Rs. 10,200', image: '/images/shop/women/women9.jpg' },
    { id: 10, title: 'Contemporary Pret Kurti', price: 'Rs. 3,900', image: '/images/shop/women/women10.jpg' },
    { id: 11, title: 'Block Printed Slub Suit', price: 'Rs. 4,100', image: '/images/shop/women/women11.jpg' },
    { id: 12, title: 'Jacquard Festive Wear', price: 'Rs. 6,800', image: '/images/shop/women/women12.jpg' },
    { id: 13, title: 'Casual Linen Kurti', price: 'Rs. 3,100', image: '/images/shop/women/women13.jpg' },
    { id: 14, title: 'Bridal Heavy Lehenga', price: 'Rs. 18,500', image: '/images/shop/women/women14.jpg' },
    { id: 15, title: 'Net Embroidered Frock', price: 'Rs. 7,500', image: '/images/shop/women/women15.jpg' },
    { id: 16, title: 'Digital Print Cambric Suit', price: 'Rs. 4,300', image: '/images/shop/women/women16.jpg' },
    { id: 17, title: 'Embroided Organza Dupatta Suit', price: 'Rs. 6,200', image: '/images/shop/women/women17.jpg' },
    { id: 18, title: 'Minimalist Daily Kurti', price: 'Rs. 2,500', image: '/images/shop/women/women18.jpg' },
    { id: 19, title: 'Royal Silk Suit', price: 'Rs. 8,900', image: '/images/shop/women/women19.jpg' },
    { id: 20, title: 'Classic White Chikankari Suit', price: 'Rs. 5,500', image: '/images/shop/women/women20.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">The Fashion Hub Collection</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-1">Women&apos;s Collection</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Discover elegance and tradition with our exclusive women wear range</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {womenProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col group"
          >
            {/* Product Image Container */}
            <div className="relative h-72 sm:h-80 bg-gray-200 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                Women
              </span>
            </div>

            {/* Product Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{product.title}</h3>
                <p className="text-gray-600 font-semibold mt-1 text-sm sm:text-base">{product.price}</p>
              </div>

              {/* WhatsApp Order Button */}
              <a 
                href={`https://wa.me/923001234567?text=Hi, I want to order ${product.title} (${product.price}) from Women Collection`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full bg-black text-white text-center py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>💬</span> Order via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}