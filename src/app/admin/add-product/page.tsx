'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Upload, 
  X, 
  Sparkles, 
  ArrowLeft, 
  Tag, 
  Palette, 
  Ruler, 
  Shirt,
  Wand2,
  Eye,
  Search,
  CheckCircle2,
  AlertCircle,
  Layers,
  PackageCheck,
  RefreshCw,
  Link as LinkIcon,
  Save
} from 'lucide-react';
import Link from 'next/link';

const FABRIC_OPTIONS = ['Lawn', 'Cotton', 'Chiffon', 'Silk', 'Velvet', 'Linen', 'Khaddar', 'Organza', 'Jacquard'];
const CARE_INSTRUCTIONS = ['Dry Clean Only', 'Hand Wash Cold', 'Do Not Bleach', 'Steam Iron Only', 'Wash Separately'];
const PIECE_OPTIONS = ['1-Piece (Shirt Only)', '2-Piece (Shirt + Dupatta)', '2-Piece (Shirt + Trouser)', '3-Piece (Full Suit)', 'Unstitched Fabric'];
const SEASON_OPTIONS = ['Lawn Festive 2026', 'Summer Pret 2026', 'Luxury Velvet Winter', 'Bridal Formal', 'Year-Round Essential'];

// Main Categories & Sub-Categories Mapping
const CATEGORY_MAP: Record<string, string[]> = {
  Women: ['Unstitched 3-Piece', 'Unstitched 2-Piece', 'Ready to Wear', 'Festive Velvet', 'Bottoms & Dupattas'],
  Men: ['Kurta Shalwar', 'Unstitched Fabric', 'Casual Shirts', 'Waistcoats & Jackets'],
  Kids: ['Boys Kurta', 'Girls Pret', 'Festive Kids']
};

const COLOR_OPTIONS = [
  { name: 'Royal Black', hex: '#0f172a' },
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Midnight Navy', hex: '#1e3a8a' },
  { name: 'Dusty Rose', hex: '#f43f5e' },
  { name: 'Champagne Gold', hex: '#d97706' },
  { name: 'Plum Purple', hex: '#581c87' }
];

interface SizeStock {
  size: string;
  stock: number;
  enabled: boolean;
}

function AddProductFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editProductId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'seo'>('details');

  // Main Category & Sub-Category State
  const [mainCategory, setMainCategory] = useState<'Women' | 'Men' | 'Kids'>('Women');
  const [subCategory, setSubCategory] = useState(CATEGORY_MAP.Women[0]);

  // Status Alerts
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [fabric, setFabric] = useState('Lawn');
  const [stitchStatus, setStitchStatus] = useState('Stitched');
  const [pieceCount, setPieceCount] = useState('3-Piece (Full Suit)');
  const [season, setSeason] = useState('Lawn Festive 2026');
  const [selectedColors, setSelectedColors] = useState<string[]>(['Royal Black']);
  const [selectedCare, setSelectedCare] = useState<string[]>(['Dry Clean Only']);
  
  // Images
  const [images, setImages] = useState<string[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // SEO State
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Badges
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  // Size-Wise Inventory Matrix
  const [sizeMatrix, setSizeMatrix] = useState<SizeStock[]>([
    { size: 'XS', stock: 5, enabled: false },
    { size: 'S', stock: 10, enabled: true },
    { size: 'M', stock: 15, enabled: true },
    { size: 'L', stock: 10, enabled: true },
    { size: 'XL', stock: 5, enabled: false },
    { size: 'Unstitched 3PC', stock: 25, enabled: false },
  ]);

  // Handle Main Category Change
  const handleMainCategoryChange = (cat: 'Women' | 'Men' | 'Kids') => {
    setMainCategory(cat);
    setSubCategory(CATEGORY_MAP[cat][0]);
  };

  // Load Edit Product Data if ID present
  useEffect(() => {
    async function loadProductData() {
      if (!editProductId) return;

      try {
        setFetchingProduct(true);
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          const allProducts = await prodRes.json();
          const prod = allProducts.find((p: any) => p.id === editProductId);
          if (prod) {
            setTitle(prod.name || '');
            setSku(prod.sku || '');
            setSlug(prod.slug || '');
            setDescription(prod.description || '');
            setPrice(prod.price ? prod.price.toString() : '');
            setSalePrice(prod.salePrice ? prod.salePrice.toString() : '');
            
            // Map Category
            const fetchedCat = typeof prod.category === 'object' ? prod.category?.name : prod.category;
            if (fetchedCat && ['Women', 'Men', 'Kids'].includes(fetchedCat)) {
              setMainCategory(fetchedCat as 'Women' | 'Men' | 'Kids');
            }

            if (prod.subCategory) setSubCategory(prod.subCategory);
            if (prod.fabric) setFabric(prod.fabric);
            if (prod.stitchStatus) setStitchStatus(prod.stitchStatus);
            if (Array.isArray(prod.colors)) setSelectedColors(prod.colors);
            if (Array.isArray(prod.careInstructions)) setSelectedCare(prod.careInstructions);
            if (Array.isArray(prod.images) && prod.images.length > 0) setImages(prod.images);
            setIsFeatured(!!prod.isFeatured);
            setIsNewArrival(!!prod.isNewArrival);
            if (prod.metaTitle) setMetaTitle(prod.metaTitle);
            if (prod.metaDescription) setMetaDescription(prod.metaDescription);
          }
        }
      } catch (err) {
        console.error('Error fetching product for edit:', err);
      } finally {
        setFetchingProduct(false);
      }
    }

    loadProductData();
  }, [editProductId]);

  // Auto SKU Generator
  const generateSku = () => {
    const catCode = mainCategory.substring(0, 3).toUpperCase();
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const autoSku = `TFH-${catCode}-2026-${randomHex}`;
    setSku(autoSku);
  };

  // Title Handler + Auto SEO Generator
  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
    setMetaTitle(`${val} | The Fashion Hub`);
  };

  const toggleSizeEnable = (idx: number) => {
    const updated = [...sizeMatrix];
    updated[idx].enabled = !updated[idx].enabled;
    setSizeMatrix(updated);
  };

  const updateSizeStock = (idx: number, qty: number) => {
    const updated = [...sizeMatrix];
    updated[idx].stock = Math.max(0, qty);
    setSizeMatrix(updated);
  };

  const toggleColor = (colName: string) => {
    setSelectedColors(prev => 
      prev.includes(colName) ? prev.filter(c => c !== colName) : [...prev, colName]
    );
  };

  const toggleCare = (care: string) => {
    setSelectedCare(prev => 
      prev.includes(care) ? prev.filter(c => c !== care) : [...prev, care]
    );
  };

  // Real PC File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setStatusMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setImages(prev => [...prev, data.url]);
        } else {
          setStatusMessage({ type: 'error', text: 'Some images failed to upload.' });
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      setStatusMessage({ type: 'error', text: 'Error uploading images.' });
    } finally {
      setUploading(false);
    }
  };

  // Direct Image URL Add Handler
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages(prev => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (coverIndex >= index && coverIndex > 0) setCoverIndex(coverIndex - 1);
  };

  // Dynamic Total Stock Calculation
  const totalStockCount = sizeMatrix
    .filter(s => s.enabled)
    .reduce((acc, curr) => acc + curr.stock, 0);

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) {
      setStatusMessage({ type: 'error', text: 'Product Title and Price are required.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    const enabledSizes = sizeMatrix.filter(s => s.enabled).map(s => s.size);

    const payload = {
      ...(editProductId && { id: editProductId }),
      name: title,
      sku,
      slug,
      description,
      price: parseFloat(price),
      salePrice: salePrice ? parseFloat(salePrice) : null,
      category: mainCategory, // 'Women' | 'Men' | 'Kids'
      subCategory,
      fabric,
      stitchStatus,
      colors: selectedColors,
      careInstructions: selectedCare,
      sizes: enabledSizes.length > 0 ? enabledSizes : ['S', 'M', 'L'],
      stock: totalStockCount,
      images,
      coverImage: images[coverIndex] || images[0] || '',
      isFeatured,
      isNewArrival,
      metaTitle,
      metaDescription
    };

    try {
      const endpoint = '/api/products';
      const method = editProductId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: editProductId ? 'Product updated successfully!' : 'Product published successfully!'
        });
        setTimeout(() => {
          router.push('/admin/products');
        }, 1000);
      } else {
        const errorData = await res.json();
        setStatusMessage({ type: 'error', text: errorData.error || 'Failed to save product.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProduct) {
    return (
      <div className="flex flex-col items-center justify-center py-28 text-amber-600 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <span className="text-sm font-bold">Loading Product Details...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-20 space-y-8">
      {/* Top Bar Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-30 backdrop-blur-lg bg-white/95">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/products" 
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Luxury Merchandise Studio</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              {editProductId ? 'Edit Article' : title || 'Create New Article'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
            <PackageCheck className="w-4 h-4 text-emerald-600" />
            <span>Total Stock: <strong className="text-slate-900">{totalStockCount} units</strong></span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || uploading || !title || !price}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition shadow-lg shadow-amber-500/20 flex items-center gap-2 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>{editProductId ? 'Update Article' : 'Publish To Store'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {statusMessage && (
        <div 
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-bold ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Controls (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`pb-3 transition border-b-2 flex items-center gap-2 ${
                activeTab === 'details'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Shirt className="w-4 h-4" /> Outfit Details & Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('seo')}
              className={`pb-3 transition border-b-2 flex items-center gap-2 ${
                activeTab === 'seo'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              <Search className="w-4 h-4" /> SEO & Google Meta Details
            </button>
          </div>

          {activeTab === 'details' ? (
            <>
              {/* Card 1: Primary Details */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-2">
                  <Tag className="w-4 h-4" /> Article Master Information
                </h2>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Velvet Embroidered 3-Piece Festive Collection"
                    value={title}
                    onChange={e => handleTitleChange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Article SKU Code
                      </label>
                      <button
                        type="button"
                        onClick={generateSku}
                        className="text-[11px] font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                      >
                        <Wand2 className="w-3 h-3" /> Auto Generate
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="TFH-WOM-2026-X89"
                      value={sku}
                      onChange={e => setSku(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Stitching Standard
                    </label>
                    <select
                      value={stitchStatus}
                      onChange={e => setStitchStatus(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      <option value="Stitched">Stitched (Ready to Wear)</option>
                      <option value="Unstitched">Unstitched Fabric</option>
                      <option value="Semi-Stitched">Semi-Stitched Formal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Outfit Suit Breakdown
                    </label>
                    <select
                      value={pieceCount}
                      onChange={e => setPieceCount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      {PIECE_OPTIONS.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Season Launch Tag
                    </label>
                    <select
                      value={season}
                      onChange={e => setSeason(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    >
                      {SEASON_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Fabric & Crafting Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide details about shirt work (Zari/Tilla Embroidery), Dupatta fabric (Organza/Silk), and Trouser specification..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                  />
                </div>
              </div>

              {/* Card 2: Fabric & Color Specifications */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Material & Shades
                </h2>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Fabric Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {FABRIC_OPTIONS.map(f => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFabric(f)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                          fabric === f
                            ? 'bg-slate-900 text-amber-400 border-slate-900 shadow-sm'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Color Variants
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {COLOR_OPTIONS.map(c => {
                      const active = selectedColors.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => toggleColor(c.name)}
                          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
                            active
                              ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-slate-300"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Care & Washing Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CARE_INSTRUCTIONS.map(care => {
                      const active = selectedCare.includes(care);
                      return (
                        <button
                          key={care}
                          type="button"
                          onClick={() => toggleCare(care)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                            active
                              ? 'bg-amber-500/10 text-amber-700 border-amber-300 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-500'
                          }`}
                        >
                          {care}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Card 3: Size-Wise Inventory Matrix */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-2">
                      <Ruler className="w-4 h-4" /> Size-Wise Inventory Matrix
                    </h2>
                    <p className="text-slate-500 text-xs mt-0.5">Enable available sizes and allocate stock units.</p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {sizeMatrix.map((item, idx) => (
                    <div 
                      key={item.size}
                      className={`p-3.5 flex items-center justify-between transition ${
                        item.enabled ? 'bg-white' : 'bg-slate-50/70 opacity-60'
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.enabled}
                          onChange={() => toggleSizeEnable(idx)}
                          className="w-4 h-4 accent-amber-500 rounded"
                        />
                        <span className="text-xs font-bold text-slate-900">{item.size}</span>
                      </label>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 uppercase font-semibold">Stock Qty:</span>
                        <input
                          type="number"
                          disabled={!item.enabled}
                          value={item.stock}
                          onChange={e => updateSizeStock(idx, parseInt(e.target.value) || 0)}
                          className="w-20 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-center disabled:bg-slate-200/50"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 4: Multi-Image Gallery */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-2">
                      <Layers className="w-4 h-4" /> High-Res Imagery Gallery
                    </h2>
                    <p className="text-slate-500 text-xs mt-0.5">Upload photos from PC or paste direct URL.</p>
                  </div>

                  <label className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>{uploading ? 'Uploading...' : 'Choose from PC'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <div className="relative flex-1">
                    <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="url"
                      placeholder="Or paste external image URL (https://...)"
                      value={imageUrlInput}
                      onChange={e => setImageUrlInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition shrink-0"
                  >
                    Add Link
                  </button>
                </div>

                {uploading && (
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-bold animate-pulse flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Uploading photos to Cloudinary...
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  {images.map((img, idx) => {
                    const isCover = coverIndex === idx;
                    return (
                      <div 
                        key={idx} 
                        className={`relative group rounded-xl overflow-hidden border-2 transition aspect-[3/4] ${
                          isCover ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200'
                        }`}
                      >
                        <img src={img} alt="Product photoshoot" className="w-full h-full object-cover" />
                        
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-between">
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="self-end p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>

                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => setCoverIndex(idx)}
                              className="w-full py-1.5 bg-white text-slate-950 text-[10px] font-bold rounded-lg shadow"
                            >
                              Set as Cover
                            </button>
                          )}
                        </div>

                        {isCover && (
                          <span className="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow">
                            ★ MAIN COVER
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* SEO Settings Tab */
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 flex items-center gap-2">
                <Search className="w-4 h-4" /> Search Engine Optimization (SEO)
              </h2>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">URL Slug</label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-600">
                  <span>thefashionhub.com/product/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    className="bg-transparent font-bold text-slate-900 focus:outline-none flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={e => setMetaTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={e => setMetaDescription(e.target.value)}
                  placeholder="Buy Royal Velvet Embroidered suit online at best price in Pakistan..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Google Search Snippet Preview</p>
                <p className="text-sm font-bold text-blue-700 hover:underline cursor-pointer truncate">
                  {metaTitle || title || 'Product Title'}
                </p>
                <p className="text-[11px] text-emerald-700 truncate">
                  https://thefashionhub.com/product/{slug || 'article-slug'}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {metaDescription || description || 'Product description will appear here on search results.'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Pricing, Category & Live Card Preview (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Live Store Front Card Preview */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-600" /> Customer Live View
              </span>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                Preview
              </span>
            </div>

            <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
              <div className="relative aspect-[3/4] bg-slate-100">
                <img 
                  src={images[coverIndex] || images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'} 
                  alt="Live Preview" 
                  className="w-full h-full object-cover"
                />
                {isNewArrival && (
                  <span className="absolute top-2 left-2 bg-slate-900 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    NEW ARRIVAL
                  </span>
                )}
                {salePrice && parseFloat(salePrice) < parseFloat(price) && (
                  <span className="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow">
                    -{Math.round(((parseFloat(price) - parseFloat(salePrice)) / parseFloat(price)) * 100)}% OFF
                  </span>
                )}
              </div>

              <div className="p-4 space-y-1">
                <p className="text-[10px] text-amber-600 font-extrabold uppercase tracking-widest">{mainCategory} • {fabric}</p>
                <h4 className="font-bold text-slate-900 text-xs truncate">{title || 'Suit Name Here'}</h4>
                
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="text-sm font-black text-slate-900">
                    PKR {salePrice ? parseFloat(salePrice).toLocaleString() : price ? parseFloat(price).toLocaleString() : '0'}
                  </span>
                  {salePrice && price && (
                    <span className="text-xs text-slate-400 line-through">
                      PKR {parseFloat(price).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Structure */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              Pricing Structure (PKR)
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Original Price (PKR) *
              </label>
              <input
                type="number"
                required
                placeholder="8990"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Special Sale Price (Optional)
              </label>
              <input
                type="number"
                placeholder="6990"
                value={salePrice}
                onChange={e => setSalePrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>
          </div>

          {/* Main Category Selection (Women, Men, Kids) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              Department & Main Category
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Main Category *</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Women', 'Men', 'Kids'] as const).map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleMainCategoryChange(cat)}
                    className={`py-3 rounded-xl text-xs font-bold capitalize border transition ${
                      mainCategory === cat
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Sub-Category Collection
              </label>
              <select
                value={subCategory}
                onChange={e => setSubCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {CATEGORY_MAP[mainCategory]?.map(sc => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Marketing Visibility Badges */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600 mb-2">
              Marketing Badges
            </h2>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition">
              <span className="text-xs font-bold text-slate-800">New Arrival Badge</span>
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={e => setIsNewArrival(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100/80 transition">
              <span className="text-xs font-bold text-slate-800">Featured On Home Banner</span>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </label>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-24 text-amber-600 font-bold text-sm">
        <RefreshCw className="w-6 h-6 animate-spin mr-2" /> Loading form...
      </div>
    }>
      <AddProductFormContent />
    </Suspense>
  );
}