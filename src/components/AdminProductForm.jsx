import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Image, Tag, Layers, DollarSign } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
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
    packages: [{ name: '', price: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ name: 'Standard', price: initialData.price || '' }]
      });
    }
  }, [initialData]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }]
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length === 1) return;
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auto sync base price if not set manually
    const basePrice = formData.price ? parseFloat(formData.price) : (formData.packages[0]?.price ? parseFloat(formData.packages[0].price) : 0);

    const formattedPackages = formData.packages
      .filter(p => p.name.trim() !== '')
      .map(p => ({
        name: p.name,
        price: parseFloat(p.price) || basePrice
      }));

    onSubmit({
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock, 10) || 0,
      packages: formattedPackages.length > 0 ? formattedPackages : [{ name: 'Standard', price: basePrice }]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-extrabold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. PUBG Mobile UC"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="games">Paid Games</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform *</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          >
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Type *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Base Starting Price */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD) *</label>
          <input
            type="number"
            required
            placeholder="15000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Old Price (Sale) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price / Original (IQD)</label>
          <input
            type="number"
            placeholder="18000"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Image URL (Optional - Fallback will render if blank/invalid)</label>
          <input
            type="url"
            placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Stock & Tag */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Badge Tag (e.g. "Popular", "Hot Deal")</label>
          <input
            type="text"
            placeholder="Popular"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            rows={3}
            placeholder="Describe product features, delivery instructions, and terms..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Product Packages Section */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">Packages / Quantities Options</label>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center space-x-1 text-xs text-cyan-400 font-semibold hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package Option</span>
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 60 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-[#0d1326] border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-white outline-none"
            />
            <input
              type="number"
              placeholder="Price IQD"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-32 bg-[#0d1326] border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-white outline-none"
            />
            {formData.packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                className="p-1.5 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Featured Checkboxes */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Featured Section</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Trending Section</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deals</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Form Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 hover:opacity-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
