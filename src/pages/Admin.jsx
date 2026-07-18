import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  ShoppingBag,
  ListTodo,
  TrendingUp,
  Award,
  CircleDollarSign,
  Plus,
  Edit2,
  Trash2,
  Package,
  Layers,
  FileCheck,
  CheckCircle,
  Clock
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin({ productsState, authState }) {
  const navigate = useNavigate();
  const { products, addProduct, editProduct, deleteProduct, updateStock } = productsState;
  const { logout } = authState;

  // Tabs: 'dashboard' or 'products'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Orders State
  const [orders, setOrders] = useState([]);

  // Modal / Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders from Local Storage
  useEffect(() => {
    const savedOrders = localStorage.getItem('dano_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error("Failed to load dano_orders in admin panel", e);
      }
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Metrics computing
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  // Product actions
  const handleSaveProduct = (finalProd) => {
    if (editingProduct) {
      // Edit
      editProduct(editingProduct.id, finalProd);
    } else {
      // Add
      addProduct(finalProd);
    }
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEditClick = (prod) => {
    setEditingProduct(prod);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id, stockValue) => {
    const stockNum = parseInt(stockValue);
    if (!isNaN(stockNum)) {
      updateStock(id, stockNum);
    }
  };

  // Toggle quick placements
  const handleTogglePlacement = (prod, key) => {
    editProduct(prod.id, { [key]: !prod[key] });
  };

  return (
    <div className="space-y-8 text-left">
      {/* 1. Header with Title & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-500/10 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ADMINISTRATOR CENTER
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Configure catalogs, update inventory, manage deals, and track manual payments.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-950/20 text-rose-400 text-xs font-bold hover:bg-rose-900/30 transition shadow"
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect Session</span>
        </button>
      </div>

      {/* 2. Top Metric Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Products Listed"
          value={totalProductsCount}
          icon={Package}
          colorClass="text-cyan-400"
        />
        <StatCard
          title="Total Orders Received"
          value={totalOrdersCount}
          icon={Layers}
          colorClass="text-purple-400"
        />
        <StatCard
          title="Total Manual Revenue"
          value={formatPrice(totalRevenue)}
          icon={CircleDollarSign}
          colorClass="text-emerald-400"
        />
      </div>

      {/* 3. Sub Tabs selectors */}
      <div className="flex border-b border-white/[0.04] gap-2">
        <button
          onClick={() => { setActiveTab('dashboard'); setShowForm(false); }}
          className={`pb-3 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition ${
            activeTab === 'dashboard'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          Orders Feed ({totalOrdersCount})
        </button>
        <button
          onClick={() => { setActiveTab('products'); setShowForm(false); }}
          className={`pb-3 px-4 text-xs uppercase tracking-wider font-bold border-b-2 transition ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-gray-500 hover:text-gray-300'
          }`}
        >
          Products Catalog ({totalProductsCount})
        </button>
      </div>

      {/* 4. Tab Contents */}
      {showForm ? (
        <div className="animate-in fade-in-50 duration-200">
          <AdminProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => { setShowForm(false); setEditingProduct(null); }}
          />
        </div>
      ) : activeTab === 'dashboard' ? (
        /* ORDERS LIST Tab */
        <div className="space-y-6">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            RECEIVED MANUAL ORDERS FEED
          </h2>

          {orders.length === 0 ? (
            <div className="py-16 text-center text-gray-400 border border-dashed border-white/5 rounded-2xl bg-black/20">
              <Clock className="h-10 w-10 text-gray-600 mx-auto mb-3" />
              <p className="text-sm font-semibold">No Manual Orders Logged</p>
              <p className="text-xs text-gray-500 mt-1">Pending order requests will appear here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {[...orders].reverse().map((order, idx) => (
                <div
                  key={order.orderNumber || idx}
                  className="p-5 rounded-2xl bg-[#0a0f1d]/40 border border-blue-500/10 space-y-4 hover:border-cyan-400/20 transition duration-300"
                >
                  {/* Top line ID/Date */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/[0.04] pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">Invoice Reference</span>
                      <span className="font-black text-white text-sm">{order.orderNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-gray-500">
                        {new Date(order.orderDate).toLocaleString()}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-950 text-amber-400 border border-amber-800/20">
                        {order.status || 'Pending Verification'}
                      </span>
                    </div>
                  </div>

                  {/* Customer Information detail */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500 block font-semibold mb-0.5">Customer Name</span>
                      <span className="font-bold text-white block">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block font-semibold mb-0.5">Phone Number</span>
                      <span className="font-bold text-gray-300 block">{order.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block font-semibold mb-0.5">City / Region</span>
                      <span className="font-bold text-gray-300 block">{order.customerCity}</span>
                    </div>
                  </div>

                  {/* Payment Method Selected */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block">Selected Payment Method</span>
                      <span className="text-sm font-black text-cyan-400 uppercase tracking-wide">
                        {order.paymentMethod} Manual Transfer
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide block">Total IQD Amount</span>
                      <span className="text-base font-black text-white">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Ordered Items summary */}
                  <div className="space-y-1.5 text-xs">
                    <span className="font-bold text-gray-500 block">Ordered Products List:</span>
                    <div className="space-y-1 bg-[#050505] p-3 rounded-lg border border-white/[0.02]">
                      {order.items.map((item, idy) => (
                        <div key={idy} className="flex justify-between text-gray-300">
                          <span>
                            {item.name} {item.package ? `(${item.package})` : ''} <span className="text-gray-600">x{item.quantity}</span>
                          </span>
                          <span className="font-semibold text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Optional Order Note */}
                  {order.orderNote && (
                    <div className="text-xs p-3 bg-cyan-950/20 border border-cyan-800/15 rounded-lg text-gray-400">
                      <span className="font-black text-gray-300 uppercase block text-[9px] mb-0.5">Customer / Player ID Note:</span>
                      <p className="italic">{order.orderNote}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* PRODUCTS MANAGER Tab */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-white uppercase tracking-wider">
              INVENTORY CATALOG & PLACEMENTS
            </h2>
            <button
              onClick={() => { setEditingProduct(null); setShowForm(true); }}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-black uppercase text-white shadow transition-all scale-100 hover:scale-[1.01]"
            >
              <Plus className="h-4 w-4" />
              <span>Create Product</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-gray-400 font-extrabold uppercase tracking-wider">
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Platform & Type</th>
                  <th className="p-4">Base Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-center">Placements</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.03]">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-white/[0.01] transition-colors">
                    {/* Name */}
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{prod.name}</div>
                      <div className="text-[10px] text-cyan-500 uppercase tracking-widest">{prod.category}</div>
                    </td>

                    {/* Platform */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 font-semibold text-gray-300 mr-1.5">{prod.platform}</span>
                      <span className="text-gray-500">{prod.type}</span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold text-cyan-200">
                      {formatPrice(prod.price)}
                    </td>

                    {/* Stock input */}
                    <td className="p-4">
                      <input
                        type="number"
                        value={prod.stock}
                        onChange={(e) => handleStockChange(prod.id, e.target.value)}
                        className="w-16 bg-[#050505] border border-white/10 px-2 py-1 rounded text-center font-bold text-white focus:outline-none focus:border-cyan-400 text-xs"
                      />
                    </td>

                    {/* Homepage placements */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Featured */}
                        <button
                          onClick={() => handleTogglePlacement(prod, 'isFeatured')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                            prod.isFeatured
                              ? 'bg-blue-950/40 border-blue-500/30 text-blue-400'
                              : 'bg-transparent border-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                          title="Toggle Featured"
                        >
                          Feat
                        </button>
                        {/* Trending */}
                        <button
                          onClick={() => handleTogglePlacement(prod, 'isTrending')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                            prod.isTrending
                              ? 'bg-purple-950/40 border-purple-500/30 text-purple-400'
                              : 'bg-transparent border-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                          title="Toggle Trending"
                        >
                          Trend
                        </button>
                        {/* Flash Deals */}
                        <button
                          onClick={() => handleTogglePlacement(prod, 'isFlashDeal')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                            prod.isFlashDeal
                              ? 'bg-rose-950/40 border-rose-500/30 text-rose-400'
                              : 'bg-transparent border-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                          title="Toggle Flash Deals"
                        >
                          Flash
                        </button>
                        {/* Top Rated */}
                        <button
                          onClick={() => handleTogglePlacement(prod, 'isTopRated')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                            prod.isTopRated
                              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
                              : 'bg-transparent border-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                          title="Toggle Top Rated"
                        >
                          Rated
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleEditClick(prod)}
                          className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/20 transition"
                          title="Edit Product"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(prod.id)}
                          className="p-1.5 rounded bg-white/5 border border-white/5 text-gray-500 hover:text-rose-400 hover:border-rose-400/20 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
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
    </div>
  );
}
