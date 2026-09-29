import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  Coins,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Star,
  Flame,
  TrendingUp,
  Search,
  RotateCcw,
  ShieldCheck,
  Eye,
  CheckCircle,
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock, resetProductsToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProduct = (productData) => {
    addProduct(productData);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (productData) => {
    updateProduct(productData.id, productData);
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 mb-1">
            <ShieldCheck className="w-4 h-4" /> Admin Management Dashboard
          </div>
          <h1 className="text-2xl font-black text-slate-100">Dano Store Control Center</h1>
          <p className="text-xs text-slate-400 mt-1">Manage product catalog, stock, and customer orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Reset catalog to initial preset"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Catalog
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:bg-red-900/60 text-xs font-extrabold flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Active items in store catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Orders created by local gamers"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Total order sales value"
          icon={Coins}
          color="emerald"
        />
      </div>

      {/* Main Tab Controls */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            View Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40"
          >
            <Plus className="w-4 h-4 stroke-[3]" /> Add New Product
          </button>
        )}
      </div>

      {/* Products Management View */}
      {activeTab === 'products' && (
        <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <h2 className="text-base font-bold text-slate-100">Product List & Stock Control</h2>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name..."
                className="w-full bg-[#05070f] border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#05070f] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category & Platform</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Sections</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="p-3 font-bold text-slate-100 flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800 bg-slate-900">
                        <ProductImage product={p} className="h-10" />
                      </div>
                      <div>
                        <span className="block">{p.name}</span>
                        <span className="text-[10px] text-slate-500 font-normal">ID: {p.id}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 block w-fit mb-1">
                        {p.platform}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-bold">{p.category}</span>
                    </td>

                    <td className="p-3 font-extrabold text-cyan-300">
                      {formatPrice(p.price)}
                    </td>

                    {/* Stock Adjustment Input */}
                    <td className="p-3">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-[#05070f] border border-slate-800 rounded px-2 py-1 text-xs text-slate-100 font-bold focus:border-cyan-500"
                      />
                    </td>

                    {/* Featured / Trending Badges */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 text-[9px]">
                        {p.isFeatured && <span className="bg-cyan-950 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">Featured</span>}
                        {p.isTrending && <span className="bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500/30">Trending</span>}
                        {p.isFlashDeal && <span className="bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30">Flash</span>}
                        {p.isTopRated && <span className="bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">Top Rated</span>}
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30"
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

      {/* Orders Management View */}
      {activeTab === 'orders' && (
        <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-100 border-b border-slate-800/80 pb-3">
            Customer Orders Log
          </h2>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No orders have been submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#05070f] text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer Info</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3 font-extrabold text-cyan-400">
                        #{o.orderId}
                      </td>

                      <td className="p-3">
                        <span className="font-bold text-slate-100 block">{o.customerName}</span>
                        <span className="text-[10px] text-slate-400">{o.phone} • {o.city}</span>
                      </td>

                      {/* View selected payment method */}
                      <td className="p-3">
                        <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold text-[11px] inline-block">
                          {o.paymentMethod}
                        </span>
                      </td>

                      <td className="p-3 font-black text-slate-100">
                        {formatPrice(o.totalAmount)}
                      </td>

                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                          {o.status || 'Pending Payment'}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
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

      {/* Add / Edit Product Modal */}
      {(isFormOpen || editingProduct) && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={(data) => {
            if (editingProduct) handleUpdateProduct(data);
            else handleCreateProduct(data);
          }}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* View Order Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#080d1e] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Order Details #{selectedOrderDetails.orderId}</h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong className="text-slate-400">Customer Name:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong className="text-slate-400">City:</strong> {selectedOrderDetails.city}</p>
              <p><strong className="text-slate-400">Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.note && (
                <p><strong className="text-slate-400">Order Note / ID:</strong> {selectedOrderDetails.note}</p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <span className="text-xs font-bold text-cyan-400">Items Ordered:</span>
              {selectedOrderDetails.items?.map((i, index) => (
                <div key={index} className="flex justify-between text-xs p-2 rounded bg-slate-900 border border-slate-800">
                  <span>{i.name} ({i.packageName || 'Standard'}) × {i.quantity}</span>
                  <span className="font-bold text-slate-100">{formatPrice(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between font-black text-sm text-cyan-300">
              <span>Total Payable</span>
              <span>{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full py-2 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
