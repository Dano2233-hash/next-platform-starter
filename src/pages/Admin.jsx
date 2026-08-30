import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  DollarSign,
  Star,
  Zap,
  Flame,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  RefreshCw,
  Filter
} from 'lucide-react';

export default function Admin({ products = [], onAddProduct, onUpdateProduct, onDeleteProduct, onResetProducts, onLogout }) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from local storage
  const loadOrders = () => {
    try {
      const saved = localStorage.getItem('dano_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('dano_admin_auth');
    if (onLogout) onLogout();
    navigate('/admin-login');
  };

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleStockChange = (productId, newStock) => {
    onUpdateProduct(productId, { stock: Math.max(0, Number(newStock)) });
  };

  const handleToggleFlag = (productId, flagName, currentValue) => {
    onUpdateProduct(productId, { [flagName]: !currentValue });
  };

  // Metrics calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.platform.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">

      {/* Admin Top Header & Logout */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Manage catalog, inventory stock, order status, and highlight deals.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetProducts}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Reset to seed products"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset Default Data</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Catalog items"
          icon={<Package className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Customer requests"
          icon={<ShoppingBag className="w-6 h-6" />}
          color="cyan"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Orders total sum"
          icon={<DollarSign className="w-6 h-6" />}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Management ({products.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('orders'); loadOrders(); }}
            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Search bar inside admin */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products by title, category, or platform..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-slate-900 text-xs text-slate-100 placeholder-slate-400 rounded-xl pl-9 pr-3 py-2.5 border border-slate-700/80 focus:border-cyan-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Showing {filteredProducts.length} items
            </span>
          </div>

          {/* Products Table */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#080c14] border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category / Platform</th>
                    <th className="p-4">Price (IQD)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Highlight Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ProductImage product={p} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xs line-clamp-1">{p.name}</h4>
                            <span className="text-[10px] text-cyan-400 font-semibold">{p.type}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-bold text-slate-200">
                          {p.category} / {p.platform}
                        </span>
                      </td>

                      <td className="p-4 font-extrabold text-cyan-400">
                        {formatPrice(p.price)}
                        {p.packages && p.packages.length > 0 && (
                          <span className="text-[10px] text-slate-400 font-normal block">
                            ({p.packages.length} packages)
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={(e) => handleStockChange(p.id, e.target.value)}
                            className="w-16 bg-slate-900 text-slate-100 font-bold text-xs p-1 rounded border border-slate-700 text-center focus:border-cyan-400"
                          />
                          {p.stock === 0 ? (
                            <span className="text-[10px] text-red-400 font-bold">Out</span>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-bold">In</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isFeatured', p.isFeatured)}
                            title="Toggle Featured"
                            className={`px-2 py-1 rounded text-[10px] font-bold border ${
                              p.isFeatured
                                ? 'bg-blue-950 text-blue-400 border-blue-800'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isTrending', p.isTrending)}
                            title="Toggle Trending"
                            className={`px-2 py-1 rounded text-[10px] font-bold border ${
                              p.isTrending
                                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isFlashDeal', p.isFlashDeal)}
                            title="Toggle Flash Deal"
                            className={`px-2 py-1 rounded text-[10px] font-bold border ${
                              p.isFlashDeal
                                ? 'bg-amber-950 text-amber-400 border-amber-800'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            Flash
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isTopRated', p.isTopRated)}
                            title="Toggle Top Rated"
                            className={`px-2 py-1 rounded text-[10px] font-bold border ${
                              p.isTopRated
                                ? 'bg-purple-950 text-purple-400 border-purple-800'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            Top
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 transition-colors"
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
        <div className="space-y-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Customer Orders Log ({orders.length})</h3>
            <button
              onClick={loadOrders}
              className="text-xs font-bold text-cyan-400 flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Orders</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <ShoppingBag className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">No orders recorded yet</p>
              <p className="text-xs">When customers place orders, they will appear here with selected payment methods.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-cyan-400 font-mono">#{order.id}</span>
                      <span className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                        Payment Method: {order.paymentMethod}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-950 text-amber-400 border border-amber-800">
                        {order.status || 'Pending Payment'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Customer Name</span>
                      <span className="font-bold text-white">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Phone (WhatsApp)</span>
                      <span className="font-bold text-white font-mono">{order.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">City</span>
                      <span className="font-bold text-white">{order.customerCity}</span>
                    </div>
                  </div>

                  {order.orderNote && (
                    <div className="text-xs bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-0.5">Order Note / ID:</span>
                      <span className="text-slate-200">{order.orderNote}</span>
                    </div>
                  )}

                  {/* Items list */}
                  <div className="pt-2 space-y-2 border-t border-slate-800 text-xs">
                    <span className="font-bold text-slate-400 block">Purchased Items:</span>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <div>
                          <span className="font-bold text-white">{item.productName}</span>
                          {item.packageName && (
                            <span className="text-[10px] text-cyan-400 block">Package: {item.packageName}</span>
                          )}
                        </div>
                        <span className="font-extrabold text-cyan-400">
                          Qty: {item.quantity} &bull; {formatPrice(item.totalPrice)}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 text-sm font-extrabold text-white">
                      <span>Total Amount:</span>
                      <span className="text-cyan-400">{formatPrice(order.totalAmount)}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Product Modal Form */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => { setIsFormOpen(false); setEditingProduct(null); }}
        />
      )}

    </div>
  );
}
