import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  Star,
  Zap,
  Flame,
  Award,
  TrendingUp,
  RefreshCw,
  Eye
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { logout, orders } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefaults } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered products list for admin table
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q)
    );
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Admin Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0a122e] to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
            DS
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Dano Store Control Panel</h1>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ADMIN ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Manage product catalog, stock levels, featured tags, and view customer orders.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={resetToDefaults}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-slate-700"
            title="Reset catalog to default products"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center space-x-1.5 transition-colors border border-rose-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext="Active catalog items"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Received customer orders"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="Processed sales total"
        />
      </div>

      {/* Tabs Row */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Manage Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search catalog products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Product</th>
                  <th className="py-3 px-3">Category / Platform</th>
                  <th className="py-3 px-3">Base Price</th>
                  <th className="py-3 px-3">Stock</th>
                  <th className="py-3 px-3">Flags</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-950/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 shrink-0">
                          <ProductImage product={p} className="h-12" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-xs line-clamp-1">{p.name}</h4>
                          <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-slate-300">{p.platform}</span>
                        <span className="text-[10px] text-cyan-400 uppercase font-semibold">{p.category}</span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-black text-cyan-400">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white font-bold text-center focus:border-cyan-500 focus:outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                        <button
                          onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                          title="Toggle Featured"
                          className={`p-1 rounded ${p.isFeatured ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-950 text-slate-600'}`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                          title="Toggle Trending"
                          className={`p-1 rounded ${p.isTrending ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-slate-950 text-slate-600'}`}
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                          title="Toggle Flash Deal"
                          className={`p-1 rounded ${p.isFlashDeal ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-950 text-slate-600'}`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                          title="Toggle Top Rated"
                          className={`p-1 rounded ${p.isTopRated ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-950 text-slate-600'}`}
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete ${p.name}?`)) deleteProduct(p.id);
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                          title="Delete Product"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
          <h3 className="font-extrabold text-white text-base">Customer Orders & Payment Methods</h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No orders recorded yet. Completed checkout orders will appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-3">Order Number</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Phone / City</th>
                    <th className="py-3 px-3">Payment Method</th>
                    <th className="py-3 px-3">Total Amount</th>
                    <th className="py-3 px-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-950/50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                        {o.orderId}
                      </td>
                      <td className="py-3 px-3 font-bold text-white">
                        {o.customerName}
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <div>{o.phoneNumber}</div>
                        <div className="text-[10px] text-slate-500">{o.city}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-black text-white">
                        {formatPrice(o.totalAmount)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center space-x-1 ml-auto font-bold text-[11px]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Product Form Modal */}
      {(showAddModal || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-slate-100 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-white text-sm">Order {selectedOrderDetails.orderId}</h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <p><strong className="text-slate-400">Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedOrderDetails.phoneNumber}</p>
              <p><strong className="text-slate-400">City:</strong> {selectedOrderDetails.city}</p>
              <p><strong className="text-slate-400">Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.orderNote && (
                <p><strong className="text-slate-400">Note / Player ID:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="space-y-1.5 pt-1">
              <strong className="text-slate-300 block">Items:</strong>
              {selectedOrderDetails.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between py-1 border-b border-slate-800/60 text-slate-300">
                  <span>{it.name} ({it.packageName}) x {it.quantity}</span>
                  <span className="font-bold text-cyan-400">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between font-extrabold text-sm border-t border-slate-800">
              <span>Total Price:</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
