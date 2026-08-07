import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    platform: 'PC',
    category: 'pc',
    type: 'Game',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false
  });

  const [packages, setPackages] = useState([{ name: 'Standard Edition', price: 0 }]);

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        oldPrice: product.oldPrice || '',
        tag: product.tag || ''
      });
      if (product.packages && product.packages.length > 0) {
        setPackages(product.packages);
      } else {
        setPackages([{ name: 'Standard Edition', price: product.price }]);
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updated = packages.map((pkg, idx) => {
      if (idx === index) {
        return {
          ...pkg,
          [field]: field === 'price' ? Number(value) || 0 : value
        };
      }
      return pkg;
    });
    setPackages(updated);

    // Sync minimum price to base price
    if (updated.length > 0) {
      const minPrice = Math.min(...updated.map((p) => p.price));
      setFormData((prev) => ({ ...prev, price: minPrice }));
    }
  };

  const addPackageRow = () => {
    setPackages((prev) => [...prev, { id: `pkg-${Date.now()}`, name: '', price: 0 }]);
  };

  const removePackageRow = (index) => {
    if (packages.length <= 1) return;
    const updated = packages.filter((_, idx) => idx !== index);
    setPackages(updated);

    const minPrice = Math.min(...updated.map((p) => p.price));
    setFormData((prev) => ({ ...prev, price: minPrice }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) return alert('Name is required');

    const formattedPackages = packages
      .filter((pkg) => pkg.name.trim() !== '')
      .map((pkg) => ({
        id: pkg.id || `pkg-${Math.random().toString(36).substr(2, 9)}`,
        name: pkg.name,
        price: Number(pkg.price) || 0
      }));

    const finalProduct = {
      ...formData,
      price: formattedPackages.length > 0 ? Math.min(...formattedPackages.map((p) => p.price)) : Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: formattedPackages
    };

    onSave(finalProduct);
  };

  const platforms = ['PC', 'Xbox', 'PlayStation', 'Mobile', 'Gift Card'];
  const categoriesList = [
    { id: 'pc', name: 'PC Gaming' },
    { id: 'xbox', name: 'Xbox Gaming' },
    { id: 'playstation', name: 'PlayStation' },
    { id: 'mobile', name: 'Mobile Top-Ups' },
    { id: 'giftcards', name: 'Gift Cards' },
    { id: 'subscriptions', name: 'Subscriptions' },
    { id: 'others', name: 'Others' }
  ];
  const types = ['Game', 'Top-Up', 'Gift Card', 'Subscription', 'Account'];
  const tags = ['', 'Coming Soon', 'Top Sales', 'Flash Deals', 'New & Trending', 'Top Rated'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0a0a14] p-6 rounded-lg border border-slate-800 text-slate-200">
      <h3 className="text-base font-extrabold uppercase tracking-wider text-white border-b border-slate-900 pb-3">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Platform */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          >
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          >
            {categoriesList.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Old Price */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Old Price (IQD - optional)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Tag */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Visual Tag</label>
          <select
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          >
            {tags.map((t) => (
              <option key={t} value={t}>{t || 'None'}</option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Stock Count</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Rating (e.g. 4.8)</label>
          <input
            type="number"
            step="0.1"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Sold Count */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Sold Count</label>
          <input
            type="number"
            name="soldCount"
            value={formData.soldCount}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Image URL */}
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase text-slate-400 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-600"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
        ></textarea>
      </div>

      {/* Packages / Price Options */}
      <div className="border-t border-slate-900/80 pt-4">
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs font-extrabold uppercase text-slate-300">Package Packages * (At least 1 required)</label>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="e.g. 60 UC, Standard Edition"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                required
                className="flex-grow bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price || ''}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                required
                className="w-32 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => removePackageRow(idx)}
                disabled={packages.length <= 1}
                className="p-2 text-red-500 hover:text-red-400 bg-slate-900 border border-slate-800 hover:border-red-500/20 rounded disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Flags / Custom Sections */}
      <div className="border-t border-slate-900/80 pt-4">
        <label className="text-xs font-bold uppercase text-slate-400 block mb-3">Homepage Section Management</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="accent-cyan-500 h-4 w-4"
            />
            <span className="text-xs text-slate-300 font-medium">Featured Section</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
              className="accent-cyan-500 h-4 w-4"
            />
            <span className="text-xs text-slate-300 font-medium">New & Trending</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isFlashDeal"
              checked={formData.isFlashDeal}
              onChange={handleChange}
              className="accent-cyan-500 h-4 w-4"
            />
            <span className="text-xs text-slate-300 font-medium">Flash Deals</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              name="isTopRated"
              checked={formData.isTopRated}
              onChange={handleChange}
              className="accent-cyan-500 h-4 w-4"
            />
            <span className="text-xs text-slate-300 font-medium">Top Rated</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="border-t border-slate-900/80 pt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold uppercase tracking-wider rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-black font-black text-xs uppercase tracking-wider rounded"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
