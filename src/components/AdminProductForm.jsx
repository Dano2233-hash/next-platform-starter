import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';

export function AdminProductForm({ product = null, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'mobile',
    type: 'Top-Up',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: '100',
    tag: '',
    rating: '5.0',
    soldCount: '0',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: '' }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'mobile',
        type: product.type || 'Top-Up',
        price: product.price !== undefined ? product.price.toString() : '',
        oldPrice: product.oldPrice ? product.oldPrice.toString() : '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock.toString() : '100',
        tag: product.tag || '',
        rating: product.rating || '5.0',
        soldCount: product.soldCount !== undefined ? product.soldCount.toString() : '0',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages.map((pkg) => ({ name: pkg.name, price: pkg.price.toString() }))
          : [{ name: 'Standard Package', price: product.price ? product.price.toString() : '' }],
      });
    }
  }, [product]);

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }],
    });
  };

  const removePackage = (index) => {
    if (formData.packages.length === 1) return;
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return alert('Product Name is required');

    const formattedPackages = formData.packages.map((pkg) => ({
      name: pkg.name || 'Package',
      price: parseFloat(pkg.price) || parseFloat(formData.price) || 0,
    }));

    const productPayload = {
      ...product,
      name: formData.name.trim(),
      category: formData.category,
      platform: formData.platform,
      type: formData.type,
      price: parseFloat(formData.price) || (formattedPackages[0]?.price || 0),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      description: formData.description.trim(),
      image: formData.image.trim(),
      stock: parseInt(formData.stock, 10) || 0,
      tag: formData.tag.trim(),
      rating: parseFloat(formData.rating) || 5.0,
      soldCount: parseInt(formData.soldCount, 10) || 0,
      isFeatured: formData.isFeatured,
      isTrending: formData.isTrending,
      isFlashDeal: formData.isFlashDeal,
      isTopRated: formData.isTopRated,
      packages: formattedPackages,
    };

    onSave(productPayload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl my-8">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 max-h-[75vh] overflow-y-auto pr-1">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. PUBG Mobile UC"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="games">Paid Games</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="mobile">Mobile</option>
                <option value="pc">PC</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="giftcard">Gift Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Price, Old Price, Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Price (IQD) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1500"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Old Price (IQD)
              </label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="2000"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Stock Count *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="100"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Image URL & Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Image URL (Steam CDN / HTTPS)
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://cdn.akamai.steamstatic.com/..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
              <p className="text-[10px] text-slate-500 mt-1">Leave blank to use automatic ProductVisual gradient fallback</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                Badge Tag (e.g. Best Seller)
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Instant Delivery"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Short description of the game or top-up..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Packages Manager */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Product Packages & Price Options
              </label>
              <button
                type="button"
                onClick={addPackage}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Package Option
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  placeholder="Package Name (e.g. 660 UC)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  placeholder="Price (IQD)"
                  className="w-32 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => removePackage(idx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Section Feature Toggles */}
          <div className="pt-3 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
              Featured Sections Placement
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="accent-cyan-500"
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                  className="accent-cyan-500"
                />
                <span>Trending</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                  className="accent-cyan-500"
                />
                <span>Flash Deal</span>
              </label>
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                  className="accent-cyan-500"
                />
                <span>Top Rated</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
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

export default AdminProductForm;
