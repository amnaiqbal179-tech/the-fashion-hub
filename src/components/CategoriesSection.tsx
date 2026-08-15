import Link from 'next/link';

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Shop By Category</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Find what fits your unique style and wardrobe</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Women Category */}
        <Link href="/category/women" className="group relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[380px] sm:h-[450px] flex items-end p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">Women Collection</h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Kurtis, Dresses & Formals</p>
            <span className="inline-block mt-3 sm:mt-4 text-xs font-semibold uppercase tracking-wider underline underline-offset-4">
              Shop Now &rarr;
            </span>
          </div>
        </Link>

        {/* Men Category */}
        <Link href="/category/men" className="group relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[380px] sm:h-[450px] flex items-end p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">Men Collection</h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Casuals, Shalwar Kameez & Shirts</p>
            <span className="inline-block mt-3 sm:mt-4 text-xs font-semibold uppercase tracking-wider underline underline-offset-4">
              Shop Now &rarr;
            </span>
          </div>
        </Link>

        {/* Kids Category */}
        <Link href="/category/kids" className="group relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 h-[380px] sm:h-[450px] flex items-end p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl sm:col-span-2 lg:col-span-1">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="relative z-10 text-white">
            <h3 className="text-xl sm:text-2xl font-bold">Kids Collection</h3>
            <p className="text-xs sm:text-sm text-gray-200 mt-1">Trendy Outfits for Little Ones</p>
            <span className="inline-block mt-3 sm:mt-4 text-xs font-semibold uppercase tracking-wider underline underline-offset-4">
              Shop Now &rarr;
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}