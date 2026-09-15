import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';

const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
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
    packages: [{ name: 'Standard', price: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'games',
        platform: product.platform || 'PC',
        type: product.type || 'Game',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        stock: product.stock !== undefined ? product.stock : '100',
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard', price: product.price || '' }]
      });
    }
  }, [product]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const addPackageField = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '' }]
    }));
  };

  const removePackageField = (index) => {
    if (formData.packages.length <= 1) return;
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, packages: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Product title and price are required');
      return;
    }

    const processedPackages = formData.packages
      .filter((p) => p.name.trim() && p.price !== '')
      .map((p) => ({
        name: p.name.trim(),
        price: parseFloat(p.price) || 0
      }));

    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock) || 0,
      packages: processedPackages.length > 0 ? processedPackages : [{ name: 'Standard', price: parseFloat(formData.price) || 0 }]
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">

      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-black text-slate-100">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button onClick={onCancel} className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-slate-950">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">

        {/* Title & Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="font-bold text-slate-300">Product Title *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. PUBG Mobile UC"
              required
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Tag / Badge</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => handleChange('tag', e.target.value)}
              placeholder="e.g. Best Seller"
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Category, Platform, Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-300">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => handleChange('platform', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Type</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            >
              {TYPES.filter((t) => t.id !== 'all').map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price, Old Price, Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="font-bold text-slate-300">Base Price (IQD) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="e.g. 15000"
              required
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Old Price (IQD) [Optional]</label>
            <input
              type="number"
              value={formData.oldPrice}
              onChange={(e) => handleChange('oldPrice', e.target.value)}
              placeholder="e.g. 20000"
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-300">Stock Count</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              placeholder="e.g. 100"
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Image URL & Description */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Image URL (Optional - Fallback applies automatically if empty)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => handleChange('image', e.target.value)}
            placeholder="https://..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-bold text-slate-300">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Product details..."
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Packages Configuration */}
        <div className="space-y-2 border-t border-slate-800 pt-3">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-300">Product Packages Options</label>
            <button
              type="button"
              onClick={addPackageField}
              className="text-cyan-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          <div className="space-y-2">
            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  placeholder="Package Name (e.g. 600 UC)"
                  className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 p-2 rounded-xl"
                />
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  placeholder="Price (IQD)"
                  className="w-32 bg-slate-950 border border-slate-700 text-slate-100 p-2 rounded-xl"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackageField(idx)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visibility Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800 pt-3">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => handleChange('isFeatured', e.target.checked)}
              className="rounded accent-cyan-500"
            />
            Featured (Top Sales)
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => handleChange('isTrending', e.target.checked)}
              className="rounded accent-cyan-500"
            />
            Trending
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => handleChange('isFlashDeal', e.target.checked)}
              className="rounded accent-cyan-500"
            />
            Flash Deal
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-semibold">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => handleChange('isTopRated', e.target.checked)}
              className="rounded accent-cyan-500"
            />
            Top Rated
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold text-white flex items-center gap-2 shadow-md shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>

      </form>

    </div>
  );
};

export default AdminProductForm;
