import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ product = null, onSave, onClose }) {
  const [formData, setFormData] = useState(() => {
    if (product) {
      return {
        ...product,
        packages: product.packages ? [...product.packages] : []
      };
    }
    return {
      id: '',
      name: '',
      slug: '',
      category: 'pc',
      platform: 'PC',
      type: 'Game',
      price: 0,
      oldPrice: 0,
      description: '',
      image: '',
      packages: [],
      stock: 100,
      rating: 4.8,
      soldCount: 0,
      tag: '',
      isFeatured: false,
      isTrending: false,
      isFlashDeal: false,
      isTopRated: false
    };
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddPackage = () => {
    if (!packageInput.name.trim() || !packageInput.price) {
      setError('Both Package Name and Price are required to add a package.');
      return;
    }
    setError('');
    const newPackage = {
      name: packageInput.name,
      price: parseInt(packageInput.price, 10)
    };
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, newPackage],
      // Automatically keep base price synced to the cheapest package if desired
      price: prev.packages.length === 0 ? newPackage.price : Math.min(prev.price, newPackage.price)
    }));
    setPackageInput({ name: '', price: '' });
  };

  const handleRemovePackage = (index) => {
    setFormData((prev) => {
      const updatedPackages = prev.packages.filter((_, i) => i !== index);
      return {
        ...prev,
        packages: updatedPackages
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product Name is required.');
      return;
    }

    const finalSlug = formData.slug.trim()
      ? formData.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const finalId = formData.id.trim() || `prod-${Date.now()}`;

    // Ensure price is at least first package price if packages exist
    let finalPrice = parseInt(formData.price, 10) || 0;
    if (formData.packages.length > 0) {
      finalPrice = formData.packages[0].price;
    }

    onSave({
      ...formData,
      id: finalId,
      slug: finalSlug,
      price: finalPrice,
      oldPrice: parseInt(formData.oldPrice, 10) || 0,
      stock: parseInt(formData.stock, 10) || 0,
      rating: parseFloat(formData.rating) || 4.5,
      soldCount: parseInt(formData.soldCount, 10) || 0
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 select-none">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-[#090912] border border-white/5 rounded-2xl w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-purple-950/20 to-cyan-950/20">
          <h3 className="text-white font-black uppercase tracking-wider text-base">
            {product ? 'Edit Product Catalog' : 'Add New Game/Service'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 text-sm text-gray-200">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-red-400 font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="e.g. Minecraft Java & Bedrock"
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Slug (URL Name)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="e.g. minecraft-java-bedrock (leave blank to auto-generate)"
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="pc">PC Games & Points</option>
                <option value="xbox">Xbox Store</option>
                <option value="playstation">PlayStation Store</option>
                <option value="mobile">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            {/* Platform */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Platform Badge</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Mobile">Mobile</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            {/* Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Product Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image CDN */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="e.g. Steam header CDN link"
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Tag */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Marketing Tag / Promo Label</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                onChange={handleInputChange}
                placeholder="e.g. Hot Deal, Best Seller, New"
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={2}
              placeholder="Provide a clear, brief marketing pitch or details..."
              className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Base Price */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Base Price (IQD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Old Price (For Sale)</label>
              <input
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
              />
            </div>

            {/* Stock Count */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Current Stock Count</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Rating Star (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Packages configuration */}
          <div className="border border-white/5 rounded-xl p-4 space-y-3 bg-[#0a0a14]">
            <h4 className="text-xs font-black uppercase text-cyan-400 tracking-wider">
              Manage Multi-pricing Packages / Top-Up Options
            </h4>

            {/* Packages listing */}
            {formData.packages.length > 0 && (
              <div className="space-y-2">
                {formData.packages.map((pkg, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#111124] border border-white/5 p-2 rounded-lg">
                    <span className="text-xs font-bold text-gray-300">
                      {pkg.name} &mdash; <span className="text-cyan-400">{pkg.price} IQD</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      className="text-gray-400 hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Package Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Option Name</label>
                <input
                  type="text"
                  placeholder="e.g. 60 UC"
                  value={packageInput.name}
                  onChange={(e) => setPackageInput((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-[#111122] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase">Option Price (IQD)</label>
                <input
                  type="number"
                  placeholder="e.g. 1400"
                  value={packageInput.price}
                  onChange={(e) => setPackageInput((prev) => ({ ...prev, price: e.target.value }))}
                  className="w-full bg-[#111122] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddPackage}
                className="bg-[#191932] hover:bg-[#252549] text-cyan-400 border border-cyan-800/40 font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>
          </div>

          {/* Section: Manage sections placement checkbox */}
          <div className="border border-white/5 rounded-xl p-4 bg-[#0a0a14] space-y-2">
            <h4 className="text-xs font-black uppercase text-purple-400 tracking-wider">
              Admin Placements / Homepage Sections
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="rounded border-white/10 bg-[#111122] text-purple-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Hero / Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleInputChange}
                  className="rounded border-white/10 bg-[#111122] text-purple-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Trending Row</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleInputChange}
                  className="rounded border-white/10 bg-[#111122] text-purple-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Flash Deals</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleInputChange}
                  className="rounded border-white/10 bg-[#111122] text-purple-600 focus:ring-0 focus:ring-offset-0"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="border-t border-white/5 pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl border border-white/5 hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white transition-all text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/20"
            >
              {product ? 'Apply Changes' : 'Publish Product'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
