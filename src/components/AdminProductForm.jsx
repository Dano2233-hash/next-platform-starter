import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({
  product = null,
  isOpen,
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 15000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 50,
    rating: 5.0,
    soldCount: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard Edition', price: 15000 }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ id: 'pkg-1', name: 'Standard', price: product.price || 0 }],
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        category: 'games',
        platform: 'PC',
        type: 'Game',
        price: 15000,
        oldPrice: 0,
        description: '',
        image: '',
        stock: 50,
        rating: 5.0,
        soldCount: 100,
        tag: 'New',
        isFeatured: false,
        isTrending: false,
        isFlashDeal: false,
        isTopRated: false,
        packages: [{ id: 'pkg-1', name: 'Standard Edition', price: 15000 }],
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) || 0 : value,
    };
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: formData.price || 10000 },
      ],
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onSave({
      ...formData,
      slug: cleanSlug,
      price: Number(formData.price) || 0,
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-2xl bg-[#090d1a] border border-slate-800 rounded-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-white text-base">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Slug (URL friendly)</label>
              <input
                type="text"
                name="slug"
                placeholder="auto-generated from name"
                value={formData.slug}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
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
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              >
                <option value="games">Games</option>
                <option value="top-ups">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
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
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD) *</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="url"
              name="image"
              placeholder="e.g. https://cdn.akamai.steamstatic.com/..."
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Leave empty to automatically render the ProductVisual digital artwork fallback!
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-950 text-sm text-white px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Packages configuration */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-white">Product Packages / Tiers</label>
              <button
                type="button"
                onClick={addPackage}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Tier
              </button>
            </div>
            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={pkg.id || idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={pkg.name}
                    placeholder="Package name (e.g. 60 UC)"
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-slate-950 text-xs text-white px-3 py-1.5 rounded-lg border border-slate-800"
                  />
                  <input
                    type="number"
                    value={pkg.price}
                    placeholder="Price IQD"
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-32 bg-slate-950 text-xs text-white px-3 py-1.5 rounded-lg border border-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    disabled={formData.packages.length <= 1}
                    className="p-1.5 text-slate-500 hover:text-rose-400 disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section Toggles */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Trending</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFlashDeal"
                checked={formData.isFlashDeal}
                onChange={handleChange}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Flash Deal</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTopRated"
                checked={formData.isTopRated}
                onChange={handleChange}
                className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Top Rated</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-colors"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
