import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image, Tag, DollarSign, Layers } from 'lucide-react';

export default function AdminProductForm({ productToEdit = null, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile Top-Ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: '100',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '' });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        id: productToEdit.id,
        name: productToEdit.name || '',
        category: productToEdit.category || 'Mobile Top-Ups',
        platform: productToEdit.platform || 'Mobile',
        type: productToEdit.type || 'Top-Up',
        price: productToEdit.price !== undefined ? String(productToEdit.price) : '',
        oldPrice: productToEdit.oldPrice ? String(productToEdit.oldPrice) : '',
        description: productToEdit.description || '',
        image: productToEdit.image || '',
        stock: productToEdit.stock !== undefined ? String(productToEdit.stock) : '100',
        tag: productToEdit.tag || '',
        isFeatured: Boolean(productToEdit.isFeatured),
        isTrending: Boolean(productToEdit.isTrending),
        isFlashDeal: Boolean(productToEdit.isFlashDeal),
        isTopRated: Boolean(productToEdit.isTopRated),
        packages: productToEdit.packages ? [...productToEdit.packages] : []
      });
    }
  }, [productToEdit]);

  const handleAddPackage = () => {
    if (!packageInput.name.trim() || !packageInput.price) return;
    const newPkg = {
      id: 'pkg-' + Date.now(),
      name: packageInput.name.trim(),
      price: Number(packageInput.price)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, newPkg]
    }));
    setPackageInput({ name: '', price: '' });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== pkgId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    onSave({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-cyan-400" />
            {productToEdit ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PUBG Mobile UC Top-Up"
              className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile Top-Ups">Mobile Top-Ups</option>
                <option value="Paid Games">Paid Games</option>
                <option value="Gift Cards">Gift Cards</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Base Price (IQD) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. 15000"
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="e.g. 20000"
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Custom Badge Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://cdn.akamai.steamstatic.com/..."
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Custom Tag / Badge</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Hot Deal, Bestseller"
                className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product details and redemption rules..."
              className="w-full bg-slate-950 text-slate-100 text-sm p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          {/* Packages Builder */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> Package Variations (Top-Ups / Options)
              </label>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Package name (e.g. 660 UC)"
                value={packageInput.name}
                onChange={(e) => setPackageInput({ ...packageInput, name: e.target.value })}
                className="flex-1 bg-slate-900 text-xs p-2 rounded-lg border border-slate-800"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={packageInput.price}
                onChange={(e) => setPackageInput({ ...packageInput, price: e.target.value })}
                className="w-28 bg-slate-900 text-xs p-2 rounded-lg border border-slate-800"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            {formData.packages.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.packages.map((pkg) => (
                  <span
                    key={pkg.id}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
                  >
                    <span>{pkg.name} - <strong>{pkg.price} IQD</strong></span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(pkg.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Store Flags Checkboxes */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-300">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-cyan-500"
              />
              <span>Top Rated</span>
            </label>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Product
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
