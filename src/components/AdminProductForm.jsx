import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, AlertCircle } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [newPackage, setNewPackage] = useState({ name: '', price: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        id: `prod-${Date.now()}`,
        name: '',
        slug: '',
        category: 'mobile',
        platform: 'Mobile',
        type: 'Top-Up',
        price: 0,
        oldPrice: 0,
        description: '',
        image: '',
        stock: 100,
        rating: 5.0,
        soldCount: 0,
        tag: '',
        isFeatured: false,
        isTrending: false,
        isFlashDeal: false,
        isTopRated: false,
        packages: []
      });
    }
  }, [product]);

  const handleAddPackage = () => {
    if (!newPackage.name.trim() || newPackage.price <= 0) return;
    const pkg = {
      id: `pkg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: newPackage.name.trim(),
      price: Number(newPackage.price)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...(prev.packages || []), pkg]
    }));
    setNewPackage({ name: '', price: 0 });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product title is required.');
      return;
    }
    if (formData.price <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onSave({
      ...formData,
      slug,
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl my-8 relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <h3 className="text-lg font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/80 border border-rose-500/50 text-rose-300 p-3 rounded-xl mb-4 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            {/* Tag / Badge */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Badge Tag (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Best Seller, Hot, GOTY"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Gaming</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Product Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Paid Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>

            {/* Base Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Starting Price (IQD) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Old Price (IQD, for Sale badge)
              </label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Image URL (Direct image or Steam CDN)
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          {/* Checkboxes for Sections */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Trending</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Top Rated</span>
            </label>
          </div>

          {/* Manage Packages */}
          <div className="pt-3 border-t border-slate-800">
            <h4 className="text-xs font-bold text-white mb-2">
              Available Product Packages ({formData.packages?.length || 0})
            </h4>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Package Name (e.g. 660 UC)"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={newPackage.price || ''}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="w-28 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {formData.packages?.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs"
                >
                  <span className="font-semibold text-slate-200">{pkg.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold">{pkg.price} IQD</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-600/20"
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
