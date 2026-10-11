'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  FolderTree,
  ShoppingBasket,
  Store,
  Bell,
  User,
  Search,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 🔴 FIX: Agar Login Page hai, toh Full Screen Centered Layout dikhao (No Sidebar/Header)
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        {children}
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'All Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Add New Suit', href: '/admin/add-product', icon: PlusCircle },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBasket },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex font-sans relative">
      
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Premium Sidebar */}
      <aside className={`w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between fixed top-0 bottom-0 z-50 shadow-xl transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div>
          {/* Logo Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
                F
              </div>
              <div>
                <h2 className="font-bold text-sm tracking-wider text-white uppercase">The Fashion Hub</h2>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Admin Portal
                </span>
              </div>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === '/admin/dashboard' && pathname === '/admin');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Store Switcher */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition text-xs font-medium border border-slate-700/60"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Visit Live Store</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 font-bold">Live</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-48 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, orders..."
                className="w-full bg-slate-100 text-slate-800 text-xs pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            </button>

            <div className="h-6 w-[1px] bg-slate-200" />

            <div className="flex items-center gap-3">
              {isLoaded && user ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center border border-slate-700 text-sm shadow-sm">
                  <User className="w-4 h-4" />
                </div>
              )}

              <div className="hidden sm:block text-xs">
                <p className="font-bold text-slate-900 truncate max-w-[120px]">
                  {user?.fullName || 'Amna Iqbal'}
                </p>
                <p className="text-[11px] text-slate-500">Store Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-4 sm:p-8 flex-1">{children}</main>
      </div>

    </div>
  );
}