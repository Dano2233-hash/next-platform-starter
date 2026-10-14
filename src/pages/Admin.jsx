import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  Layers,
  Star,
  Flame,
  X,
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();
  const { orders } = useCart();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  const handleCreateProduct = (newProduct) => {
    addProduct(newProduct);
    setShowAddModal(false);
  };

  const handleUpdateProduct = (updatedFields) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, updatedFields);
      setEditingProduct(null);
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const handleStockPrompt = (product) => {
    const newStockStr = window.prompt(`Enter new stock count for ${product.name}:`, product.stock);
    if (newStockStr !== null) {
      const num = parseInt(newStockStr, 10);
      if (!isNaN(num)) {
        updateStock(product.id, num);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Header Banner */}
      <div className="bg-[#0a0e1c] p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black text-white">Dano Store Admin Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Logged in as <strong className="text-cyan-400">dano.js</strong> &bull; Full CRUD product & order control
          </p>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 hover:bg-rose-900/60 font-bold text-xs transition-colors self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog active items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Customer completed checkout"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Gross sales in IQD"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Manage Products ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white font-extrabold shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Customer Orders ({orders.length})</span>
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Product Form Modal / Section */}
      {(showAddModal || editingProduct) && (
        <div className="space-y-4">
          <AdminProductForm
            initialData={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={() => {
              setShowAddModal(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* PRODUCTS TAB CONTENT */}
      {activeTab === 'products' && (
        <div className="bg-[#0a0e1c] rounded-3xl border border-slate-800 overflow-hidden space-y-4 p-5">
          {/* Search Toolbar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search product name or platform..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full bg-slate-900 text-xs text-slate-100 placeholder-slate-500 pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Platform / Type</th>
                  <th className="p-3">Price (IQD)</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center font-black text-cyan-400 shrink-0">
                        {p.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <span className="truncate block max-w-xs">{p.name}</span>
                        {p.tag && (
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30">
                            {p.tag}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 uppercase font-semibold text-slate-400">{p.category}</td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-400 font-bold mr-1">
                        {p.platform}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-purple-300 font-semibold">
                        {p.type}
                      </span>
                    </td>

                    <td className="p-3 font-extrabold text-cyan-400">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() => handleStockPrompt(p)}
                        className={`px-2.5 py-1 rounded-lg font-bold border ${
                          p.stock > 0
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30'
                            : 'bg-rose-950/60 text-rose-400 border-rose-500/30'
                        }`}
                        title="Click to edit stock count"
                      >
                        {p.stock} units
                      </button>
                    </td>

                    <td className="p-3 space-x-1">
                      {p.isFeatured && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400">
                          Hero
                        </span>
                      )}
                      {p.isTrending && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-950 text-purple-300">
                          Trend
                        </span>
                      )}
                      {p.isFlashDeal && (
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-rose-950 text-rose-400">
                          Flash
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setShowAddModal(false);
                          setEditingProduct(p);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-800"
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

      {/* ORDERS TAB CONTENT */}
      {activeTab === 'orders' && (
        <div className="bg-[#0a0e1c] rounded-3xl border border-slate-800 overflow-hidden p-5 space-y-4">
          <h3 className="text-sm font-bold text-white">Order Records Log</h3>

          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400">No customer orders recorded yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Phone / City</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-extrabold text-cyan-400">{o.orderId}</td>
                      <td className="p-3 font-bold text-white">{o.customer?.name}</td>
                      <td className="p-3 text-slate-400">
                        {o.customer?.phone} ({o.customer?.city})
                      </td>
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-extrabold">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3 font-extrabold text-white">
                        {formatPrice(o.totalAmount)}
                      </td>
                      <td className="p-3 text-slate-500">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-900 font-bold text-xs"
                        >
                          View
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0e1c] max-w-lg w-full p-6 rounded-3xl border border-slate-800 space-y-4 relative text-xs">
            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-black text-white">
              Order Details &bull; <span className="text-cyan-400">{selectedOrderDetails.orderId}</span>
            </h3>

            <div className="space-y-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <p><strong>Customer:</strong> {selectedOrderDetails.customer?.name}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.customer?.phone}</p>
              <p><strong>City:</strong> {selectedOrderDetails.customer?.city}</p>
              <p><strong>Selected Payment Method:</strong> {selectedOrderDetails.paymentMethod}</p>
              {selectedOrderDetails.orderNote && (
                <p><strong>Player ID / Note:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-300 block uppercase text-[10px]">Ordered Items</span>
              {selectedOrderDetails.items.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 flex justify-between">
                  <span>{item.name} ({item.packageName}) x {item.quantity}</span>
                  <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
              <span>Total Payable</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
