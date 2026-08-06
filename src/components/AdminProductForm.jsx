import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AdminProductForm({ product, onSubmit, onClose }) {
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    category: product?.category || 'top-ups',
    platform: product?.platform || 'mobile',
    type: product?.type || 'Top-Up',
    price: product?.price || 0,
    oldPrice: product?.oldPrice || 0,
    description: product?.description || '',
    image: product?.image || '',
    stock: product?.stock !== undefined ? product?.stock : 99,
    rating: product?.rating || 4.8,
    soldCount: product?.soldCount || 0,
    tag: product?.tag || '',
    isFeatured: product?.isFeatured || false,
    isTrending: product?.isTrending || false,
    isFlashDeal: product?.isFlashDeal || false,
    isTopRated: product?.isTopRated || false,
    packagesString: product?.packages
      ? product.packages.map((pkg) => `${pkg.name}:${pkg.price}`).join(', ')
      : '',
  });

  const [error, setError] = useState('');

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditing ? prev.slug : generateSlug(val),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }

    // Parse packagesString: e.g. "60 UC:1500, 325 UC:7500"
    let parsedPackages = [];
    if (formData.packagesString.trim()) {
      const parts = formData.packagesString.split(',');
      for (let p of parts) {
        const sub = p.split(':');
        if (sub.length !== 2) {
          setError('Packages must be in the format "Name:Price" separated by commas. E.g. "60 UC:1500, 325 UC:7500"');
          return;
        }
        const name = sub[0].trim();
        const price = parseInt(sub[1].trim());
        if (!name || isNaN(price)) {
          setError('Invalid package configuration. Format: Name:Price');
          return;
        }
        parsedPackages.push({
          id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name,
          price,
        });
      }
    }

    // Ensure first price is matching base price if packages are added
    const basePrice = parsedPackages.length > 0 ? parsedPackages[0].price : parseInt(formData.price) || 0;

    const submittedData = {
      ...formData,
      id: product?.id,
      slug: formData.slug || generateSlug(formData.name),
      price: basePrice,
      oldPrice: parseInt(formData.oldPrice) || 0,
      stock: parseInt(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 4.5,
      soldCount: parseInt(formData.soldCount) || 0,
      packages: parsedPackages.length > 0 ? parsedPackages : [{ id: 'standard', name: 'Standard Edition', price: basePrice }],
    };

    onSubmit(submittedData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Form Container */}
      <div className="relative bg-[#0c0c0f] border border-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 z-10">
        <div className="flex items-center justify-between border-b border-slate-900/60 pb-4 mb-6">
          <h3 className="text-lg font-black uppercase tracking-wider text-white">
            {isEditing ? 'Edit Product Details' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-slate-300">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. PUBG Mobile UC"
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Slug</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="pubg-mobile-uc"
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              >
                <option value="games">Paid Games</option>
                <option value="top-ups">Mobile Top-Ups</option>
                <option value="gift-cards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData((prev) => ({ ...prev, platform: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              >
                <option value="pc">PC</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="mobile">Mobile</option>
                <option value="giftcard">Gift Card</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              >
                <option value="Game">Game</option>
                <option value="Top-Up">Top-Up</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Price (IQD)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Old Price */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Old Price (Optional IQD)
              </label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, oldPrice: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData((prev) => ({ ...prev, stock: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Packages */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Packages / Options Configuration
            </label>
            <input
              type="text"
              value={formData.packagesString}
              onChange={(e) => setFormData((prev) => ({ ...prev, packagesString: e.target.value }))}
              placeholder="60 UC:1500, 325 UC:7500, 660 UC:14500"
              className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Format: <strong>Name:Price, Name:Price</strong>. First package will override base product price.
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Product Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Explain product details, features, region limits, etc."
              className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Image URL (Steam Header URL preferred)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                placeholder="https://cdn.akamai.steamstatic.com/steam/apps/.../header.jpg"
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Tag */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Tag</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData((prev) => ({ ...prev, tag: e.target.value }))}
                placeholder="e.g. Sale, Hot, Trending"
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rating */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Rating</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData((prev) => ({ ...prev, rating: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>

            {/* Sold Count */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Sold Count
              </label>
              <input
                type="number"
                value={formData.soldCount}
                onChange={(e) => setFormData((prev) => ({ ...prev, soldCount: e.target.value }))}
                className="w-full bg-slate-950 border border-slate-900 focus:border-[#00e5ff] rounded-xl px-4 py-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Section Options / Switches */}
          <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFeatured: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-800 text-[#00e5ff] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData((prev) => ({ ...prev, isTrending: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-800 text-[#00e5ff] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData((prev) => ({ ...prev, isFlashDeal: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-800 text-[#00e5ff] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData((prev) => ({ ...prev, isTopRated: e.target.checked }))}
                className="w-4 h-4 rounded border-slate-800 text-[#00e5ff] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Top Rated</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-900/60">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0066ff] hover:bg-[#0055dd] text-white font-black uppercase tracking-wider text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#0066ff]/20 cursor-pointer"
            >
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
