import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { X, Plus, Trash2, Check } from 'lucide-react';

export function AdminProductForm({ productToEdit, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
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
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: '' }],
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        price: productToEdit.price || '',
        oldPrice: productToEdit.oldPrice || '',
        packages: productToEdit.packages && productToEdit.packages.length > 0
          ? productToEdit.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: productToEdit.price || '' }],
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedPkgs = [...prev.packages];
      updatedPkgs[index] = { ...updatedPkgs[index], [field]: value };
      return { ...prev, packages: updatedPkgs };
    });
  };

  const addPackageRow = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '' },
      ],
    }));
  };

  const removePackageRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const formattedProduct = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      price: parseFloat(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 5.0,
      soldCount: parseInt(formData.soldCount) || 0,
      packages: formData.packages.map((p) => ({
        ...p,
        price: parseFloat(p.price) || parseFloat(formData.price) || 0,
      })),
    };

    onSave(formattedProduct);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 text-white">
      <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-800">
        <h3 className="text-xl font-bold">
          {productToEdit ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          onClick={onCancel}
          className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Tag / Badge Label
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              placeholder="e.g. Best Seller / Hot"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Platform
            </label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            >
              {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Product Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Stock Quantity
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Starting Price (IQD) *
            </label>
            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 1500"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Old Price (IQD - for discount)
            </label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="e.g. 1800"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Image URL (Steam CDN or web link - leave empty for auto fallback visual)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Packages Section */}
        <div className="border-t border-slate-800 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-cyan-400">Packages / Variants</h4>
            <button
              type="button"
              onClick={addPackageRow}
              className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-950/60 hover:bg-cyan-900/60 px-3 py-1.5 rounded-lg border border-cyan-500/30"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Package</span>
            </button>
          </div>

          <div className="space-y-2">
            {formData.packages.map((pkg, idx) => (
              <div key={pkg.id || idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 60 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs focus:border-cyan-400 focus:outline-none"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackageRow(idx)}
                    className="p-1.5 text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Flags */}
        <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="isFlashDeal"
              checked={formData.isFlashDeal}
              onChange={handleChange}
              className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated}
              onChange={handleChange}
              className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0"
            />
            <span>Top Rated</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-slate-700 font-bold text-xs hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 font-bold text-xs text-white shadow-lg"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
