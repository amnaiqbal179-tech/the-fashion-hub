import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import {
  ShoppingBag,
  FolderTree,
  ShoppingBasket,
  Plus,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default async function AdminDashboardPage() {
  // Database counts dynamically fetch karein
  const productsCount = await prisma.product.count().catch(() => 0);
  const categoriesCount = await prisma.category.count().catch(() => 0);

  // Recent products preview fetch karein
  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  }).catch(() => []);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Performance Overview</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Monitor inventory levels, store categories, and manage new clothing drops.
          </p>
        </div>

        <Link
          href="/admin/add-product"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-slate-900/10 hover:shadow-lg"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Modern Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Total Products */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Live Suits</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{productsCount}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Active in database</span>
          </div>
        </div>

        {/* Total Categories */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Categories</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{categoriesCount}</h3>
            </div>
            <div className="p-3 bg-slate-100 text-slate-700 rounded-xl border border-slate-200">
              <FolderTree className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500">
            <span>Women, Men & Kids</span>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Total Orders</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">0</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
              <ShoppingBasket className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-[11px] text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Order tracking ready</span>
          </div>
        </div>

        {/* Storage Health */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">Image Cloud</p>
              <h3 className="text-base font-bold text-slate-900 mt-2">Cloudinary</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-[11px] text-emerald-600 font-semibold">
            <span>CDN Active</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/add-product"
          className="group p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-slate-800 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
          <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
            Add New Suit / Clothing Item
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Upload dress photos via Cloudinary, set price in PKR, select sizes, and assign category.
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="group p-6 bg-white text-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-200 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Manage Live Products List</h2>
          <p className="text-slate-500 text-xs mt-1">
            View all uploaded dresses, update details, or delete items from store front.
          </p>
        </Link>
      </div>

      {/* Recent Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recently Added Suits</h3>
            <p className="text-slate-500 text-xs">Latest items synced with your database</p>
          </div>
          <Link href="/admin/products" className="text-amber-600 hover:text-amber-700 text-xs font-semibold">
            View All →
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-400 text-xs">No products found in database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-semibold text-slate-900">{prod.name}</td>
                    <td className="py-3 px-4 text-slate-500">{prod.category?.name || 'General'}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">PKR {prod.price}</td>
                    <td className="py-3 px-4 text-slate-600">{prod.stock} units</td>
                    <td className="py-3 px-4 text-right">
                      <span className="bg-emerald-50 text-emerald-600 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 text-[10px]">
                        Live
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}