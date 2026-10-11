'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Search, 
  Trash2, 
  Eye, 
  Sparkles, 
  Shirt, 
  RefreshCw, 
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Edit
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  sku?: string;
  price: number;
  salePrice?: number;
  category?: { name: string } | string;
  fabric?: string;
  stock: number;
  images: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch Products & Categories from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);

      if (productsRes.ok) {
        const data = await productsRes.json();
        setProducts(data);
      }

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        setCategories(catData);
      }
    } catch (err) {
      console.error('Failed to load inventory data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Product Handler (Updated to use query parameter ?id=)
  const handleDelete = async (id: string) => {
    if (!confirm('Kya aap sure hain ke is product ko delete karna chahte hain?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        alert('Product delete karne mein masla hua.');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete request fail ho gayi.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.sku && p.sku.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const catName = typeof p.category === 'object' ? p.category?.name : p.category;
    const matchesCategory = selectedCategory === 'all' || 
                            (catName && catName.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catalog Overview</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">All Outfits & Inventory</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="p-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition shadow-sm"
            title="Refresh Catalog"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            href="/admin/add-product"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl transition shadow-md flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Outfit
          </Link>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          />
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-amber-400'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-slate-900 text-amber-400'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-amber-500" />
            <p className="text-xs font-bold">Loading inventory items...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Shirt className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-bold text-slate-700">No Outfits Found</p>
            <p className="text-xs text-slate-400">Try changing your filters or add a new product.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                  <th className="py-4 px-6">Product & SKU</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price (PKR)</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-4">Badges</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredProducts.map(product => {
                  const cover = product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80';
                  const catName = typeof product.category === 'object' ? product.category?.name : product.category || 'Uncategorized';

                  return (
                    <tr key={product.id} className="hover:bg-slate-50/80 transition group">
                      
                      {/* Product Thumbnail & Name */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <img 
                            src={cover} 
                            alt={product.name} 
                            className="w-12 h-14 object-cover rounded-lg border border-slate-200 bg-slate-100"
                          />
                          <div>
                            <p className="font-bold text-slate-900 max-w-xs truncate">{product.name}</p>
                            <p className="text-[10px] font-mono text-slate-400">{product.sku || 'N/A'}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category & Fabric */}
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        <span className="capitalize">{catName}</span>
                        {product.fabric && (
                          <span className="block text-[10px] text-amber-600 font-semibold">{product.fabric}</span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {product.salePrice ? (
                          <div>
                            <span className="text-emerald-600">PKR {product.salePrice.toLocaleString()}</span>
                            <span className="block text-[10px] text-slate-400 line-through">PKR {product.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span>PKR {product.price.toLocaleString()}</span>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td className="py-3.5 px-4">
                        {product.stock > 10 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> {product.stock} In Stock
                          </span>
                        ) : product.stock > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle className="w-3 h-3" /> {product.stock} Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            <XCircle className="w-3 h-3" /> Out of Stock
                          </span>
                        )}
                      </td>

                      {/* Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {product.isNewArrival && (
                            <span className="text-[9px] font-black bg-slate-900 text-amber-400 px-2 py-0.5 rounded">NEW</span>
                          )}
                          {product.isFeatured && (
                            <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">FEATURED</span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/add-product?id=${product.id}`}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>

                          <Link
                            href={`/products/${product.id}`}
                            target="_blank"
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                            title="View Store Front"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition disabled:opacity-50"
                            title="Delete Outfit"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}