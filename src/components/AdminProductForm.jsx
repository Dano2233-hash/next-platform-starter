import React, { useState } from 'react';
import { Plus, Trash2, Save, X, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'pc',
    platform: initialData?.platform || 'PC',
    type: initialData?.type || 'Game',
    price: initialData?.price || 10000,
    oldPrice: initialData?.oldPrice || 0,
    description: initialData?.description || '',
    image: initialData?.image || '',
    stock: initialData?.stock || 50,
    rating: initialData?.rating || 5.0,
    soldCount: initialData?.soldCount || 0,
    tag: initialData?.tag || '',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    isFlashDeal: initialData?.isFlashDeal || false,
    isTopRated: initialData?.isTopRated || false,
    packages: initialData?.packages || [{ name: 'Standard', price: 10000 }]
  });

  const [error, setError] = useState('');

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: field === 'price' ? Number(value) : value };
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: 'New Option', price: formData.price }]
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
    if (!formData.name.trim()) {
      setError('Product Name is required');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      setError('Price must be greater than 0 IQD');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onSubmit({
      ...formData,
      slug,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-extrabold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Product Title *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Steam Wallet Gift Card"
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="pc">PC Gaming</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          >
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Price & Old Price */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Base Price (IQD) *</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Old Price (IQD, Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Stock & Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity *</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Tag / Badge (e.g., Best Seller)</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Image URL (Optional - leave empty for auto visual fallback)
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Package Options Management */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-slate-200">Package / Option Tiers</h4>
          <button
            type="button"
            onClick={addPackage}
            className="px-3 py-1.5 rounded-lg bg-blue-900/60 border border-blue-600/40 text-cyan-300 text-xs font-bold hover:bg-blue-800 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package Option</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                placeholder="Option name (e.g. 660 UC)"
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-lg px-3 py-2"
              />
              <input
                type="number"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                placeholder="Price IQD"
                className="w-32 bg-slate-950 border border-slate-800 text-cyan-400 text-xs rounded-lg px-3 py-2 font-bold"
              />
              <button
                type="button"
                onClick={() => removePackage(idx)}
                className="p-2 text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Toggles for homepage placement */}
      <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Featured Section</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          <span>New & Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Flash Deals</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-slate-900 p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white font-extrabold text-xs hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-blue-600/30"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
