import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function AdminProductForm({ initialProduct, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    category: 'mobile-topups',
    platform: 'mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: '',
    stock: 100,
    rating: 5.0,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: 0 }]
  });

  useEffect(() => {
    if (initialProduct) {
      setForm({
        ...initialProduct,
        oldPrice: initialProduct.oldPrice || '',
        tag: initialProduct.tag || '',
        packages: initialProduct.packages?.length > 0 ? initialProduct.packages : [{ name: 'Standard Package', price: initialProduct.price || 0 }]
      });
    }
  }, [initialProduct]);

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...form.packages];
    updatedPkgs[index][field] = field === 'price' ? Number(value) : value;

    // Auto sync main price to first package price
    const newPrice = index === 0 && field === 'price' ? Number(value) : form.price;
    setForm({ ...form, packages: updatedPkgs, price: index === 0 && field === 'price' ? Number(value) : newPrice });
  };

  const addPackage = () => {
    setForm({
      ...form,
      packages: [...form.packages, { name: '', price: 0 }]
    });
  };

  const removePackage = (index) => {
    if (form.packages.length <= 1) return;
    setForm({
      ...form,
      packages: form.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type Badge</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {CATEGORIES.filter(c => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {PLATFORMS.filter(p => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            placeholder="For sale badge calculations"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
          <input
            type="number"
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Tag / Badge</label>
          <input
            type="text"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            placeholder="e.g. Best Seller, Hot, Sale"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
        <div className="relative">
          <input
            type="url"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
          />
          <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
        </div>
        <p className="text-[11px] text-slate-500 mt-1">If empty or invalid, high quality gradient ProductVisual fallback will render automatically.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Brief description of digital key or top-up details..."
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-cyan-400"
        />
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">Product Packages / Options</label>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:underline cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {form.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC or 1 Month)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:outline-none"
              />
              {form.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checkboxes for Home Page Sections */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isTrending}
            onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isFlashDeal}
            onChange={(e) => setForm({ ...form, isFlashDeal: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={form.isTopRated}
            onChange={(e) => setForm({ ...form, isTopRated: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
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
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:opacity-95 cursor-pointer"
        >
          {initialProduct ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
