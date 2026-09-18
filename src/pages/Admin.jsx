import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  LogOut,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Flame,
  Zap,
  Star,
  TrendingUp,
  User,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';

export function Admin({ productsHooks }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { products, addProduct, updateProduct, deleteProduct, resetProductsToDefault } = productsHooks;

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Orders state from local storage
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('dano_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error('Failed to parse orders:', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleStartEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (Number(order.totalPrice) || 0), 0);

  // Filter products
  const filteredProductsList = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16">

      {/* Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider mb-1">
            <span>Dano Store Control Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage store catalog, edit prices, view orders and toggle placements.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-600/40 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext="Active in store catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Processed in Local Storage"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="IQD Total Earned"
        />
      </div>

      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !isFormOpen && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>
        )}
      </div>

      {/* PRODUCTS MANAGEMENT TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">

          {/* Add / Edit Form Overlay */}
          {isFormOpen ? (
            <AdminProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xl">

              {/* Search in products */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search by product name or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500"
                  />
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <button
                  onClick={() => resetProductsToDefault()}
                  className="text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                  title="Reset to initial catalog"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Platform</th>
                      <th className="p-3">Price (IQD)</th>
                      <th className="p-3">Stock</th>
                      <th className="p-3">Placements</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredProductsList.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                            <ProductImage
                              src={prod.image}
                              alt={prod.name}
                              category={prod.category}
                              platform={prod.platform}
                              heightClass="h-10"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{prod.name}</span>
                            <span className="text-[10px] text-slate-500">{prod.packages?.length || 1} packages</span>
                          </div>
                        </td>
                        <td className="p-3 capitalize">{prod.category.replace('-', ' ')}</td>
                        <td className="p-3">
                          <span className="bg-slate-900 border border-cyan-500/20 text-cyan-400 font-bold px-2 py-0.5 rounded text-[10px]">
                            {prod.platform}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-cyan-400">{formatPrice(prod.price)}</td>
                        <td className="p-3">
                          <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            prod.stock > 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                          }`}>
                            {prod.stock > 0 ? `${prod.stock} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 text-[10px]">
                            {prod.isFeatured && <span title="Featured" className="p-1 rounded bg-amber-500/20 text-amber-400 font-bold">FE</span>}
                            {prod.isTrending && <span title="Trending" className="p-1 rounded bg-blue-500/20 text-blue-400 font-bold">TR</span>}
                            {prod.isFlashDeal && <span title="Flash Deal" className="p-1 rounded bg-rose-500/20 text-rose-400 font-bold">FL</span>}
                            {prod.isTopRated && <span title="Top Rated" className="p-1 rounded bg-purple-500/20 text-purple-400 font-bold">TR</span>}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleStartEdit(prod)}
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                              title="Edit product"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id)}
                              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

        </div>
      )}

      {/* CUSTOMER ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Orders Received Yet</h3>
              <p className="text-xs text-slate-400">Customer purchases will automatically appear here.</p>
            </div>
          ) : (
            orders.map((ord, idx) => (
              <div
                key={idx}
                className="bg-[#090d16] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                  <div>
                    <span className="text-xs font-black text-cyan-400 font-mono">{ord.orderId}</span>
                    <span className="text-[10px] text-slate-500 ml-2">
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-purple-950 border border-purple-500/30 text-purple-300 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                      Method: {ord.paymentMethod}
                    </span>
                    <span className="bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-extrabold text-[10px] px-2.5 py-0.5 rounded uppercase">
                      {ord.status || 'Pending Payment'}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-300">
                    <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Name: <strong>{ord.customerName}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Phone: <strong>{ord.phoneNumber}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>City: <strong>{ord.city}</strong></span>
                  </div>
                  {ord.orderNote && (
                    <div className="sm:col-span-3 flex items-start gap-2 text-slate-300 pt-1 border-t border-slate-800/80">
                      <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>Note / Player ID: <strong className="text-amber-300">{ord.orderNote}</strong></span>
                    </div>
                  )}
                </div>

                {/* Items Purchased */}
                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-400 text-[11px]">Items Ordered:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ord.items && ord.items.map((it, itemIdx) => (
                      <div key={itemIdx} className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between items-center">
                        <div>
                          <span className="font-bold text-white block">{it.name}</span>
                          <span className="text-[10px] text-cyan-400">Pkg: {it.packageName} x{it.quantity}</span>
                        </div>
                        <span className="font-extrabold text-slate-200">{formatPrice(it.price * it.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Order Amount</span>
                  <span className="text-base font-black text-cyan-400">{formatPrice(ord.totalPrice)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
