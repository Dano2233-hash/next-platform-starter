import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';

export default function AdminProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: 0,
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: 'Popular',
    image: '',
    description: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: 1000 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Standard Package', price: product.price || 1000 }]
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index] = {
      ...updatedPkgs[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setFormData(prev => ({
      ...prev,
      packages: updatedPkgs,
      price: updatedPkgs[0] ? updatedPkgs[0].price : prev.price
    }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: 'New Package', price: 5000 }]
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length <= 1) return;
    const updatedPkgs = formData.packages.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      packages: updatedPkgs,
      price: updatedPkgs[0] ? updatedPkgs[0].price : prev.price
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const firstPkgPrice = formData.packages && formData.packages.length > 0 ? formData.packages[0].price : formData.price;

    onSave({
      ...formData,
      slug,
      price: Number(firstPkgPrice)
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">

        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-100">
            {product ? 'Edit Product Details' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Product Title *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. PUBG Mobile UC"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Badge Tag</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                placeholder="e.g. Instant Delivery, Best Seller"
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              >
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="pc">PC Gaming</option>
                <option value="mobile">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Platform *</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Product Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Old Price */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Old Price (IQD)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Stock Count</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>

            {/* Sold Count */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sold Count</label>
              <input
                type="number"
                name="soldCount"
                value={formData.soldCount}
                onChange={handleChange}
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Image URL (Leave empty for automatic fallback visual)
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Product Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the digital key or top-up service..."
              className="w-full bg-[#05070f] border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:border-cyan-500"
            />
          </div>

          {/* Packages Builder */}
          <div className="bg-[#05070f] border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-200">Packages & Variations (IQD)</span>
              <button
                type="button"
                onClick={addPackage}
                className="px-2.5 py-1 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-cyan-900/80"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 60 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-[#090d1a] border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Price in IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 bg-[#090d1a] border border-slate-800 rounded-lg px-3 py-1.5 text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  disabled={formData.packages.length <= 1}
                  className="p-1.5 text-slate-500 hover:text-red-400 disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Checkbox Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#05070f] border border-slate-800 rounded-xl p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300 font-semibold">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300 font-semibold">Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isFlashDeal"
                checked={formData.isFlashDeal}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300 font-semibold">Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isTopRated"
                checked={formData.isTopRated}
                onChange={handleChange}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span className="text-slate-300 font-semibold">Top Rated</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-950/50"
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
