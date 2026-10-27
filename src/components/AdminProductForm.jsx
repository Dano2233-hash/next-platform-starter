import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, X, Image as ImageIcon } from 'lucide-react';

const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: 5000,
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: 5000, oldPrice: '' }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price || 0,
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 100,
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ name: 'Default', price: product.price || 0, oldPrice: '' }]
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updatedPkgs = [...formData.packages];
    updatedPkgs[index][field] = field === 'price' || field === 'oldPrice' ? (value ? Number(value) : '') : value;
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: 1000, oldPrice: '' }]
    });
  };

  const removePackageRow = (index) => {
    if (formData.packages.length <= 1) return;
    const updatedPkgs = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: updatedPkgs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowestPkgPrice = formData.packages.length > 0
      ? Math.min(...formData.packages.map(p => p.price || 0))
      : Number(formData.price);

    const lowestPkgOldPrice = formData.packages.length > 0
      ? formData.packages[0].oldPrice
      : formData.oldPrice;

    const finalProduct = {
      ...formData,
      price: lowestPkgPrice,
      oldPrice: lowestPkgOldPrice ? Number(lowestPkgOldPrice) : null,
      stock: Number(formData.stock)
    };

    onSave(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-base font-extrabold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
            placeholder="e.g. PUBG Mobile UC"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="mobile">Mobile Top-Ups</option>
            <option value="pc">PC Gaming</option>
            <option value="xbox">Xbox Games</option>
            <option value="playstation">PlayStation</option>
            <option value="giftcards">Gift Cards</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform</label>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="Mobile">Mobile</option>
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
          >
            <option value="Top-Up">Top-Up</option>
            <option value="Game">Game</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1">Image URL (Leave empty to use automatic ProductVisual gradient)</label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
            placeholder="https://cdn.akamai.steamstatic.com/..."
          />
        </div>

        {/* Stock & Tag */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Tag / Badge (e.g. Bestseller, HOT)</label>
          <input
            type="text"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-cyan-500"
            placeholder="Bestseller"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
        <textarea
          rows="2"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-xs rounded-xl px-3 py-2 outline-none focus:border-cyan-500"
        />
      </div>

      {/* Package Management */}
      <div className="space-y-3 pt-2 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider">
            Product Packages & Pricing (IQD)
          </label>
          <button
            type="button"
            onClick={addPackageRow}
            className="px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-900/50 cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="space-y-2">
          {formData.packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
              <input
                type="text"
                placeholder="Package Name (e.g. 60 UC)"
                value={pkg.name}
                onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 text-slate-100 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Price (IQD)"
                value={pkg.price}
                onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                className="w-28 bg-slate-950 border border-slate-800 text-cyan-400 font-bold text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500"
              />
              <input
                type="number"
                placeholder="Old Price"
                value={pkg.oldPrice || ''}
                onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                className="w-24 bg-slate-950 border border-slate-800 text-slate-400 text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-cyan-500"
              />
              {formData.packages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageRow(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Feature Flags */}
      <div className="pt-2 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTrending}
            onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>New & Trending</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isFlashDeal}
            onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isTopRated}
            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
            className="rounded border-slate-700 bg-slate-900 text-cyan-500 focus:ring-0"
          />
          <span>Top Rated</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold hover:bg-slate-800 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-md shadow-cyan-950 cursor-pointer flex items-center gap-1.5"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
