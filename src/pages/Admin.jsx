import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProtectedRoute from '../components/ProtectedRoute';
import { formatPrice } from '../utils/formatPrice';
import {
  Trophy,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  ListOrdered,
  LogOut,
  Sliders,
  Settings,
  Eye,
  Check
} from 'lucide-react';

export default function Admin() {
  const { products, orders, addProduct, editProduct, deleteProduct, updateStock, getTotalRevenue } = useProducts();
  const { logout } = useAuth();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      editProduct(prodData);
    } else {
      addProduct(prodData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you absolutely sure you want to delete this product listing?')) {
      deleteProduct(id);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">

        {/* Dashboard Title & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
              Executive Admin Dashboard
            </h1>
            <p className="text-sm text-gray-400">
              Manage product listings, catalog prices, available stock, and manual invoice orders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddNewClick}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-black uppercase tracking-wider text-xs px-5 py-3 rounded-xl flex items-center gap-1.5 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Game / Service</span>
            </button>

            <button
              onClick={() => {
                logout();
                window.location.href = '/admin-login';
              }}
              className="bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 font-bold uppercase text-xs px-4 py-3 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Executive Quick Stats Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Total Products Listed"
            value={products.length}
            icon={Trophy}
            colorClass="from-cyan-500 to-blue-600"
          />
          <StatCard
            title="Total Invoice Orders"
            value={orders.length}
            icon={ShoppingBag}
            colorClass="from-purple-500 to-indigo-600"
          />
          <StatCard
            title="Sourced Total Revenue"
            value={formatPrice(getTotalRevenue())}
            icon={DollarSign}
            colorClass="from-emerald-500 to-teal-600"
          />
        </div>

        {/* Dashboard Tabs Toggle */}
        <div className="flex border-b border-white/5 pb-0.5">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3.5 px-6 text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3.5 px-6 text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Gamers Invoice Orders ({orders.length})
          </button>
        </div>

        {/* TAB 1: PRODUCT LISTINGS TABLE */}
        {activeTab === 'products' && (
          <div className="bg-[#080811] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs text-gray-300">
                <thead>
                  <tr className="bg-[#0d0d1b] text-gray-400 uppercase tracking-wider font-bold border-b border-white/5">
                    <th className="p-4">Item Catalog Details</th>
                    <th className="p-4">Category / Badge</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4">Revenue Stats</th>
                    <th className="p-4 text-right">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-[#0c0c18] transition-colors">
                      {/* Name & Slug */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{prod.name}</div>
                        <div className="text-gray-500 mt-0.5 font-mono">ID: {prod.id}</div>
                      </td>

                      {/* Badges */}
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 px-2 py-0.5 rounded font-black tracking-wider uppercase text-[9px]">
                            {prod.platform}
                          </span>
                          <span className="bg-[#1b1b2f] text-gray-300 border border-white/5 px-2 py-0.5 rounded text-[9px]">
                            {prod.type}
                          </span>
                        </div>
                        <div className="text-gray-400 font-semibold uppercase text-[9px]">
                          Category: {prod.category}
                        </div>
                      </td>

                      {/* Stock Adjuster */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => updateStock(prod.id, e.target.value)}
                            className="w-16 bg-[#111122] border border-white/10 text-white rounded px-2 py-1 text-center font-bold text-xs"
                          />
                          <span className={`font-black uppercase text-[10px] ${prod.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {prod.stock > 0 ? 'In Stock' : 'Out'}
                          </span>
                        </div>
                      </td>

                      {/* Pricing and Sold Stats */}
                      <td className="p-4">
                        <div className="font-bold text-white text-sm">{formatPrice(prod.price)}</div>
                        <div className="text-gray-400 text-[10px] mt-0.5">Sold count: {prod.soldCount || 0} units</div>
                      </td>

                      {/* Edit Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white p-2 rounded-lg border border-white/5 flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                            title="Edit metadata"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(prod.id)}
                            className="bg-red-950/20 hover:bg-red-900/30 text-red-400 hover:text-red-300 p-2 rounded-lg border border-red-900/30 flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer"
                            title="Delete listing"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: INVOICE ORDERS DETAILS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-[#080811] border border-white/5 rounded-3xl p-8">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-gray-500">
                  <ListOrdered className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">No orders placed yet</h3>
                  <p className="text-gray-400 text-xs mt-1">When users submit checkout forms, invoices appear here.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="bg-[#080811] border border-white/5 rounded-2xl p-6 space-y-4 shadow-lg hover:border-cyan-500/10 transition-all"
                  >
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-3">
                      <div>
                        <div className="text-cyan-400 font-bold text-sm tracking-wide">
                          ID: {ord.orderId}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          Placed: {new Date(ord.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-purple-950/60 text-purple-300 border border-purple-800/40 px-3 py-1.5 rounded-full">
                          Method: {ord.paymentMethod}
                        </span>
                        <span className="text-sm font-black text-white">
                          Total: {formatPrice(ord.total)}
                        </span>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300 bg-[#0c0c16] p-3.5 rounded-xl border border-white/5">
                      <div>
                        <span className="text-gray-500 font-semibold block uppercase text-[10px]">Client Name</span>
                        <span className="text-white font-bold text-sm">{ord.customerName}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold block uppercase text-[10px]">Phone Number</span>
                        <a href={`tel:${ord.phone}`} className="text-cyan-400 hover:underline font-semibold font-mono">{ord.phone}</a>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold block uppercase text-[10px]">Governorate/City</span>
                        <span className="text-white font-bold">{ord.city}</span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Ordered packages</span>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                        {ord.items.map((it, i) => (
                          <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-b-0">
                            <span className="text-white font-semibold">
                              {it.product.name} &mdash; <span className="text-cyan-400">{it.selectedPackage}</span>
                            </span>
                            <span className="text-gray-400">
                              Qty: {it.quantity} &bull; {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Note */}
                    {ord.note && (
                      <div className="bg-cyan-950/10 border border-cyan-800/20 p-3 rounded-lg text-xs text-cyan-300 leading-relaxed">
                        <span className="font-bold text-[10px] uppercase text-cyan-400 block mb-0.5">Note/Gamer ID:</span>
                        {ord.note}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dynamic Admin Catalog Add/Edit Form Modal */}
        {isFormOpen && (
          <AdminProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => setIsFormOpen(false)}
          />
        )}

      </div>
    </ProtectedRoute>
  );
}
