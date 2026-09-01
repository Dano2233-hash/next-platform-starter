import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 1000,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'pkg-1', name: 'Standard', price: 1000 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        oldPrice: product.oldPrice || 0,
        tag: product.tag || '',
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ id: 'pkg-1', name: 'Standard', price: product.price }]
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index] = { ...updated[index], [field]: field === 'price' ? Number(value) : value };
    setFormData(prev => ({ ...prev, packages: updated }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: 'New Package', price: prev.price }
      ]
    }));
  };

  const removePackage = (index) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const finalProduct = {
      ...formData,
      id: product ? product.id : (slug || `product-${Date.now()}`),
      slug: slug || 'product',
      price: Number(formData.price),
      oldPrice: Number(formData.oldPrice) || 0,
      stock: Number(formData.stock),
      rating: product ? product.rating : 4.8,
      soldCount: product ? product.soldCount : 50
    };
    onSave(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#080d2b] border border-cyan-900/40 rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-cyan-900/30 pb-4">
        <h3 className="text-lg font-bold text-white">
          {product ? `Edit Product: ${product.name}` : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="pc">PC Games</option>
            <option value="playstation">PlayStation</option>
            <option value="xbox">Xbox</option>
            <option value="gift-cards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Platform Badge</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Type Badge</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD if on Sale)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Special Tag Badge</label>
          <input
            type="text"
            name="tag"
            placeholder="e.g. Hot, Best Seller, Instant Code"
            value={formData.tag}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
          <input
            type="text"
            name="image"
            placeholder="https://cdn.akamai.steamstatic.com/..."
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-300 mb-1">Product Description</label>
          <textarea
            name="description"
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-[#04081c] border border-cyan-900/40 rounded-xl py-2 px-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Packages Configurator */}
      <div className="border-t border-cyan-900/30 pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-cyan-400">Product Options / Packages</h4>
          <button
            type="button"
            onClick={addPackage}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-500/30"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center gap-2 bg-[#04081c] p-2.5 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 60 UC, 100 Diamonds)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Showcase Section Checkboxes */}
      <div className="border-t border-cyan-900/30 pt-4">
        <h4 className="text-sm font-bold text-cyan-400 mb-3">Homepage Display Sections</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded accent-cyan-500" />
            <span>Featured Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="rounded accent-cyan-500" />
            <span>New & Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} className="rounded accent-cyan-500" />
            <span>Flash Deals</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="rounded accent-cyan-500" />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 border-t border-cyan-900/30 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold hover:bg-slate-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  );
};
