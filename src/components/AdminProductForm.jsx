import React, { useState } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Save, X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ initialData, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'mobile',
    platform: initialData?.platform || 'PC',
    type: initialData?.type || 'Game',
    price: initialData?.price || 0,
    oldPrice: initialData?.oldPrice || 0,
    description: initialData?.description || '',
    image: initialData?.image || '',
    stock: initialData?.stock !== undefined ? initialData.stock : 100,
    rating: initialData?.rating || 4.9,
    soldCount: initialData?.soldCount || 100,
    tag: initialData?.tag || 'New',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    isFlashDeal: initialData?.isFlashDeal || false,
    isTopRated: initialData?.isTopRated || false,
    packages: initialData?.packages || []
  });

  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('');

  const handleAddPackage = () => {
    if (!newPkgName.trim() || !newPkgPrice) return;
    const pkg = {
      id: `pkg-${Date.now()}`,
      name: newPkgName.trim(),
      price: Number(newPkgPrice)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, pkg]
    }));
    setNewPkgName('');
    setNewPkgPrice('');
  };

  const handleRemovePackage = (id) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Product name is required');
    onSave({
      ...formData,
      slug: formData.name.toLowerCase().replace(/[^a-z0-0]+/g, '-'),
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Tag / Label</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Price (IQD)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - for sale discount)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional - Fallback visual auto-used)</label>
        <input
          type="text"
          placeholder="https://..."
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 resize-none"
        />
      </div>

      {/* Flag Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
        <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
          />
          Trending
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
          />
          Flash Deal
        </label>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
          />
          Top Rated
        </label>
      </div>

      {/* Packages Section */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Packages (For Top-Ups/Gift Cards)</h4>

        {formData.packages.length > 0 && (
          <div className="space-y-2">
            {formData.packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs">
                <span className="font-semibold text-slate-200">{pkg.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400 font-bold">{pkg.price} IQD</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(pkg.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <input
            type="text"
            placeholder="Package name (e.g. 660 UC)"
            value={newPkgName}
            onChange={(e) => setNewPkgName(e.target.value)}
            className="flex-1 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100"
          />
          <input
            type="number"
            placeholder="Price IQD"
            value={newPkgPrice}
            onChange={(e) => setNewPkgPrice(e.target.value)}
            className="w-28 p-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-lg flex items-center gap-1 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/30"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
}
