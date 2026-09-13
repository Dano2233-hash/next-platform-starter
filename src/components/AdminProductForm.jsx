import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminProductForm = ({ initialProduct = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: initialProduct?.name || '',
    category: initialProduct?.category || 'mobile',
    platform: initialProduct?.platform || 'Mobile',
    type: initialProduct?.type || 'Top-Up',
    price: initialProduct?.price || '',
    oldPrice: initialProduct?.oldPrice || '',
    stock: initialProduct?.stock !== undefined ? initialProduct.stock : 100,
    tag: initialProduct?.tag || '',
    description: initialProduct?.description || '',
    image: initialProduct?.image || '',
    isFeatured: initialProduct?.isFeatured || false,
    isTrending: initialProduct?.isTrending || false,
    isFlashDeal: initialProduct?.isFlashDeal || false,
    isTopRated: initialProduct?.isTopRated || false
  });

  const [packages, setPackages] = useState(
    initialProduct?.packages && initialProduct.packages.length > 0
      ? initialProduct.packages
      : [{ name: 'Standard', price: initialProduct?.price || '' }]
  );

  const [errors, setErrors] = useState({});

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);

    if (index === 0 && field === 'price') {
      setFormData((prev) => ({ ...prev, price: value }));
    }
  };

  const addPackageRow = () => {
    setPackages([...packages, { name: '', price: '' }]);
  };

  const removePackageRow = (index) => {
    if (packages.length <= 1) return;
    setPackages(packages.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product title is required';
    if (!formData.price || isNaN(formData.price)) errs.price = 'Valid base price is required';
    if (!formData.category) errs.category = 'Category is required';
    if (!formData.platform) errs.platform = 'Platform is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedPackages = packages.map((pkg) => ({
      name: pkg.name.trim() || 'Standard',
      price: Number(pkg.price) || Number(formData.price)
    }));

    onSubmit({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: formattedPackages
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <h3 className="font-extrabold text-white text-base">
            {initialProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Product Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Category, Platform, Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="paid-games">Paid Games</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Item Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Price, Old Price, Stock, Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (IQD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="15000"
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="18000"
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Hot / Best Value"
                className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-slate-900 text-sm text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Leave blank to automatically display styled ProductVisual fallback.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter product details..."
              className="w-full bg-slate-900 text-xs text-slate-100 rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Packages List */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-white uppercase tracking-wider">
                Product Packages & Tiers
              </label>
              <button
                type="button"
                onClick={addPackageRow}
                className="text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Package Option
              </button>
            </div>

            {packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 60 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-slate-900 text-xs text-slate-100 rounded-lg p-2 border border-slate-800"
                />
                <input
                  type="number"
                  placeholder="Price (IQD)"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 bg-slate-900 text-xs text-slate-100 rounded-lg p-2 border border-slate-800"
                />
                {packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackageRow(idx)}
                    className="p-2 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Homepage Toggles */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
              Featured Home Sections
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span className="text-slate-300">Top Sales</span>
              </label>

              <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span className="text-slate-300">Flash Deals</span>
              </label>

              <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span className="text-slate-300">New & Trending</span>
              </label>

              <label className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                  className="rounded text-cyan-500 bg-slate-950 border-slate-700"
                />
                <span className="text-slate-300">Top Rated</span>
              </label>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20"
            >
              {initialProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
