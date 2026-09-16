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
  DollarSign,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
  Check,
  X,
  CreditCard
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetProducts } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Read orders from localStorage 'dano_orders'
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dano_orders') || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const handleToggleStock = (product) => {
    const newStock = product.stock > 0 ? 0 : 100;
    updateProduct(product.id, { stock: newStock });
  };

  const handleToggleFlag = (product, field) => {
    updateProduct(product.id, { [field]: !product[field] });
  };

  // Stats calculation
  const totalProductsCount = products.length;
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d1322] border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-black text-white font-sans uppercase">Dano Store Control Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Logged in as Administrator (dano.js)</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm('Reset catalog to default seed products?')) {
                resetProducts();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Default Seed
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-xs font-bold text-rose-300 flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Dashboard Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProductsCount}
          subtext="Active store catalog items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          subtext="Customer order submissions"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Accumulated sales IQD"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Manage Products ({totalProductsCount})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Manage Customer Orders ({totalOrdersCount})
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Filter admin catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setShowProductModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Section Tags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <div className="w-10 h-10 flex-shrink-0">
                          <ProductImage image={p.image} name={p.name} category={p.category} platform={p.platform} className="h-10 w-10 rounded-lg" />
                        </div>
                        <div>
                          <div className="font-bold text-white line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{p.packages?.length || 1} package(s)</div>
                        </div>
                      </td>

                      <td className="p-3.5 text-slate-300 font-semibold">{p.category}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-400 border border-slate-700 uppercase">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-cyan-300 font-mono">{formatPrice(p.price)}</td>

                      <td className="p-3.5">
                        <button
                          onClick={() => handleToggleStock(p)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                            p.stock > 0
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                              : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                          }`}
                        >
                          {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                        </button>
                      </td>

                      <td className="p-3.5">
                        <div className="flex flex-wrap items-center gap-1 text-[10px]">
                          <button
                            onClick={() => handleToggleFlag(p, 'isFeatured')}
                            className={`px-1.5 py-0.5 rounded border ${
                              p.isFeatured ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p, 'isTrending')}
                            className={`px-1.5 py-0.5 rounded border ${
                              p.isTrending ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFlag(p, 'isFlashDeal')}
                            className={`px-1.5 py-0.5 rounded border ${
                              p.isFlashDeal ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-600 border-slate-800'
                            }`}
                          >
                            Flash
                          </button>
                        </div>
                      </td>

                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setShowProductModal(true);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete product ${p.name}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300"
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
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider mb-4">
              Submitted Orders ({orders.length})
            </h2>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No customer orders submitted yet. Place an order on the checkout page to view it here.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-cyan-400">
                          Order #{order.orderId}
                        </span>
                        <span className="text-xs text-slate-500 ml-2 font-mono">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded text-xs font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          Payment: {order.customer?.paymentMethod?.toUpperCase()}
                        </span>
                        <span className="text-sm font-black text-white font-mono">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 block">Customer Name</span>
                        <strong className="text-white">{order.customer?.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Phone Number</span>
                        <strong className="text-white font-mono">{order.customer?.phone}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">City</span>
                        <strong className="text-white">{order.customer?.city}</strong>
                      </div>
                    </div>

                    {order.customer?.orderNote && (
                      <div className="p-2 rounded bg-slate-950 text-xs text-cyan-200 font-mono">
                        Note/ID: {order.customer.orderNote}
                      </div>
                    )}

                    <div className="border-t border-slate-800 pt-2 text-xs">
                      <span className="text-slate-500 font-bold block mb-1">Items Purchased:</span>
                      <div className="flex flex-wrap gap-2">
                        {order.items?.map((it, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded bg-slate-800 text-slate-200 text-[11px] font-mono border border-slate-700"
                          >
                            {it.name} ({it.packageName}) x{it.quantity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Product Form Modal */}
      {showProductModal && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
