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
  Flame,
  Zap,
  TrendingUp,
  Star,
  RefreshCcw,
  Search,
  CheckCircle,
  Eye
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    products,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFlag,
    resetProductsToDefault
  } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleCreateProduct = (data) => {
    addProduct(data);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (data) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, data);
      setEditingProduct(null);
      setIsFormOpen(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
            Dano Store Control Panel
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage products, stock levels, tags, and customer orders
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProductsToDefault}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold"
            title="Reset catalog to initial state"
          >
            <RefreshCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900/80 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext="Active in store database"
        />

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Processed orders"
        />

        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="Gross sales recorded"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-4 text-sm font-bold">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Product Catalog ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !isFormOpen && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:bg-cyan-400"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Product Form Modal / Section */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="w-full max-w-sm">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by product name, platform..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-900 text-xs text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Platform &amp; Type</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Section Tags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/90 transition-colors">
                    <td className="p-3.5 flex items-center gap-3">
                      <div className="w-12 h-12 shrink-0">
                        <ProductImage product={prod} className="h-12" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-100">{prod.name}</div>
                        <div className="text-[10px] text-slate-500">{prod.slug}</div>
                      </div>
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold">
                          {prod.platform}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                          {prod.type}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-cyan-400">
                      {formatPrice(prod.price)}
                    </td>

                    <td className="p-3.5">
                      <input
                        type="number"
                        value={prod.stock}
                        onChange={(e) => updateStock(prod.id, e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-700/80 rounded-lg p-1 text-center font-bold text-slate-100"
                      />
                    </td>

                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => toggleFlag(prod.id, 'isFeatured')}
                          className={`p-1 rounded border text-[10px] font-bold ${
                            prod.isFeatured ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Toggle Featured"
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => toggleFlag(prod.id, 'isTrending')}
                          className={`p-1 rounded border text-[10px] font-bold ${
                            prod.isTrending ? 'bg-purple-950 text-purple-300 border-purple-500' : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Toggle Trending"
                        >
                          Trending
                        </button>
                        <button
                          onClick={() => toggleFlag(prod.id, 'isFlashDeal')}
                          className={`p-1 rounded border text-[10px] font-bold ${
                            prod.isFlashDeal ? 'bg-amber-950 text-amber-300 border-amber-500' : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Toggle Flash Deal"
                        >
                          Flash
                        </button>
                        <button
                          onClick={() => toggleFlag(prod.id, 'isTopRated')}
                          className={`p-1 rounded border text-[10px] font-bold ${
                            prod.isTopRated ? 'bg-emerald-950 text-emerald-300 border-emerald-500' : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Toggle Top Rated"
                        >
                          Top Rated
                        </button>
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsFormOpen(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-300 hover:bg-rose-900"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-200">No Orders Created Yet</h3>
              <p className="text-xs text-slate-400">When customers complete checkout, their orders will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Phone &amp; City</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Total Amount</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-900/90 transition-colors">
                      <td className="p-3.5 font-bold text-cyan-400">{ord.id}</td>
                      <td className="p-3.5 font-bold text-slate-100">{ord.customerName}</td>
                      <td className="p-3.5">
                        <div className="font-medium text-slate-200">{ord.phone}</div>
                        <div className="text-[10px] text-slate-400">{ord.city}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 font-extrabold text-[11px] uppercase">
                          {ord.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-cyan-400">
                        {formatPrice(ord.totalAmount)}
                      </td>
                      <td className="p-3.5 text-slate-400">
                        {new Date(ord.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[11px] flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View</span>
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

      {/* Selected Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-100 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-cyan-400">
                Order Details (#{selectedOrder.id})
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>City:</strong> {selectedOrder.city}</p>
              <p><strong>Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrder.paymentMethod}</span></p>
              {selectedOrder.orderNote && (
                <p><strong>Note / Player ID:</strong> {selectedOrder.orderNote}</p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <p className="font-bold text-slate-300">Items:</p>
              {selectedOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-slate-200 py-1 border-b border-slate-800/40">
                  <span>{it.quantity}x {it.product.name} {it.packageItem ? `(${it.packageItem.name})` : ''}</span>
                  <span className="font-bold text-cyan-400">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm font-black pt-2">
                <span>Total Revenue:</span>
                <span className="text-cyan-400">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
