import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { categories, platforms, productTypes } from '../data/categories';

export const AdminProductForm = ({ product, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobile Top-Ups',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    stock: 100,
    image: '',
    description: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [newPkgName, setNewPkgName] = useState('');
  const [newPkgPrice, setNewPkgPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Mobile Top-Ups',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        stock: product.stock !== undefined ? product.stock : 100,
        image: product.image || '',
        description: product.description || '',
        tag: product.tag || '',
        isFeatured: Boolean(product.isFeatured),
        isTrending: Boolean(product.isTrending),
        isFlashDeal: Boolean(product.isFlashDeal),
        isTopRated: Boolean(product.isTopRated),
        packages: product.packages ? [...product.packages] : []
      });
    }
  }, [product]);

  const handleAddPackage = () => {
    if (!newPkgName.trim() || !newPkgPrice) {
      return;
    }
    const pkg = {
      id: `pkg-${Date.now()}`,
      name: newPkgName.trim(),
      price: Number(newPkgPrice)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, pkg]
    }));
    setNewPkgName('');
    setNewPkgPrice('');
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
      setError('Product title is required');
      return;
    }
    if (!formData.price && formData.packages.length === 0) {
      setError('Product base price or packages required');
      return;
    }

    const priceNum = Number(formData.price) || (formData.packages[0] ? formData.packages[0].price : 0);

    onSubmit({
      ...formData,
      price: priceNum,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock)
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-wider">
            {product ? 'Edit Product Catalog Entry' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-300 block mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
            />
          </div>

          {/* Category, Platform, Type Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              >
                {platforms.filter((p) => p.id !== 'all').map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              >
                {productTypes.filter((t) => t.id !== 'all').map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price, Old Price, Stock Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Base Price (IQD)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="15000"
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Old Price (IQD)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="18000"
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Stock Count</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Image URL & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Custom Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="e.g. Best Seller"
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-300 block mb-1">Description</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description..."
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl p-2.5 text-xs focus:outline-none"
            />
          </div>

          {/* Feature Flags Checkboxes */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-300 block mb-2">Display Badges / Sections</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded text-cyan-400"
                />
                <span>Featured</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded text-cyan-400"
                />
                <span>Trending</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                  className="rounded text-cyan-400"
                />
                <span>Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                  className="rounded text-cyan-400"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Manage Packages */}
          <div className="pt-2 border-t border-slate-800">
            <label className="text-xs font-bold uppercase text-slate-300 block mb-2">
              Package Options (Optional for top-ups & gift cards)
            </label>

            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Package Name (e.g., 660 UC)"
                value={newPkgName}
                onChange={(e) => setNewPkgName(e.target.value)}
                className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded-lg p-2 text-xs"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={newPkgPrice}
                onChange={(e) => setNewPkgPrice(e.target.value)}
                className="w-28 bg-slate-950 text-slate-100 border border-slate-800 rounded-lg p-2 text-xs"
              />
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-2 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg font-bold text-xs hover:bg-cyan-500/30"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {formData.packages.length > 0 && (
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {formData.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800 text-xs"
                  >
                    <span className="font-bold text-slate-200">{pkg.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">{pkg.price.toLocaleString()} IQD</span>
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
            )}
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
