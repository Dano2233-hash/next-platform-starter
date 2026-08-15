import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Check } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: 0,
    stock: 99,
    tag: '',
    image: '',
    description: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: 0, oldPrice: 0 });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        oldPrice: initialData.oldPrice || 0,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    if (!packageInput.name.trim()) return;
    setFormData({
      ...formData,
      packages: [...formData.packages, { ...packageInput, price: Number(packageInput.price) }]
    });
    setPackageInput({ name: '', price: 0, oldPrice: 0 });
  };

  const handleRemovePackage = (index) => {
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
      oldPrice: Number(formData.oldPrice) || null,
      stock: Number(formData.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-base font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
          <input
            type="number"
            required
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="pc">PC Games</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Tag (e.g. Best Seller)</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
        <input
          type="url"
          placeholder="https://..."
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
        <textarea
          rows="3"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
        ></textarea>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Trending
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Flash Deal
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded bg-slate-900 border-slate-700 text-cyan-500"
          />
          Top Rated
        </label>
      </div>

      {/* Packages Management */}
      <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
        <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Product Packages</h4>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Package Name (e.g. 660 UC)"
            value={packageInput.name}
            onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
            className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2.5 py-1.5 text-white flex-1 min-w-[120px]"
          />
          <input
            type="number"
            placeholder="Price (IQD)"
            value={packageInput.price}
            onChange={(e) => setPackageInput({ ...packageInput, price: e.target.value })}
            className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-2.5 py-1.5 text-white w-28"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>

        {formData.packages.length > 0 && (
          <div className="space-y-1.5 pt-2">
            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center justify-between bg-slate-900 px-3 py-1.5 rounded-lg text-xs">
                <span className="font-semibold text-slate-200">{pkg.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-cyan-400">{pkg.price} IQD</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md"
        >
          <Check className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
}
