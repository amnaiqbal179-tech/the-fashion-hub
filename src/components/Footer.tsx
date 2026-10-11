'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, Mail, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Agar user kisi bhi Admin page (/admin, /admin/login, etc.) par hai, toh Footer hide ho jayega
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-800/80 w-full font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-200 text-slate-950 font-black text-lg flex items-center justify-center shadow-md shadow-amber-500/20">
              F
            </div>
            <h3 className="text-base font-bold tracking-wider text-white uppercase">THE FASHION HUB</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your ultimate destination for modern, trendy, and premium quality apparel for Women, Men, and Kids.
          </p>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-amber-400 font-semibold uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3 h-3" /> Festive & Couture
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white border-b border-slate-800 pb-2">Quick Links</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
            <li><Link href="/shop" className="hover:text-amber-400 transition-colors">All Products</Link></li>
            <li><Link href="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white border-b border-slate-800 pb-2">Categories</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><Link href="/category/women" className="hover:text-amber-400 transition-colors">Women Collection</Link></li>
            <li><Link href="/category/men" className="hover:text-amber-400 transition-colors">Men Collection</Link></li>
            <li><Link href="/category/kids" className="hover:text-amber-400 transition-colors">Kids Wear</Link></li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-white border-b border-slate-800 pb-2">Get in Touch</h4>
          <p className="text-xs text-slate-400 mb-3 flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Order via WhatsApp support 24/7.</span>
          </p>
          <a 
            href="https://wa.me/923364202400" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-2 mb-2"
          >
            <Phone className="w-3.5 h-3.5" /> +92 336 4202400
          </a>
          <a 
            href="mailto:hello@thefashionhub.pk" 
            className="text-xs text-slate-400 hover:text-white transition flex items-center gap-2 underline decoration-slate-700"
          >
            <Mail className="w-3.5 h-3.5" /> hello@thefashionhub.pk
          </a>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} The Fashion Hub. All rights reserved.</p>
        <p className="text-[11px] text-slate-600">Luxury Merchandise & E-Commerce Portal</p>
      </div>
    </footer>
  );
}