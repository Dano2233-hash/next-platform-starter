import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Shield,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Star,
  Zap,
  TrendingUp,
  Flame,
  Search,
  CheckCircle,
  Clock,
  Filter,
  Layers,
  RotateCcw
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'highlights'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsCreatingProduct(false);
    }
  };

  const toggleFlag = (id, flagName) => {
    const p = products.find((prod) => prod.id === id);
    if (p) {
      updateProduct(id, { [flagName]: !p[flagName] });
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Top Banner Header */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Admin Management Dashboard</span>
            </h1>
            <p className="text-xs text-slate-400">
              Logged in as <span className="text-cyan-400 font-bold">dano.js</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset Catalog to Default Seeds"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 hover:bg-rose-900 text-rose-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active in store catalog"
          icon={Package}
          color="cyan"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Processed in LocalStorage"
          icon={ShoppingBag}
          color="purple"
        />

        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Completed manual sales"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsCreatingProduct(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-950'
              : 'bg-[#090d1a] border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manage Products ({totalProducts})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setIsCreatingProduct(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-950'
              : 'bg-[#090d1a] border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>View Orders ({totalOrders})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('highlights');
            setIsCreatingProduct(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            activeTab === 'highlights'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-950'
              : 'bg-[#090d1a] border border-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Featured & Deals</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add product form modal or inline */}
          {isCreatingProduct || editingProduct ? (
            <AdminProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsCreatingProduct(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <>
              {/* Product Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#090d1a] border border-slate-800 p-4 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#05070f] border border-slate-800 focus:border-cyan-500 rounded-xl py-2 pl-9 pr-3 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setIsCreatingProduct(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#05070f] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="py-3.5 px-4">Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Platform</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Stock</th>
                        <th className="py-3.5 px-4">Sold</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 px-4 font-bold text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              ) : (
                                <span>{p.platform || 'DS'}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-extrabold line-clamp-1">{p.name}</div>
                              <span className="text-[10px] font-normal text-slate-400">{p.type}</span>
                            </div>
                          </td>

                          <td className="py-3 px-4 text-slate-300 font-medium">{p.category}</td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-[10px] uppercase">
                              {p.platform}
                            </span>
                          </td>

                          <td className="py-3 px-4 font-extrabold text-cyan-400">
                            {formatPrice(p.price)}
                          </td>

                          <td className="py-3 px-4">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => updateStock(p.id, e.target.value)}
                              className="w-16 bg-[#05070f] border border-slate-800 rounded-lg py-1 px-2 text-xs font-bold text-center text-white focus:border-cyan-500"
                            />
                          </td>

                          <td className="py-3 px-4 text-emerald-400 font-bold">
                            {p.soldCount || 0}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm(`Delete product "${p.name}"?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
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
            </>
          )}
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
              <span>Customer Orders List</span>
              <span className="text-xs text-cyan-400 font-bold">{orders.length} total orders</span>
            </h3>

            {orders.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-slate-300">No Orders Created Yet</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  When customers complete checkout, their manual payment orders will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#05070f] border border-slate-800 rounded-xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-extrabold text-cyan-400 text-sm">{order.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                            {order.status || 'Pending Payment'}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          Created: {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] font-bold uppercase text-slate-500 block">Selected Payment Method</span>
                        <span className="font-extrabold text-sm text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-lg inline-block">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 uppercase font-bold block mb-0.5">Customer Name</span>
                        <span className="font-bold text-white">{order.customerName}</span>
                      </div>

                      <div>
                        <span className="text-slate-500 uppercase font-bold block mb-0.5">Phone Number</span>
                        <span className="font-bold text-white">{order.phone}</span>
                      </div>

                      <div>
                        <span className="text-slate-500 uppercase font-bold block mb-0.5">City</span>
                        <span className="font-bold text-white">{order.city}</span>
                      </div>
                    </div>

                    {order.orderNote && (
                      <div className="text-xs bg-[#090d1a] p-2.5 rounded-lg border border-slate-800">
                        <span className="text-slate-500 uppercase font-bold block mb-0.5">Player ID / Note:</span>
                        <span className="text-cyan-300 font-medium">{order.orderNote}</span>
                      </div>
                    )}

                    {/* Order Items */}
                    <div className="border-t border-slate-800/80 pt-3 text-xs space-y-1.5">
                      <span className="text-slate-500 font-bold uppercase block text-[10px]">Items</span>
                      {order.items &&
                        order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-slate-200">
                            <span>
                              • {item.productName} ({item.packageName}) x {item.quantity}
                            </span>
                            <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-sm font-extrabold text-white">
                      <span>Total Value</span>
                      <span className="text-cyan-400">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: HIGHLIGHTS & SECTIONS MANAGEMENT */}
      {activeTab === 'highlights' && (
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-white">
              Manage Featured, Trending, Flash Deals & Top Rated Sections
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Toggle flags to automatically feature products on the homepage sections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-[#05070f] border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4"
              >
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-white truncate">{p.name}</h4>
                  <span className="text-[10px] text-slate-500">{p.category} • {formatPrice(p.price)}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleFlag(p.id, 'isFeatured')}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      p.isFeatured
                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                    title="Toggle Featured"
                  >
                    Featured
                  </button>

                  <button
                    onClick={() => toggleFlag(p.id, 'isTrending')}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      p.isTrending
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                    title="Toggle Trending"
                  >
                    Trending
                  </button>

                  <button
                    onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      p.isFlashDeal
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                    title="Toggle Flash Deal"
                  >
                    Flash
                  </button>

                  <button
                    onClick={() => toggleFlag(p.id, 'isTopRated')}
                    className={`p-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      p.isTopRated
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-600 border-slate-800'
                    }`}
                    title="Toggle Top Rated"
                  >
                    Top Rated
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
