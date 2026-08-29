import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';

export default function AdminProductForm({
  product = null,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile-topups',
    platform: 'PC',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [],
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '', oldPrice: '' });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile-topups',
        platform: product.platform || 'PC',
        type: product.type || 'Top-Up',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 100,
        tag: product.tag || '',
        isFeatured: product.isFeatured || false,
        isTrending: product.isTrending || false,
        isFlashDeal: product.isFlashDeal || false,
        isTopRated: product.isTopRated || false,
        packages: product.packages ? [...product.packages] : [],
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddPackage = () => {
    if (!packageInput.name || !packageInput.price) return;
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: packageInput.name,
      price: Number(packageInput.price),
      oldPrice: packageInput.oldPrice ? Number(packageInput.oldPrice) : null,
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg],
    }));
    setPackageInput({ name: '', price: '', oldPrice: '' });
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0c101c] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#080b14]">
          <h3 className="text-white font-extrabold text-base">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. PUBG Mobile UC"
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="mobile-topups">Mobile Top-Ups</option>
                <option value="paid-games">Paid Games</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Platform
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Price (IQD) *
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="15000"
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Old Price (IQD - Optional)
              </label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="18000"
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Image URL (Optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description..."
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Tag Badge (e.g. Best Seller)
              </label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Hot Deal"
                className="w-full bg-[#080b14] border border-slate-800 text-white text-xs md:text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-cyan-500"
              />
            </div>

          </div>

          {/* Feature Toggles */}
          <div className="border-t border-slate-800 pt-4">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Display Badges & Sections
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 p-2 rounded bg-[#080b14] border border-slate-800">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded bg-[#080b14] border border-slate-800">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                />
                <span>Trending</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded bg-[#080b14] border border-slate-800">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleChange}
                />
                <span>Flash Deal</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded bg-[#080b14] border border-slate-800">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleChange}
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Sub-Packages Manager */}
          <div className="border-t border-slate-800 pt-4">
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Product Packages / Variations
            </label>

            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="text"
                placeholder="Pkg Name (e.g. 660 UC)"
                value={packageInput.name}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, name: e.target.value }))}
                className="flex-1 bg-[#080b14] border border-slate-800 text-white text-xs rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={packageInput.price}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, price: e.target.value }))}
                className="w-28 bg-[#080b14] border border-slate-800 text-white text-xs rounded-lg px-3 py-2"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {formData.packages.length > 0 && (
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                {formData.packages.map((pkg, idx) => (
                  <div
                    key={pkg.id || idx}
                    className="flex items-center justify-between bg-[#080b14] border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-300"
                  >
                    <span>{pkg.name} — <strong className="text-cyan-400">{pkg.price} IQD</strong></span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="border-t border-slate-800 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-extrabold shadow-lg shadow-cyan-600/20 flex items-center gap-2"
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
