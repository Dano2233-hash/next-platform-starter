import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle } from 'lucide-react';

export const AdminProductForm = ({ initialData, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile-topups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    description: '',
    image: '',
    tag: 'Popular',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '', oldPrice: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPackage = () => {
    if (!packageInput.name || !packageInput.price) return;
    const newPackage = {
      id: `pkg-${Date.now()}`,
      name: packageInput.name,
      price: parseInt(packageInput.price, 10),
      oldPrice: packageInput.oldPrice ? parseInt(packageInput.oldPrice, 10) : null
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, newPackage]
    }));
    setPackageInput({ name: '', price: '', oldPrice: '' });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
          <h3 className="font-extrabold text-slate-100 text-lg">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. PUBG Mobile UC Top-Up"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="mobile-topups">Mobile Top-Ups</option>
                <option value="paid-games">Paid Games</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Platform *</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Digital">Digital Services</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Starting Price (IQD) *</label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="15000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Old Price (IQD) (Optional)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="18000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Stock Count *</label>
              <input
                type="number"
                name="stock"
                required
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Badge Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="Best Seller / Hot Deal"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Image URL (Optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Product details and instructions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Section Toggles */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 mb-2">Display in Home Sections</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Featured</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Trending</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleChange}
                  className="rounded text-cyan-500 focus:ring-0"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Packages Manager */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-slate-300">Product Packages / Tiers</label>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Pkg Name (e.g. 660 UC)"
                value={packageInput.name}
                onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={packageInput.price}
                onChange={(e) => setPackageInput({ ...packageInput, price: e.target.value })}
                className="bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            {/* List of existing packages */}
            {formData.packages.length > 0 && (
              <div className="space-y-1 mt-2">
                {formData.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs"
                  >
                    <span className="font-semibold text-slate-200">{pkg.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-bold">{pkg.price} IQD</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePackage(pkg.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 bg-slate-800 hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <CheckCircle className="w-4 h-4" /> Save Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
