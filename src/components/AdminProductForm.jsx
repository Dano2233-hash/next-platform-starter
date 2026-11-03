import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'pc',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Edition', price: '' }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || 'pc',
        platform: product.platform || 'PC',
        type: product.type || 'Game',
        price: product.price ?? '',
        oldPrice: product.oldPrice ?? '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock ?? 100,
        rating: product.rating ?? 5.0,
        soldCount: product.soldCount ?? 0,
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard Edition', price: product.price || '' }],
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }],
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPackages = formData.packages
      .filter((p) => p.name.trim() !== '')
      .map((p) => ({
        name: p.name.trim(),
        price: Number(p.price) || Number(formData.price) || 0,
      }));

    const cleanData = {
      ...formData,
      price: Number(formData.price) || (cleanPackages[0] ? cleanPackages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: cleanPackages.length > 0 ? cleanPackages : [{ name: 'Standard Edition', price: Number(formData.price) || 0 }],
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    };

    onSave(cleanData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0b1120] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-lg text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug / URL</label>
              <input
                type="text"
                value={formData.slug}
                placeholder="auto-generated-if-blank"
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Gaming</option>
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
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
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
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old / Sale Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                placeholder="e.g. Best Seller, Sale, Hot"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                placeholder="Official CDN or leave empty for digital gradient visual"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Trending</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Flash Deal</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500"
              />
              <span>Top Rated</span>
            </label>
          </div>

          {/* Package Configuration */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Packages / Denominations
              </h4>
              <button
                type="button"
                onClick={addPackage}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <Plus size={13} />
                <span>Add Package</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Package Name (e.g. 660 UC, $10 PSN)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Price IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    disabled={formData.packages.length <= 1}
                    className="p-1.5 text-slate-500 hover:text-rose-400 disabled:opacity-30"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
