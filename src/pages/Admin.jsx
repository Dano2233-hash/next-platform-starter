import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Search,
  CheckCircle,
  Star,
  Flame,
  Zap,
  TrendingUp,
  RefreshCw,
  Clock,
  Eye,
  Filter
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, toggleFlag, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [orders, setOrders] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to parse orders', e);
    }
  }, []);

  const saveOrdersToStorage = (updated) => {
    setOrders(updated);
    try {
      localStorage.setItem('dano_orders', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o));
    saveOrdersToStorage(updated);
  };

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

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending Payment').length;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.platform.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) =>
    o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer?.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer?.phone.toLowerCase().includes(orderSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Admin Control Panel
            </span>
            <span className="text-xs text-slate-400">Dano Store Kurdistan</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-100 mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-bold font-heading bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Plus size={16} /> Add Product
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-red-400 border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          trend="In Catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          trend={`${pendingOrdersCount} Pending`}
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          trend="Lifetime Sales"
        />
        <StatCard
          title="Pending Payments"
          value={pendingOrdersCount}
          icon={Clock}
          color="amber"
          trend="Needs Action"
        />
      </div>

      {/* Tabs Switcher: Products vs Orders */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-2xl font-heading font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Package size={18} /> Manage Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-2xl font-heading font-extrabold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShoppingBag size={18} /> View Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              if (window.confirm('Reset catalog back to initial default products dataset?')) {
                resetToDefault();
              }
            }}
            className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={14} /> Reset Demo Data
          </button>
        )}
      </div>

      {/* ================= TAB 1: MANAGE PRODUCTS ================= */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Platform / Type</th>
                    <th className="p-4">Price (IQD)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Section Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <ProductImage product={p} className="w-12 h-12 shrink-0 rounded-lg" />
                          <div>
                            <div className="font-bold text-slate-100 text-sm">{p.name}</div>
                            <div className="text-[10px] text-slate-500">
                              {p.packages?.length || 1} Package options • {p.soldCount} Sold
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold">
                            {p.platform}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 font-semibold">
                            {p.type}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 font-bold text-cyan-400 font-heading">
                        {formatPrice(p.price)}
                      </td>

                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-20 p-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-slate-100 focus:border-cyan-500 focus:outline-none"
                        />
                      </td>

                      {/* Section Flags Toggles */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => toggleFlag(p.id, 'isFeatured')}
                            title="Featured"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Sparkles size={12} /> Featured
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTrending')}
                            title="Trending"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isTrending
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                          >
                            <TrendingUp size={12} /> Trending
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                            title="Flash Deal"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Zap size={12} /> Flash
                          </button>

                          <button
                            onClick={() => toggleFlag(p.id, 'isTopRated')}
                            title="Top Rated"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isTopRated
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Star size={12} /> Top Rated
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                            title="Edit product"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 size={14} />
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

      {/* ================= TAB 2: VIEW ORDERS ================= */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search orders..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <ShoppingBag size={32} className="mx-auto text-slate-500" />
              <h3 className="font-bold text-slate-200">No Orders Found</h3>
              <p className="text-xs text-slate-400">Orders created by customers at checkout will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const pmDetails = PAYMENT_METHODS.find((pm) => pm.id === order.paymentMethod) || PAYMENT_METHODS[0];

                return (
                  <div
                    key={order.orderId}
                    className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-lg"
                  >
                    {/* Order Top Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-cyan-400 text-sm">{order.orderId}</span>
                          <span className="text-[10px] text-slate-500">
                            {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-300 font-semibold mt-1">
                          Customer: <span className="text-slate-100">{order.customer?.name}</span> ({order.customer?.phone}) • {order.customer?.city}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Selected Payment Method Badge */}
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                          <span className="text-slate-400">Payment:</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${pmDetails.badgeColor}`}>
                            {pmDetails.name}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.orderId, e.target.value)}
                          className={`p-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                            order.status === 'Completed'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : order.status === 'Paid'
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          <option value="Pending Payment">Pending Payment</option>
                          <option value="Paid">Paid</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center gap-3 text-xs">
                          <ProductImage
                            product={{
                              name: item.title,
                              image: item.image,
                              category: item.category,
                              platform: item.platform,
                              type: item.type
                            }}
                            className="w-10 h-10 shrink-0 rounded-lg"
                          />
                          <div className="min-w-0 flex-1">
                            <h5 className="font-bold text-slate-100 truncate">{item.title}</h5>
                            <p className="text-cyan-400 font-semibold text-[11px]">{item.packageName} x {item.quantity}</p>
                          </div>
                          <div className="font-bold text-slate-200">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Notes & Total */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 text-xs border-t border-slate-800/80">
                      <p className="text-slate-400 italic">
                        {order.customer?.orderNote ? `Note: "${order.customer.orderNote}"` : 'No player ID / notes attached.'}
                      </p>
                      <div className="font-heading font-black text-sm text-slate-100">
                        Total Amount: <span className="text-cyan-400">{formatPrice(order.totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
