import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, AlertCircle } from 'lucide-react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'pc-games',
    platform: 'PC',
    type: 'Game',
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
    isComingSoon: false,
    packages: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        category: initialData.category || 'pc-games',
        platform: initialData.platform || 'PC',
        type: initialData.type || 'Game',
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        description: initialData.description || '',
        image: initialData.image || '',
        stock: initialData.stock ?? 50,
        rating: initialData.rating ?? 5.0,
        soldCount: initialData.soldCount ?? 0,
        tag: initialData.tag || '',
        isFeatured: !!initialData.isFeatured,
        isTrending: !!initialData.isTrending,
        isFlashDeal: !!initialData.isFlashDeal,
        isTopRated: !!initialData.isTopRated,
        isComingSoon: !!initialData.isComingSoon,
        packages: initialData.packages ? [...initialData.packages] : []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '', oldPrice: '' }
      ]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.packages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packages: updated };
    });
  };

  const handleRemovePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.price && formData.packages.length === 0) {
      errs.price = 'Base price or at least one package is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedData = {
      ...formData,
      price: Number(formData.price) || (formData.packages.length > 0 ? Number(formData.packages[0].price) : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formData.packages.map(p => ({
        ...p,
        price: Number(p.price),
        oldPrice: p.oldPrice ? Number(p.oldPrice) : null
      }))
    };

    onSubmit(formattedData);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-cyan-400">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 text-slate-300">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. PUBG Mobile 660 UC"
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-sm text-white"
            />
            {errors.name && <p className="text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">URL Slug (Auto or custom)</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. pubg-mobile-uc"
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-sm text-white"
            />
          </div>
        </div>

        {/* Category, Platform, Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1 text-slate-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            >
              {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            >
              {PLATFORMS.filter(p => p !== 'All').map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            >
              {TYPES.filter(t => t !== 'All').map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Prices & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-1 text-slate-300">Price (IQD) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 15000"
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            />
            {errors.price && <p className="text-rose-400 mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">Old Price (IQD)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="e.g. 18000"
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            />
          </div>
        </div>

        {/* Image URL & Tag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-1 text-slate-300">Image URL (Optional - Fallback visual used if empty)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            />
          </div>

          <div>
            <label className="block font-bold mb-1 text-slate-300">Badge Tag (e.g. Top Sales, Flash Deals)</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Top Sales"
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold mb-1 text-slate-300">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product details..."
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 text-white resize-none"
          />
        </div>

        {/* Toggle Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded accent-cyan-500" />
            <span className="font-semibold text-slate-200">Featured</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="rounded accent-cyan-500" />
            <span className="font-semibold text-slate-200">Trending</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} className="rounded accent-cyan-500" />
            <span className="font-semibold text-slate-200">Flash Deal</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="rounded accent-cyan-500" />
            <span className="font-semibold text-slate-200">Top Rated</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isComingSoon" checked={formData.isComingSoon} onChange={handleChange} className="rounded accent-cyan-500" />
            <span className="font-semibold text-slate-200">Coming Soon</span>
          </label>
        </div>

        {/* Packages Management */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="block font-bold text-slate-200">Product Packages (e.g. 60 UC, 325 UC)</label>
            <button
              type="button"
              onClick={handleAddPackage}
              className="flex items-center gap-1 text-cyan-400 font-bold hover:text-cyan-300"
            >
              <Plus className="w-4 h-4" /> Add Package
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-white"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-white"
              />
              <input
                type="number"
                placeholder="Old Price (IQD)"
                value={pkg.oldPrice || ''}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="bg-slate-900 p-2 rounded-lg border border-slate-700 text-white"
              />
              <button
                type="button"
                onClick={() => handleRemovePackage(idx)}
                className="p-2 text-rose-400 hover:text-rose-300 self-center justify-self-end"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 font-bold shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" />
            <span>{initialData ? 'Update Product' : 'Save Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
