import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image, Check } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const AdminProductForm = ({ product = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: '100',
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '', oldPrice: '' });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price ? String(product.price) : '',
        oldPrice: product.oldPrice ? String(product.oldPrice) : '',
        stock: product.stock !== undefined ? String(product.stock) : '100',
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: Boolean(product.isFeatured),
        isTrending: Boolean(product.isTrending),
        isFlashDeal: Boolean(product.isFlashDeal),
        isTopRated: Boolean(product.isTopRated),
        packages: product.packages ? [...product.packages] : []
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

  const handleAddPackage = () => {
    if (!packageInput.name.trim() || !packageInput.price) return;
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        {
          name: packageInput.name.trim(),
          price: parseFloat(packageInput.price) || 0,
          oldPrice: packageInput.oldPrice ? parseFloat(packageInput.oldPrice) : null
        }
      ]
    }));
    setPackageInput({ name: '', price: '', oldPrice: '' });
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    onSave({
      ...(product ? { id: product.id } : {}),
      ...formData,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock, 10) || 0
    });
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-base font-extrabold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 block">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g. PUBG Mobile UC, Steam Card $10"
            className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category & Platform & Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Base Price (IQD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="e.g. 1500"
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Old Price (IQD)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="e.g. 1800 (Optional)"
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Image & Custom Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Badge Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Best Seller, -20% OFF"
              className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300 block">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product details and delivery instructions..."
            className="w-full bg-[#060911] text-slate-100 text-xs font-medium p-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Packages Builder */}
        <div className="bg-[#070b13] border border-slate-800 rounded-xl p-4 space-y-3">
          <label className="text-xs font-bold text-cyan-400 block">
            Product Packages / Denominations
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 60 UC)"
              value={packageInput.name}
              onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
              className="bg-[#060911] text-slate-100 text-xs p-2.5 rounded-lg border border-slate-800"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={packageInput.price}
              onChange={(e) => setPackageInput({ ...packageInput, price: e.target.value })}
              className="bg-[#060911] text-slate-100 text-xs p-2.5 rounded-lg border border-slate-800"
            />
            <button
              type="button"
              onClick={handleAddPackage}
              className="py-2.5 px-3 bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold rounded-lg hover:bg-cyan-900 transition flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          {formData.packages.length > 0 && (
            <div className="space-y-1.5 pt-2">
              {formData.packages.map((pkg, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                >
                  <span className="font-bold text-slate-200">{pkg.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-extrabold">{pkg.price} IQD</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feature Checkboxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Featured</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Trending</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              name="isFlashDeal"
              checked={formData.isFlashDeal}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Flash Deal</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-300">
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated}
              onChange={handleChange}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Top Rated</span>
          </label>
        </div>

        {/* Save & Cancel */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};
