import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image as ImageIcon } from 'lucide-react';
import { categories, platforms } from '../data/categories';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
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
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
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
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg_${Date.now()}`, name: '', price: '', oldPrice: '' }
      ]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedPkgs = [...prev.packages];
      updatedPkgs[index] = { ...updatedPkgs[index], [field]: value };
      return { ...prev, packages: updatedPkgs };
    });
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: Number(formData.price) || 0,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      packages: formData.packages.map((pkg) => ({
        ...pkg,
        price: Number(pkg.price) || 0,
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null
      }))
    };
    onSave(formattedData);
  };

  return (
    <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-extrabold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name */}
        <div>
          <label className="block font-bold text-slate-300 uppercase mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 text-sm focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Category, Platform, Type */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {categories.filter(c => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Platform</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {platforms.filter(p => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Type Badge</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Game">Game</option>
              <option value="Top-Up">Top-Up</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>
        </div>

        {/* Price, Old Price, Stock, Tag */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Price (IQD)</label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="15000"
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Old Price (IQD)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="18000"
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Stock Count</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="100"
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 uppercase mb-1">Custom Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Best Seller"
              className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Image URL & Description */}
        <div>
          <label className="block font-bold text-slate-300 uppercase mb-1">Image URL (Optional)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 uppercase mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Product details, activation instructions, delivery time..."
            className="w-full bg-[#0d1427] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        {/* Store Section Flags */}
        <div className="bg-[#0b101c] p-3 rounded-xl border border-slate-800 space-y-2">
          <span className="font-bold text-slate-300 uppercase block text-[11px]">Display Sections</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                name="isFlashDeal"
                checked={formData.isFlashDeal}
                onChange={handleChange}
                className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
              />
              <span>Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
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
        </div>

        {/* Packages Sub-List */}
        <div className="bg-[#0b101c] p-3 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-300 uppercase block text-[11px]">Packages / Denominations</span>
            <button
              type="button"
              onClick={handleAddPackage}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Package</span>
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-[#080d1a] p-2 rounded-lg border border-slate-800">
              <input
                type="text"
                placeholder="Package name e.g. 660 UC"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="bg-[#0d1427] border border-slate-800 rounded px-2 py-1 text-slate-100"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="bg-[#0d1427] border border-slate-800 rounded px-2 py-1 text-slate-100"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Old Price (Optional)"
                  value={pkg.oldPrice || ''}
                  onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                  className="bg-[#0d1427] border border-slate-800 rounded px-2 py-1 text-slate-100 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="p-1 text-red-400 hover:bg-red-950/40 rounded shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex items-center gap-1.5 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};
