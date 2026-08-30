import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image, Tag, DollarSign, Box } from 'lucide-react';
import { categories, platforms } from '../data/categories';

export default function AdminProductForm({ product = null, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 50,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    isComingSoon: false,
    packages: []
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price ?? '',
        oldPrice: product.oldPrice ?? '',
        stock: product.stock ?? 50,
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: Boolean(product.isFeatured),
        isTrending: Boolean(product.isTrending),
        isFlashDeal: Boolean(product.isFlashDeal),
        isTopRated: Boolean(product.isTopRated),
        isComingSoon: Boolean(product.isComingSoon),
        packages: product.packages ? [...product.packages] : []
      });
    }
  }, [product]);

  const handleAddPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`, name: '', price: '', oldPrice: '' }
      ]
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const handleRemovePackage = (index) => {
    const updated = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Please enter product name');
    if (!formData.price && formData.packages.length === 0) return alert('Please enter a price or add packages');

    const cleanedPackages = formData.packages.map(p => ({
      ...p,
      price: Number(p.price) || 0,
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null
    }));

    const finalProduct = {
      ...(product ? { id: product.id } : {}),
      name: formData.name.trim(),
      category: formData.category,
      platform: formData.platform,
      type: formData.type,
      price: Number(formData.price) || (cleanedPackages.length > 0 ? cleanedPackages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      description: formData.description.trim(),
      image: formData.image.trim(),
      tag: formData.tag.trim(),
      isFeatured: formData.isFeatured,
      isTrending: formData.isTrending,
      isFlashDeal: formData.isFlashDeal,
      isTopRated: formData.isTopRated,
      isComingSoon: formData.isComingSoon,
      packages: cleanedPackages
    };

    onSave(finalProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#080c14]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-cyan-400" />
            <span>{product ? 'Edit Product' : 'Add New Product'}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Scroll Area */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">

          {/* Product Name */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PUBG Mobile UC, GTA V, Discord Nitro..."
              className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Grid Category / Platform / Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              >
                {categories.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Platform *</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Digital">Digital Service</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Price (IQD) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Base or starting price"
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="Original price if sale"
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Stock Count *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Custom Badge Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://... (Leave empty for fallback visual)"
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Custom Tag Badge</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Hot, Flash Deal, Top Sales..."
                className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the digital product or top-up..."
              className="w-full bg-slate-900 text-slate-100 rounded-lg p-2.5 border border-slate-700 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Package Options */}
          <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-200">Package Options (UC, Diamonds, Gift Card amounts)</h4>
                <p className="text-[11px] text-slate-400">Add multiple package choices for this item.</p>
              </div>
              <button
                type="button"
                onClick={handleAddPackage}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 items-center">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 60 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="sm:col-span-2 bg-slate-900 text-slate-100 rounded p-2 border border-slate-700"
                />
                <input
                  type="number"
                  placeholder="Price (IQD)"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="bg-slate-900 text-slate-100 rounded p-2 border border-slate-700"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Old Price"
                    value={pkg.oldPrice || ''}
                    onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                    className="w-full bg-slate-900 text-slate-100 rounded p-2 border border-slate-700"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(idx)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkboxes for Featured / Section Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-slate-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-slate-300">Trending</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-slate-300">Flash Deal</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-slate-300">Top Rated</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isComingSoon}
                onChange={(e) => setFormData({ ...formData, isComingSoon: e.target.checked })}
                className="rounded bg-slate-900 border-slate-700 text-cyan-400 focus:ring-0"
              />
              <span className="font-semibold text-slate-300">Coming Soon</span>
            </label>
          </div>

          {/* Save Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
