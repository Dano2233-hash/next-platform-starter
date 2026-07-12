import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Plus } from 'lucide-react';

const AdminProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'PC',
    platform: 'PC',
    type: 'Game',
    price: 0,
    oldPrice: '',
    description: '',
    image: '',
    stock: 0,
    rating: 5.0,
    soldCount: 0,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Edition', price: 0 }]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        oldPrice: product.oldPrice || '',
        tag: product.tag || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value)
    }));
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...formData.packages];
    newPackages[index][field] = field === 'price' ? parseFloat(value) : value;
    setFormData(prev => ({ ...prev, packages: newPackages }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: 0 }]
    }));
  };

  const removePackage = (index) => {
    if (formData.packages.length > 1) {
      const newPackages = formData.packages.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, packages: newPackages }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
      slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    });
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="absolute inset-0 bg-dark-900/90 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-navy-800 border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-dark-800">
            <h2 className="text-xl font-bold text-white">{product ? 'Edit Product' : 'Add New Product'}</h2>
            <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                  <select
                    name="category"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="PC">PC</option>
                    <option value="Xbox">Xbox</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Gift Cards">Gift Cards</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Platform</label>
                  <input
                    type="text"
                    name="platform"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.platform}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base Price (IQD)</label>
                  <input
                    type="number"
                    name="price"
                    required
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Old Price (Optional)</label>
                  <input
                    type="number"
                    name="oldPrice"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.oldPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  name="image"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sold Count</label>
                  <input
                    type="number"
                    name="soldCount"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.soldCount}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tag</label>
                  <input
                    type="text"
                    name="tag"
                    className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white"
                    value={formData.tag}
                    onChange={handleChange}
                    placeholder="e.g. New"
                  />
                </div>
              </div>
            </div>

            {/* Extra Info & Packages */}
            <div className="space-y-4">
               <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  name="description"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg p-2.5 text-white min-h-[100px]"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                   <label className="block text-xs font-bold text-gray-500 uppercase">Packages / Variants</label>
                   <button
                    type="button"
                    onClick={addPackage}
                    className="text-accent-cyan text-[10px] font-bold uppercase flex items-center gap-1"
                   >
                     <Plus size={12} /> Add Package
                   </button>
                </div>
                <div className="space-y-2">
                  {formData.packages.map((pkg, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Package Name"
                        className="flex-1 bg-dark-700 border border-white/10 rounded-lg p-2 text-sm text-white"
                        value={pkg.name}
                        onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        className="w-24 bg-dark-700 border border-white/10 rounded-lg p-2 text-sm text-white"
                        value={pkg.price}
                        onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => removePackage(index)}
                        className="text-red-500 hover:text-red-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 rounded border-white/10" />
                    <span className="text-sm text-gray-300">Featured</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleChange} className="w-4 h-4 rounded border-white/10" />
                    <span className="text-sm text-gray-300">Trending</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isFlashDeal" checked={formData.isFlashDeal} onChange={handleChange} className="w-4 h-4 rounded border-white/10" />
                    <span className="text-sm text-gray-300">Flash Deal</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="isTopRated" checked={formData.isTopRated} onChange={handleChange} className="w-4 h-4 rounded border-white/10" />
                    <span className="text-sm text-gray-300">Top Rated</span>
                 </label>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-dark-800 border-t border-white/10 flex justify-end gap-3">
             <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 rounded-lg text-sm font-bold text-gray-400 hover:text-white transition-colors"
             >
               Cancel
             </button>
             <button
                type="submit"
                className="bg-accent-blue hover:bg-blue-600 text-white px-8 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent-blue/20 transition-all"
             >
               <Save size={18} />
               {product ? 'Update Product' : 'Create Product'}
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
