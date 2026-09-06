import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Search,
  CheckCircle2,
  XCircle,
  Sparkles,
  Flame,
  Zap,
  Star,
  RefreshCw,
  User,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';

export default function Admin({ products = [], onAddProduct, onUpdateProduct, onDeleteProduct, onToggleStock, onLogout, onResetToDefault }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to parse saved orders', e);
    }
  }, []);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/admin-login');
  };

  // Metrics Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDeleteProduct(id);
    }
  };

  const toggleFlag = (prod, flagKey) => {
    onUpdateProduct(prod.id, { [flagKey]: !prod[flagKey] });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="bg-[#080d19] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800/80 rounded">
              Authenticated Admin Session
            </span>
            <span className="text-xs text-slate-400 font-bold">dano.js</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Dano Store Control Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetToDefault}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset catalog back to initial default items"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Reset Catalog</span>
          </button>

          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-200 text-xs font-bold rounded-xl border border-rose-800 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
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
          subtext="Active items in local storage"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Orders created by users"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="Accumulated sales total (IQD)"
        />
      </div>

      {/* Sub Tabs Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Products Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Orders History ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB 1: PRODUCTS TABLE */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-[#090e1a] border border-slate-800 p-4 rounded-2xl">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog by title, category or platform..."
                className="w-full bg-[#0c1220] border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
            <span className="text-xs text-slate-400 font-semibold">
              Showing {filteredProducts.length} of {products.length} products
            </span>
          </div>

          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0c1220] text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Price (IQD)</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4">Section Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredProducts.map((prod) => {
                  const inStock = prod.stock > 0;
                  return (
                    <tr key={prod.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 overflow-hidden shrink-0 flex items-center justify-center font-black text-cyan-400 text-xs">
                            {prod.image ? (
                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                            ) : (
                              prod.name.substring(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-xs">{prod.name}</h4>
                            <p className="text-[10px] text-slate-400">{prod.type || 'Digital Item'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 text-[11px] font-bold">
                          {prod.platform}
                        </span>
                        <span className="ml-1 text-[11px] text-slate-400 capitalize">({prod.category})</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-white">{formatPrice(prod.price)}</span>
                        {prod.oldPrice && (
                          <span className="block text-[10px] text-slate-500 line-through">
                            {formatPrice(prod.oldPrice)}
                          </span>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => onToggleStock(prod.id)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1 cursor-pointer ${
                            inStock
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-rose-950 text-rose-300 border border-rose-800'
                          }`}
                        >
                          {inStock ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <XCircle className="w-3 h-3 text-rose-400" />}
                          <span>{inStock ? `In Stock (${prod.stock})` : 'Out of Stock'}</span>
                        </button>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => toggleFlag(prod, 'isFeatured')}
                            title="Toggle Featured Section"
                            className={`p-1 rounded ${prod.isFeatured ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-600'}`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(prod, 'isTrending')}
                            title="Toggle New & Trending"
                            className={`p-1 rounded ${prod.isTrending ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-900 text-slate-600'}`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(prod, 'isFlashDeal')}
                            title="Toggle Flash Deal"
                            className={`p-1 rounded ${prod.isFlashDeal ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-slate-900 text-slate-600'}`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleFlag(prod, 'isTopRated')}
                            title="Toggle Top Rated"
                            className={`p-1 rounded ${prod.isTopRated ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-slate-900 text-slate-600'}`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(prod.id, prod.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete Product"
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

      {/* TAB 2: ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-400">When customers complete checkout, their order details will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-[#090e1a] border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-white tracking-widest">{order.id}</span>
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full">
                        {order.status || 'Pending Verification'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {new Date(order.date).toLocaleString()}
                      </span>
                      <span className="font-black text-white">{formatPrice(order.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 font-bold block mb-0.5 flex items-center gap-1">
                        <User className="w-3 h-3 text-cyan-400" /> Name
                      </span>
                      <span className="text-white font-extrabold">{order.customerName}</span>
                    </div>

                    <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 font-bold block mb-0.5 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-cyan-400" /> Phone
                      </span>
                      <span className="text-white font-extrabold">{order.phone}</span>
                    </div>

                    <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800/80">
                      <span className="text-slate-500 font-bold block mb-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" /> Selected Payment & City
                      </span>
                      <span className="text-cyan-300 font-black uppercase">
                        {order.paymentMethod} ({order.city})
                      </span>
                    </div>
                  </div>

                  {/* Items Purchased in Order */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ordered Items:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="p-2 bg-[#0c1220] rounded-lg border border-slate-800/60 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-200 truncate">{item.name} ({item.packageName})</span>
                          <span className="font-black text-cyan-400 shrink-0">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.note && (
                    <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-[11px] text-slate-300">
                      <span className="font-bold text-cyan-400">Order Note / Player ID: </span>
                      {order.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
