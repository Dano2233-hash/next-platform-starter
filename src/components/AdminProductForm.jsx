import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Save, X, Plus, Trash2, Tag, Image as ImageIcon } from 'lucide-react';

export default function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard', price: '' }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || 'mobile-topups',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 100,
        tag: product.tag || '',
        isFeatured: product.isFeatured || false,
        isTrending: product.isTrending || false,
        isFlashDeal: product.isFlashDeal || false,
        isTopRated: product.isTopRated || false,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard', price: product.price || '' }],
      });
    }
  }, [product]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: prev.slug && product ? prev.slug : generatedSlug,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const addPackageRow = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '' }],
    }));
  };

  const removePackageRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const basePrice = formData.packages.length > 0 && formData.packages[0].price
      ? Number(formData.packages[0].price)
      : Number(formData.price) || 0;

    const formattedProduct = {
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      packages: formData.packages.map((pkg) => ({
        name: pkg.name || 'Standard',
        price: Number(pkg.price) || basePrice,
      })),
    };

    onSave(formattedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product Details' : 'Add New Product to Dano Store'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Product Title */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Product Title *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={handleNameChange}
            placeholder="e.g. PUBG Mobile UC Top-Up"
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Type *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Stock */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Stock Count *</label>
          <input
            type="number"
            min="0"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">
            Image URL (Steam Header or Official CDN)
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Short Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>

        {/* Discount Tag */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Tag / Badge (e.g. 50% OFF, Bestseller)</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>

        {/* Old Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Old Price (IQD) if on Sale</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="e.g. 35000"
            className="w-full bg-[#0d1428] text-white text-sm px-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500/60"
          />
        </div>
      </div>

      {/* Package Options */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
            Package Options & Prices (IQD)
          </label>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center gap-1 text-xs px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-[#0d1428] text-white text-xs px-3 py-2 rounded-xl border border-slate-800"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-[#0d1428] text-white text-xs px-3 py-2 rounded-xl border border-slate-800"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageRow(idx)}
                  className="p-2 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section Placement Checkboxes */}
      <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-300">
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-900 border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="accent-cyan-400 rounded"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-900 border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="accent-cyan-400 rounded"
          />
          <span>New & Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-900 border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="accent-cyan-400 rounded"
          />
          <span>Flash Deals</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-xl bg-slate-900 border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="accent-cyan-400 rounded"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
        >
          <Save className="w-4 h-4 fill-black" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
