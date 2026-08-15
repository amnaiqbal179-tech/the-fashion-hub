import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold tracking-wider mb-4">THE FASHION HUB</h3>
          <p className="text-sm text-gray-400">Your ultimate destination for modern, trendy, and premium quality apparel for the whole family.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-white transition">All Products</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/category/women" className="hover:text-white transition">Women</Link></li>
            <li><Link href="/category/men" className="hover:text-white transition">Men</Link></li>
            <li><Link href="/category/kids" className="hover:text-white transition">Kids</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
          <p className="text-sm text-gray-400 mb-2">Order via WhatsApp support 24/7.</p>
          <p className="text-sm font-bold text-white mb-2">+92 3364202400</p>
          <a 
            href="mailto:hello@thefashionhub.pk" 
            className="text-sm text-gray-400 hover:text-white transition block underline"
          >
            hello@thefashionhub.pk
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} The Fashion Hub. All rights reserved.
      </div>
    </footer>
  );
}