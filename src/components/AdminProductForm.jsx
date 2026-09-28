import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { X, Save, Plus, Trash } from 'lucide-react';

export const AdminProductForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    rating: 4.9,
    soldCount: 0,
    tag: 'New',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, name, slug: initialData ? prev.slug : slug }));
  };

  // Package Management
  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: prev.price }
      ]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.packages];
      updated[index] = {
        ...updated[index],
        [field]: field === 'price' ? Number(value) : value
      };
      return { ...prev, packages: updated };
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
    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice || 0),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount)
    });
  };

  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="font-extrabold text-lg text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Name & Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              required
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Category, Platform, Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Platform *</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Base Price (IQD) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Old Price (IQD)</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Badge Tag</label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Hot, Sale"
              className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Image URL & Description */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Image URL (Optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Section Flags */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block font-bold text-slate-300 mb-2">Display Sections</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFlashDeal"
                checked={formData.isFlashDeal}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTopRated"
                checked={formData.isTopRated}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300">Top Rated</span>
            </label>
          </div>
        </div>

        {/* Package Options */}
        <div className="pt-2 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-bold text-slate-300">Package Options (UC, VP, Coins)</label>
            <button
              type="button"
              onClick={handleAddPackage}
              className="flex items-center gap-1 text-cyan-400 font-bold hover:underline"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                placeholder="Package Name e.g. 660 UC"
                className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
              />
              <input
                type="number"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                placeholder="Price IQD"
                className="w-28 bg-slate-800 border border-slate-700 text-white rounded-lg p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemovePackage(idx)}
                className="p-2 text-slate-500 hover:text-red-400"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 rounded-xl text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 font-bold"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
