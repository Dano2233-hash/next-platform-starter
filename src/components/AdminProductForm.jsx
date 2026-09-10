import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ initialProduct = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    rating: 4.9,
    soldCount: 0,
    tag: 'New',
    description: '',
    image: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: '' }]
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        price: initialProduct.price || '',
        oldPrice: initialProduct.oldPrice || '',
        stock: initialProduct.stock !== undefined ? initialProduct.stock : 100,
        packages: initialProduct.packages?.length
          ? initialProduct.packages
          : [{ name: 'Standard Package', price: initialProduct.price || '' }]
      });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index][field] = value;
    setFormData((prev) => ({ ...prev, packages: updatedPkgs }));
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '' }]
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
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.price) {
      setError('Base price is required');
      return;
    }

    const formattedPackages = formData.packages.map((pkg) => ({
      name: pkg.name || 'Standard Package',
      price: Number(pkg.price) || Number(formData.price) || 0
    }));

    const finalSlug =
      formData.slug ||
      formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    onSubmit({
      ...formData,
      slug: finalSlug,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formattedPackages
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="mobile-topups">Mobile Top-Ups</option>
            <option value="paid-games">Paid Games</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Platform
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Base Price (IQD) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="1500"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Old Price (IQD - Optional)
          </label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="2000"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Image URL (Optional)
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed product information..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Packages Builder */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">
            Package Variations
          </label>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
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
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-32 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            {formData.packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackage(idx)}
                className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Feature Flags */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Submit Action */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/50"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
