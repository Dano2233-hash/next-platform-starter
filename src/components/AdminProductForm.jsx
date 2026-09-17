import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function AdminProductForm({ initialData = null, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'mobile',
    platform: initialData?.platform || 'Mobile',
    type: initialData?.type || 'Top-Up',
    price: initialData?.price || '',
    oldPrice: initialData?.oldPrice || '',
    stock: initialData?.stock !== undefined ? initialData.stock : 100,
    rating: initialData?.rating || 4.9,
    soldCount: initialData?.soldCount || 100,
    tag: initialData?.tag || '',
    description: initialData?.description || '',
    image: initialData?.image || '',
    isFeatured: initialData?.isFeatured || false,
    isTrending: initialData?.isTrending || false,
    isFlashDeal: initialData?.isFlashDeal || false,
    isTopRated: initialData?.isTopRated || false,
    packages: initialData?.packages || [{ name: 'Standard Package', price: '' }],
  });

  const handlePackageChange = (index, field, value) => {
    const updated = [...formData.packages];
    updated[index][field] = value;
    setFormData({ ...formData, packages: updated });
  };

  const addPackageRow = () => {
    setFormData({
      ...formData,
      packages: [...formData.packages, { name: '', price: '' }],
    });
  };

  const removePackageRow = (index) => {
    setFormData({
      ...formData,
      packages: formData.packages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      soldCount: Number(formData.soldCount),
      packages: formData.packages.map((pkg) => ({
        name: pkg.name || 'Standard',
        price: Number(pkg.price) || Number(formData.price),
      })),
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0b1122]">
          <h3 className="font-extrabold text-lg text-white">
            {initialData ? 'Edit Product' : 'Add New Gaming Product'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Product Title</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., PUBG Mobile 660 UC"
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="pc">PC Games</option>
                <option value="playstation">PlayStation</option>
                <option value="xbox">Xbox</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Mobile">Mobile</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Digital Service">Digital Service</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">Game</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Base Price (IQD)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="1500"
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Old Price (IQD - Optional)</label>
              <input
                type="number"
                value={formData.oldPrice}
                onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                placeholder="2000"
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Stock Count</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Badge Tag (e.g. Best Seller)</label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="Top Sale"
                className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description and redemption instructions..."
              className="w-full bg-[#0d1424] border border-slate-700/80 rounded-xl p-2.5 text-xs text-white"
            />
          </div>

          {/* Section Toggles */}
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Display Sections</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <label className="flex items-center gap-2 bg-[#0d1424] p-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span className="text-slate-200">Featured</span>
              </label>

              <label className="flex items-center gap-2 bg-[#0d1424] p-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTrending}
                  onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                />
                <span className="text-slate-200">Trending</span>
              </label>

              <label className="flex items-center gap-2 bg-[#0d1424] p-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFlashDeal}
                  onChange={(e) => setFormData({ ...formData, isFlashDeal: e.target.checked })}
                />
                <span className="text-slate-200">Flash Deal</span>
              </label>

              <label className="flex items-center gap-2 bg-[#0d1424] p-2 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isTopRated}
                  onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                />
                <span className="text-slate-200">Top Rated</span>
              </label>
            </div>
          </div>

          {/* Package Options */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-300">Package Options</label>
              <button
                type="button"
                onClick={addPackageRow}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Package</span>
              </button>
            </div>

            {formData.packages.map((pkg, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                  placeholder="Package Name (e.g. 60 UC)"
                  className="flex-1 bg-[#0d1424] border border-slate-700/80 rounded-xl p-2 text-xs text-white"
                />
                <input
                  type="number"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                  placeholder="Price IQD"
                  className="w-32 bg-[#0d1424] border border-slate-700/80 rounded-xl p-2 text-xs text-white"
                />
                {formData.packages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePackageRow(idx)}
                    className="p-2 text-red-400 hover:bg-slate-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-black text-xs font-black rounded-xl hover:brightness-110 shadow-md shadow-cyan-500/20"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
