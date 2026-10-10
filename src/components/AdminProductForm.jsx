import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 10000,
    oldPrice: '',
    description: '',
    image: '',
    stock: 50,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard Edition', price: 10000 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'games',
        platform: product.platform || 'PC',
        type: product.type || 'Game',
        price: product.price || 0,
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 50,
        tag: product.tag || '',
        isFeatured: Boolean(product.isFeatured),
        isTrending: Boolean(product.isTrending),
        isFlashDeal: Boolean(product.isFlashDeal),
        isTopRated: Boolean(product.isTopRated),
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: product.price || 0 }]
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package Option', price: formData.price }
      ]
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
    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="games">Paid Games</option>
            <option value="topups">Mobile Top-Ups</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
          </select>
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Steam CDN / HTTPS)</label>
          <input
            type="text"
            placeholder="https://cdn.akamai.steamstatic.com/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Package Options */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Package Options</h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2.5 text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-900 border border-slate-800 rounded-lg py-1 px-2.5 text-xs text-white"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Visibility Checkboxes */}
      <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="accent-cyan-500 rounded"
          />
          <span>Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="accent-cyan-500 rounded"
          />
          <span>Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="accent-cyan-500 rounded"
          />
          <span>Flash Deal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="accent-cyan-500 rounded"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-bold text-white shadow-lg shadow-cyan-950/40"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
};
