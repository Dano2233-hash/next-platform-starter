import React, { useState, useEffect } from 'react';
import { Plus, Trash, HelpCircle } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    slug: '',
    category: 'all',
    platform: 'PC',
    type: 'Game',
    price: 0,
    oldPrice: 0,
    description: '',
    image: '',
    stock: 100,
    rating: 4.8,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: []
  });

  const [packageInput, setPackageInput] = useState({ name: '', price: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        price: initialData.price || 0,
        oldPrice: initialData.oldPrice || 0,
        packages: initialData.packages || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Automated slug helper
  const handleNameChange = (e) => {
    const nameVal = e.target.value;
    const generatedSlug = nameVal
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-');

    setFormData((prev) => ({
      ...prev,
      name: nameVal,
      slug: prev.slug && initialData ? prev.slug : generatedSlug,
      id: prev.id && initialData ? prev.id : generatedSlug
    }));
  };

  const handleAddPackage = () => {
    if (!packageInput.name.trim() || !packageInput.price) {
      alert('Package Name and Price are required.');
      return;
    }
    const newPackage = {
      id: `${formData.id || 'prod'}-${Date.now()}`,
      name: packageInput.name.trim(),
      price: parseInt(packageInput.price, 10)
    };
    setFormData((prev) => {
      const updatedPackages = [...prev.packages, newPackage];
      // Update lowest package price automatically
      const lowestPrice = Math.min(...updatedPackages.map((p) => p.price));
      return {
        ...prev,
        packages: updatedPackages,
        price: lowestPrice
      };
    });
    setPackageInput({ name: '', price: '' });
  };

  const handleRemovePackage = (pkgId) => {
    setFormData((prev) => {
      const updatedPackages = prev.packages.filter((p) => p.id !== pkgId);
      const lowestPrice = updatedPackages.length > 0 ? Math.min(...updatedPackages.map((p) => p.price)) : 0;
      return {
        ...prev,
        packages: updatedPackages,
        price: lowestPrice
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product Name is required.');
      return;
    }
    if (!formData.slug.trim()) {
      setError('Product Slug is required.');
      return;
    }
    if (formData.packages.length === 0) {
      setError('At least one package option is required.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0c0d12] p-6 rounded-xl border border-[#1a1e29]">
      <h3 className="text-lg font-black text-white">
        {initialData ? 'Edit Product Details' : 'Create New Product'}
      </h3>

      {error && <p className="text-xs text-red-500 font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            placeholder="e.g. PUBG Mobile 60 UC"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none focus:border-[#00e5ff]"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Product Slug / URL ID</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. pubg-mobile-60-uc"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
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

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Platform Badge</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Product Type Badge</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Image URL (Optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste exact link or leave blank for custom visual"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Stock Level</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="e.g. 100"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Old Price */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Old Price (IQD - Optional)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="e.g. 25000"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Initial Rating</label>
          <input
            type="number"
            step="0.1"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Sold Count */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Sold Count</label>
          <input
            type="number"
            name="soldCount"
            value={formData.soldCount}
            onChange={handleChange}
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>

        {/* Tag */}
        <div>
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Promo Tag</label>
          <input
            type="text"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            placeholder="e.g. hot, sale, new, coming-soon"
            className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Product Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Detailed product info for customers..."
          className="w-full bg-[#050505] text-sm text-gray-200 px-4 py-2.5 rounded-lg border border-[#1a1e29] focus:outline-none"
        />
      </div>

      {/* Grid check boxes */}
      <div className="bg-[#050505] p-4 rounded-lg border border-[#1a1e29] grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-300">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="accent-[#00e5ff]"
          />
          Featured Section
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-300">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="accent-[#00e5ff]"
          />
          Trending Section
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-300">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="accent-[#00e5ff]"
          />
          Flash Deal Section
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-300">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="accent-[#00e5ff]"
          />
          Top Rated Section
        </label>
      </div>

      {/* Package manager */}
      <div className="bg-[#050505] p-5 rounded-lg border border-[#1a1e29]">
        <h4 className="text-xs font-black uppercase text-gray-300 tracking-wider mb-3">Package Options & Pricing</h4>
        <p className="text-[11px] text-gray-400 mb-4">Every product needs at least one package option (e.g. "60 UC" with price 1250 IQD).</p>

        {/* Existing package list */}
        <div className="space-y-2.5 mb-4">
          {formData.packages.map((pkg, idx) => (
            <div key={pkg.id || idx} className="flex items-center justify-between p-2 px-3 rounded bg-[#0c0d12] border border-[#1a1e29]">
              <span className="text-xs font-bold text-white">{pkg.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#00e5ff]">{pkg.price} IQD</span>
                <button
                  type="button"
                  onClick={() => handleRemovePackage(pkg.id)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer"
                >
                  <Trash size={13} />
                </button>
              </div>
            </div>
          ))}
          {formData.packages.length === 0 && (
            <p className="text-xs text-amber-500/80 font-bold italic">No packages added yet. Please add at least one below.</p>
          )}
        </div>

        {/* Add package input inline */}
        <div className="flex gap-2.5">
          <input
            type="text"
            value={packageInput.name}
            onChange={(e) => setPackageInput((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Package name (e.g. 100 Diamonds)"
            className="flex-1 bg-[#0c0d12] text-xs text-gray-200 px-3 py-2 rounded border border-[#1a1e29] focus:outline-none"
          />
          <input
            type="number"
            value={packageInput.price}
            onChange={(e) => setPackageInput((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="Price in IQD"
            className="w-32 bg-[#0c0d12] text-xs text-gray-200 px-3 py-2 rounded border border-[#1a1e29] focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddPackage}
            className="px-4 py-2 bg-[#151824] hover:bg-[#1f2436] rounded border border-[#1a1e29] text-xs font-bold text-white flex items-center gap-1 cursor-pointer select-none"
          >
            <Plus size={13} />
            Add
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3.5 pt-4 border-t border-[#1a1e29]">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg text-xs font-bold border border-[#1a1e29] hover:bg-[#151824] text-gray-300 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-lg text-xs font-black bg-[#0066ff] hover:bg-[#0052cc] text-white cursor-pointer select-none"
        >
          {initialData ? 'Save Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
