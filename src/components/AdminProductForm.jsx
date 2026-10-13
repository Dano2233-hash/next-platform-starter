import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminProductForm({ isOpen, onClose, productToEdit, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
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
    packages: [{ name: '', price: '' }]
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'mobile',
        platform: productToEdit.platform || 'Mobile',
        type: productToEdit.type || 'Top-Up',
        price: productToEdit.price || '',
        oldPrice: productToEdit.oldPrice || '',
        description: productToEdit.description || '',
        image: productToEdit.image || '',
        stock: productToEdit.stock !== undefined ? String(productToEdit.stock) : '100',
        tag: productToEdit.tag || '',
        isFeatured: Boolean(productToEdit.isFeatured),
        isTrending: Boolean(productToEdit.isTrending),
        isFlashDeal: Boolean(productToEdit.isFlashDeal),
        isTopRated: Boolean(productToEdit.isTopRated),
        packages: productToEdit.packages && productToEdit.packages.length > 0
          ? productToEdit.packages.map(p => ({ name: p.name, price: String(p.price) }))
          : [{ name: 'Standard', price: String(productToEdit.price || '') }]
      });
    } else {
      setFormData({
        name: '',
        category: 'mobile',
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
        packages: [{ name: 'Standard Package', price: '' }]
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index][field] = value;
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }]
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length > 1) {
      setFormData({
        ...formData,
        packages: formData.packages.filter((_, i) => i !== index)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedPackages = formData.packages
      .filter(p => p.name.trim() !== '')
      .map(p => ({
        name: p.name,
        price: Number(p.price) || Number(formData.price) || 0
      }));

    const finalProduct = {
      ...formData,
      price: Number(formData.price) || (formattedPackages[0] ? formattedPackages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      packages: formattedPackages.length > 0 ? formattedPackages : [{ name: 'Standard', price: Number(formData.price) || 0 }]
    };

    onSubmit(finalProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl max-w-2xl w-full text-slate-100 shadow-2xl overflow-hidden my-8">

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0a1128]">
          <h3 className="font-orbitron font-bold text-base text-cyan-400">
            {productToEdit ? 'Edit Product' : 'Add New Digital Product'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Title */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Product Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. PUBG Mobile UC Top-Up"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Gaming</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            {/* Platform */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Platform Badge *</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Digital Service">Digital Service</option>
              </select>
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Type Badge *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            {/* Base Starting Price */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Base Price (IQD) *</label>
              <input
                type="number"
                required
                placeholder="1500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Old Price (IQD Optional)</label>
              <input
                type="number"
                placeholder="2000"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Stock Count */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Stock Quantity *</label>
              <input
                type="number"
                required
                placeholder="100"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Image URL (Optional - Fallback visual rendered if empty/broken)</label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Short Description *</label>
              <textarea
                rows="2"
                required
                placeholder="Product highlights and details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

            {/* Tag Badge */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tag Badge (Optional e.g. Hot, Best Seller)</label>
              <input
                type="text"
                placeholder="e.g. Best Seller"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none"
              />
            </div>

          </div>

          {/* Section Visibility Toggles */}
          <div className="p-4 bg-[#0c1224] border border-slate-800/80 rounded-xl space-y-3">
            <h4 className="text-xs font-orbitron font-bold text-cyan-400 uppercase tracking-wider">Homepage Section Visibility</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Featured</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">New & Trending</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Flash Deals</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                  className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span className="text-slate-300">Top Rated</span>
              </label>
            </div>
          </div>

          {/* Packages Selector Config */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-orbitron font-bold text-slate-200 uppercase tracking-wider">Packages & Denominations</h4>
              <button
                type="button"
                onClick={addPackageRow}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Package Name (e.g. 60 UC)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-1 bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                  />
                  <input
                    type="number"
                    placeholder="Price IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-32 bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded-lg px-3 py-1.5 text-xs text-slate-100"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackageRow(idx)}
                      className="text-slate-500 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{productToEdit ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
