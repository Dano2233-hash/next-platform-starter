import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 15000,
    oldPrice: 0,
    description: '',
    image: '',
    packages: [{ id: 'pkg-1', name: 'Standard Edition', price: 15000, oldPrice: 0 }],
    stock: 50,
    rating: 4.8,
    soldCount: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages?.length > 0 ? product.packages : [{ id: 'pkg-1', name: 'Default', price: product.price, oldPrice: product.oldPrice || 0 }]
      });
    } else {
      const generatedId = `prod-${Date.now().toString(36)}`;
      setFormData((prev) => ({
        ...prev,
        id: generatedId,
        slug: generatedId
      }));
    }
  }, [product]);

  const handlePackageChange = (idx, field, value) => {
    const updated = [...formData.packages];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: formData.price, oldPrice: 0 }
      ]
    });
  };

  const removePackage = (idx) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formData.packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price),
        oldPrice: Number(pkg.oldPrice) || 0
      }))
    };
    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b101e] border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-[#080d18]">
          <h3 className="font-bold text-white text-base">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onCancel} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({
                    ...formData,
                    name: val,
                    slug: product ? formData.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                  });
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">URL Slug</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                <option value="games">PC & Console Games</option>
                <option value="mobile-topups">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Multi-Platform">Multi-Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Base Price (IQD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Old Price (IQD, Optional)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Stock Count</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Image URL (Optional)</label>
            <input
              type="text"
              placeholder="https://cdn.akamai.steamstatic.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
            />
          </div>

          {/* Packages configuration */}
          <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-200">Packages / Editions</span>
              <button
                type="button"
                onClick={addPackage}
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
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
                    placeholder="Package name (e.g. 660 UC)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Price IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-28 bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackage(idx)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500"
              />
              <span>Trending</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500"
              />
              <span>Flash Deal</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-cyan-500"
              />
              <span>Top Rated</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
