import React, { useState } from 'react';
import { Package, Tag, Layers, DollarSign, Image, CheckSquare } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'mobile',
    platform: initialData?.platform || 'PC',
    type: initialData?.type || 'Top-Up',
    price: initialData?.price || '',
    oldPrice: initialData?.oldPrice || '',
    stock: initialData?.stock || 100,
    rating: initialData?.rating || 4.9,
    soldCount: initialData?.soldCount || 0,
    tag: initialData?.tag || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    isFlashDeal: initialData?.isFlashDeal || false,
    isTopRated: initialData?.isTopRated || false,
  });

  const [packages, setPackages] = useState(
    initialData?.packages && initialData.packages.length > 0
      ? initialData.packages
      : [{ name: '', price: '' }]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const addPackageField = () => {
    setPackages([...packages, { name: '', price: '' }]);
  };

  const removePackageField = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Filter valid packages
    const cleanPackages = packages
      .filter((pkg) => pkg.name.trim() && pkg.price)
      .map((pkg) => ({
        name: pkg.name.trim(),
        price: Number(pkg.price),
        oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null,
      }));

    const finalProduct = {
      ...formData,
      price: Number(formData.price) || (cleanPackages.length > 0 ? cleanPackages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: cleanPackages,
    };

    onSubmit(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0e1c] p-6 rounded-2xl border border-slate-800 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Package className="w-5 h-5 text-cyan-400" />
          <span>{initialData ? 'Edit Product' : 'Add New Product'}</span>
        </h3>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Product Title
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile UC"
            className="w-full bg-slate-900 text-sm text-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Image URL (Optional)
          </label>
          <div className="relative">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://cdn.akamai.steamstatic.com/..."
              className="w-full bg-slate-900 text-sm text-slate-100 pl-9 pr-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <Image className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Category / Platform / Type */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="games">PC & Console Games</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Platform
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>
      </div>

      {/* Pricing and Stock */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Base Price (IQD)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="1500"
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Old Price (IQD)
          </label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="2000"
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Stock Count
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Badge Tag
          </label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="Hot, Top Seller"
            className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief product details and fulfillment info..."
          className="w-full bg-slate-900 text-sm text-slate-100 px-3 py-2 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Packages Section */}
      <div className="pt-2 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Package Options (Multi-tier pricing)
          </label>
          <button
            type="button"
            onClick={addPackageField}
            className="text-xs text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg"
          >
            + Add Package
          </button>
        </div>

        {packages.map((pkg, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 text-xs text-slate-100 px-3 py-2 rounded-lg border border-slate-800"
            />
            <input
              type="number"
              placeholder="Price IQD"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-28 bg-slate-900 text-xs text-slate-100 px-3 py-2 rounded-lg border border-slate-800"
            />
            {packages.length > 1 && (
              <button
                type="button"
                onClick={() => removePackageField(idx)}
                className="text-slate-500 hover:text-red-400 px-2 text-xs"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Checkboxes Section */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-slate-300 font-semibold">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="rounded text-cyan-500 focus:ring-0 bg-slate-900"
          />
          <span>Hero / Featured</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="rounded text-cyan-500 focus:ring-0 bg-slate-900"
          />
          <span>New & Trending</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="rounded text-cyan-500 focus:ring-0 bg-slate-900"
          />
          <span>Flash Deals</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="rounded text-cyan-500 focus:ring-0 bg-slate-900"
          />
          <span>Top Rated</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 text-xs font-black shadow-lg shadow-cyan-500/20"
        >
          {initialData ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
