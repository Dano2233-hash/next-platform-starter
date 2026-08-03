import React, { useState, useEffect } from 'react';

export default function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'xbox',
    platform: 'Xbox',
    type: 'Game',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    packages: '',
    stock: '',
    rating: '5.0',
    soldCount: '0',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        packages: product.packages ? product.packages.join(', ') : '',
        oldPrice: product.oldPrice || '',
        price: product.price || '',
        stock: product.stock || '0',
        soldCount: product.soldCount || '0',
        rating: product.rating || '5.0'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const pkgArray = formData.packages
      ? formData.packages.split(',').map((p) => p.trim()).filter(Boolean)
      : ['Standard Edition'];

    const formatted = {
      ...formData,
      packages: pkgArray,
      price: parseInt(formData.price) || 0,
      oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) : null,
      stock: parseInt(formData.stock) || 0,
      soldCount: parseInt(formData.soldCount) || 0,
      rating: parseFloat(formData.rating) || 5.0
    };

    onSave(formatted);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#090911] border border-[#121225] p-6 rounded-xl text-xs text-white">
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-cyan-400 border-b border-[#121225] pb-2">
        {product ? '✏️ Edit Product' : '➕ Add New Product'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Product Tag (e.g. Coming Soon, Top Sales)</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          >
            <option value="xbox">Xbox</option>
            <option value="playstation">PlayStation</option>
            <option value="pc">PC Gaming</option>
            <option value="mobile">Mobile Top-Ups</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Packages (comma separated options)</label>
          <input
            type="text"
            name="packages"
            value={formData.packages}
            onChange={handleChange}
            placeholder="Standard Edition, Premium Edition"
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Price (IQD)</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Old Price (IQD, Optional)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            required
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Sold Count</label>
          <input
            type="number"
            name="soldCount"
            value={formData.soldCount}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Rating (e.g. 4.8)</label>
          <input
            type="text"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Product Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Steam header URL, or leave empty for digital gradient fallback"
            className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Product Description</label>
        <textarea
          name="description"
          rows="3"
          required
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-[#05050d] border border-[#121225] rounded p-2 text-white focus:outline-none focus:border-[#00e5ff]"
        />
      </div>

      {/* Promotion sections checkboxes */}
      <div className="bg-[#05050d] border border-[#121225] p-3 rounded space-y-2">
        <label className="block text-[10px] uppercase font-bold text-cyan-400">Promotions Placement</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} />
            Featured Hero
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} />
            Trending Row
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} />
            Flash Deals
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} />
            Top Rated Section
          </label>
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded font-bold uppercase transition-premium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-[#0066ff] to-[#7000ff] hover:glow-blue rounded font-bold uppercase text-black"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
