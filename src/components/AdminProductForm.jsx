import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Layers } from 'lucide-react';

export function AdminProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Mobile Top-Ups',
    platform: product?.platform || 'Mobile',
    type: product?.type || 'Top-Up',
    price: product?.price || 5000,
    oldPrice: product?.oldPrice || '',
    stock: product?.stock !== undefined ? product.stock : 100,
    description: product?.description || '',
    image: product?.image || '',
    tag: product?.tag || '',
    isFeatured: product?.isFeatured || false,
    isTrending: product?.isTrending || false,
    isFlashDeal: product?.isFlashDeal || false,
    isTopRated: product?.isTopRated || false,
    isComingSoon: product?.isComingSoon || false,
    packages: product?.packages || [],
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '', oldPrice: '' });

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
      id: `pkg_${Date.now()}`,
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

  const handleRemovePackage = (id) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0c1024] border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>{product ? 'Edit Product' : 'Add New Product'}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-bold mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Badge Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="e.g. Best Seller"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Mobile Top-Ups">Mobile Top-Ups</option>
                <option value="Paid Games">Paid Games</option>
                <option value="Gift Cards">Gift Cards</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Cards">Gift Cards</option>
                <option value="Multi-Platform">Multi-Platform</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Product Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Price, Old Price, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Price (IQD) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Old Price (IQD)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="Optional sale price"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-bold mb-1">Stock Count</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Image URL & Description */}
          <div>
            <label className="block text-slate-300 font-bold mb-1">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="e.g. https://cdn.akamai.steamstatic.com/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1">Description</label>
            <textarea
              name="description"
              rows="2"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Package Builder */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <span className="block font-bold text-cyan-300 text-xs">Custom Package Variants</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={packageInput.name}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, name: e.target.value }))}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={packageInput.price}
                onChange={(e) => setPackageInput((prev) => ({ ...prev, price: e.target.value }))}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold hover:bg-cyan-500/30 transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.length > 0 && (
              <div className="space-y-1 pt-2">
                {formData.packages.map((pkg) => (
                  <div key={pkg.id} className="flex items-center justify-between bg-slate-900 px-3 py-1 rounded border border-slate-800">
                    <span className="font-semibold text-slate-200">{pkg.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-bold">{pkg.price} IQD</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePackage(pkg.id)}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section Feature Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-800">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
              <span>Featured</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} />
              <span>Trending</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} />
              <span>Flash Deal</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} />
              <span>Top Rated</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
              <input type="checkbox" name="isComingSoon" checked={formData.isComingSoon} onChange={handleChange} />
              <span>Coming Soon</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
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

export default AdminProductForm;
