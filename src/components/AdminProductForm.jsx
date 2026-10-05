import React from 'react';
import { CATEGORIES, PLATFORMS, TYPES } from '../data/categories';

const AdminProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState(() => {
    if (product) {
      return {
        ...product,
        packagesText: product.packages ? product.packages.map(p => `${p.name}:${p.price}`).join('\n') : ''
      };
    }
    return {
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
      rating: 4.9,
      soldCount: 100,
      tag: 'New',
      isFeatured: false,
      isTrending: false,
      isFlashDeal: false,
      isTopRated: false,
      packagesText: 'Standard:1500'
    };
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse packagesText into array of { name, price }
    const packages = formData.packagesText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          return { name: parts[0].trim(), price: Number(parts[1].trim()) || 0 };
        }
        return { name: line, price: Number(formData.price) || 0 };
      });

    const finalProduct = {
      ...formData,
      price: Number(formData.price) || (packages.length > 0 ? packages[0].price : 0),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock) || 0,
      rating: Number(formData.rating) || 5.0,
      soldCount: Number(formData.soldCount) || 0,
      packages: packages.length > 0 ? packages : [{ name: 'Standard', price: Number(formData.price) || 0 }]
    };

    onSubmit(finalProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
      <h3 className="text-lg font-bold text-slate-100 pb-2 border-b border-slate-800">
        {product ? 'Edit Product' : 'Add New Product'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Product Title *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Slug (URL) *</label>
          <input
            type="text"
            name="slug"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. pubg-mobile-660-uc"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Platform *</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            {PLATFORMS.filter(p => p.id !== 'all').map(plt => (
              <option key={plt.id} value={plt.id}>{plt.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Type *</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          >
            {TYPES.filter(t => t.id !== 'all').map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Stock Quantity *</label>
          <input
            type="number"
            name="stock"
            required
            value={formData.stock}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Base Price (IQD) *</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            placeholder="15000"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">Old Price (IQD - Optional)</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="18000"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-300 block mb-1">Image URL (Optional - Fallback visual auto-generated)</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-300 block mb-1">Description *</label>
          <textarea
            name="description"
            rows="2"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the product..."
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-xs font-bold text-slate-300 block mb-1">Packages (Format: Package Name:Price - one per line)</label>
          <textarea
            name="packagesText"
            rows="3"
            value={formData.packagesText}
            onChange={handleChange}
            placeholder="60 UC:1500&#10;325 UC:7500&#10;660 UC:15000"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        {/* Visibility Feature Flags */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs font-semibold text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded text-cyan-500 focus:ring-0" />
            <span>Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="rounded text-cyan-500 focus:ring-0" />
            <span>Trending</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} className="rounded text-cyan-500 focus:ring-0" />
            <span>Flash Deal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="rounded text-cyan-500 focus:ring-0" />
            <span>Top Rated</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold rounded-lg text-xs hover:from-blue-500 hover:to-cyan-400 transition-all shadow-md shadow-cyan-500/20"
        >
          {product ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
