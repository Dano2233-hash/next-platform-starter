import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Check,
  X,
  Search,
  Eye,
  RefreshCw,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Star
} from 'lucide-react';

export function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    toggleFeature,
    resetToDefaults,
    totalProducts,
    totalOrders,
    totalRevenue
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Bar with Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              Admin Portal
            </span>
            <span className="text-xs text-slate-400">Authenticated: dano.js</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaults}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset store to initial default catalog"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/80 text-xs font-bold text-rose-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Active items in catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Orders created by customers"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Calculated in IQD currency"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Tabs Row */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-950 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Products Tab Content */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search inside dashboard */}
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-[#090d1c] border border-slate-800 rounded-2xl shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price (IQD)</th>
                  <th className="py-3 px-3">Stock Status</th>
                  <th className="py-3 px-3 text-center">Badges & Flags</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((p) => {
                  const inStock = Number(p.stock) > 0;
                  return (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      {/* Name & Image */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex-shrink-0">
                            <ProductImage
                              image={p.image}
                              name={p.name}
                              category={p.category}
                              platform={p.platform}
                              type={p.type}
                              className="w-10 h-10"
                            />
                          </div>
                          <div className="min-w-0 max-w-xs">
                            <p className="font-bold text-white truncate">{p.name}</p>
                            <p className="text-[10px] text-slate-500">{p.packages?.length || 1} packages • {p.soldCount || 0} sold</p>
                          </div>
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-800">
                          {p.platform}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3 capitalize text-slate-400">
                        {p.category?.replace(/-/g, ' ')}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 font-mono font-bold text-cyan-300">
                        {formatPrice(p.price)}
                      </td>

                      {/* Stock Toggle */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => toggleStock(p.id)}
                          className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            inStock
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-800 hover:bg-rose-900'
                          }`}
                          title="Click to toggle In-Stock / Out-of-Stock"
                        >
                          {inStock ? `In Stock (${p.stock})` : 'Out of Stock'}
                        </button>
                      </td>

                      {/* Feature Toggles */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => toggleFeature(p.id, 'isFeatured')}
                            className={`p-1 rounded text-[10px] font-semibold border cursor-pointer ${
                              p.isFeatured
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Featured"
                          >
                            <Sparkles className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleFeature(p.id, 'isFlashDeal')}
                            className={`p-1 rounded text-[10px] font-semibold border cursor-pointer ${
                              p.isFlashDeal
                                ? 'bg-yellow-950 text-yellow-300 border-yellow-800'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <Zap className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleFeature(p.id, 'isTrending')}
                            className={`p-1 rounded text-[10px] font-semibold border cursor-pointer ${
                              p.isTrending
                                ? 'bg-purple-950 text-purple-300 border-purple-800'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Trending"
                          >
                            <TrendingUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => toggleFeature(p.id, 'isTopRated')}
                            className={`p-1 rounded text-[10px] font-semibold border cursor-pointer ${
                              p.isTopRated
                                ? 'bg-amber-950 text-amber-300 border-amber-800'
                                : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                            title="Toggle Top Rated"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center bg-[#090d1c] border border-slate-800 rounded-2xl">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">No Orders Placed Yet</h4>
              <p className="text-xs text-slate-500 mt-1">When customers place manual orders, they will appear here in real time.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-[#090d1c] border border-slate-800 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Customer</th>
                    <th className="py-3 px-3">Phone & City</th>
                    <th className="py-3 px-3">Payment Method</th>
                    <th className="py-3 px-3">Items Count</th>
                    <th className="py-3 px-3">Total (IQD)</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-cyan-300">
                        {o.orderId}
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {o.customerName}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-mono text-slate-300 block">{o.phoneNumber}</span>
                        <span className="text-[10px] text-slate-500">{o.city}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 border border-slate-800 text-cyan-300">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-400">
                        {o.items?.length || 0} items
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">
                        {formatPrice(o.totalAmount)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors cursor-pointer"
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

      {/* Product Add/Edit Modal */}
      <AdminProductForm
        isOpen={isModalOpen}
        initialData={editingProduct}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#090d1c] border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">
                Order Details: <span className="text-cyan-300 font-mono">{selectedOrderDetails.orderId}</span>
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Customer</span>
                <span className="text-slate-200 font-semibold">{selectedOrderDetails.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Payment Method</span>
                <span className="text-cyan-300 font-bold uppercase">{selectedOrderDetails.paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone</span>
                <span className="text-slate-200 font-mono">{selectedOrderDetails.phoneNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block">City</span>
                <span className="text-slate-200">{selectedOrderDetails.city}</span>
              </div>
            </div>

            {selectedOrderDetails.orderNote && (
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-500 block mb-0.5">Order Note / Player ID:</span>
                <span className="text-slate-200 font-mono">{selectedOrderDetails.orderNote}</span>
              </div>
            )}

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ordered Products:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedOrderDetails.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800/80">
                    <div>
                      <p className="font-semibold text-white">{it.name}</p>
                      {it.packageName && <p className="text-[10px] text-cyan-400 font-mono">{it.packageName}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400">Qty: {it.quantity}</span>
                      <p className="font-mono font-bold text-slate-200">{formatPrice(it.price * it.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
              <span className="font-bold text-xs text-slate-400">Total Charged:</span>
              <span className="text-lg font-extrabold text-cyan-300 font-mono">
                {formatPrice(selectedOrderDetails.totalAmount)}
              </span>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
