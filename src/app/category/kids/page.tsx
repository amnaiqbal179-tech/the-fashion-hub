import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function KidsCategoryPage() {
  // Database se Kids category ke products fetch karna
  const kidsProducts = await prisma.product.findMany({
    where: {
      OR: [
        { categoryName: { equals: 'Kids', mode: 'insensitive' } },
        { category: { is: { name: { equals: 'Kids', mode: 'insensitive' } } } },
        { category: { is: { slug: { equals: 'kids', mode: 'insensitive' } } } }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">The Fashion Hub Collection</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-1">Kids' Collection</h1>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Trendy and comfortable outfits for the little ones</p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {kidsProducts.length === 0 ? (
          <div className="col-span-full text-center py-20 text-gray-500 font-semibold">
            No products found in Kids' collection. Admin dashboard se Kids outfits add karein.
          </div>
        ) : (
          kidsProducts.map((product) => {
            const mainImage = (product.images && product.images.length > 0) 
              ? product.images[0] 
              : (product as any).coverImage || '/placeholder.jpg';
            
            const formattedPrice = typeof product.price === 'number' 
              ? `Rs. ${product.price.toLocaleString()}` 
              : `Rs. ${product.price}`;

            const whatsappText = encodeURIComponent(
              `Hi, I want to order ${product.name} (${formattedPrice}) from Kids Collection`
            );

            return (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col group">
                
                {/* Image Click -> Detail Page */}
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="relative h-72 sm:h-80 bg-gray-200 overflow-hidden cursor-pointer">
                    <img 
                      src={mainImage} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
                    />
                    <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-medium">
                      Kids
                    </span>
                  </div>
                </Link>

                {/* Product Info & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/shop/${product.id}`}>
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg hover:underline cursor-pointer line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 font-semibold mt-1 text-sm sm:text-base">
                      {formattedPrice}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link 
                      href={`/shop/${product.id}`} 
                      className="w-full bg-gray-100 text-gray-900 text-center py-2.5 rounded-xl text-sm font-medium hover:bg-gray-200 transition flex items-center justify-center"
                    >
                      View Details
                    </Link>
                    <a 
                      href={`https://wa.me/923364202400?text=${whatsappText}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-full bg-black text-white text-center py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center shadow-sm"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}