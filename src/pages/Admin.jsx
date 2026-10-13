import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import {
  Package, ShoppingBag, DollarSign, LogOut, Plus, Edit3, Trash2, Search,
  Check, Flame, Zap, Award, Sparkles, Filter, Layers, User
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalPrice || 0), 0);

  // Filter products
  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setEditingProduct(null);
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Admin Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            ADMIN <span className="text-cyan-400">DASHBOARD</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Store operations, inventory management & order fulfillments
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout (dano.js)</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Main Tab Controls */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">

          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Filter by product name or platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#090e1f] border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-orbitron font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#090e1f] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0c1224] border-b border-slate-800 text-[11px] font-orbitron font-bold text-slate-400 uppercase tracking-wider">
                    <th className="p-4">Product</th>
                    <th className="p-4">Platform / Type</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Section Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs text-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0c1224]/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ProductImage
                              image={p.image}
                              name={p.name}
                              platform={p.platform}
                              category="Product"
                              className="h-10 w-10"
                            />
                          </div>
                          <div>
                            <span className="font-orbitron font-bold text-slate-100 block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-semibold text-cyan-400 uppercase">{p.platform}</span>
                          <span className="text-[10px] font-mono text-purple-300">{p.type}</span>
                        </div>
                      </td>

                      <td className="p-4 font-mono font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>

                      {/* Interactive Stock adjustment */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, parseInt(e.target.value) || 0)}
                            className="w-16 bg-[#0c1224] border border-slate-800 focus:border-cyan-500 rounded px-2 py-1 text-xs font-mono font-bold text-center text-slate-100"
                          />
                          <span className={`text-[10px] uppercase font-bold ${p.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {p.stock > 0 ? 'In Stock' : 'Out'}
                          </span>
                        </div>
                      </td>

                      {/* Flags Badges */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {p.isFeatured && (
                            <button
                              title="Featured"
                              onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40"
                            >
                              Featured
                            </button>
                          )}
                          {p.isTrending && (
                            <button
                              title="Trending"
                              onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-500/40"
                            >
                              Trending
                            </button>
                          )}
                          {p.isFlashDeal && (
                            <button
                              title="Flash Deal"
                              onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40"
                            >
                              Flash
                            </button>
                          )}
                          {p.isTopRated && (
                            <button
                              title="Top Rated"
                              onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                              className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-500/40"
                            >
                              Top Rated
                            </button>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
                            title="Edit Product"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-rose-400 hover:border-rose-500/50 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#090e1f] border border-slate-800 rounded-2xl space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-orbitron font-bold text-slate-300 text-base">No Customer Orders Yet</h3>
              <p className="text-xs text-slate-500">
                Orders created by customers will appear here automatically with selected payment methods.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={idx} className="p-6 bg-[#090e1f] border border-slate-800 rounded-2xl space-y-4 shadow-xl">

                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron font-extrabold text-sm text-cyan-400">{order.orderId}</span>
                      <span className="text-xs text-slate-500 font-mono">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-400">Payment:</span>
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#0c1224] p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Customer Name</span>
                      <span className="font-bold text-slate-200">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Phone Number</span>
                      <span className="font-bold text-slate-200">{order.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">City</span>
                      <span className="font-bold text-slate-200">{order.city}</span>
                    </div>
                  </div>

                  {order.note && (
                    <div className="p-3 rounded-xl bg-[#0c1224] border border-slate-800 text-xs">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Player ID / Note</span>
                      <span className="text-slate-200 font-mono">{order.note}</span>
                    </div>
                  )}

                  {/* Purchased Items List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase font-orbitron text-slate-400">Order Items:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items?.map((item, itemIdx) => (
                        <div key={itemIdx} className="p-2.5 bg-[#050814] border border-slate-800/80 rounded-lg flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-slate-200 block">{item.name}</span>
                            <span className="text-[10px] text-purple-300 font-mono">{item.packageName} x {item.quantity}</span>
                          </div>
                          <span className="font-mono font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline font-orbitron">
                    <span className="text-xs text-slate-400 uppercase">Total Amount</span>
                    <span className="font-extrabold text-lg text-cyan-400">{formatPrice(order.totalPrice)}</span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Form */}
      <AdminProductForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productToEdit={editingProduct}
        onSubmit={handleSaveProduct}
      />

    </div>
  );
}
