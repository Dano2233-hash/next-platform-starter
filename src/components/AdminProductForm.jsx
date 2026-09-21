import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Plus, Check, X, AlertCircle } from 'lucide-react';

export const AdminProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile-topup',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: '100',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard', price: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price ? String(product.price) : '',
        oldPrice: product.oldPrice ? String(product.oldPrice) : '',
        stock: product.stock !== undefined ? String(product.stock) : '100',
        packages: product.packages && product.packages.length > 0
          ? product.packages.map(p => ({ ...p, price: String(p.price) }))
          : [{ name: 'Standard', price: String(product.price || '') }]
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }]
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Product name is required');

    const formattedPackages = formData.packages
      .filter((p) => p.name.trim() !== '')
      .map((p) => ({
        name: p.name,
        price: Number(p.price) || Number(formData.price) || 0
      }));

    const finalSlug = formData.slug.trim()
      ? formData.slug.trim()
      : formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const finalProduct = {
      ...formData,
      slug: finalSlug,
      price: Number(formData.price) || (formattedPackages.length > 0 ? formattedPackages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      packages: formattedPackages
    };

    onSubmit(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090f1e] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. PUBG Mobile UC"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">URL Slug (Auto-generated if empty)</label>
          <input
            type="text"
            placeholder="e.g. pubg-mobile-uc"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Base Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Base Price (IQD) *</label>
          <input
            type="number"
            required
            placeholder="e.g. 1500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Old Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Old Price (IQD - Optional)</label>
          <input
            type="number"
            placeholder="e.g. 2000"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Stock Count *</label>
          <input
            type="number"
            required
            placeholder="e.g. 100"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Custom Tag */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Custom Tag (e.g. Best Seller)</label>
          <input
            type="text"
            placeholder="e.g. Hot Deal"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Image URL (Steam header / Official Image)</label>
          <input
            type="url"
            placeholder="https://cdn.akamai.steamstatic.com/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
          <p className="text-[11px] text-slate-500">
            If left blank, our custom ProductVisual fallback banner will automatically render.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1 col-span-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Short Description</label>
          <textarea
            rows="3"
            placeholder="Describe product details, activation instructions..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Package Options */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Package Tiers / Options
          </h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
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
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section Checkboxes */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Hero Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs px-6 py-2.5 rounded-xl transition-colors shadow-md shadow-cyan-500/20"
        >
          {product ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};
