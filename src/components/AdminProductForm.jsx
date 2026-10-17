import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Check } from 'lucide-react';

export default function AdminProductForm({ initialProduct, onSave, onCancel }) {
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
    rating: 4.9,
    soldCount: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ id: 'p1', name: '', price: 0 }]
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        ...initialProduct,
        packages: initialProduct.packages && initialProduct.packages.length > 0
          ? initialProduct.packages
          : [{ id: 'p1', name: initialProduct.name, price: initialProduct.price }]
      });
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const newPkgs = [...formData.packages];
    newPkgs[index][field] = field === 'price' ? parseFloat(value) || 0 : value;
    setFormData(prev => ({ ...prev, packages: newPkgs }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { id: `p-${Date.now()}`, name: '', price: 0 }]
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
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = formData.id || `prod-${Date.now()}`;
    const price = formData.packages.length > 0 ? formData.packages[0].price : parseFloat(formData.price);

    onSave({
      ...formData,
      id,
      slug,
      price,
      oldPrice: parseFloat(formData.oldPrice) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      rating: parseFloat(formData.rating) || 4.9,
      soldCount: parseInt(formData.soldCount, 10) || 100
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <h3 className="text-lg font-extrabold text-white">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-slate-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-slate-400">Product Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-400">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            >
              <option value="mobile">Mobile Top-Ups</option>
              <option value="games">Paid Games</option>
              <option value="gift-cards">Gift Cards</option>
              <option value="subscriptions">Subscriptions</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-400">Platform *</label>
            <select
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            >
              <option value="Mobile">Mobile</option>
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Gift Card">Gift Card</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-400">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-slate-400">Old Price (IQD) for discount badge</label>
            <input
              type="number"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-slate-400">Stock Count *</label>
            <input
              type="number"
              name="stock"
              required
              value={formData.stock}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-slate-400">Image URL (Steam CDN or HTTPS URL)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-slate-400">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
          />
        </div>

        {/* Packages Section */}
        <div className="pt-2 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-white">Packages & Prices (IQD)</span>
            <button
              type="button"
              onClick={addPackage}
              className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>

          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Package Name (e.g., 60 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              <input
                type="number"
                placeholder="Price IQD"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-32 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-2 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Section Visibility Checkboxes */}
        <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="accent-cyan-500 rounded"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="accent-cyan-500 rounded"
            />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFlashDeal"
              checked={formData.isFlashDeal}
              onChange={handleChange}
              className="accent-cyan-500 rounded"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated}
              onChange={handleChange}
              className="accent-cyan-500 rounded"
            />
            <span>Top Rated</span>
          </label>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Check className="w-4 h-4" /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
