import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Plus, Save, X, Trash2 } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: true,
    packages: [{ name: 'Standard Package', price: '' }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || '',
        oldPrice: initialData.oldPrice || '',
        image: initialData.image || '',
        packages: initialData.packages && initialData.packages.length > 0
          ? initialData.packages
          : [{ name: 'Standard Package', price: initialData.price || '' }]
      });
    }
  }, [initialData]);

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index][field] = field === 'price' ? Number(value) || '' : value;
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }]
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length === 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const basePrice = Number(formData.price) || (formData.packages[0] ? Number(formData.packages[0].price) : 0);
    onSubmit({
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      packages: formData.packages.map(p => ({ name: p.name, price: Number(p.price) || basePrice }))
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0c1021] border border-[#1a223e] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            placeholder="e.g. PUBG Mobile UC"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Badge</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter(p => p.id !== 'all').map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Type Badge</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (IQD)</label>
          <input
            type="number"
            required
            placeholder="1500"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Original Price (IQD - For Discount)</label>
          <input
            type="number"
            placeholder="2000"
            value={formData.oldPrice}
            onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional - Steam CDN or official image)</label>
        <input
          type="url"
          placeholder="https://cdn.akamai.steamstatic.com/steam/apps/..."
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1">Product Description</label>
        <textarea
          rows={3}
          required
          placeholder="Enter product features, delivery instructions, and terms..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Packages Section */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">Packages / Quantities</label>
          <button
            type="button"
            onClick={addPackage}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              required
              placeholder="Package Name (e.g. 60 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-slate-100"
            />
            <input
              type="number"
              required
              placeholder="Price IQD"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-32 bg-slate-900 border border-slate-800 rounded-xl py-1.5 px-3 text-xs text-slate-100"
            />
            {formData.packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackage(idx)}
                className="p-1.5 text-slate-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 text-xs font-extrabold flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
