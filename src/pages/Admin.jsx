import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders:', e);
    }
  }, []);

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

  const handleStartEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product from Dano Store?')) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id, newStock) => {
    updateProduct(id, { stock: Math.max(0, Number(newStock)) });
  };

  const handleToggleDeal = (id, field, currentValue) => {
    updateProduct(id, { [field]: !currentValue });
  };

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-6">
        <div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
            ADMINISTRATOR DASHBOARD
          </span>
          <h1 className="text-2xl font-black text-white font-mono uppercase mt-1">
            DANO STORE MANAGEMENT
          </h1>
          <p className="text-xs text-slate-400">
            Control products, stock levels, orders, and featured store deals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reset catalog to default products"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active items in store catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Orders placed via manual checkout"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Calculated from order history"
          icon={DollarSign}
          color="green"
        />
      </div>

      {/* Main Content Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              Manage Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-black shadow-md'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              View Orders ({orders.length})
            </button>
          </div>

          {activeTab === 'products' && !isFormOpen && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold hover:bg-cyan-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          )}
        </div>

        {/* Product Form Modal / Section */}
        {isFormOpen && (
          <AdminProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        )}

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Filter products by name, platform, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080d1a] text-slate-200 text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Products Table */}
            <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0b1021] border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Starting Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Deals & Sections</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                          <ProductImage
                            src={prod.image}
                            alt={prod.name}
                            product={prod}
                            aspectRatio="aspect-square"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] text-slate-500 font-normal">
                            {prod.packages ? `${prod.packages.length} Packages` : '1 Option'}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-slate-400 font-medium">{prod.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                          {prod.platform}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-cyan-400">
                        {formatPrice(prod.price)}
                      </td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => handleStockChange(prod.id, e.target.value)}
                          className="w-16 bg-[#050814] text-white text-xs px-2 py-1 rounded border border-slate-700 font-mono font-bold"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleToggleDeal(prod.id, 'isFeatured', prod.isFeatured)}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              prod.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Featured"
                          >
                            Feat
                          </button>
                          <button
                            onClick={() => handleToggleDeal(prod.id, 'isTrending', prod.isTrending)}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              prod.isTrending
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Trending"
                          >
                            Trend
                          </button>
                          <button
                            onClick={() => handleToggleDeal(prod.id, 'isFlashDeal', prod.isFlashDeal)}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              prod.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            Flash
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(prod)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(prod.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
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

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Recorded Store Orders ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No customer orders recorded in Local Storage yet.
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((ord, idx) => (
                  <div
                    key={ord.orderId || idx}
                    className="p-4 rounded-2xl bg-[#0d1428] border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          #{ord.orderId}
                        </span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {new Date(ord.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                          Payment: {ord.paymentMethod}
                        </span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                          {ord.status || 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">Customer</span>
                        <span className="font-bold text-white">{ord.customerName}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Phone</span>
                        <span className="font-bold text-white">{ord.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">City</span>
                        <span className="font-bold text-white">{ord.city}</span>
                      </div>
                    </div>

                    {ord.orderNote && (
                      <p className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 italic">
                        Note / Player ID: {ord.orderNote}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-white">
                      <span>Items: {ord.items ? ord.items.length : 0}</span>
                      <span className="text-cyan-400 font-mono text-sm">
                        Total {formatPrice(ord.totalAmount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
