import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Mobile Top-Ups',
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
    packages: [{ id: 'p1', name: '', price: '', oldPrice: '' }],
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        stock: initialData.stock ?? 100,
        packages:
          initialData.packages && initialData.packages.length > 0
            ? initialData.packages
            : [{ id: 'p1', name: '', price: '', oldPrice: '' }],
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '', oldPrice: '' },
      ],
    }));
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.packages];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, packages: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product name is required.');
      return;
    }
    if (!formData.price) {
      setError('Price is required.');
      return;
    }

    // Format packages properly
    const cleanPackages = formData.packages
      .filter((pkg) => pkg.name.trim())
      .map((pkg) => ({
        id: pkg.id || `pkg-${Date.now()}`,
        name: pkg.name.trim(),
        price: Number(pkg.price) || Number(formData.price),
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null,
      }));

    const finalProduct = {
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: cleanPackages.length > 0 ? cleanPackages : [{ id: 'default', name: formData.name, price: Number(formData.price) }],
    };

    onSubmit(finalProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#080d1e] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-[#0b1024]">
          <h3 className="text-base font-bold text-slate-100">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. PUBG Mobile UC"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile Top-Ups">Mobile Top-Ups</option>
                <option value="Paid Games">Paid Games</option>
                <option value="Gift Cards">Gift Cards</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Platform *</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Product Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>

            {/* Starting Price */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Price (IQD) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1500"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="2000"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block font-bold text-slate-300 mb-1">Badge / Tag (Optional)</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Top Seller, Flash Deal"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
            <p className="text-[10px] text-slate-500 mt-1">If blank or broken, ProductVisual gradient fallback will be generated.</p>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="2"
              placeholder="Brief summary of the digital item..."
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Section Visibility Flags */}
          <div className="p-3 rounded-xl bg-[#05070f] border border-slate-800 space-y-2">
            <span className="font-bold text-cyan-400 block mb-1">Home Section Flags:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Trending</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Flash Deal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Packages Section */}
          <div className="p-3 rounded-xl bg-[#05070f] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">Package / Denominations Options</span>
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold flex items-center gap-1 hover:bg-cyan-500/30"
              >
                <Plus className="w-3 h-3" /> Add Package
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    placeholder="Package Name (e.g. 660 UC)"
                    className="w-full bg-[#05070f] border border-slate-800 rounded p-1.5 text-slate-100"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    placeholder="Price (IQD)"
                    className="w-full bg-[#05070f] border border-slate-800 rounded p-1.5 text-slate-100"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    value={pkg.oldPrice || ''}
                    onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                    placeholder="Old Price"
                    className="w-full bg-[#05070f] border border-slate-800 rounded p-1.5 text-slate-100"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(idx)}
                    className="text-slate-500 hover:text-red-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" /> Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
