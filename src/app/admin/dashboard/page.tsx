import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">Manage your store products, orders, and categories efficiently.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Products</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">12</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">4</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Categories</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">Want to add a new clothing item?</h4>
          <p className="text-sm text-gray-500">Upload images, set prices, and assign categories to your store.</p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
        >
          Add New Product
        </Link>
      </div>
    </div>
  );
}