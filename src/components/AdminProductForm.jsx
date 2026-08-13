import React, { useState } from 'react';

export function AdminProductForm({ initialData, onSubmit, categories, onCancel }) {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || 'mobile');
  const [platform, setPlatform] = useState(initialData?.platform || 'PC');
  const [type, setType] = useState(initialData?.type || 'Top-Up');
  const [price, setPrice] = useState(initialData?.price || '');
  const [oldPrice, setOldPrice] = useState(initialData?.oldPrice || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [stock, setStock] = useState(initialData?.stock ?? 100);
  const [tag, setTag] = useState(initialData?.tag || '');
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [isTrending, setIsTrending] = useState(initialData?.isTrending || false);
  const [isFlashDeal, setIsFlashDeal] = useState(initialData?.isFlashDeal || false);
  const [isTopRated, setIsTopRated] = useState(initialData?.isTopRated || false);

  // Simple key-value setup for package creation
  const [packages, setPackages] = useState(initialData?.packages || []);
  const [pkgName, setPkgName] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');

  const addPackage = () => {
    if (pkgName.trim() && pkgPrice) {
      setPackages([...packages, { name: pkgName.trim(), price: Number(pkgPrice) }]);
      setPkgName('');
      setPkgPrice('');
    }
  };

  const removePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const submittedData = {
      name,
      category,
      platform,
      type,
      price: Number(price) || (packages.length > 0 ? Math.min(...packages.map(p => p.price)) : 0),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      description,
      image,
      stock: Number(stock),
      tag,
      isFeatured,
      isTrending,
      isFlashDeal,
      isTopRated,
      packages,
    };

    if (initialData?.id) {
      submittedData.id = initialData.id;
      submittedData.slug = initialData.slug;
    }

    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 text-left max-w-2xl bg-[#0c0c14] border border-[#1e1e2d] rounded-xl p-6">
      <h3 className="text-lg font-black uppercase text-white">
        {initialData ? 'Edit Product Details' : 'Add New Premium Product'}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Product Title *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          >
            {categories.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Badge *</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          >
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Mobile">Mobile</option>
            <option value="Gift Card">Gift Card</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Type Badge *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Stock Count *</label>
          <input
            type="number"
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Base Price (IQD)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Auto-calculated if packages defined"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Old Price if Sale (IQD)</label>
          <input
            type="number"
            value={oldPrice}
            onChange={(e) => setOldPrice(e.target.value)}
            placeholder="e.g. 15000"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Official/CDN Image Link</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://cdn.akamai.steamstatic.com/..."
          className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Short Product Description</label>
        <textarea
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief summary of digital delivery or features..."
          className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ribbon Tag</label>
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="e.g. Flash Deals, 10% OFF"
            className="w-full rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-2 text-sm text-gray-200 outline-none focus:border-[#0066ff]"
          />
        </div>
      </div>

      {/* Quick Sections Management checkboxes */}
      <div className="bg-black/30 rounded-lg p-4 space-y-2">
        <span className="block text-xs font-bold uppercase text-gray-400 mb-2">Configure Homepage Sections</span>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded border-[#1e1e2d] bg-[#05050a] text-[#0066ff]"
            />
            <span>Featured Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={isTrending}
              onChange={(e) => setIsTrending(e.target.checked)}
              className="rounded border-[#1e1e2d] bg-[#05050a] text-[#0066ff]"
            />
            <span>Trending Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={isFlashDeal}
              onChange={(e) => setIsFlashDeal(e.target.checked)}
              className="rounded border-[#1e1e2d] bg-[#05050a] text-[#0066ff]"
            />
            <span>Flash Deal Section</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
            <input
              type="checkbox"
              checked={isTopRated}
              onChange={(e) => setIsTopRated(e.target.checked)}
              className="rounded border-[#1e1e2d] bg-[#05050a] text-[#0066ff]"
            />
            <span>Top Rated Section</span>
          </label>
        </div>
      </div>

      {/* Package Creation section */}
      <div className="bg-black/40 rounded-lg p-4 space-y-4">
        <span className="block text-xs font-black uppercase text-gray-400">Add Package Options (e.g. 60 UC, 325 UC)</span>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Package Option Name"
            value={pkgName}
            onChange={(e) => setPkgName(e.target.value)}
            className="flex-1 rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-1.5 text-xs text-gray-200 outline-none"
          />
          <input
            type="number"
            placeholder="Price in IQD"
            value={pkgPrice}
            onChange={(e) => setPkgPrice(e.target.value)}
            className="w-32 rounded-lg border border-[#1e1e2d] bg-[#05050a] px-3 py-1.5 text-xs text-gray-200 outline-none"
          />
          <button
            type="button"
            onClick={addPackage}
            className="rounded-lg bg-[#0066ff] px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-600 transition"
          >
            Add Package
          </button>
        </div>

        {/* Existing packages table */}
        {packages.length > 0 ? (
          <div className="space-y-2 max-h-36 overflow-y-auto">
            {packages.map((p, index) => (
              <div key={index} className="flex items-center justify-between bg-black/50 border border-[#1e1e2d] rounded px-3 py-1.5">
                <span className="text-xs font-semibold text-white">{p.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#00e5ff]">{p.price} IQD</span>
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-gray-500">No custom package options defined. Set them above if applicable.</p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#1e1e2d] px-5 py-2 text-xs font-bold text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="rounded-lg bg-gradient-to-r from-[#0066ff] to-[#7000ff] px-6 py-2.5 text-xs font-black uppercase text-white shadow-lg"
        >
          {initialData ? 'Update Product' : 'Publish Product'}
        </button>
      </div>

    </form>
  );
}
