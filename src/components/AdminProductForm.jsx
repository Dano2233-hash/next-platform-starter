import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save, Image, Tag, DollarSign, Package, AlertCircle } from 'lucide-react';

export const AdminProductForm = ({ product, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'mobile',
    platform: 'Mobile',
    type: 'Top-Up',
    price: '',
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
    packages: [{ id: 'pkg-1', name: 'Standard Package', price: '', oldPrice: '' }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || 'mobile',
        platform: product.platform || 'Mobile',
        type: product.type || 'Top-Up',
        price: product.price || '',
        oldPrice: product.oldPrice || '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock !== undefined ? product.stock : 100,
        rating: product.rating || 5.0,
        soldCount: product.soldCount || 0,
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages
          : [{ id: 'pkg-1', name: 'Standard Package', price: product.price || '', oldPrice: product.oldPrice || '' }],
      });
    }
  }, [product]);

  const handleAddPackage = () => {
    setFormData((prev) => ({
      ...prev,
      packages: [
        ...prev.packages,
        { id: `pkg-${Date.now()}`, name: '', price: '', oldPrice: '' },
      ],
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const newPkgs = [...formData.packages];
    newPkgs[index][field] = value;
    setFormData({ ...formData, packages: newPkgs });
  };

  const handleRemovePackage = (index) => {
    if (formData.packages.length <= 1) return;
    const newPkgs = formData.packages.filter((_, i) => i !== index);
    setFormData({ ...formData, packages: newPkgs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Use lowest package price if product price isn't set
    const mainPrice = formData.price
      ? Number(formData.price)
      : formData.packages.length > 0 && formData.packages[0].price
      ? Number(formData.packages[0].price)
      : 0;

    const mainOldPrice = formData.oldPrice ? Number(formData.oldPrice) : null;

    const formattedPackages = formData.packages.map((pkg, idx) => ({
      id: pkg.id || `pkg-${idx}`,
      name: pkg.name || `Package ${idx + 1}`,
      price: Number(pkg.price) || mainPrice,
      oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null,
    }));

    onSave({
      ...(product ? { id: product.id } : {}),
      ...formData,
      price: mainPrice,
      oldPrice: mainOldPrice,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formattedPackages,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 p-6 space-y-6">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-heading font-bold text-lg text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Product Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. PUBG Mobile UC"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                Slug (URL keyword)
              </label>
              <input
                type="text"
                placeholder="pubg-mobile-uc"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Games</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Item Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Price (IQD)</label>
              <input
                type="number"
                placeholder="e.g. 1500"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Old Price (IQD)</label>
              <input
                type="number"
                placeholder="e.g. 1800"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
              />
            </div>
          </div>

          {/* Description & Image */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
              Image URL (Steam CDN or standard URL)
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl p-2.5 text-sm focus:border-cyan-500 outline-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              If empty or invalid URL, custom gradient fallback ProductVisual component will render automatically.
            </p>
          </div>

          {/* Package Configuration */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-400" />
                <span>Product Packages / Tiers</span>
              </h4>
              <button
                type="button"
                onClick={handleAddPackage}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs rounded-lg flex items-center gap-1 border border-slate-700"
              >
                <Plus className="w-3.5 h-3.5" /> Add Package
              </button>
            </div>

            <div className="space-y-2">
              {formData.packages.map((pkg, idx) => (
                <div key={pkg.id || idx} className="grid grid-cols-12 gap-2 items-center bg-[#050813] p-2 rounded-xl border border-slate-800">
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Package Name (e.g. 60 UC)"
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                      className="w-full bg-[#0c1226] border border-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Price IQD"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                      className="w-full bg-[#0c1226] border border-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      placeholder="Old Price IQD"
                      value={pkg.oldPrice || ''}
                      onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
                      className="w-full bg-[#0c1226] border border-slate-800 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div className="col-span-1 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemovePackage(idx)}
                      disabled={formData.packages.length <= 1}
                      className="text-slate-500 hover:text-red-400 disabled:opacity-30 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="border-t border-slate-800 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer bg-[#050813] p-2.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="accent-cyan-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Featured</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-[#050813] p-2.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="accent-cyan-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Trending</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-[#050813] p-2.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="accent-cyan-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Flash Deal</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-[#050813] p-2.5 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="accent-cyan-500 w-4 h-4"
              />
              <span className="font-semibold text-slate-200">Top Rated</span>
            </label>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
