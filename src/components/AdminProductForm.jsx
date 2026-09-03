import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export const AdminProductForm = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Top-Up',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: true,
    rating: 5.0,
    soldCount: 100,
    tag: 'Hot',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        packages: product.packages ? [...product.packages] : []
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, packages: updated });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '', oldPrice: '' }]
    });
  };

  const removePackageRow = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price) || 0,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formData.packages.length > 0
        ? formData.packages.map((p) => ({
            name: p.name,
            price: Number(p.price) || 0,
            oldPrice: p.oldPrice ? Number(p.oldPrice) : null
          }))
        : null
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 text-slate-100 space-y-5">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Image URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Base Price & Old Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none"
            />
          </div>

          {/* Packages Builder */}
          <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">Packages (Optional)</span>
              <button
                type="button"
                onClick={addPackageRow}
                className="text-xs text-cyan-300 hover:text-cyan-200 font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Package
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 660 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Price IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <input
                  type="number"
                  placeholder="Old Price"
                  value={pkg.oldPrice || ''}
                  onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                  className="w-24 bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => removePackageRow(idx)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Flags Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.checked })}
              />
              In Stock
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
              />
              Trending
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
              />
              Flash Deal
            </label>
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-950"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
