import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Plus, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';

export default function AdminProductForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 4.9,
    soldCount: 0,
    tag: 'Popular',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Edition', price: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ name: 'Standard Edition', price: initialData.price || '' }]
      });
    }
  }, [initialData]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }]
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length === 1) return;
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPackages = formData.packages.map((pkg) => ({
      name: pkg.name || 'Standard',
      price: Number(pkg.price) || Number(formData.price) || 0
    }));

    const basePrice = formattedPackages.length > 0 ? formattedPackages[0].price : Number(formData.price) || 0;

    const submissionData = {
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      soldCount: Number(formData.soldCount),
      packages: formattedPackages,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    };

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-100">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-lg font-extrabold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Product Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. GTA V or PUBG Mobile UC"
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Slug */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Slug (URL string)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g. gta-v or pubg-mobile-uc"
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Badge */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Type Badge</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="e.g. Game, Top-Up, Gift Card, Subscription"
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Stock Count</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Base Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Base Price (IQD)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="e.g. 15000"
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Old Price */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300">Old Price / Sale (IQD)</label>
          <input
            type="number"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            placeholder="e.g. 18000"
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>Image URL (Steam CDN / Trusted Image)</span>
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
          <p className="text-[11px] text-slate-500">
            If left empty or invalid, the product will render a clean ProductVisual gradient fallback.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-300">Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#0c1220] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 px-3 text-xs text-white outline-none"
          />
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Product Packages / Top-Up Options
          </label>
          <button
            type="button"
            onClick={addPackage}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-semibold rounded-lg flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-[#0c1220] p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
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

      {/* Homepage Display Flags */}
      <div className="pt-3 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
        <label className="flex items-center gap-2 cursor-pointer bg-[#0c1220] p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Featured Section</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-[#0c1220] p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>New & Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-[#0c1220] p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deals</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer bg-[#0c1220] p-2.5 rounded-xl border border-slate-800">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-700 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-900/30 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
