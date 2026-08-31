import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../components/PaymentMethodCard';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Star,
  Zap,
  Flame,
  TrendingUp,
  RotateCcw,
  Search,
} from 'lucide-react';

const ORDERS_STORAGE_KEY = 'dano_orders';

export default function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onToggleFlag,
  onResetProducts,
  onLogout,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Orders from Local Storage
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login', { replace: true });
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPaymentName = (methodId) => {
    const found = PAYMENT_METHODS.find((m) => m.id === methodId);
    return found ? found.name : methodId || 'Manual Payment';
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0b1224] to-[#070b16] p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-black uppercase">
              Authenticated Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Admin Control Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage product catalog, inventory, order processing, and display flags.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetProducts}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Reset Catalog to Default"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" /> Reset Default Data
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-200 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Active in catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Customer order submissions"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Accumulated sales total"
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-cyan-600/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products in admin..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-xs text-slate-100"
            />
          </div>

          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-slate-400 uppercase font-bold text-[10px] border-b border-slate-800">
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category & Platform</th>
                    <th className="p-3.5">Price (IQD)</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Display Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800 bg-slate-900">
                            <ProductImage product={p} className="h-full" />
                          </div>
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="text-[10px] text-slate-400">{p.type} • {p.packages?.length || 0} pkgs</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="capitalize text-slate-200 font-semibold">{p.category}</span>
                        <span className="block text-[10px] text-cyan-400 font-bold">{p.platform}</span>
                      </td>
                      <td className="p-3.5 font-bold text-white">
                        {formatPrice(p.price)}
                        {p.oldPrice && <span className="block text-[10px] text-slate-500 line-through">{formatPrice(p.oldPrice)}</span>}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={(e) => onUpdateStock(p.id, parseInt(e.target.value, 10) || 0)}
                            className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-bold text-white focus:border-cyan-500 focus:outline-none"
                          />
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onToggleFlag(p.id, 'isFeatured')}
                            title="Featured"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isFeatured ? 'bg-cyan-950 text-cyan-400 border-cyan-500/50' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Zap className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(p.id, 'isTrending')}
                            title="Trending"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isTrending ? 'bg-purple-950 text-purple-400 border-purple-500/50' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <TrendingUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(p.id, 'isFlashDeal')}
                            title="Flash Deal"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isFlashDeal ? 'bg-rose-950 text-rose-400 border-rose-500/50' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Flame className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onToggleFlag(p.id, 'isTopRated')}
                            title="Top Rated"
                            className={`p-1.5 rounded-lg border text-[10px] font-bold ${
                              p.isTopRated ? 'bg-amber-950 text-amber-400 border-amber-500/50' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsFormOpen(true);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-red-400 border border-slate-800"
                            title="Delete"
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
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-slate-950/80 border border-slate-800 rounded-3xl text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-200">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                Customer orders will appear here automatically when submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-slate-950/90 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-sm font-black text-cyan-400">{order.orderId}</span>
                      <span className="text-[10px] text-slate-400 ml-3">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">Payment Method:</span>
                      <span className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-black">
                        {getPaymentName(order.paymentMethod)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 block">Customer Name:</span>
                      <strong className="text-white text-sm">{order.customerName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone:</span>
                      <strong className="text-slate-200">{order.phone}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City / Region:</span>
                      <strong className="text-slate-200">{order.city}</strong>
                    </div>
                  </div>

                  {order.orderNote && (
                    <div className="p-2.5 bg-slate-900 rounded-xl text-xs text-slate-300 border border-slate-800">
                      <strong className="text-cyan-400">Note / Player ID:</strong> {order.orderNote}
                    </div>
                  )}

                  {/* Items List */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Purchased Items:</span>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800/60">
                        <span>
                          <strong className="text-slate-100">{item.productName}</strong>
                          {item.packageItem && <span className="text-cyan-400 ml-2">({item.packageItem.name})</span>}
                          <span className="text-slate-400 text-[10px] ml-2">x{item.quantity}</span>
                        </span>
                        <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-xs text-slate-400 font-bold uppercase">Total Order Value</span>
                    <span className="text-lg font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal Form */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={(data) => {
            if (editingProduct) {
              onUpdateProduct(data);
            } else {
              onAddProduct(data);
            }
            setIsFormOpen(false);
          }}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
