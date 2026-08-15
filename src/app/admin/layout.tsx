import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold tracking-wider text-black">THE FASHION HUB</span>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link
            href="/admin/dashboard"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            🛍️ Products
          </Link>
          <Link
            href="/admin/products/add"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            ➕ Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            📦 Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="block text-center text-sm font-medium text-gray-600 hover:text-black py-2 border border-gray-300 rounded-lg"
          >
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-800">Admin Control Panel</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Admin Panel</span>
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}