import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
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
    packages: [{ id: 'pkg-1', name: 'Standard Edition', price: '', oldPrice: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ id: 'pkg-1', name: 'Standard Edition', price: product.price, oldPrice: product.oldPrice }]
      });
    }
  }, [product]);

  const handleChange = (field, val) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: val };
      if (field === 'name' && !product) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      return updated;
    });
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedPackages = [...prev.packages];
      updatedPackages[index] = { ...updatedPackages[index], [field]: value };
      return { ...prev, packages: updatedPackages };
    });
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: `Package ${prev.packages.length + 1}`, price: prev.price || '', oldPrice: '' }
      ]
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPackages = formData.packages.map((pkg, idx) => ({
      ...pkg,
      id: pkg.id || `pkg-${idx}`,
      price: Number(pkg.price) || Number(formData.price) || 0,
      oldPrice: Number(pkg.oldPrice) || 0
    }));

    const finalProduct = {
      ...formData,
      price: Number(formData.price) || (formattedPackages[0] && formattedPackages[0].price) || 0,
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock) || 0,
      soldCount: Number(formData.soldCount) || 0,
      rating: Number(formData.rating) || 5.0,
      packages: formattedPackages
    };

    onSave(finalProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#090d1e] rounded-2xl border border-white/10 shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col">

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white font-heading">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. GTA V: Premium Edition"
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug (URL)</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => handleChange('slug', e.target.value)}
                placeholder="gta-v-premium"
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              >
                <option value="games">Games</option>
                <option value="mobile-topup">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => handleChange('platform', e.target.value)}
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Multiplatform">Multiplatform</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type Badge</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                placeholder="25000"
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => handleChange('oldPrice', e.target.value)}
                placeholder="35000"
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://cdn.akamai.steamstatic.com/steam/apps/... (leave blank for digital fallback)"
              className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Product summary or delivery details..."
              className="w-full bg-slate-900 text-sm text-white rounded-xl px-3 py-2 border border-white/10 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          {/* Feature Badges toggles */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
            <span className="text-xs font-bold text-cyan-400 block">Catalog Visibility Flags:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleChange('isFeatured', e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => handleChange('isTrending', e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Trending</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => handleChange('isFlashDeal', e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => handleChange('isTopRated', e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Top Rated</span>
              </label>
            </div>
          </div>

          {/* Package Manager */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Product Packages / Denominations</span>
              <button
                type="button"
                onClick={addPackage}
                className="flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 660 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-slate-900 text-xs text-white rounded-lg px-2.5 py-1.5 border border-white/10"
                />
                <input
                  type="number"
                  placeholder="Price IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-24 bg-slate-900 text-xs text-white rounded-lg px-2 py-1.5 border border-white/10"
                />
                <input
                  type="number"
                  placeholder="Old Price"
                  value={pkg.oldPrice || ''}
                  onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                  className="w-24 bg-slate-900 text-xs text-white rounded-lg px-2 py-1.5 border border-white/10"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25"
            >
              {product ? 'Save Changes' : 'Create Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
