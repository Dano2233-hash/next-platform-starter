import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  CheckCircle,
  Star,
  Zap,
  Flame,
  ShieldAlert,
  X
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetProducts } =
    useProducts();
  const { orders } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-400 font-extrabold text-[10px] uppercase tracking-wider">
              Admin Access Active
            </span>
          </div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default initial products?')) {
                resetProducts();
              }
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5"
            title="Reset Catalog Data"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Default
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-800/60 hover:bg-red-900 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Analytics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="from-blue-600 to-cyan-500"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="from-purple-600 to-indigo-600"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="from-emerald-600 to-teal-500"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Products Management ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Container */}
      {(showAddForm || editingProduct) && (
        <div className="space-y-4">
          <AdminProductForm
            initialData={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products by title, category, platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Platform</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                          <ProductImage
                            src={p.image}
                            alt={p.name}
                            category={p.category}
                            platform={p.platform}
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <span className="font-bold text-slate-100 block">{p.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{p.type}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 capitalize font-semibold text-slate-300">{p.category}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-bold text-cyan-400">
                        {p.platform}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-100">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 p-1 bg-slate-950 border border-slate-800 rounded text-center text-xs text-slate-100 font-bold"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        {p.isFeatured && <span className="w-2 h-2 rounded-full bg-cyan-400" title="Featured" />}
                        {p.isTrending && <span className="w-2 h-2 rounded-full bg-purple-400" title="Trending" />}
                        {p.isFlashDeal && <span className="w-2 h-2 rounded-full bg-red-400" title="Flash Deal" />}
                        {p.isTopRated && <span className="w-2 h-2 rounded-full bg-amber-400" title="Top Rated" />}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setShowAddForm(false);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
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
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900 text-red-400"
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
      )}

      {/* Tab 2: Orders View */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100">
            Customer Orders Log
          </h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No orders created yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-cyan-400">{o.id}</td>
                      <td className="p-3 font-semibold text-slate-100">{o.customerName}</td>
                      <td className="p-3 font-mono text-slate-300">{o.phone}</td>
                      <td className="p-3 text-slate-300">{o.city}</td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-[11px]">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3 font-black text-slate-100">{formatPrice(o.totalAmount)}</td>
                      <td className="p-3 text-slate-500 text-[11px]">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
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

      {/* Selected Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">
                Order #{selectedOrderDetails.id}
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong>City:</strong> {selectedOrderDetails.city}</p>
              <p><strong>Payment Method:</strong> {selectedOrderDetails.paymentMethod}</p>
              {selectedOrderDetails.orderNote && (
                <p><strong>Note / Player ID:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Items:</span>
              {selectedOrderDetails.items.map((it, i) => (
                <div key={i} className="flex justify-between text-xs bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span>
                    {it.product.name} {it.selectedPackage ? `(${it.selectedPackage.name})` : ''} x {it.quantity}
                  </span>
                  <span className="font-bold text-cyan-400">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-black text-slate-100">
              <span>Total:</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
