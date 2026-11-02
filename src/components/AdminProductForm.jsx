import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({
  product = null,
  isOpen,
  onClose,
  onSave
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 0,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 50,
    rating: 4.9,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard', price: 0 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard', price: product.price || 0 }]
      });
    } else {
      setFormData({
        name: '',
        category: 'games',
        platform: 'PC',
        type: 'Game',
        price: 15000,
        oldPrice: 0,
        description: '',
        image: '',
        stock: 50,
        rating: 4.9,
        soldCount: 0,
        tag: 'New',
        isFeatured: false,
        isTrending: false,
        isFlashDeal: false,
        isTopRated: false,
        packages: [{ name: 'Standard', price: 15000 }]
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, val) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(val) : val
    };
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const addPackageTier = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: 'New Tier', price: 10000 }]
    }));
  };

  const removePackageTier = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Product name is required.');
      return;
    }
    const basePrice = formData.packages?.[0]?.price || Number(formData.price) || 0;
    onSave({
      ...formData,
      price: basePrice,
      stock: Number(formData.stock),
      soldCount: Number(formData.soldCount)
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-8">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-extrabold text-white text-base">
            {product ? 'Edit Gaming Product' : 'Add New Gaming Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. PUBG Mobile UC"
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag || ''}
                onChange={handleChange}
                placeholder="e.g. Best Seller, Hot Deal"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
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
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              placeholder="e.g. Official Steam CDN URL (leave blank for digital gradient fallback)"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              If left blank or unreachable, the store automatically renders the clean ProductVisual fallback.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief summary of game, top-up package, or activation method..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sold Count</label>
              <input
                type="number"
                name="soldCount"
                value={formData.soldCount}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice || 0}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-white"
              />
            </div>
          </div>

          {/* Packages Builder */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Packages / Denominations (IQD)
              </label>
              <button
                type="button"
                onClick={addPackageTier}
                className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800 border border-slate-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tier</span>
              </button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    placeholder="e.g. 660 UC or 1 Month"
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                  />
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    placeholder="Price IQD"
                    className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackageTier(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section Visibility Flags */}
          <div className="pt-3 border-t border-slate-800">
            <label className="text-xs font-bold text-slate-300 mb-2 block">
              Store Feature Flags
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded border-slate-800 text-cyan-500"
                />
                <span>Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="rounded border-slate-800 text-cyan-500"
                />
                <span>Trending</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleChange}
                  className="rounded border-slate-800 text-cyan-500"
                />
                <span>Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleChange}
                  className="rounded border-slate-800 text-cyan-500"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold cursor-pointer"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
