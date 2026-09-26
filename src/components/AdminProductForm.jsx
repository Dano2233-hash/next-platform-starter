import React, { useState, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { CATEGORIES, PLATFORMS, PRODUCT_TYPES } from '../data/categories';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        stock: product.stock !== undefined ? product.stock : 100,
        rating: product.rating || 5.0,
        soldCount: product.soldCount || 0,
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: Boolean(product.isFeatured),
        isTrending: Boolean(product.isTrending),
        isFlashDeal: Boolean(product.isFlashDeal),
        isTopRated: Boolean(product.isTopRated),
        packages: product.packages ? [...product.packages] : [],
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
      packages: [
        ...formData.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '', oldPrice: '' },
      ],
    });
  };

  const removePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const formattedPackages = formData.packages.map((pkg) => ({
      ...pkg,
      price: Number(pkg.price) || 0,
      oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null,
    }));

    onSave({
      ...formData,
      price: Number(formData.price) || 0,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formattedPackages,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090f22] border border-slate-800 rounded-2xl p-6 space-y-6 text-xs text-slate-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-extrabold text-base text-slate-100">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Product Title</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            required
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Platform Badge</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          >
            {PLATFORMS.filter((p) => p !== 'All').map((plat) => (
              <option key={plat} value={plat}>
                {plat}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Product Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          >
            {PRODUCT_TYPES.filter((t) => t !== 'All').map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Base Price */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Base Price (IQD)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="1500"
            required
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          />
        </div>

        {/* Old Price */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Old Price (IQD - Optional)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="2000"
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Stock Count</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1">
          <label className="font-bold text-slate-300">Image URL (Optional)</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1">
        <label className="font-bold text-slate-300">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product details and redemption instructions..."
          className="w-full bg-[#0c142c] border border-slate-700 rounded-xl p-2.5 focus:border-cyan-400 text-slate-100 resize-none"
        />
      </div>

      {/* Toggles for Special Sections */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#060a18] p-4 rounded-xl border border-slate-800">
        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="accent-cyan-400"
          />
          <span>Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="accent-cyan-400"
          />
          <span>Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="accent-cyan-400"
          />
          <span>Flash Deal</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer font-semibold">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="accent-cyan-400"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-slate-200 text-sm">Product Packages / Options</h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-cyan-400 font-bold"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex gap-2 items-center bg-[#060a18] p-2.5 rounded-xl border border-slate-800">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-2 bg-[#0c142c] border border-slate-700 rounded-lg p-2 text-slate-100"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="flex-1 bg-[#0c142c] border border-slate-700 rounded-lg p-2 text-slate-100"
            />
            <input
              type="number"
              placeholder="Old Price"
              value={pkg.oldPrice}
              onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
              className="flex-1 bg-[#0c142c] border border-slate-700 rounded-lg p-2 text-slate-100"
            />
            <button
              type="button"
              onClick={() => removePackage(idx)}
              className="p-2 text-slate-500 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-950/50"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
