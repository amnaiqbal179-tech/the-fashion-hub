'use client';

import { useState, useEffect } from 'react';
import { 
  FolderTree, 
  RefreshCw, 
  Plus, 
  Tag, 
  Sparkles, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt?: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-slug preview generator
  const slugPreview = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      } else {
        setError('Failed to load categories from API');
      }
    } catch (err) {
      console.error('Failed to fetch categories', err);
      setError('An error occurred while fetching categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showSuccessMessage = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  };

  // Create Category Handler
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setSubmitting(true);
      setError('');
      setSuccess('');

      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        setName('');
        showSuccessMessage('Category created successfully!');
        fetchCategories();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to create category');
      }
    } catch (err) {
      console.error('Failed to create category', err);
      setError('An error occurred while creating category');
    } finally {
      setSubmitting(false);
    }
  };

  // Update Category Handler (Supports ID or Slug)
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) return;

    try {
      setSubmitting(true);
      setError('');

      const res = await fetch('/api/categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingCategory.id,
          slug: editingCategory.slug,
          name: editingCategory.name.trim()
        }),
      });

      if (res.ok) {
        setEditingCategory(null);
        showSuccessMessage('Category updated successfully!');
        fetchCategories();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to update category');
      }
    } catch (err) {
      console.error('Failed to update category', err);
      setError('An error occurred while updating category');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Category Handler (Supports ID or Slug Deletion)
  const handleDeleteCategory = async (cat: Category) => {
    if (!confirm(`Are you sure you want to delete category "${cat.name}"?`)) return;

    const itemKey = cat.id && cat.id !== 'N/A' ? cat.id : cat.slug;

    try {
      setDeletingKey(itemKey);
      setError('');

      const queryParam = cat.id && cat.id !== 'N/A' 
        ? `id=${encodeURIComponent(cat.id)}` 
        : `slug=${encodeURIComponent(cat.slug)}`;

      const res = await fetch(`/api/categories?${queryParam}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showSuccessMessage(`Category "${cat.name}" deleted successfully!`);
        fetchCategories();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to delete category');
      }
    } catch (err) {
      console.error('Failed to delete category', err);
      setError('An error occurred while deleting category');
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans p-4 sm:p-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FolderTree className="w-6 h-6 text-amber-500" /> Categories Management
          </h1>
          <p className="text-slate-500 text-xs mt-1">View, add, edit, and manage store categories dynamically</p>
        </div>
        <button
          onClick={fetchCategories}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-500' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create / Edit Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>
            </div>
            {editingCategory && (
              <button 
                onClick={() => setEditingCategory(null)}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category Name</label>
              <input
                type="text"
                value={editingCategory ? editingCategory.name : name}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, name: e.target.value });
                  } else {
                    setName(e.target.value);
                  }
                }}
                placeholder="e.g. Unstitched Lawn, Men Suits"
                required
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            {/* Slug Preview */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Generated Slug</span>
              <p className="text-xs font-mono text-amber-600 font-semibold truncate">
                {editingCategory 
                  ? editingCategory.name.toLowerCase().trim().replace(/[\s_-]+/g, '-') 
                  : (slugPreview || 'slug-will-appear-here')}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:opacity-50"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              {submitting 
                ? (editingCategory ? 'Updating...' : 'Creating...') 
                : (editingCategory ? 'Update Category' : 'Create Category')}
            </button>
          </form>
        </div>

        {/* Categories List Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Existing Categories ({categories.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 flex justify-center items-center gap-2 text-slate-400 text-xs">
              <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
              <span>Loading categories...</span>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-xs">No categories found. Create one above!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Name</th>
                    <th className="py-3.5 px-5">Slug</th>
                    <th className="py-3.5 px-5">Created At</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {categories.map((cat, idx) => {
                    const rowKey = cat.id && cat.id !== 'N/A' ? cat.id : cat.slug;
                    const isDeleting = deletingKey === rowKey;

                    return (
                      <tr key={rowKey || `cat-${idx}`} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-5 text-[11px] text-slate-400 font-mono truncate max-w-[100px]" title={cat.id || 'N/A'}>
                          {cat.id ? cat.id : 'N/A'}
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-900">
                          <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{cat.name}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">{cat.slug}</td>
                        <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                          {cat.createdAt ? new Date(cat.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="py-3.5 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* Edit Button */}
                            <button
                              onClick={() => setEditingCategory(cat)}
                              title="Edit Category"
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteCategory(cat)}
                              disabled={isDeleting}
                              title="Delete Category"
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition cursor-pointer disabled:opacity-50"
                            >
                              {isDeleting ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-500" />
                              ) : (
                                <Trash2 className="w-3.5 h-3.5" />
                              )}
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
    </div>
  );
}