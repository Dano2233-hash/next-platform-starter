import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export function AdminProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 15000,
    oldPrice: 0,
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
    packages: [{ name: 'Standard Edition', price: 15000 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages?.length ? product.packages : [{ name: 'Standard Edition', price: product.price }]
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: 0 }]
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
    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#090d19] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Product Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Steam Wallet $10 USD"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="games">Games</option>
                <option value="mobile">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="pc">PC Gaming</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Multi-Platform">Multi-Platform</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Product Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            {/* Price (Base / From) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Base Price (IQD) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Old Price (IQD, Optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                min="0"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Image URL (Steam CDN or leave blank for digital visual fallback)
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Badge / Tag (e.g. Best Seller, 50% OFF)
              </label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                Rating (1.0 to 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 text-slate-100 text-sm border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Section Visibility Flags */}
          <div className="pt-2 border-t border-slate-800">
            <span className="block text-xs font-semibold text-slate-300 uppercase mb-2">
              Feature in Sections
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span>Trending</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span>Flash Deal</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0 bg-slate-950 border-slate-700"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Dynamic Packages Editor */}
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 uppercase">
                Product Packages ({formData.packages.length})
              </span>
              <button
                type="button"
                onClick={addPackage}
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    required
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    placeholder="e.g. 660 UC"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 text-xs text-white border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    required
                    min="0"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    placeholder="Price IQD"
                    className="w-32 px-3 py-1.5 rounded-lg bg-slate-950 text-xs text-white border border-slate-800 focus:border-cyan-500 focus:outline-none"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackage(idx)}
                      className="p-1.5 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-cyan-500/20"
            >
              Save Product
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AdminProductForm;
