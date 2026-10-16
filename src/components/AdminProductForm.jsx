import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, AlertCircle } from 'lucide-react';

export const AdminProductForm = ({ initialProduct = null, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialProduct) {
      setForm({
        ...initialProduct,
        oldPrice: initialProduct.oldPrice || 0,
        tag: initialProduct.tag || '',
        packages: initialProduct.packages ? [...initialProduct.packages] : []
      });
    }
  }, [initialProduct]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...form.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setForm({ ...form, packages: updated });
  };

  const addPackageRow = () => {
    setForm({
      ...form,
      packages: [...form.packages, { name: '', price: 0 }]
    });
  };

  const removePackageRow = (index) => {
    setForm({
      ...form,
      packages: form.packages.filter((_, i) => i !== index)
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Product name is required';
    if (!form.category) errs.category = 'Category is required';
    if (form.price < 0) errs.price = 'Price cannot be negative';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-extrabold text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Product Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
          {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="mobile-topups">Mobile Top-Ups</option>
            <option value="paid-games">Paid Games</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform Badge</label>
          <select
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type Badge */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type Badge</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Base Price */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Base Price (IQD)
          </label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">
            Old Price (IQD for Sale Badge)
          </label>
          <input
            type="number"
            value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: Number(e.target.value) })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag (e.g. Hot, GOTY)</label>
          <input
            type="text"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
            placeholder="e.g. Best Seller"
            className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
        <input
          type="url"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="https://cdn.akamai.steamstatic.com/..."
          className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          Leave blank to use automatic visual badge fallback.
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
        <textarea
          rows="3"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Short product overview and delivery instructions..."
          className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none"
        />
      </div>

      {/* Sections Flags */}
      <div className="border-t border-slate-800 pt-4">
        <label className="block text-xs font-bold text-slate-300 mb-3">Featured Sections</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isTrending}
              onChange={(e) => setForm({ ...form, isTrending: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            New & Trending
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isFlashDeal}
              onChange={(e) => setForm({ ...form, isFlashDeal: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            Flash Deal
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isTopRated}
              onChange={(e) => setForm({ ...form, isTopRated: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            Top Rated
          </label>
        </div>
      </div>

      {/* Packages / Options List */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-300">
            Packages & Denominations
          </label>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        {form.packages.map((pack, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 600 UC)"
              value={pack.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 text-xs text-slate-100 rounded-lg px-3 py-2 border border-slate-800"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pack.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-32 bg-slate-900 text-xs text-slate-100 rounded-lg px-3 py-2 border border-slate-800"
            />
            <button
              type="button"
              onClick={() => removePackageRow(idx)}
              className="p-2 text-slate-500 hover:text-rose-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-950/40"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
};
