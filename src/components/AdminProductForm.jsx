import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const AdminProductForm = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 15000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    soldCount: 0,
    rating: 5.0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: 15000, oldPrice: 0 }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        oldPrice: initialData.oldPrice || 0,
        tag: initialData.tag || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: initialData.price || 15000, oldPrice: 0 }]
      });
    }
  }, [initialData]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' || field === 'oldPrice' ? Number(value) : value
    };
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: formData.price || 10000, oldPrice: 0 }
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
    if (!formData.name.trim()) return;

    // Use lowest package price as main price if packages exist
    const minPrice = formData.packages.length > 0
      ? Math.min(...formData.packages.map((p) => p.price))
      : Number(formData.price);

    onSave({
      ...formData,
      price: minPrice,
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      soldCount: Number(formData.soldCount),
      rating: Number(formData.rating)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <h3 className="font-heading font-extrabold text-lg text-slate-100">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                placeholder="e.g., PUBG Mobile UC"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Platform *
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Image & Tag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                placeholder="https://... (Leave empty for auto gradient fallback)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Badge Tag (e.g. HOT, 50% OFF, POPULAR)
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
                placeholder="e.g. HOT"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="Brief details about delivery, platform, features..."
            />
          </div>

          {/* Packages */}
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Product Packages & Options (IQD)
              </label>
              <button
                type="button"
                onClick={addPackage}
                className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1 hover:bg-cyan-500/30 transition-colors"
              >
                <Plus size={14} /> Add Package
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <input
                  type="text"
                  placeholder="Package Name (e.g., 660 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price (IQD)"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-28 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-cyan-400 font-bold focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Old Price"
                  value={pkg.oldPrice || ''}
                  onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                  className="w-24 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-400 focus:outline-none"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Stock, Sold, Rating */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Sold Count
              </label>
              <input
                type="number"
                value={formData.soldCount}
                onChange={(e) => setFormData({ ...formData, soldCount: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                Rating (1-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100"
              />
            </div>
          </div>

          {/* Section Toggles / Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { key: 'isFeatured', label: 'Featured Section' },
              { key: 'isTrending', label: 'New & Trending' },
              { key: 'isFlashDeal', label: 'Flash Deals' },
              { key: 'isTopRated', label: 'Top Rated' }
            ].map(({ key, label }) => (
              <label
                key={key}
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold cursor-pointer select-none transition-colors ${
                  formData[key]
                    ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 font-heading transition-colors"
            >
              <Save size={16} /> Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
