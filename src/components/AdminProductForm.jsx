import React, { useState, useEffect } from 'react'
import { CATEGORIES, PLATFORMS } from '../data/categories'
import { Plus, Trash2, Save, X } from 'lucide-react'

export function AdminProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Games',
    platform: 'PC',
    type: 'Game',
    price: '',
    oldPrice: '',
    description: '',
    image: '',
    stock: 100,
    tag: '',
    isFeatured: false,
    isTrending: false,
    isFlashDeal: false,
    isTopRated: false,
    packages: [{ name: 'Standard Package', price: '', oldPrice: '' }]
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || 'Games',
        platform: product.platform || 'PC',
        type: product.type || 'Game',
        price: product.price ?? '',
        oldPrice: product.oldPrice ?? '',
        description: product.description || '',
        image: product.image || '',
        stock: product.stock ?? 100,
        tag: product.tag || '',
        isFeatured: !!product.isFeatured,
        isTrending: !!product.isTrending,
        isFlashDeal: !!product.isFlashDeal,
        isTopRated: !!product.isTopRated,
        packages: product.packages && product.packages.length > 0
          ? product.packages.map(p => ({
              name: p.name || '',
              price: p.price ?? '',
              oldPrice: p.oldPrice ?? ''
            }))
          : [{ name: 'Standard Package', price: product.price ?? '', oldPrice: '' }]
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePackageChange = (index, field, value) => {
    setFormData(prev => {
      const updatedPkgs = [...prev.packages]
      updatedPkgs[index] = { ...updatedPkgs[index], [field]: value }
      return { ...prev, packages: updatedPkgs }
    })
  }

  const addPackageRow = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '', oldPrice: '' }]
    }))
  }

  const removePackageRow = (index) => {
    if (formData.packages.length <= 1) return
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const parsedPrice = Number(formData.price || (formData.packages[0] && formData.packages[0].price) || 0)
    const parsedOldPrice = formData.oldPrice ? Number(formData.oldPrice) : null

    const formattedPackages = formData.packages.map(p => ({
      name: p.name || 'Package',
      price: Number(p.price || parsedPrice),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : undefined
    }))

    const productPayload = {
      ...formData,
      price: parsedPrice,
      oldPrice: parsedOldPrice,
      stock: Number(formData.stock),
      packages: formattedPackages
    }

    onSave(productPayload)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#0a0f1d] p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h3 className="text-lg font-bold text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Product Title</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. PUBG Mobile 660 UC"
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          >
            {CATEGORIES.filter(c => c.id !== 'all').map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Platform</label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          >
            {PLATFORMS.filter(p => p.id !== 'all').map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Type Badge</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          >
            <option value="Game">Game</option>
            <option value="Top-Up">Top-Up</option>
            <option value="Gift Card">Gift Card</option>
            <option value="Subscription">Subscription</option>
            <option value="Account">Account</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Base Price (IQD)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="15000"
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Old Price (IQD) [Optional]</label>
          <input
            type="number"
            name="oldPrice"
            value={formData.oldPrice}
            onChange={handleChange}
            placeholder="18000"
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="100"
            className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
        <textarea
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product details..."
          className="w-full bg-[#0d1326] border border-slate-800 text-slate-100 text-sm rounded-xl px-3.5 py-2"
        />
      </div>

      {/* Packages Section */}
      <div className="bg-[#070b15] p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">Packages / Quantities</label>
          <button
            type="button"
            onClick={addPackageRow}
            className="flex items-center gap-1 text-xs text-cyan-400 font-bold hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> Add Package
          </button>
        </div>

        {formData.packages.map((pkg, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Package Name (e.g. 660 UC)"
              value={pkg.name}
              onChange={(e) => handlePackageChange(idx, 'name', e.target.value)}
              className="flex-1 bg-[#0d1326] border border-slate-800 text-slate-100 text-xs rounded-lg px-2.5 py-1.5"
            />
            <input
              type="number"
              placeholder="Price (IQD)"
              value={pkg.price}
              onChange={(e) => handlePackageChange(idx, 'price', e.target.value)}
              className="w-28 bg-[#0d1326] border border-slate-800 text-slate-100 text-xs rounded-lg px-2.5 py-1.5"
            />
            <button
              type="button"
              onClick={() => removePackageRow(idx)}
              disabled={formData.packages.length <= 1}
              className="text-slate-500 hover:text-red-400 disabled:opacity-30"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Flag Toggles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070b15] p-4 rounded-xl border border-slate-800 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="accent-cyan-500 rounded"
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
            onChange={handleChange}
            className="accent-cyan-500 rounded"
          />
          <span>Trending</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isFlashDeal"
            checked={formData.isFlashDeal}
            onChange={handleChange}
            className="accent-cyan-500 rounded"
          />
          <span>Flash Deal</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
          <input
            type="checkbox"
            name="isTopRated"
            checked={formData.isTopRated}
            onChange={handleChange}
            className="accent-cyan-500 rounded"
          />
          <span>Top Rated</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
        >
          <Save className="w-4 h-4" /> Save Product
        </button>
      </div>
    </form>
  )
}
