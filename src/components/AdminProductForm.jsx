import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save } from 'lucide-react';

export function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 50,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'p1', name: 'Standard Package', price: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ id: 'p1', name: 'Standard Package', price: initialData.price || '' }]
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '' }
      ]
    }));
  };

  const handlePackageChange = (index, field, val) => {
    const updated = [...formData.packages];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPackages = formData.packages.map((pkg) => ({
      ...pkg,
      price: parseFloat(pkg.price) || parseFloat(formData.price) || 0
    }));

    onSubmit({
      ...formData,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock) || 0,
      packages: formattedPackages
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 text-slate-100">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Product Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="games">Paid Games</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          >
            <option value="pc">PC</option>
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="mobile">Mobile</option>
            <option value="gift-card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Type Badge *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Base Price (IQD) *</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="15000"
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Old Price (IQD) (Optional for Sale)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="18000"
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Stock Quantity *</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          />
        </div>

        <div>
          <label className="block text-slate-400 mb-1 font-semibold">Custom Tag (e.g., 'Hot', '50% OFF')</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="Best Seller"
            className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-slate-400 mb-1 font-semibold text-xs">Image URL (Optional - Fallback visual rendered if empty)</label>
        <input
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://cdn.akamai.steamstatic.com/..."
          className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100 text-xs"
        />
      </div>

      <div>
        <label className="block text-slate-400 mb-1 font-semibold text-xs">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Detailed product specification..."
          className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none text-slate-100 text-xs"
        />
      </div>

      {/* Packages Section */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Product Packages / Options</h4>
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-2.5 py-1 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/30 font-semibold text-xs flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs text-slate-100"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-950 p-2 rounded-lg border border-slate-800 text-xs text-slate-100"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="p-2 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tags & Flags */}
      <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded text-cyan-500 focus:ring-0"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded text-cyan-500 focus:ring-0"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded text-cyan-500 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="pt-2 flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
