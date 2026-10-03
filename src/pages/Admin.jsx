import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { AdminProductForm } from '../components/AdminProductForm';
import { StatCard } from '../components/StatCard';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Search,
  CheckCircle,
  Zap,
  Star,
  Flame,
  RotateCcw
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetProductsToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');

  // Orders from local storage
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Error reading orders:', e);
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

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.platform.toLowerCase().includes(productSearch.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Dano Store Management Panel</h1>
          <p className="text-xs text-slate-400 mt-0.5">Control catalog products, inventory stock, and regional orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            title="Reset Catalog to Initial Sample Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={products.length}
          icon={Package}
          colorClass="text-cyan-400"
          bgClass="bg-cyan-500/10 border-cyan-500/30"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={ShoppingBag}
          colorClass="text-purple-400"
          bgClass="bg-purple-500/10 border-purple-500/30"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          colorClass="text-emerald-400"
          bgClass="bg-emerald-500/10 border-emerald-500/30"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 text-sm font-bold gap-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'products' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Manage Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'orders' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
      </div>

      {/* MODAL PRODUCT FORM */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="w-full max-w-3xl my-8">
            <AdminProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}

      {/* TAB 1: MANAGE PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0a0e1a] border border-slate-800 p-4 rounded-2xl">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search products in admin..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#070b18] border border-slate-800 text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsFormOpen(true);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/30"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b18] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Platform / Type</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Section Tags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                      {/* Product details */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{p.name}</div>
                            <div className="text-[10px] text-slate-500 capitalize">{p.category}</div>
                          </div>
                        </div>
                      </td>

                      {/* Platform / Type */}
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-cyan-400">{p.platform}</span>
                          <span className="text-[10px] text-purple-400">{p.type}</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-extrabold text-white">
                        {formatPrice(p.price)}
                      </td>

                      {/* Stock Adjuster */}
                      <td className="p-4">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-20 bg-[#070b18] border border-slate-800 text-white rounded-lg px-2 py-1 text-xs font-bold focus:outline-none focus:border-cyan-500"
                        />
                      </td>

                      {/* Section Badges Toggles */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              p.isFeatured ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Featured"
                          >
                            <Zap className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              p.isTrending ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Trending"
                          >
                            <Flame className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              p.isFlashDeal ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                            className={`p-1 rounded text-[10px] font-bold border transition-all ${
                              p.isTopRated ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Top Rated"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-400 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id)}
                            className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 transition-colors"
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

      {/* TAB 2: MANAGE ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-sm">
              No customer orders have been placed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div
                  key={idx}
                  className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs text-slate-500">Order ID</span>
                      <h3 className="text-base font-extrabold text-cyan-400">{order.orderId}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500">Placed Date</span>
                      <p className="text-xs text-slate-300 font-semibold">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs bg-[#070b18] border border-slate-800/80 p-3.5 rounded-xl">
                    <div>
                      <span className="text-slate-500 block font-semibold">Customer</span>
                      <span className="text-white font-bold">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-semibold">Phone</span>
                      <span className="text-white font-bold">{order.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-semibold">City</span>
                      <span className="text-white font-bold">{order.city}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-semibold">Payment Method</span>
                      <span className="text-cyan-400 font-extrabold uppercase">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Items Ordered */}
                  <div className="space-y-2 text-xs">
                    <span className="font-bold text-slate-300">Items Ordered:</span>
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex justify-between items-center bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                        <span className="text-slate-200 font-medium">
                          {item.name} {item.packageName ? `(${item.packageName})` : ''} × {item.quantity}
                        </span>
                        <span className="font-bold text-cyan-400">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.orderNote && (
                    <div className="text-xs bg-cyan-950/20 border border-cyan-800/30 text-cyan-300 p-2.5 rounded-lg">
                      <strong>Order Note / Player ID:</strong> {order.orderNote}
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-baseline font-extrabold text-sm text-white">
                    <span>Total Amount</span>
                    <span className="text-lg text-cyan-400">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
