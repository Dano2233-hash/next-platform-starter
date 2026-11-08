import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export function AdminProductForm({ initialData, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile-top-ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 50,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'p1', name: 'Standard Package', price: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        packages: initialData.packages || [{ id: 'p1', name: 'Standard Package', price: initialData.price }]
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        category: 'mobile-top-ups',
        platform: 'Mobile',
        type: 'Top-Up',
        price: '',
        oldPrice: '',
        description: '',
        image: '',
        stock: 50,
        rating: 5.0,
        soldCount: 0,
        tag: '',
        isFeatured: false,
        isTrending: false,
        isFlashDeal: false,
        isTopRated: false,
        packages: [{ id: 'p1', name: 'Standard Package', price: '' }]
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '' }
      ]
    }));
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, idx) => idx !== index)
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill out Product Name and Base Price');
      return;
    }

    const cleanedPackages = formData.packages
      .filter((p) => p.name.trim())
      .map((p, idx) => ({
        id: p.id || `pkg-${idx}`,
        name: p.name,
        price: Number(p.price) || Number(formData.price)
      }));

    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: cleanedPackages.length > 0 ? cleanedPackages : [
        { id: 'p1', name: 'Standard Package', price: Number(formData.price) }
      ]
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-[#090d1c] border border-slate-700/80 rounded-2xl p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. PUBG Mobile 660 UC"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug (URL)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e.g. pubg-mobile-uc"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {PLATFORMS.filter((p) => p !== 'All').map((plat) => (
                  <option key={plat} value={plat}>{plat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              >
                {PRODUCT_TYPES.filter((t) => t !== 'All').map((typ) => (
                  <option key={typ} value={typ}>{typ}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Old Price, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="15000"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="Optional"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Units</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="50"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://... or leave empty for visual fallback"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Promo Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Best Seller, -30% OFF"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product details..."
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Feature toggles */}
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Trending</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Flash Deal</span>
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Top Rated</span>
            </label>
          </div>

          {/* Packages */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-200">Packages / Variants</label>
              <button
                type="button"
                onClick={handleAddPackage}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>
            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Package name (e.g. 660 UC)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Price IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-28 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductForm;
