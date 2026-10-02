import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export const AdminProductForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'mobile',
    platform: initialData?.platform || 'Mobile',
    type: initialData?.type || 'Top-Up',
    price: initialData?.price || '',
    oldPrice: initialData?.oldPrice || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    stock: initialData?.stock !== undefined ? initialData.stock : 100,
    rating: initialData?.rating || 4.9,
    soldCount: initialData?.soldCount || 50,
    tag: initialData?.tag || '',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    isFlashDeal: initialData?.isFlashDeal || false,
    isTopRated: initialData?.isTopRated || false,
    packages: initialData?.packages || [{ name: 'Standard Package', price: 5000 }],
  });

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = field === 'price' ? Number(value) : value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: 'New Option', price: 5000 }],
    });
  };

  const removePackage = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    onSubmit({
      ...formData,
      slug,
      price: Number(formData.price) || (formData.packages[0] ? formData.packages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-slate-100 font-heading">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Product Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tag / Badge</label>
              <input
                type="text"
                placeholder="e.g. Best Seller, Hot"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="games">PC & Console Games</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Gift Card">Gift Card</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
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
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Starting Price (IQD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Old Price (IQD)</label>
              <input
                type="number"
                placeholder="Optional"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Stock Count</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Image URL (Optional)</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 text-slate-100 text-sm rounded-xl px-3.5 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Packages Builder */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase">Packages / Denominations</label>
              <button
                type="button"
                onClick={addPackage}
                className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3.5 h-3.5" /> Add Package
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Package Name (e.g. 60 UC)"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  className="flex-1 bg-slate-950 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-800"
                />
                <input
                  type="number"
                  placeholder="Price IQD"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  className="w-32 bg-slate-950 text-slate-100 text-xs rounded-lg px-3 py-2 border border-slate-800"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackage(idx)}
                    className="p-2 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Feature Toggles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 text-xs">
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              Trending
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFlashDeal}
                onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              Flash Deal
            </label>
            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isTopRated}
                onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                className="rounded border-slate-800 text-cyan-500 focus:ring-0"
              />
              Top Rated
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-950/50"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
