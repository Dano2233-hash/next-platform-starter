import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { categories, platforms } from '../data/categories';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'mobile',
    type: 'Top-Up',
    price: 1000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 'in_stock',
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: 1000 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard Package', price: product.price || 1000 }]
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
    const newPkgs = [...formData.packages];
    newPkgs[index] = {
      ...newPkgs[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setFormData((prev) => ({ ...prev, packages: newPkgs }));
  };

  const addPackageRow = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { name: 'New Package', price: 1000 }]
    }));
  };

  const removePackageRow = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalSlug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-0]/g, '-');
    const lowestPrice = formData.packages.length > 0
      ? Math.min(...formData.packages.map((p) => p.price))
      : Number(formData.price);

    onSave({
      ...formData,
      slug: finalSlug,
      price: lowestPrice,
      oldPrice: Number(formData.oldPrice) || 0,
      soldCount: Number(formData.soldCount) || 0,
      rating: Number(formData.rating) || 5.0
    });
  };

  return (
    <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 text-slate-100 max-w-3xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-lg font-extrabold text-cyan-400">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button onClick={onCancel} className="p-2 text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Product Title *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
            >
              {categories.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Platform *</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
            >
              {platforms.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Stock Status *</label>
            <select
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
            >
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://... (Steam CDN or standard image)"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300">Description</label>
          <textarea
            name="description"
            rows="2"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[#0d1428] border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 mt-1 resize-none"
          />
        </div>

        {/* Dynamic Packages */}
        <div className="border border-slate-800 p-4 rounded-xl bg-[#060a16] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
              Product Packages / Pricing Options
            </span>
            <button
              type="button"
              onClick={addPackageRow}
              className="px-2.5 py-1 text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-lg flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package Option
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 60 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-[#0d1428] border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-[#0d1428] border border-slate-800 rounded-lg p-2 text-xs text-slate-100"
              />
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                className="p-2 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Flags & Promotion Toggles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded accent-cyan-500" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="rounded accent-cyan-500" />
            Trending
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} className="rounded accent-cyan-500" />
            Flash Deal
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 cursor-pointer">
            <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="rounded accent-cyan-500" />
            Top Rated
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold text-slate-400 bg-slate-800 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-xs font-extrabold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg shadow-cyan-950"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
