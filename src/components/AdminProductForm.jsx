import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Tag, DollarSign, Package } from 'lucide-react';
import { CATEGORIES, PLATFORMS } from '../data/categories';

export default function AdminProductForm({ productToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 999,
    tag: 'Hot',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: '', oldPrice: '' }]
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        price: productToEdit.price || '',
        oldPrice: productToEdit.oldPrice || '',
        stock: productToEdit.stock !== undefined ? productToEdit.stock : 999,
        packages:
          productToEdit.packages && productToEdit.packages.length > 0
            ? productToEdit.packages
            : [{ name: 'Standard Package', price: productToEdit.price || '', oldPrice: '' }]
      });
    }
  }, [productToEdit]);

  const handleAddPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '', oldPrice: '' }]
    });
  };

  const handleRemovePackage = (index) => {
    const updated = formData.packages.filter((_, idx) => idx !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Product name is required');

    const formattedPackages = formData.packages
      .filter((p) => p.name.trim())
      .map((p) => ({
        name: p.name.trim(),
        price: Number(p.price) || 0,
        oldPrice: p.oldPrice ? Number(p.oldPrice) : null
      }));

    const basePrice =
      formattedPackages.length > 0
        ? formattedPackages[0].price
        : Number(formData.price) || 0;

    const baseOldPrice =
      formattedPackages.length > 0 && formattedPackages[0].oldPrice
        ? formattedPackages[0].oldPrice
        : formData.oldPrice
        ? Number(formData.oldPrice)
        : null;

    const finalProduct = {
      ...formData,
      price: basePrice,
      oldPrice: baseOldPrice,
      stock: Number(formData.stock) || 0,
      packages: formattedPackages.length > 0 ? formattedPackages : [{ name: 'Standard', price: basePrice }]
    };

    onSave(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-cyan-400" />
          <span>{productToEdit ? 'Edit Product' : 'Add New Product'}</span>
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 uppercase">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 uppercase">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
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
          <label className="text-xs font-bold text-slate-300 uppercase">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((plat) => (
              <option key={plat.id} value={plat.id}>
                {plat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type Badge */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 uppercase">Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300 uppercase">Image URL (Optional)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/steam/apps/... or leave empty for gradient fallback"
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-bold text-slate-300 uppercase">Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Short overview of the digital product..."
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none resize-none"
          />
        </div>

        {/* Stock */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 uppercase">Stock Count</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>

        {/* Tag */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300 uppercase">Tag Badge</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            placeholder="Popular, Hot, Best Seller..."
            className="w-full bg-slate-950 text-sm text-slate-100 p-3 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
          />
        </div>
      </div>

      {/* Featured Checkboxes */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
        <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Section Placements</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="accent-cyan-500 w-4 h-4 rounded"
            />
            <span>Featured Hero</span>
          </label>
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTrending}
              onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              className="accent-cyan-500 w-4 h-4 rounded"
            />
            <span>New & Trending</span>
          </label>
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFlashDeal}
              onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              className="accent-cyan-500 w-4 h-4 rounded"
            />
            <span>Flash Deals</span>
          </label>
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isTopRated}
              onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
              className="accent-cyan-500 w-4 h-4 rounded"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Package Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-300 uppercase">Package Tiers / Options</label>
          <button
            type="button"
            onClick={handleAddPackage}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pack, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row gap-2 items-center bg-slate-950 p-3 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={pack.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="w-full sm:flex-1 bg-slate-900 text-xs text-slate-100 p-2.5 rounded-lg border border-slate-800"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pack.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-full sm:w-32 bg-slate-900 text-xs text-slate-100 p-2.5 rounded-lg border border-slate-800"
              />
              <input
                type="number"
                placeholder="Old Price (Optional)"
                value={pack.oldPrice || ''}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="w-full sm:w-36 bg-slate-900 text-xs text-slate-100 p-2.5 rounded-lg border border-slate-800"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemovePackage(idx)}
                  className="p-2 text-slate-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
