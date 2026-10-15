import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';

export const AdminProductForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile Top-Ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    description: '',
    image: '',
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: '', oldPrice: '' }],
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: initialData.price || '', oldPrice: '' }]
      });
    }
  }, [initialData]);

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
        { id: `pkg-${Date.now()}`, name: 'New Package', price: formData.price || '', oldPrice: '' }
      ]
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseInt(formData.price || 0, 10),
      oldPrice: formData.oldPrice ? parseInt(formData.oldPrice, 10) : 0,
      stock: parseInt(formData.stock || 0, 10),
      rating: parseFloat(formData.rating || 5.0),
      soldCount: parseInt(formData.soldCount || 0, 10),
      packages: formData.packages.map((pkg) => ({
        ...pkg,
        price: parseInt(pkg.price || formData.price || 0, 10),
        oldPrice: pkg.oldPrice ? parseInt(pkg.oldPrice, 10) : 0
      }))
    });
  };

  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="font-extrabold text-lg text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="e.g. PUBG Mobile 660 UC"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform *</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {PLATFORMS.filter((p) => p !== 'All').map((plat) => (
                <option key={plat} value={plat}>
                  {plat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Type *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
            >
              {TYPES.filter((t) => t !== 'All').map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Base Price (IQD) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="e.g. 15000"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Old Price (IQD)</label>
            <input
              type="number"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="e.g. 18000"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Quantity *</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="100"
            />
          </div>
        </div>

        {/* Image & Tag */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Image URL (Optional)</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tag Line (e.g. Best Seller)</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none"
              placeholder="Fast Delivery"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-[#05070f] border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-cyan-500 focus:outline-none resize-none"
            placeholder="Product details..."
          />
        </div>

        {/* Packages List */}
        <div className="border border-slate-800/80 rounded-xl p-4 bg-[#05070f] space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-cyan-400 uppercase tracking-wider">Product Packages</h4>
            <button
              type="button"
              onClick={addPackage}
              className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          {formData.packages.map((pkg, index) => (
            <div key={pkg.id || index} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center bg-[#090d1a] p-2.5 rounded-lg border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                className="bg-[#05070f] border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                className="bg-[#05070f] border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Old Price IQD"
                  value={pkg.oldPrice || ''}
                  onChange={(e) => handlePackageChange(index, 'oldPrice', e.target.value)}
                  className="bg-[#05070f] border border-slate-800 rounded-lg p-2 text-xs text-white flex-1"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Section Flags */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#05070f] p-4 rounded-xl border border-slate-800 text-xs font-bold text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-cyan-500 rounded w-4 h-4"
            />
            <span>Featured</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="accent-cyan-500 rounded w-4 h-4"
            />
            <span>Trending</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="accent-cyan-500 rounded w-4 h-4"
            />
            <span>Flash Deal</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="accent-cyan-500 rounded w-4 h-4"
            />
            <span>Top Rated</span>
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-950"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};
