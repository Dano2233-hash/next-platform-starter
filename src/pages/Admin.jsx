import React, { useState, useEffect } from 'react';
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
  Star,
  Zap,
  Flame,
  TrendingUp,
  RefreshCw,
  Search,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefaultProducts } = useProducts();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders from LocalStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('dano_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load dano_orders', e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Stats calculation
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenueIQD = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleToggleFlag = (product, flagName) => {
    updateProduct(product.id, { [flagName]: !product[flagName] });
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Top Header Bar */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-800">
              Admin Portal
            </span>
            <h1 className="text-2xl font-black text-white">Dano Store Management</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultProducts}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 flex items-center gap-1.5"
            title="Reset catalog to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Products
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 font-extrabold text-xs border border-red-800/60 flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProductsCount}
          subtitle="Catalog size"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          subtitle="Placed in local storage"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenueIQD)}
          subtitle="Confirmed sales sum"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all border ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900/50 text-slate-400 border-slate-800'
            }`}
          >
            Products Management ({products.length})
          </button>

          <button
            onClick={() => {
              loadOrders();
              setActiveTab('orders');
            }}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all border ${
              activeTab === 'orders'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-slate-900/50 text-slate-400 border-slate-800'
            }`}
          >
            Orders History ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          <div className="relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filter admin product list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 rounded-xl py-2 pl-10 pr-3 text-xs focus:outline-none"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Homepage Sections</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-slate-100">{prod.name}</td>
                      <td className="p-4 font-medium capitalize text-slate-400">{prod.category.replace('-', ' ')}</td>
                      <td className="p-4 font-bold text-cyan-400">{prod.platform}</td>
                      <td className="p-4 font-extrabold text-white">{formatPrice(prod.price)}</td>

                      {/* Stock Inline Edit */}
                      <td className="p-4">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => updateStock(prod.id, e.target.value)}
                          className={`w-16 bg-slate-950 border rounded p-1 text-center font-bold text-xs ${
                            prod.stock <= 0 ? 'border-red-500 text-red-400' : 'border-slate-800 text-emerald-400'
                          }`}
                        />
                      </td>

                      {/* Section Flag Toggles */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleFlag(prod, 'isFeatured')}
                            className={`p-1 rounded text-[10px] font-bold ${
                              prod.isFeatured ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Toggle Featured"
                          >
                            Feat
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isTrending')}
                            className={`p-1 rounded text-[10px] font-bold ${
                              prod.isTrending ? 'bg-purple-500/20 text-purple-300 border border-purple-500' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Toggle Trending"
                          >
                            Trend
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isFlashDeal')}
                            className={`p-1 rounded text-[10px] font-bold ${
                              prod.isFlashDeal ? 'bg-amber-500/20 text-amber-300 border border-amber-500' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            Flash
                          </button>
                          <button
                            onClick={() => handleToggleFlag(prod, 'isTopRated')}
                            className={`p-1 rounded text-[10px] font-bold ${
                              prod.isTopRated ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' : 'bg-slate-950 text-slate-600'
                            }`}
                            title="Toggle Top Rated"
                          >
                            Top
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(prod)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/60 text-red-400"
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

      {/* Tab 2: Orders History */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Phone / City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-black text-cyan-400">{ord.orderId}</td>
                      <td className="p-4 font-bold text-slate-100">{ord.customerName}</td>
                      <td className="p-4 text-slate-400">
                        {ord.phone} ({ord.city})
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">
                        {ord.items?.map((item) => `${item.title} (x${item.quantity})`).join(', ')}
                      </td>
                      <td className="p-4 font-black text-emerald-400">
                        {formatPrice(ord.totalAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <p className="font-bold">No orders placed yet.</p>
              <p className="text-xs text-slate-500">When customers place orders, they will appear here in real-time.</p>
            </div>
          )}
        </div>
      )}

      {/* Admin Product Modal Form */}
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
