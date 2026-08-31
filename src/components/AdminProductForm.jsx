import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: '100',
    rating: '5.0',
    soldCount: '0',
    image: '',
    description: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [],
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '', oldPrice: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price ? initialData.price.toString() : '',
        oldPrice: initialData.oldPrice ? initialData.oldPrice.toString() : '',
        stock: initialData.stock !== undefined ? initialData.stock.toString() : '100',
        rating: initialData.rating ? initialData.rating.toString() : '5.0',
        soldCount: initialData.soldCount ? initialData.soldCount.toString() : '0',
        packages: initialData.packages ? [...initialData.packages] : [],
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

  const handleAddPackage = () => {
    if (!packageInput.name || !packageInput.price) {
      setError('Package name and price are required');
      return;
    }
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: packageInput.name,
      price: parseFloat(packageInput.price),
      oldPrice: packageInput.oldPrice ? parseFloat(packageInput.oldPrice) : null,
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg],
    }));
    setPackageInput({ name: '', price: '', oldPrice: '' });
    setError('');
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      setError('Valid base price is required');
      return;
    }

    const payload = {
      ...formData,
      id: initialData?.id,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock, 10) || 0,
      rating: parseFloat(formData.rating) || 5.0,
      soldCount: parseInt(formData.soldCount, 10) || 0,
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center animate-fadeIn">
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Title */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="games">Paid Games</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Platform *</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Prices & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Price (IQD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="15000"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="18000"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="100"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Rating, Sold, Image */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Sold Count</label>
              <input
                type="number"
                name="soldCount"
                value={formData.soldCount}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-300 mb-1">Custom Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="e.g. Hot, Sale"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Product Image URL (Optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Product features, delivery details..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Display Flag Checkboxes */}
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-2">
            <span className="font-bold text-cyan-400 block mb-1">Display Sections:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Trending</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleChange}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Flash Deal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleChange}
                  className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Packages Manager */}
          <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <span className="font-bold text-cyan-400 block">Product Packages / Options:</span>

            {/* Package Input Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Pkg Name (e.g. 660 UC)"
                value={packageInput.name}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={packageInput.price}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, price: e.target.value }))}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Old Price"
                  value={packageInput.oldPrice}
                  onChange={(e) => setPackageInput((prev) => ({ ...prev, oldPrice: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
                <button
                  type="button"
                  onClick={handleAddPackage}
                  className="px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Existing Packages List */}
            {formData.packages.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {formData.packages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg text-slate-300">
                    <div>
                      <span className="font-bold text-white">{pkg.name}</span> - {pkg.price} IQD {pkg.oldPrice && <span className="text-slate-500 line-through text-[10px] ml-1">({pkg.oldPrice} IQD)</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-red-400 hover:text-red-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" /> Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
