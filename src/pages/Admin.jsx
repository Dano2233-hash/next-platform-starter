import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  LogOut,
  Star,
  Zap,
  TrendingUp,
  RefreshCw,
  Eye,
  X
} from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleProductFlag,
    resetProductsToDefault
  } = useProducts();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleAddProduct = (productData) => {
    addProduct(productData);
    setShowAddForm(false);
  };

  const handleUpdateProduct = (productData) => {
    updateProduct(editingProduct.id, productData);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <span>Dano Store Admin Dashboard</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Admin: dano.js
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage product catalog, inventory stock, and customer manual orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default items?')) resetProductsToDefault();
            }}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset Catalog Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-800/80 text-xs font-bold flex items-center gap-1.5 transition-colors"
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
          subtitle="Catalog Items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Manual Orders Saved"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="From Completed Orders"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-5 text-xs font-extrabold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Product Management ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-5 text-xs font-extrabold border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders Received ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Modal Container */}
      {(showAddForm || editingProduct) && (
        <div className="space-y-4">
          <AdminProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* TAB 1: Products Table */}
      {activeTab === 'products' && (
        <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product Name</th>
                  <th className="py-3.5 px-4">Platform / Type</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Stock</th>
                  <th className="py-3.5 px-4">Flags</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-100">
                      <div>{product.name}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        {product.packages?.length || 1} package(s)
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold mr-1">
                        {product.platform}
                      </span>
                      <span className="text-slate-400">{product.type}</span>
                    </td>

                    <td className="py-3 px-4 font-black text-cyan-400">
                      {formatPrice(product.price)}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                          product.stock !== false
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                            : 'bg-red-950/80 text-red-300 border border-red-800/60'
                        }`}
                      >
                        {product.stock !== false ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> In Stock
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> Out of Stock
                          </>
                        )}
                      </button>
                    </td>

                    {/* Flags toggles */}
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => toggleProductFlag(product.id, 'isFeatured')}
                          className={`p-1 rounded ${
                            product.isFeatured ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-600'
                          }`}
                          title="Featured"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleProductFlag(product.id, 'isTrending')}
                          className={`p-1 rounded ${
                            product.isTrending ? 'bg-purple-500/20 text-purple-300' : 'text-slate-600'
                          }`}
                          title="Trending"
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleProductFlag(product.id, 'isFlashDeal')}
                          className={`p-1 rounded ${
                            product.isFlashDeal ? 'bg-amber-500/20 text-amber-300' : 'text-slate-600'
                          }`}
                          title="Flash Deal"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowAddForm(false);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
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

      {/* TAB 2: Orders Table */}
      {activeTab === 'orders' && (
        <div className="bg-[#0c1021] border border-[#1a223e] rounded-2xl overflow-hidden shadow-xl">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="font-bold">No orders recorded yet.</p>
              <p className="text-xs mt-1">New customer orders will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-extrabold border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Phone / City</th>
                    <th className="py-3.5 px-4">Payment Method</th>
                    <th className="py-3.5 px-4">Total Amount</th>
                    <th className="py-3.5 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((order, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3 px-4 font-extrabold text-cyan-300">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-100">
                        {order.customerName}
                      </td>
                      <td className="py-3 px-4">
                        <div>{order.phone}</div>
                        <div className="text-[10px] text-slate-400">{order.city}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-cyan-400">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
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

      {/* Order Detail Overlay Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0c1021] border border-[#1a223e] rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-lg">
                Order {selectedOrderDetails.orderNumber}
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-slate-400">Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong className="text-slate-400">City:</strong> {selectedOrderDetails.city}</p>
              <p><strong className="text-slate-400">Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.orderNote && (
                <p><strong className="text-slate-400">Note / Player ID:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Items</h4>
              {selectedOrderDetails.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs p-2 rounded-xl bg-slate-900">
                  <span>{item.product.name} ({item.packageName}) x {item.quantity}</span>
                  <span className="font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-black text-white pt-2">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
