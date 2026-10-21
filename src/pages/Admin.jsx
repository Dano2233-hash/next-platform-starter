import React, { useState } from 'react';
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
  Edit,
  Trash2,
  LogOut,
  Search,
  CheckCircle,
  Clock,
  Eye,
  RefreshCw,
  Shield
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingProduct(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
              <span className="px-2 py-0.5 rounded-md bg-purple-900/80 text-purple-300 border border-purple-700/60 text-[10px] font-extrabold uppercase">
                Protected Portal
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage products, pricing, stock levels, and store orders</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset catalog to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Initial Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Manage Products ({totalProducts})
          </button>

          <button
            onClick={() => {
              setActiveTab('orders');
              setIsAddingProduct(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !isAddingProduct && !editingProduct && (
          <button
            onClick={() => setIsAddingProduct(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Adding / Editing Product Form State */}
      {(isAddingProduct || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Products Tab View */}
      {activeTab === 'products' && !isAddingProduct && !editingProduct && (
        <div className="space-y-4">

          {/* Search bar inside admin */}
          <div className="relative max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product by title, category, platform..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          {/* Products Table */}
          <div className="bg-[#0a0f24] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Platform / Category</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Sold</th>
                    <th className="py-3 px-4">Badges</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden border border-slate-800 shrink-0">
                          {p.image ? (
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-cyan-400">
                              {p.platform}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-white block text-xs">{p.name}</span>
                          <span className="text-[10px] text-slate-500">{p.type}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold text-[10px] mr-1">
                          {p.platform}
                        </span>
                        <span className="text-slate-400 text-[11px]">{p.category}</span>
                      </td>

                      <td className="py-3 px-4 font-bold text-white">
                        {formatPrice(p.price)}
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stock > 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-400 font-bold">
                        {p.soldCount || 0}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 text-[9px] font-bold">Featured</span>}
                          {p.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-bold">Trending</span>}
                          {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 text-[9px] font-bold">Flash</span>}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 text-red-400 hover:bg-slate-700"
                          title="Delete"
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
        </div>
      )}

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#0a0f24] border border-slate-800 rounded-2xl space-y-2">
              <ShoppingBag className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">No customer orders found yet</h3>
              <p className="text-xs text-slate-400">Orders placed by customers will appear here automatically.</p>
            </div>
          ) : (
            <div className="bg-[#0a0f24] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Phone / City</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-slate-900/50 transition-colors">
                        <td className="py-3 px-4 font-black text-cyan-400">
                          #{o.orderId}
                        </td>
                        <td className="py-3 px-4 font-bold text-white">
                          {o.customerName}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          <div>{o.phone}</div>
                          <div className="text-[10px] text-slate-500">{o.city}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-bold">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-black text-white">
                          {formatPrice(o.totalAmount)}
                        </td>
                        <td className="py-3 px-4 text-slate-500 text-[10px]">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(o)}
                            className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
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

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="bg-[#0a0f24] border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white">
                Order #{selectedOrderDetails.orderId} Details
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-slate-300">
              <p><strong>Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong>City:</strong> {selectedOrderDetails.city}</p>
              <p><strong>Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.orderNote && (
                <p className="p-2 rounded bg-slate-900 border border-slate-800">
                  <strong>Player ID / Note:</strong> {selectedOrderDetails.orderNote}
                </p>
              )}
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <p className="font-bold text-white mb-1">Purchased Items:</p>
              {selectedOrderDetails.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span>{item.product.name} ({item.package.name}) × {item.quantity}</span>
                  <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span>Total Amount:</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
