import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image, Package, Tag } from 'lucide-react';
import ProductImage from './ProductImage.jsx';

export const AdminProductForm = ({ initialData, onSave, onCancel }) => {
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
    rating: 5.0,
    soldCount: 0,
    tag: 'Hot',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    isComingSoon: false,
    packages: []
  });

  const [newPackage, setNewPackage] = useState({ name: '', price: '', oldPrice: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price ?? '',
        oldPrice: initialData.oldPrice ?? '',
        stock: initialData.stock ?? 100,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleAddPackage = () => {
    if (!newPackage.name.trim() || !newPackage.price) return;
    const pkgToAdd = {
      id: `pkg-${Date.now()}`,
      name: newPackage.name.trim(),
      price: Number(newPackage.price),
      oldPrice: newPackage.oldPrice ? Number(newPackage.oldPrice) : null
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, pkgToAdd]
    }));
    setNewPackage({ name: '', price: '', oldPrice: '' });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave({
      ...formData,
      price: Number(formData.price) || 0,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0
    });
  };

  return (
    <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-cyan-400" />
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. PUBG Mobile UC"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Mobile Top-Ups">Mobile Top-Ups</option>
              <option value="Games">Games (Paid Games)</option>
              <option value="Gift Cards">Gift Cards</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Platform */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Platform *
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            >
              <option value="PC">PC</option>
              <option value="Mobile">Mobile</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Gift Card">Gift Card</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>

          {/* Base Price */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Base Price (IQD) *
            </label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 15000"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Old Price */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Old Price (IQD, Optional)
            </label>
            <input
              type="number"
              min="0"
              placeholder="e.g. 20000"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Stock Count */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Stock Quantity *
            </label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Tag */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Badge Tag (e.g. Hot, Instant)
            </label>
            <input
              type="text"
              placeholder="e.g. Best Seller"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Image className="w-4 h-4 text-cyan-400" /> Image URL (Steam CDN / Direct image link)
            </label>
            <input
              type="url"
              placeholder="https://cdn.akamai.steamstatic.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              If left empty or if URL fails to load, the custom ProductVisual gradient fallback will be rendered automatically.
            </p>

            {/* Image Live Preview */}
            <div className="mt-3 w-48 h-28 rounded-xl overflow-hidden border border-gray-800">
              <ProductImage product={formData} className="h-28" />
            </div>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Detailed description of the product or top-up instructions..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl px-4 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Feature Sections Toggles */}
        <div className="p-4 bg-[#050814] border border-gray-800 rounded-xl space-y-3">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            Section Display Toggles
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0"
              />
              <span>Trending</span>
            </label>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0"
              />
              <span>Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0"
              />
              <span>Top Rated</span>
            </label>

            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isComingSoon}
                onChange={(e) => setFormData({ ...formData, isComingSoon: e.target.checked })}
                className="rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-0"
              />
              <span>Coming Soon</span>
            </label>
          </div>
        </div>

        {/* Package Manager Section */}
        <div className="p-4 bg-[#050814] border border-gray-800 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
              Product Packages / Options ({formData.packages.length})
            </label>
          </div>

          {/* List of Existing Packages */}
          {formData.packages.length > 0 && (
            <div className="space-y-2">
              {formData.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between bg-gray-900 border border-gray-800 p-2.5 rounded-lg text-xs text-white"
                >
                  <span className="font-bold">{pkg.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-extrabold">{pkg.price} IQD</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-gray-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Package Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2 border-t border-gray-800/60">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              className="bg-gray-900 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-800 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={newPackage.price}
              onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
              className="bg-gray-900 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-800 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Old Price (Optional)"
              value={newPackage.oldPrice}
              onChange={(e) => setNewPackage({ ...newPackage, oldPrice: e.target.value })}
              className="bg-gray-900 text-xs text-white placeholder-gray-500 px-3 py-2 rounded-lg border border-gray-800 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddPackage}
              className="py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-gray-950 font-black text-xs rounded-lg flex items-center justify-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
