export default function KidsCategoryPage() {
  const kidsProducts = [
    { id: 29, title: 'Kids Festive Party Wear', price: 'Rs. 2,900', image: '/images/shop/kids/kids1.jpg' },
    { id: 30, title: 'Kids Everyday Casual Outfit', price: 'Rs. 2,400', image: '/images/shop/kids/kids2.jpg' },
    { id: 31, title: 'Boys Traditional Kurta Shalwar', price: 'Rs. 2,200', image: '/images/shop/kids/kids3.jpg' },
    { id: 32, title: 'Girls Cute Party Frock', price: 'Rs. 3,100', image: '/images/shop/kids/kids4.jpg' },
    { id: 33, title: 'Kids Summer Cotton Set', price: 'Rs. 1,900', image: '/images/shop/kids/kids5.jpg' },
    { id: 34, title: 'Boys Formal Waistcoat Suit', price: 'Rs. 4,500', image: '/images/shop/kids/kids6.jpg' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Kids' Collection</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Adorable and comfortable outfits for your little ones</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {kidsProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col group">
            <div className="relative h-72 sm:h-80 bg-gray-200 overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">Kids</span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">{product.title}</h3>
                <p className="text-gray-600 font-semibold mt-1 text-sm sm:text-base">{product.price}</p>
              </div>
              <a href={`https://wa.me/923001234567?text=Hi, I want to order ${product.title} (${product.price}) from Kids Collection`} target="_blank" rel="noopener noreferrer" className="mt-5 w-full bg-black text-white text-center py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
                Order via WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}