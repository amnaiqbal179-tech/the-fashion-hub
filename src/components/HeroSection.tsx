import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 z-10 py-16 sm:py-20">
        <span className="inline-block text-xs sm:text-sm uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full font-medium text-white border border-white/30">
          New Summer Collection 2026
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          ELEVATE YOUR <span className="text-gray-200 underline decoration-white/50 underline-offset-8">EVERYDAY STYLE</span>
        </h1>
        <p className="text-sm sm:text-xl text-gray-200 max-w-2xl mx-auto font-light">
          Discover premium quality clothing tailored for Women, Men, and Kids. Shop the latest trends with effortless WhatsApp ordering.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link
            href="/shop"
            className="bg-white text-black font-bold px-8 py-3.5 sm:py-4 rounded-xl hover:bg-gray-100 transition shadow-2xl text-center tracking-wide text-sm sm:text-base"
          >
            Shop All Products
          </Link>
          <Link
            href="/category/women"
            className="bg-black/40 backdrop-blur-md border border-white/40 text-white font-bold px-8 py-3.5 sm:py-4 rounded-xl hover:bg-white/20 transition text-center tracking-wide text-sm sm:text-base"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
}