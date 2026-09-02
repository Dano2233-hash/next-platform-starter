import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Plus, Trash2, Save, X } from 'lucide-react';

export default function AdminProductForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile Top-Ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: 'NEW',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: '' }],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Mobile Top-Ups',
        platform: initialData.platform || 'Mobile',
        type: initialData.type || 'Top-Up',
        price: initialData.price !== undefined ? initialData.price : '',
        oldPrice: initialData.oldPrice !== undefined && initialData.oldPrice !== null ? initialData.oldPrice : '',
        description: initialData.description || '',
        image: initialData.image || '',
        stock: initialData.stock !== undefined ? initialData.stock : 100,
        tag: initialData.tag || 'NEW',
        isFeatured: Boolean(initialData.isFeatured),
        isTrending: Boolean(initialData.isTrending),
        isFlashDeal: Boolean(initialData.isFlashDeal),
        isTopRated: Boolean(initialData.isTopRated),
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: initialData.price || '' }],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setFormData((prev) => ({ ...prev, packages: updatedPackages }));
  };

  const addPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '' },
      ],
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mainPrice = Number(formData.price) || (formData.packages[0]?.price ? Number(formData.packages[0].price) : 0);
    const cleanedData = {
      ...formData,
      price: mainPrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: formData.packages.map((pkg, idx) => ({
        id: pkg.id || `pkg-${idx}`,
        name: pkg.name || `Package ${idx + 1}`,
        price: Number(pkg.price) || mainPrice,
      })),
    };
    onSubmit(cleanedData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Product Title *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Platform *
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Product Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Base / Starting Price (IQD) *
          </label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="1500"
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Old Price (IQD) (Optional)
          </label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="2000"
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Badge Tag (e.g. HOT, BESTSELLER)
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="BESTSELLER"
            className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
          Image URL (Steam CDN or trusted direct link)
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://cdn.akamai.steamstatic.com/..."
          className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
        />
        <p className="text-[11px] text-slate-500 mt-1">
          If left empty or URL fails to load, ProductVisual graphic will automatically be used.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the game, top-up, or gift card..."
          className="w-full bg-[#070b13] border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      <div className="border border-slate-800/80 rounded-xl p-4 bg-[#080d17]">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Package Options
          </h4>
          <button
            type="button"
            onClick={addPackage}
            className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Package
          </button>
        </div>

        <div className="space-y-3">
          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Package Name (e.g. 60 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-[#070b13] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-[#070b13] border border-slate-800 rounded-lg p-2 text-xs text-slate-100 focus:border-cyan-500 focus:outline-none"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-2 text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#080d17] border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span className="text-xs font-semibold text-slate-300">Featured</span>
        </label>
        <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#080d17] border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span className="text-xs font-semibold text-slate-300">Trending</span>
        </label>
        <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#080d17] border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span className="text-xs font-semibold text-slate-300">Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 p-2.5 rounded-lg bg-[#080d17] border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span className="text-xs font-semibold text-slate-300">Top Rated</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-950/50 hover:from-blue-500 hover:to-cyan-400"
        >
          <Save className="w-4 h-4 fill-slate-950" />
          <span>{initialData ? 'Update Product' : 'Save Product'}</span>
        </button>
      </div>
    </form>
  );
}
