import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Sparkles,
  Search,
  Star,
  Flame,
  TrendingUp,
  RefreshCw,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    orders,
    addProduct,
    editProduct,
    deleteProduct,
    updateStock,
    toggleProductFlag,
    resetToDefaultProducts,
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // products, orders
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      editProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsEditing(false);
    setEditingProduct(null);
  };

  // Calculations for Stat Cards
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  // Filtered product list
  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8 pb-16">

      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            Dano Store Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Admin <span className="text-cyan-400">Dashboard</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultProducts}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all"
            title="Reset Catalog to Initial Sample Data"
          >
            <RefreshCw className="w-3.5 h-3.5 inline mr-1 text-cyan-400" /> Reset Default Data
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active in store catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Saved in Local Storage"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Sales performance (IQD)"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            Manage Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            View Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !isEditing && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsEditing(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* Form Drawer / Modal overlay if editing or creating */}
      {isEditing && (
        <AdminProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsEditing(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB 1: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Products Table */}
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Product</th>
                  <th className="py-3.5 px-4">Platform / Category</th>
                  <th className="py-3.5 px-4">Price (IQD)</th>
                  <th className="py-3.5 px-4">Stock Level</th>
                  <th className="py-3.5 px-4">Section Flags</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 shrink-0">
                          <ProductImage product={p} className="h-10 w-10" />
                        </div>
                        <div>
                          <span className="font-bold text-white text-xs block">{p.name}</span>
                          <span className="text-[10px] text-slate-500 capitalize">{p.type}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="font-extrabold text-cyan-400 block">{p.platform}</span>
                        <span className="text-[10px] text-slate-400 capitalize block">{p.category}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-black text-slate-100">
                      {formatPrice(p.price)}
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-20 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-white font-bold text-center focus:border-cyan-500 focus:outline-none"
                      />
                    </td>

                    {/* Quick Section Flag Toggles */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleProductFlag(p.id, 'isFeatured')}
                          className={`p-1 rounded text-[10px] font-bold border transition-all ${
                            p.isFeatured
                              ? 'bg-cyan-950 text-cyan-400 border-cyan-500/50'
                              : 'bg-slate-900 text-slate-600 border-slate-800'
                          }`}
                          title="Featured"
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => toggleProductFlag(p.id, 'isTrending')}
                          className={`p-1 rounded text-[10px] font-bold border transition-all ${
                            p.isTrending
                              ? 'bg-purple-950 text-purple-300 border-purple-500/50'
                              : 'bg-slate-900 text-slate-600 border-slate-800'
                          }`}
                          title="Trending"
                        >
                          Trending
                        </button>
                        <button
                          onClick={() => toggleProductFlag(p.id, 'isFlashDeal')}
                          className={`p-1 rounded text-[10px] font-bold border transition-all ${
                            p.isFlashDeal
                              ? 'bg-rose-950 text-rose-400 border-rose-500/50'
                              : 'bg-slate-900 text-slate-600 border-slate-800'
                          }`}
                          title="Flash Deal"
                        >
                          Flash
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsEditing(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product "${p.name}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900"
                          title="Delete"
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

      {/* TAB 2: ORDERS VIEWER */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0b0f19] border border-slate-800 rounded-3xl space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Orders Received Yet</h3>
              <p className="text-xs text-slate-400">When customers place orders, they will appear here instantly.</p>
            </div>
          ) : (
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Phone / WhatsApp</th>
                    <th className="py-3.5 px-4">City</th>
                    <th className="py-3.5 px-4">Payment Method</th>
                    <th className="py-3.5 px-4">Total Price</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-black text-cyan-400">{o.orderId}</td>
                      <td className="py-3 px-4 font-bold text-white">{o.customerName}</td>
                      <td className="py-3 px-4 text-slate-300">{o.phone}</td>
                      <td className="py-3 px-4 text-slate-400">{o.city}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-slate-900 border border-slate-800 text-amber-400">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-white">{formatPrice(o.totalPrice)}</td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 text-xs font-bold"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" /> View
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

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-white text-base">
                  Order Details: <span className="text-cyan-400">{selectedOrderDetails.orderId}</span>
                </h3>
                <span className="text-[11px] text-slate-500">
                  {new Date(selectedOrderDetails.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">Customer:</strong> <span className="text-white font-bold">{selectedOrderDetails.customerName}</span></p>
              <p><strong className="text-slate-400">Phone:</strong> <span className="text-white font-bold">{selectedOrderDetails.phone}</span></p>
              <p><strong className="text-slate-400">City:</strong> <span className="text-white font-bold">{selectedOrderDetails.city}</span></p>
              <p><strong className="text-slate-400">Selected Payment Method:</strong> <span className="text-amber-400 font-extrabold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.orderNote && (
                <p className="p-2.5 bg-slate-900 rounded-lg border border-slate-800"><strong className="text-slate-400 block mb-1">Player ID / Note:</strong> <span className="text-slate-200">{selectedOrderDetails.orderNote}</span></p>
              )}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="font-bold text-slate-300 text-xs">Purchased Items:</h4>
              {selectedOrderDetails.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    {item.selectedPackage && <span className="text-[10px] text-cyan-400 block">{item.selectedPackage}</span>}
                    <span className="text-slate-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-black">
              <span className="text-white">Total:</span>
              <span className="text-cyan-400 text-lg">{formatPrice(selectedOrderDetails.totalPrice)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
