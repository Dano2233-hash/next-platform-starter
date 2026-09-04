import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, AlertCircle } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile-topup',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: '100',
    description: '',
    image: '',
    tag: '',
    rating: '5.0',
    soldCount: '0',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: '', oldPrice: '' }]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile-topup',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price !== undefined ? String(product.price) : '',
        oldPrice: product.oldPrice !== undefined ? String(product.oldPrice) : '',
        stock: product.stock !== undefined ? String(product.stock) : '100',
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        rating: product.rating !== undefined ? String(product.rating) : '5.0',
        soldCount: product.soldCount !== undefined ? String(product.soldCount) : '0',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages.map((pkg) => ({
              name: pkg.name || '',
              price: pkg.price !== undefined ? String(pkg.price) : '',
              oldPrice: pkg.oldPrice !== undefined ? String(pkg.oldPrice) : ''
            }))
          : [{ name: 'Standard Package', price: String(product.price || ''), oldPrice: String(product.oldPrice || '') }]
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, val) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index][field] = val;
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const addPackageField = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '', oldPrice: '' }]
    });
  };

  const removePackageField = (index) => {
    if (formData.packages.length === 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.description.trim()) errs.description = 'Description is required';

    const hasPkgPrice = formData.packages.some((p) => Number(p.price) > 0);
    const hasBasePrice = Number(formData.price) > 0;
    if (!hasPkgPrice && !hasBasePrice) {
      errs.price = 'Please enter a valid price for product or packages';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedPackages = formData.packages
      .filter((pkg) => pkg.name.trim() !== '')
      .map((pkg) => ({
        name: pkg.name,
        price: Number(pkg.price) || Number(formData.price) || 0,
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : undefined
      }));

    const calculatedBasePrice = formattedPackages.length > 0
      ? formattedPackages[0].price
      : Number(formData.price) || 0;

    const calculatedOldPrice = formattedPackages.length > 0 && formattedPackages[0].oldPrice
      ? formattedPackages[0].oldPrice
      : formData.oldPrice ? Number(formData.oldPrice) : undefined;

    const productPayload = {
      ...formData,
      price: calculatedBasePrice,
      oldPrice: calculatedOldPrice,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formattedPackages.length > 0 ? formattedPackages : [{ name: 'Standard', price: calculatedBasePrice }]
    };

    onSave(productPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Grid Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Product Title <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC or GTA V"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          />
          {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Platform
          </label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Product Type Badge
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Image URL (Optional - Fallback visual will be used if empty)
          </label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Description <span className="text-rose-400">*</span>
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product details and delivery instructions..."
          className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:border-cyan-500"
        />
        {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Packages / Variations Builder */}
      <div className="space-y-3 border-t border-slate-800 pt-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Packages / Options (e.g. 60 UC, 325 UC or Deluxe Edition)
          </label>
          <button
            type="button"
            onClick={addPackageField}
            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs"
              />
              <input
                type="number"
                placeholder="Old Price (IQD)"
                value={pkg.oldPrice}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageField(idx)}
                  className="p-1 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Section Toggles */}
      <div className="border-t border-slate-800 pt-4">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          Homepage Section Feature Flags
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold">
          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="rounded accent-cyan-500"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
};
