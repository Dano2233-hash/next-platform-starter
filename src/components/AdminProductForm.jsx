import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X } from 'lucide-react';

export default function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'games',
    platform: 'PC',
    type: 'Game',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    packages: [],
    stock: 99,
    rating: 4.8,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false
  });

  const [newPackage, setNewPackage] = useState({ name: '', price: '' });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        oldPrice: product.oldPrice || '',
        packages: product.packages || []
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Quick package management
  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price) return;
    const priceNum = parseFloat(newPackage.price);
    if (isNaN(priceNum)) return;

    const pkgId = newPackage.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setFormData((prev) => ({
      ...prev,
      packages: [...prev.packages, { id: pkgId, name: newPackage.name, price: priceNum }]
    }));
    setNewPackage({ name: '', price: '' });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((pkg) => pkg.id !== pkgId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Product name is required!");
      return;
    }

    // Auto generate ID and Slug if not present
    const finalProduct = { ...formData };
    if (!finalProduct.id) {
      finalProduct.id = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    finalProduct.slug = finalProduct.id;
    finalProduct.price = parseFloat(finalProduct.price) || 0;
    finalProduct.oldPrice = finalProduct.oldPrice ? parseFloat(finalProduct.oldPrice) : null;
    finalProduct.stock = parseInt(finalProduct.stock) || 0;
    finalProduct.rating = parseFloat(finalProduct.rating) || 5.0;
    finalProduct.soldCount = parseInt(finalProduct.soldCount) || 0;

    onSave(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0a0f1d] border border-blue-500/15 p-6 rounded-2xl max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <h3 className="text-base font-black text-white uppercase tracking-wider">
          {product ? "EDIT PRODUCT" : "CREATE NEW PRODUCT"}
        </h3>
        <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white transition">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Elden Ring"
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-2 pr-2 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          >
            <option value="games">Paid Games</option>
            <option value="mobile">Mobile Top-Ups</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-2 pr-2 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-2 pr-2 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Tag badge */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Tag / Promo Text</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="e.g. Flash Deals, New & Trending"
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Base Price (IQD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
            required
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Old Price (IQD, Optional)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Image CDN URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Stock, Rating, Sold Count */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Rating</label>
          <input
            type="number"
            step="0.1"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sold Count</label>
          <input
            type="number"
            name="soldCount"
            value={formData.soldCount}
            onChange={handleChange}
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the product or instructions on how to activate..."
            className="w-full bg-black/50 text-sm text-gray-200 pl-3 pr-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Package management section */}
      <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">PACKAGES / PRICING OPTIONS</h4>

        {formData.packages.length > 0 && (
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {formData.packages.map((pkg) => (
              <div key={pkg.id} className="flex items-center justify-between p-2 rounded bg-[#050505] text-xs">
                <span className="font-semibold text-gray-200">{pkg.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-black text-cyan-300">{pkg.price} IQD</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePackage(pkg.id)}
                    className="text-gray-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={newPackage.name}
            onChange={(e) => setNewPackage((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Package name (e.g. 60 UC)"
            className="flex-1 bg-black/50 text-xs text-gray-200 px-3 py-1.5 rounded border border-white/5 focus:outline-none"
          />
          <input
            type="number"
            value={newPackage.price}
            onChange={(e) => setNewPackage((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="Price (IQD)"
            className="w-24 bg-black/50 text-xs text-gray-200 px-3 py-1.5 rounded border border-white/5 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Section badges: Featured, Trending, Flash Deals, Top Rated */}
      <div className="bg-black/20 border border-white/5 rounded-xl p-4">
        <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3">HOMEPAGE PLACEMENTS</h4>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="rounded bg-black border-white/10 text-cyan-500 focus:ring-0"
            />
            <span>Featured Product</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="rounded bg-black border-white/10 text-cyan-500 focus:ring-0"
            />
            <span>Trending Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input
              type="checkbox"
              name="isFlashDeal"
              checked={formData.isFlashDeal}
              onChange={handleChange}
              className="rounded bg-black border-white/10 text-cyan-500 focus:ring-0"
            />
            <span>Flash Deals Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated}
              onChange={handleChange}
              className="rounded bg-black border-white/10 text-cyan-500 focus:ring-0"
            />
            <span>Top Rated Section</span>
          </label>
        </div>
      </div>

      {/* Submit / Cancel Buttons */}
      <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-black uppercase text-white shadow-md shadow-cyan-950/40"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
}
