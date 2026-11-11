import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Star,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

/**
 * Admin Dashboard Requirements:
 * - Add product
 * - Edit product
 * - Delete product
 * - Change stock
 * - View orders
 * - View selected payment method for every order
 * - View total products
 * - View total orders
 * - View total revenue
 * - Manage featured products
 * - Manage trending products
 * - Manage flash deals
 * - Manage top rated products
 * - Logout button (removes dano_admin_auth and redirects to /admin-login)
 */
export function Admin() {
  const { logout } = useAuth();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    resetToDefaultProducts
  } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const handleToggleFlag = (id, flagName, currentValue) => {
    updateProduct(id, { [flagName]: !currentValue });
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">

      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">Admin Command Center</h1>
            <p className="text-xs text-slate-400">Manage catalog, live inventory, and incoming customer orders.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/30 hover:bg-rose-900/50 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          change="Catalog items active"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          change="Processed via manual payments"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          change="Iraqi Dinar (IQD)"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Product Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Search bar inside products */}
          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search by title to edit or change stock..."
              className="max-w-md w-full px-3.5 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <span className="text-xs text-slate-400">
              Showing {filteredProducts.length} of {products.length}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Section Badges</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-normal">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white max-w-xs truncate">{p.name}</div>
                        <span className="text-[10px] text-slate-400">{p.packages?.length || 1} package options</span>
                      </td>
                      <td className="p-3.5 capitalize text-slate-300">{p.category}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 font-medium text-[10px]">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-white whitespace-nowrap">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, e.target.value)}
                            className="w-16 px-2 py-1 rounded bg-slate-950 text-white border border-slate-700 text-xs focus:outline-none focus:border-cyan-500"
                          />
                          {p.stock === 0 && (
                            <span className="text-[10px] text-rose-400 font-bold uppercase">Empty</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        {/* Section toggle pills */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isFeatured', p.isFeatured)}
                            title="Toggle Featured"
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              p.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isTrending', p.isTrending)}
                            title="Toggle Trending"
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              p.isTrending
                                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isFlashDeal', p.isFlashDeal)}
                            title="Toggle Flash Deal"
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              p.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            Flash
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p.id, 'isTopRated', p.isTopRated)}
                            title="Toggle Top Rated"
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              p.isTopRated
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                : 'bg-slate-800 text-slate-500'
                            }`}
                          >
                            Top
                          </button>
                        </div>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200 hover:text-rose-400"
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
        </div>
      )}

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="font-bold text-white text-sm">No orders yet</p>
                <p className="text-xs">Customer orders will appear here automatically after checkout.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order #</th>
                      <th className="p-3.5">Customer & Phone</th>
                      <th className="p-3.5">City</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Purchased Items</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-850/50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">
                          #{ord.orderNumber || ord.id}
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{ord.customerName}</div>
                          <span className="text-[11px] text-slate-400">{ord.phoneNumber}</span>
                          {ord.orderNote && (
                            <span className="block text-[10px] text-slate-400 italic">Note: {ord.orderNote}</span>
                          )}
                        </td>
                        <td className="p-3.5 text-slate-300">{ord.city}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-950 border border-cyan-500/40 text-cyan-300">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="space-y-1 max-w-xs">
                            {ord.items?.map((it, idx) => (
                              <div key={idx} className="text-[11px]">
                                <span className="text-white font-medium">{it.name}</span>
                                {it.package && <span className="text-cyan-400 ml-1">({it.package})</span>}
                                <span className="text-slate-400 ml-1">x{it.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5 font-bold text-white whitespace-nowrap">
                          {formatPrice(ord.totalAmount)}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {ord.status || 'Pending Payment'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}

export default Admin;
