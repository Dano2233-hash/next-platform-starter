import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Flame,
  Zap,
  TrendingUp,
  Star,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    editProduct,
    deleteProduct,
    toggleStock,
    toggleFeatured,
    toggleTrending,
    toggleFlashDeal,
    toggleTopRated,
    resetToDefault
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [orders, setOrders] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Error reading orders from LocalStorage:', e);
    }
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      editProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-slate-100">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Management Dashboard</h1>
          <p className="text-xs text-slate-400">Manage catalog, inventory, stock toggles, and view customer orders</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            title="Reset Catalog to Defaults"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" /> Reset Default Data
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 font-bold text-xs flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog inventory items"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Customer orders received"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Combined orders value"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 font-black'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Product Management ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 font-black'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Orders History ({orders.length})
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-2.5" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Platform / Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Status</th>
                  <th className="p-3">Flags Toggles</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/50">
                    <td className="p-3 font-bold text-white flex items-center gap-2">
                      <img
                        src={prod.image}
                        alt=""
                        className="w-9 h-9 object-cover rounded-lg bg-slate-950"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/100?text=DS';
                        }}
                      />
                      <span className="truncate max-w-[180px]">{prod.name}</span>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-semibold mr-1">
                        {prod.platform}
                      </span>
                      <span className="text-slate-400">{prod.category}</span>
                    </td>

                    <td className="p-3 font-bold text-cyan-400">
                      {formatPrice(prod.price)}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => toggleStock(prod.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 ${
                          prod.stock
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}
                      >
                        {prod.stock ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {prod.stock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleFeatured(prod.id)}
                          title="Toggle Featured"
                          className={`p-1.5 rounded ${prod.isFeatured ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-900 text-slate-600'}`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleTrending(prod.id)}
                          title="Toggle Trending"
                          className={`p-1.5 rounded ${prod.isTrending ? 'bg-purple-950 text-purple-400 border border-purple-800' : 'bg-slate-900 text-slate-600'}`}
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleFlashDeal(prod.id)}
                          title="Toggle Flash Deal"
                          className={`p-1.5 rounded ${prod.isFlashDeal ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-slate-900 text-slate-600'}`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleTopRated(prod.id)}
                          title="Toggle Top Rated"
                          className={`p-1.5 rounded ${prod.isTopRated ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'bg-slate-900 text-slate-600'}`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setShowProductModal(true);
                        }}
                        className="p-1.5 rounded bg-slate-800 text-cyan-400 hover:bg-slate-700"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded bg-slate-800 text-rose-400 hover:bg-rose-950"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#090d1a] border border-slate-800 rounded-2xl text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-2" />
              <p className="font-bold text-white">No customer orders placed yet</p>
              <p className="text-xs">Orders will appear here once customers checkout!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.orderId} className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <span className="text-xs font-black text-cyan-400">{order.orderId}</span>
                      <span className="text-xs text-slate-500 ml-2">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">
                        {order.status || 'Pending Payment'}
                      </span>
                      <span className="text-sm font-black text-white">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info & Selected Payment Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block">Customer Name:</span>
                      <span className="font-bold text-white">{order.customer?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone / City:</span>
                      <span className="font-bold text-slate-200">{order.customer?.phone} ({order.customer?.city})</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Payment Method:</span>
                      <span className="font-black text-cyan-400 uppercase">{order.customer?.paymentMethod}</span>
                    </div>
                  </div>

                  {/* Note */}
                  {order.customer?.note && (
                    <p className="text-xs text-slate-400 bg-slate-900 p-2 rounded-lg">
                      <strong className="text-slate-300">Note / Player ID:</strong> {order.customer.note}
                    </p>
                  )}

                  {/* Order Items */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">Items Ordered:</span>
                    <div className="flex flex-wrap gap-2">
                      {order.items?.map((item, i) => (
                        <div key={i} className="px-2.5 py-1 rounded bg-slate-900 text-[11px] border border-slate-800">
                          <span className="font-bold text-white">{item.name}</span>
                          {item.package && <span className="text-cyan-400 font-semibold ml-1">({item.package})</span>}
                          <span className="text-slate-500 ml-1">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      {showProductModal && (
        <AdminProductForm
          product={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
};
