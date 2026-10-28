import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export function AdminProductForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1500,
    oldPrice: 0,
    stock: 100,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: 1500 }]
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ name: 'Standard Package', price: initialData.price }]
      });
    }
  }, [initialData]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...form.packages];
    updated[index][field] = field === 'price' ? Number(value) : value;
    setForm({ ...form, packages: updated });
  };

  const addPackage = () => {
    setForm({
      ...form,
      packages: [...form.packages, { name: 'New Package', price: form.price }]
    });
  };

  const removePackage = (index) => {
    if (form.packages.length === 1) return;
    setForm({
      ...form,
      packages: form.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
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
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
            placeholder="e.g. PUBG Mobile 660 UC"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="games">Paid Games</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={form.oldPrice || ''}
            onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            required
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
          <input
            type="text"
            value={form.tag || ''}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
            placeholder="e.g. Top Sales, Flash Deals, Hot"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
        <input
          type="url"
          value={form.image || ''}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
          placeholder="https://cdn.akamai.steamstatic.com/..."
        />
        <p className="text-[11px] text-slate-500 mt-1">Leave empty to use automatic ProductVisual gradient fallback.</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-[#050814] text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500"
        />
      </div>

      {/* Product Packages */}
      <div className="space-y-3 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Product Packages & Variants
          </label>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        {form.packages.map((pkg, idx) => (
          <div key={idx} className="flex gap-2 items-center bg-[#050814] p-2.5 rounded-xl border border-slate-800">
            <input
              type="text"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              placeholder="Package Name (e.g. 600 UC)"
              className="flex-1 bg-[#090e1f] text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
            />
            <input
              type="number"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              placeholder="Price (IQD)"
              className="w-32 bg-[#090e1f] text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-700"
            />
            {form.packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackage(idx)}
                className="p-2 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Homepage Display Toggles */}
      <div className="border-t border-slate-800 pt-4 space-y-2">
        <label className="block text-xs font-bold text-slate-300 mb-2">Section Visibility</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={form.isTrending}
              onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={form.isFlashDeal}
              onChange={(e) => setForm({ ...form, isFlashDeal: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={form.isTopRated}
              onChange={(e) => setForm({ ...form, isTopRated: e.target.checked })}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t border-slate-800">
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white font-bold text-xs shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs border border-slate-800 hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
