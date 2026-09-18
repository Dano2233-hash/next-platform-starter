import React, { useState, useEffect } from 'react';
import { CATEGORIES, PLATFORMS } from '../data/categories';
import { Plus, Trash2, Save, X, AlertCircle } from 'lucide-react';

export function AdminProductForm({ initialData = null, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('top-up');
  const [platform, setPlatform] = useState('Mobile');
  const [type, setType] = useState('Top-Up');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [stock, setStock] = useState('100');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isFlashDeal, setIsFlashDeal] = useState(false);
  const [isTopRated, setIsTopRated] = useState(false);

  const [packages, setPackages] = useState([
    { name: 'Standard Package', price: '', oldPrice: '' }
  ]);

  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setCategory(initialData.category || 'top-up');
      setPlatform(initialData.platform || 'Mobile');
      setType(initialData.type || 'Top-Up');
      setPrice(initialData.price !== undefined ? String(initialData.price) : '');
      setOldPrice(initialData.oldPrice ? String(initialData.oldPrice) : '');
      setStock(initialData.stock !== undefined ? String(initialData.stock) : '100');
      setImage(initialData.image || '');
      setDescription(initialData.description || '');
      setTag(initialData.tag || '');
      setIsFeatured(!!initialData.isFeatured);
      setIsTrending(!!initialData.isTrending);
      setIsFlashDeal(!!initialData.isFlashDeal);
      setIsTopRated(!!initialData.isTopRated);

      if (initialData.packages && initialData.packages.length > 0) {
        setPackages(
          initialData.packages.map((pkg) => ({
            name: pkg.name || '',
            price: pkg.price !== undefined ? String(pkg.price) : '',
            oldPrice: pkg.oldPrice ? String(pkg.oldPrice) : ''
          }))
        );
      }
    }
  }, [initialData]);

  const handleAddPackage = () => {
    setPackages([...packages, { name: '', price: '', oldPrice: '' }]);
  };

  const handleRemovePackage = (index) => {
    if (packages.length <= 1) return;
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handlePackageChange = (index, field, val) => {
    const updated = [...packages];
    updated[index][field] = val;
    setPackages(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product title is required.');
      return;
    }
    if (!price || isNaN(Number(price))) {
      setError('A valid main price (IQD) is required.');
      return;
    }

    const formattedPackages = packages.map((pkg) => ({
      name: pkg.name.trim() || 'Standard',
      price: Number(pkg.price) || Number(price),
      oldPrice: pkg.oldPrice ? Number(pkg.oldPrice) : null
    }));

    const productPayload = {
      ...(initialData || {}),
      name: name.trim(),
      category,
      platform,
      type,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      stock: Number(stock) || 0,
      image: image.trim(),
      description: description.trim(),
      tag: tag.trim(),
      isFeatured,
      isTrending,
      isFlashDeal,
      isTopRated,
      packages: formattedPackages
    };

    onSave(productPayload);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-6 text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {initialData ? 'Edit Product' : 'Add New Product'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="p-1 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {error && (
        <div className="bg-rose-950/50 border border-rose-600/50 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold text-slate-300">Product Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. PUBG Mobile UC"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            {PLATFORMS.filter((p) => p.id !== 'all').map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Type Badge</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Stock Count</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Main / From Price (IQD) *</label>
          <input
            type="number"
            required
            placeholder="1500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-300">Old Price (IQD)</label>
          <input
            type="number"
            placeholder="1800"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold text-slate-300">Image URL</label>
          <input
            type="url"
            placeholder="https://cdn.akamai.steamstatic.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
          <p className="text-[10px] text-slate-400">
            If left empty or invalid, ProductVisual fallback gradient will render automatically.
          </p>
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold text-slate-300">Custom Tag (e.g. Hot Deal)</label>
          <input
            type="text"
            placeholder="Hot Deal"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-bold text-slate-300">Description</label>
          <textarea
            rows={3}
            placeholder="Enter product details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 text-sm p-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Flag Toggles */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-2">
        <label className="text-xs font-bold text-cyan-400 block mb-2">Section Placements</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>New & Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFlashDeal}
              onChange={(e) => setIsFlashDeal(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isTopRated}
              onChange={(e) => setIsTopRated(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      {/* Packages Builder */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-purple-400">
            Packages / Top-Up Options ({packages.length})
          </label>
          <button
            type="button"
            onClick={handleAddPackage}
            className="text-xs font-bold bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-cyan-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Package</span>
          </button>
        </div>

        {packages.map((pkg, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
            <input
              type="text"
              placeholder="Package Name (e.g. 60 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 text-xs p-2 rounded focus:outline-none focus:border-cyan-500 w-full"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-full sm:w-28 bg-slate-900 border border-slate-800 text-xs p-2 rounded focus:outline-none focus:border-cyan-500"
            />
            <input
              type="number"
              placeholder="Old Price"
              value={pkg.oldPrice}
              onChange={(e) => handlePackageChange(idx, 'oldPrice', e.target.value)}
              className="w-full sm:w-28 bg-slate-900 border border-slate-800 text-xs p-2 rounded focus:outline-none focus:border-cyan-500"
            />
            {packages.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemovePackage(idx)}
                className="text-slate-500 hover:text-rose-400 p-2 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-950/50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Product</span>
        </button>
      </div>
    </form>
  );
}
