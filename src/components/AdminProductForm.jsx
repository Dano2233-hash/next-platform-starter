import React, { useState, useEffect } from 'react';
import { Plus, Trash, X } from 'lucide-react';

export function AdminProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'mobile',
    platform: 'mobile',
    type: 'Top-Up',
    price: 0,
    oldPrice: '',
    stock: 100,
    description: '',
    image: '',
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: '', price: '' }]
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'mobile',
        platform: product.platform || 'mobile',
        type: product.type || 'Top-Up',
        price: product.price || 0,
        oldPrice: product.oldPrice || '',
        stock: product.stock !== undefined ? product.stock : 100,
        description: product.description || '',
        image: product.image || '',
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages.map(p => ({ name: p.name, price: p.price }))
          : [{ name: '', price: '' }]
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...formData.packages];
    updatedPackages[index][field] = value;
    setFormData(prev => ({ ...prev, packages: updatedPackages }));
  };

  const addPackageRow = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '' }]
    }));
  };

  const removePackageRow = (index) => {
    const updatedPackages = formData.packages.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, packages: updatedPackages }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Product name is required.';
    if (!formData.description.trim()) tempErrors.description = 'Description is required.';
    if (Number(formData.price) < 0) tempErrors.price = 'Price cannot be negative.';
    if (Number(formData.stock) < 0) tempErrors.stock = 'Stock cannot be negative.';

    // Validate packages if any
    const validPackages = formData.packages.filter(p => p.name.trim() !== '' && p.price !== '');
    if (validPackages.length === 0) {
      tempErrors.packages = 'At least one package name and price is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Filter out incomplete packages and format properly
    const cleanPackages = formData.packages
      .filter(p => p.name.trim() !== '' && p.price !== '')
      .map(p => ({
        name: p.name.trim(),
        price: Number(p.price)
      }));

    // Find the minimum price among packages to be the base price
    const basePrice = cleanPackages.length > 0
      ? Math.min(...cleanPackages.map(p => p.price))
      : Number(formData.price);

    const savedProduct = {
      ...formData,
      price: basePrice,
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : null,
      stock: Number(formData.stock),
      packages: cleanPackages
    };

    onSave(savedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-[#0d0d15] border border-brand-border/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-white">
            {product ? 'Edit Product details' : 'Add New Digital Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Row 1: Name */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Product Title</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Free Fire 100 Diamonds"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-blue"
            />
            {errors.name && <p className="text-[10px] text-red-400 font-bold">{errors.name}</p>}
          </div>

          {/* Row 2: Category, Platform, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="mobile">Mobile Top-Ups</option>
                <option value="games">PC / Console Games</option>
                <option value="giftcards">Gift Cards</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="others">Other Services</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Platform</label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="mobile">Mobile</option>
                <option value="pc">PC</option>
                <option value="xbox">Xbox</option>
                <option value="playstation">PlayStation</option>
                <option value="giftcard">Gift Card</option>
                <option value="subscription">Subscription</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-3 py-2.5 text-xs text-white outline-none"
              >
                <option value="Top-Up">Top-Up</option>
                <option value="Game">GameKey</option>
                <option value="Gift Card">Gift Card</option>
                <option value="Subscription">Subscription</option>
                <option value="Account">Account</option>
              </select>
            </div>
          </div>

          {/* Row 3: Image URL & Stock, Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1 col-span-1 sm:col-span-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Product Image URL (Optional)</label>
              <input
                type="text"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Stock Count</label>
              <input
                type="number"
                name="stock"
                placeholder="100"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
              />
              {errors.stock && <p className="text-[10px] text-red-400 font-bold">{errors.stock}</p>}
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Product Description</label>
            <textarea
              name="description"
              rows={3}
              placeholder="Provide a detailed description of what the user receives..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue"
            />
            {errors.description && <p className="text-[10px] text-red-400 font-bold">{errors.description}</p>}
          </div>

          {/* Row 5: Pricing Badges & Marketing Labels */}
          <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10 space-y-3">
            <h3 className="text-[11px] font-black uppercase tracking-wider text-brand-cyan">Marketing Badges & Promotions</h3>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="rounded bg-[#050505] border-brand-border/80 text-brand-blue focus:ring-0 h-4 w-4"
                />
                Featured
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleInputChange}
                  className="rounded bg-[#050505] border-brand-border/80 text-brand-blue focus:ring-0 h-4 w-4"
                />
                Trending
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFlashDeal"
                  checked={formData.isFlashDeal}
                  onChange={handleInputChange}
                  className="rounded bg-[#050505] border-brand-border/80 text-brand-blue focus:ring-0 h-4 w-4"
                />
                Flash Deal
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="isTopRated"
                  checked={formData.isTopRated}
                  onChange={handleInputChange}
                  className="rounded bg-[#050505] border-brand-border/80 text-brand-blue focus:ring-0 h-4 w-4"
                />
                Top Rated
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Original Price (Strike-through, IQD)</label>
                <input
                  type="number"
                  name="oldPrice"
                  placeholder="e.g. 15000"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Custom tag / Badge text</label>
                <input
                  type="text"
                  name="tag"
                  placeholder="e.g. HOT, 10% OFF, BESTSELLER"
                  value={formData.tag}
                  onChange={handleInputChange}
                  className="w-full bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Row 6: Packages Editor */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Packages & Pricing Options (IQD)</h3>
              <button
                type="button"
                onClick={addPackageRow}
                className="flex items-center gap-1 text-[10px] font-black uppercase text-brand-cyan hover:text-white transition bg-brand-cyan/10 px-2.5 py-1 rounded"
              >
                <Plus className="h-3 w-3" /> Add Package Option
              </button>
            </div>
            {errors.packages && <p className="text-[10px] text-red-400 font-bold">{errors.packages}</p>}

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {formData.packages.map((pkg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Package name (e.g. 60 UC)"
                    value={pkg.name}
                    onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
                    className="flex-grow bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Price in IQD"
                    value={pkg.price}
                    onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
                    className="w-32 bg-[#050505] border border-brand-border/60 rounded-xl px-4 py-2 text-xs text-white focus:outline-none"
                  />
                  {formData.packages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePackageRow(idx)}
                      className="p-2 rounded bg-red-950/20 text-red-400 hover:text-red-300 transition"
                      aria-label="Delete Package"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue/90 text-xs font-extrabold uppercase tracking-widest text-white shadow shadow-brand-blue/10 transition"
            >
              Save Product
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default AdminProductForm;
