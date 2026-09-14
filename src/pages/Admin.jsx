import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useProducts } from '../hooks/useProducts.jsx';
import StatCard from '../components/StatCard.jsx';
import AdminProductForm from '../components/AdminProductForm.jsx';
import ProductImage from '../components/ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Zap,
  Flame,
  Tag,
  ShieldAlert
} from 'lucide-react';

export default function Admin() {
  const { isAdmin, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, toggleStock, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from LocalStorage 'dano_orders'
  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(storedOrders);
    } catch (e) {
      console.error('Error loading orders:', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Dashboard Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase">
              Admin Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Store Control Panel
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage product inventory, stock status, and view customer orders
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {/* Product Form Modal / Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <AdminProductForm
              initialProduct={editingProduct}
              onSubmit={handleSaveProduct}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Product Catalog ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'orders'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2">
            <button
              onClick={resetToDefault}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 rounded-xl border border-slate-800 transition-colors"
              title="Reset Catalog to Default"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, category, or platform..."
              className="w-full pl-10 pr-4 py-2 bg-slate-900 text-slate-100 text-xs rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
            />
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 uppercase font-bold text-[10px] text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Platform / Type</th>
                  <th className="py-3.5 px-4">Price (IQD)</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4">Section Badges</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => {
                  const inStock = p.stock > 0;
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800 bg-slate-950">
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-cyan-400 text-[10px]">
                                {p.platform?.slice(0, 2)}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-500 uppercase">{p.category}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] font-semibold border border-slate-700 mr-1">
                          {p.platform}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] font-semibold border border-blue-800">
                          {p.type}
                        </span>
                      </td>

                      <td className="py-3 px-4 font-extrabold text-cyan-400 font-heading">
                        {formatPrice(p.price)}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 border transition-all ${
                            inStock
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20'
                          }`}
                        >
                          {inStock ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          <span>{inStock ? `In Stock (${p.stock})` : 'Out of Stock'}</span>
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">Featured</span>}
                          {p.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300">Trending</span>}
                          {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">Flash</span>}
                          {p.isTopRated && <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Top Rated</span>}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No orders recorded yet</h3>
              <p className="text-xs text-slate-500">Orders placed by customers will appear here.</p>
            </div>
          ) : (
            orders.map((o) => (
              <div
                key={o.orderId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Order ID: <span className="text-cyan-400 font-mono font-bold text-sm">{o.orderId}</span>
                    </span>
                    <span className="text-xs text-slate-400">
                      Date: {new Date(o.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Selected Payment Method Badge */}
                    <span className="px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800 text-xs font-bold">
                      Payment: {o.paymentMethod?.name || 'Manual'}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                      {o.status || 'Pending Payment'}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 block">Customer Name</span>
                    <span className="font-bold text-slate-200">{o.customer?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 block">Phone Number</span>
                    <span className="font-bold text-cyan-300 font-mono">{o.customer?.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-slate-500 block">City / Region</span>
                    <span className="font-bold text-slate-200">{o.customer?.city}</span>
                  </div>
                  {o.customer?.orderNote && (
                    <div className="col-span-1 sm:col-span-3 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-semibold text-slate-500 block">Order Note / ID:</span>
                      <span className="text-slate-300">{o.customer.orderNote}</span>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Ordered Products:
                  </span>
                  <div className="space-y-1.5">
                    {o.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                        <span className="font-semibold text-slate-200">
                          {item.product?.name} ({item.package?.name || 'Standard'}) × {item.quantity}
                        </span>
                        <span className="font-extrabold text-cyan-400 font-heading">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
                  <span className="font-bold text-slate-300">Total Order Amount</span>
                  <span className="text-lg font-extrabold text-cyan-400 font-heading">
                    {formatPrice(o.totalAmount)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
