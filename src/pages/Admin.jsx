import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  DollarSign,
  Search,
  Check,
  X,
  Star,
  Sparkles,
  TrendingUp,
  Flame,
  Award,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const { orders } = useCart();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleToggleFlag = (product, flagName) => {
    updateProduct(product.id, {
      [flagName]: !product[flagName],
    });
  };

  const handleStockChange = (product, delta) => {
    const newStock = Math.max(0, (product.stock || 0) + delta);
    updateProduct(product.id, { stock: newStock });
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">

      {/* Top Admin Header */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-950/80 border border-purple-500/30 rounded-2xl text-purple-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-sans">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">
              Manage Dano Store catalog, stock levels, sections &amp; incoming orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset all catalog products to default initial dataset?')) {
                resetProducts();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 text-xs font-semibold transition-colors"
            title="Reset Catalog to Initial Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-300 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog size"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          subtitle="Completed requests"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="All completed transactions"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black border-cyan-400 shadow-md'
                : 'bg-[#090d18] text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            Product Management ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white border-purple-400 shadow-md'
                : 'bg-[#090d18] text-slate-400 hover:text-white border-slate-800'
            }`}
          >
            Incoming Orders ({totalOrdersCount})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:brightness-110 text-black px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4 fill-black" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* PRODUCTS TAB CONTENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Table Search Filter */}
          <div className="flex items-center gap-3 bg-[#090d18] p-3 rounded-2xl border border-slate-800">
            <Search className="w-4 h-4 text-slate-500 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter table products by name, category or platform..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Product Management Table */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0b1122] text-slate-400 uppercase font-extrabold border-b border-slate-800 text-[10px]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category / Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Badges &amp; Highlights</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0c1326] transition-colors">
                      {/* Name & Image */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-800">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.type}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category & Platform */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded block w-max">
                            {p.platform}
                          </span>
                          <span className="text-[10px] text-slate-400 capitalize block">{p.category}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-extrabold text-cyan-300">
                        {formatPrice(p.price)}
                      </td>

                      {/* Stock Control */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStockChange(p, -10)}
                            className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-bold"
                            title="-10 Stock"
                          >
                            -10
                          </button>
                          <span
                            className={`font-black px-2 py-0.5 rounded text-xs ${
                              p.stock > 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                            }`}
                          >
                            {p.stock}
                          </span>
                          <button
                            onClick={() => handleStockChange(p, 10)}
                            className="px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 font-bold"
                            title="+10 Stock"
                          >
                            +10
                          </button>
                        </div>
                      </td>

                      {/* Section Flag Toggles */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleFlag(p, 'isFeatured')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold border transition-all ${
                              p.isFeatured
                                ? 'bg-blue-900/80 border-blue-400 text-blue-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                            title="Toggle Featured"
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p, 'isTrending')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold border transition-all ${
                              p.isTrending
                                ? 'bg-purple-900/80 border-purple-400 text-purple-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                            title="Toggle Trending"
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p, 'isFlashDeal')}
                            className={`px-2 py-1 rounded text-[10px] font-extrabold border transition-all ${
                              p.isFlashDeal
                                ? 'bg-rose-900/80 border-rose-400 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            Flash
                          </button>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 bg-slate-800 hover:bg-red-950 text-red-400 rounded-lg transition-colors"
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

      {/* ORDERS TAB CONTENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="font-extrabold text-white text-base">No Customer Orders Yet</h3>
              <p className="text-xs text-slate-400">
                When customers place orders using FastPay, Korek, or MasterCard, they will show here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-wider block">
                        Order #{ord.orderId}
                      </span>
                      <span className="text-xs text-slate-400">
                        Date: {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">Selected Payment Method:</span>
                      <span className="bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-black px-3 py-1 rounded-xl">
                        {ord.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#060a14] p-3 rounded-xl border border-slate-800/80">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Customer Name</span>
                      <span className="text-slate-200 font-bold">{ord.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">Phone / WhatsApp</span>
                      <span className="text-slate-200 font-bold">{ord.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-bold block">City</span>
                      <span className="text-slate-200 font-bold">{ord.city}</span>
                    </div>
                    {ord.orderNote && (
                      <div className="sm:col-span-3 pt-2 border-t border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Player ID / Note</span>
                        <span className="text-cyan-300 font-semibold">{ord.orderNote}</span>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="space-y-1.5 pt-1">
                    {ord.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                        <span className="text-slate-200">
                          {item.name} ({item.packageName}) × <span className="font-bold text-cyan-400">{item.quantity}</span>
                        </span>
                        <span className="font-bold text-slate-300">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-400">Total Order Revenue</span>
                    <span className="text-lg font-black text-cyan-300">{formatPrice(ord.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
