import React, { useState } from 'react';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminProductForm({ initialProduct = null, onSubmit, onCancel }) {
  const [productData, setProductData] = useState(() => {
    if (initialProduct) {
      return {
        ...initialProduct,
        packages: initialProduct.packages || [{ name: 'Standard', price: initialProduct.price || 0 }]
      };
    }
    return {
      name: '',
      slug: '',
      category: 'mobile-topups',
      platform: 'Mobile',
      type: 'Top-Up',
      price: 10000,
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
      isTopRated: false,
      packages: [{ name: 'Standard Package', price: 10000 }]
    };
  });

  const handlePackageChange = (index, field, value) => {
    const updated = [...productData.packages];
    updated[index] = {
      ...updated[index],
      [field]: field === 'price' ? Number(value) : value
    };
    setProductData({ ...productData, packages: updated });
  };

  const addPackage = () => {
    setProductData({
      ...productData,
      packages: [...productData.packages, { name: 'New Package', price: productData.price || 0 }]
    });
  };

  const removePackage = (index) => {
    if (productData.packages.length <= 1) return;
    setProductData({
      ...productData,
      packages: productData.packages.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-0]/g, '-');
    onSubmit({
      ...productData,
      slug,
      price: Number(productData.price),
      oldPrice: productData.oldPrice ? Number(productData.oldPrice) : null,
      stock: Number(productData.stock),
      rating: Number(productData.rating),
      soldCount: Number(productData.soldCount)
    });
  };

  return (
    <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
        <h3 className="text-lg font-bold text-slate-100">
          {initialProduct ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              placeholder="e.g. PUBG Mobile UC"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Slug (URL string)</label>
            <input
              type="text"
              value={productData.slug}
              onChange={(e) => setProductData({ ...productData, slug: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
              placeholder="pubg-mobile-uc"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={productData.category}
              onChange={(e) => setProductData({ ...productData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="mobile-topups">Mobile Top-Ups</option>
              <option value="pc-games">PC Games</option>
              <option value="console-games">Console Games</option>
              <option value="gift-cards">Gift Cards</option>
              <option value="subscriptions">Subscriptions</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
            <select
              value={productData.platform}
              onChange={(e) => setProductData({ ...productData, platform: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="Mobile">Mobile</option>
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="PlayStation">PlayStation</option>
              <option value="Gift Card">Gift Card</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
            <select
              value={productData.type}
              onChange={(e) => setProductData({ ...productData, type: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            >
              <option value="Top-Up">Top-Up</option>
              <option value="Game">Game</option>
              <option value="Gift Card">Gift Card</option>
              <option value="Subscription">Subscription</option>
              <option value="Account">Account</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Starting Price (IQD) *</label>
            <input
              type="number"
              required
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
            <input
              type="number"
              value={productData.oldPrice}
              onChange={(e) => setProductData({ ...productData, oldPrice: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Quantity</label>
            <input
              type="number"
              value={productData.stock}
              onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL (Optional)</label>
          <input
            type="text"
            value={productData.image}
            onChange={(e) => setProductData({ ...productData, image: e.target.value })}
            placeholder="https://cdn.akamai.steamstatic.com/..."
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
          <textarea
            rows={3}
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        {/* Package variations */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-slate-300">Package Variations</label>
            <button
              type="button"
              onClick={addPackage}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-bold"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package
            </button>
          </div>
          <div className="space-y-2">
            {productData.packages.map((pkg, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 600 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                />
                <input
                  type="number"
                  placeholder="Price (IQD)"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100"
                />
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400"
                  disabled={productData.packages.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section Flags */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Section Visibility Flags</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'isFeatured', label: 'Featured Section' },
              { key: 'isTrending', label: 'New & Trending' },
              { key: 'isFlashDeal', label: 'Flash Deals' },
              { key: 'isTopRated', label: 'Top Rated' }
            ].map((flag) => (
              <label
                key={flag.key}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer text-xs font-medium text-slate-300"
              >
                <input
                  type="checkbox"
                  checked={productData[flag.key]}
                  onChange={(e) => setProductData({ ...productData, [flag.key]: e.target.checked })}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-500"
                />
                <span>{flag.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs shadow-md"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
