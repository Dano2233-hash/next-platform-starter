import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Eye,
  X,
  Check,
  ShieldCheck,
  Sparkles,
  Tag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetProducts } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      addProduct(formData);
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id, delta) => {
    const prod = products.find((p) => p.id === id);
    if (prod) {
      updateStock(id, prod.stock + delta);
    }
  };

  // Filtered Products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 space-y-8">
        {/* Admin Header Bar */}
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-100 flex items-center gap-2">
                Dano Store Admin Dashboard
              </h1>
              <p className="text-xs text-slate-400">Logged in as: <span className="text-cyan-400 font-bold">dano.js</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm('Reset catalog to default preset products?')) {
                  resetProducts();
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Catalog</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={Package}
            color="cyan"
            subtext="Active items in store"
          />
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={ShoppingBag}
            color="purple"
            subtext="Local payment requests"
          />
          <StatCard
            title="Total Revenue"
            value={formatPrice(totalRevenue)}
            icon={DollarSign}
            color="emerald"
            subtext="Gross store volume"
          />
        </div>

        {/* Main Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-cyan-500/10 border border-cyan-400 text-cyan-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Product Catalog ({totalProducts})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-purple-500/10 border border-purple-400 text-purple-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Customer Orders ({totalOrders})
            </button>
          </div>

          {activeTab === 'products' && !isAddingProduct && !editingProduct && (
            <button
              onClick={() => setIsAddingProduct(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white font-extrabold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* Modal/Inline Form for Add or Edit Product */}
        {(isAddingProduct || editingProduct) && (
          <AdminProductForm
            initialProduct={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* TAB 1: Products Management */}
        {activeTab === 'products' && !isAddingProduct && !editingProduct && (
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Filter products by title, category, platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3">Product</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Platform</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3">Tags & Deals</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-200">
                        <div className="flex items-center gap-2">
                          <span>{prod.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 font-medium capitalize">{prod.category}</td>
                      <td className="py-3 px-3 text-cyan-400 font-bold uppercase">{prod.platform}</td>
                      <td className="py-3 px-3 font-extrabold text-slate-100">{formatPrice(prod.price)}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleStockChange(prod.id, -5)}
                            className="w-5 h-5 rounded bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          <span className={`font-bold px-1.5 ${prod.stock <= 0 ? 'text-red-400' : 'text-slate-200'}`}>
                            {prod.stock}
                          </span>
                          <button
                            onClick={() => handleStockChange(prod.id, 5)}
                            className="w-5 h-5 rounded bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {prod.isFeatured && <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px] font-bold">Featured</span>}
                          {prod.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[10px] font-bold">Trending</span>}
                          {prod.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[10px] font-bold">Flash</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Orders View */}
        {activeTab === 'orders' && (
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-100">Customer Orders History</h3>

            {orders.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No orders created yet in Local Storage.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-3">Order ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Phone</th>
                      <th className="py-3 px-3">City</th>
                      <th className="py-3 px-3">Payment Method</th>
                      <th className="py-3 px-3">Total Amount</th>
                      <th className="py-3 px-3 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-cyan-400">{order.orderId}</td>
                        <td className="py-3 px-3 font-bold text-slate-200">{order.customer?.name}</td>
                        <td className="py-3 px-3 text-slate-300 font-mono">{order.customer?.phone}</td>
                        <td className="py-3 px-3 text-slate-400">{order.customer?.city}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold uppercase text-[10px]">
                            {order.customer?.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-extrabold text-cyan-400">{formatPrice(order.totalAmount)}</td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
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

        {/* Modal for Order Details */}
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100">
                  Order Details: <span className="font-mono text-cyan-400">{selectedOrderDetails.orderId}</span>
                </h3>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <p><span className="text-slate-400">Customer:</span> <strong className="text-slate-200">{selectedOrderDetails.customer?.name}</strong></p>
                <p><span className="text-slate-400">Phone:</span> <strong className="text-slate-200 font-mono">{selectedOrderDetails.customer?.phone}</strong></p>
                <p><span className="text-slate-400">City:</span> <strong className="text-slate-200">{selectedOrderDetails.customer?.city}</strong></p>
                <p><span className="text-slate-400">Payment:</span> <strong className="text-purple-300 uppercase">{selectedOrderDetails.customer?.paymentMethod}</strong></p>
                {selectedOrderDetails.customer?.note && (
                  <p><span className="text-slate-400">Note / Player ID:</span> <strong className="text-amber-400">{selectedOrderDetails.customer?.note}</strong></p>
                )}
              </div>

              <div className="border-t border-slate-800 pt-3 space-y-2">
                <p className="text-xs font-bold text-slate-300">Items Ordered:</p>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {selectedOrderDetails.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-800/40">
                      <span>{it.name} ({it.packageName}) x{it.quantity}</span>
                      <span className="font-bold text-cyan-400">{formatPrice(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between font-extrabold text-sm">
                <span>Total Amount:</span>
                <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
