import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save } from 'lucide-react';

export default function AdminProductForm({ initialProduct, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    stock: '100',
    tag: '',
    image: '',
    description: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [],
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        price: initialProduct.price || '',
        oldPrice: initialProduct.oldPrice || '',
        stock: initialProduct.stock !== undefined ? initialProduct.stock : '100',
        tag: initialProduct.tag || '',
        packages: initialProduct.packages || [],
      });
    }
  }, [initialProduct]);

  const handlePackageAdd = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '', oldPrice: '' },
      ],
    });
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const handlePackageRemove = (index) => {
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-5 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-heading font-bold text-base text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-slate-300 font-semibold mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Image URL (Steam CDN / HTTPS)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="games">Paid Games</option>
            <option value="topups">Mobile Top-Ups</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Price (IQD)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. 1500"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="e.g. 2000"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            placeholder="e.g. 100"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1">Tag / Promotion Badge</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="e.g. Best Seller, -20% OFF"
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
        <textarea
          rows="2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-2.5 text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
        />
      </div>

      {/* Flag Checkboxes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          Featured
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          Trending
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          Flash Deal
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          Top Rated
        </label>
      </div>

      {/* Package Variants Editor */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-slate-200 text-xs">Packages / Options</h4>
          <button
            type="button"
            onClick={handlePackageAdd}
            className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center gap-1 hover:bg-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Package
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={pkg.id || idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 items-center">
            <input
              type="text"
              placeholder="Package Name (e.g. 60 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-slate-200"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-slate-200"
            />
            <input
              type="number"
              placeholder="Old Price (Optional)"
              value={pkg.oldPrice || ''}
              onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-slate-200"
            />
            <button
              type="button"
              onClick={() => handlePackageRemove(idx)}
              className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 border border-red-900/40 flex items-center justify-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" />
          Save Product
        </button>
      </div>
    </form>
  );
}
