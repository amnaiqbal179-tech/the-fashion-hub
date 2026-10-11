import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  // Products count dynamic fetch karein
  const productsCount = await prisma.product.count().catch(() => 0);
  const categoriesCount = await prisma.category.count().catch(() => 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600">The Fashion Hub store management portal</p>
        </div>
        <Link
          href="/admin/add-product"
          className="bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition font-medium"
        >
          + Add New Product
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold">Total Products</h3>
          <p className="text-4xl font-extrabold text-slate-900 mt-2">{productsCount}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-semibold">Total Categories</h3>
          <p className="text-4xl font-extrabold text-slate-900 mt-2">{categoriesCount}</p>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/add-product"
          className="block p-6 bg-amber-50 hover:bg-amber-100/80 border border-amber-200 rounded-xl transition"
        >
          <h2 className="text-xl font-bold text-amber-900">👗 Add New Suit / Dress</h2>
          <p className="text-amber-700 text-sm mt-1">
            Cloudinary image upload widget ke zariye naya kapda store par publish karein.
          </p>
        </Link>

        <Link
          href="/all-products"
          className="block p-6 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition"
        >
          <h2 className="text-xl font-bold text-slate-900">🛍️ View All Live Products</h2>
          <p className="text-slate-600 text-sm mt-1">
            Store par mojood saare products ka live preview dekhein.
          </p>
        </Link>
      </div>
    </div>
  );
}