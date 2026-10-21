import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export default function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    rating: 4.8,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: '', price: 0 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard', price: product.price }]
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
    const newPackages = [...formData.packages];
    newPackages[index][field] = field === 'price' ? Number(value) : value;
    setFormData((prev) => ({ ...prev, packages: newPackages }));
  };

  const addPackageField = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: 0 }]
    }));
  };

  const removePackageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalProduct = {
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };
    onSave(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0f24] border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-extrabold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Product Title *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">URL Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="pubg-mobile-uc"
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="games">Paid PC/Console Games</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Platform *</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Base Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Base Price (IQD) *</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Old Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Old Price (IQD) [Optional]</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Stock Quantity *</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Image URL (Optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Description */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500"
          ></textarea>
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Packages / Options
          </label>
          <button
            type="button"
            onClick={addPackageField}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 60 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-28 px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageField(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-slate-300">Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-slate-300">Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-slate-300">Flash Deal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
          />
          <span className="text-slate-300">Top Rated</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
