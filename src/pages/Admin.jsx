import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  User,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';

export default function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onLogout
}) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Load orders from LocalStorage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to parse saved orders from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleStockChange = (product, newStock) => {
    onUpdateProduct({ ...product, stock: Math.max(0, Number(newStock)) });
  };

  const handleToggleFlag = (product, flagKey) => {
    onUpdateProduct({ ...product, [flagKey]: !product[flagKey] });
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Top Admin Header */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-2xl font-black text-white">Admin Control Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400">
            Logged in as <strong className="text-cyan-400">dano.js</strong> • Manage Dano Store inventory & customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetProducts}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset catalog to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/50 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="blue" />
        <StatCard title="Total Orders Placed" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Store Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="emerald" />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Products Management ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            View Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={handleAddNewClick}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search bar inside admin */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter admin product list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0b101d] text-slate-100 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-300 font-bold border-b border-slate-800">
                    <th className="p-3.5">Item</th>
                    <th className="p-3.5">Category / Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Manage Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ProductImage
                              src={prod.image}
                              alt={prod.name}
                              category={prod.category}
                              platform={prod.platform}
                              className="w-full h-full"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-white block truncate max-w-[180px]">
                              {prod.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {prod.type} {prod.packages?.length > 0 ? `• ${prod.packages.length} pkgs` : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="bg-slate-900 border border-slate-800 text-cyan-400 px-2 py-0.5 rounded font-semibold text-[10px] uppercase">
                          {prod.platform}
                        </span>
                      </td>

                      <td className="p-3.5 font-bold text-cyan-300">
                        {formatPrice(prod.price)}
                      </td>

                      <td className="p-3.5">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => handleStockChange(prod, e.target.value)}
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                        />
                      </td>

                      {/* Section Flag Toggles */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => handleToggleFlag(prod, 'isFeatured')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.isFeatured
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                                : 'bg-slate-900 text-slate-500 border border-slate-800'
                            }`}
                          >
                            Featured
                          </button>

                          <button
                            onClick={() => handleToggleFlag(prod, 'isTrending')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.isTrending
                                ? 'bg-purple-950 text-purple-300 border border-purple-500/50'
                                : 'bg-slate-900 text-slate-500 border border-slate-800'
                            }`}
                          >
                            Trending
                          </button>

                          <button
                            onClick={() => handleToggleFlag(prod, 'isFlashDeal')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.isFlashDeal
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                                : 'bg-slate-900 text-slate-500 border border-slate-800'
                            }`}
                          >
                            Flash
                          </button>

                          <button
                            onClick={() => handleToggleFlag(prod, 'isTopRated')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prod.isTopRated
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                                : 'bg-slate-900 text-slate-500 border border-slate-800'
                            }`}
                          >
                            Top
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(prod)}
                            className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900 rounded-lg hover:bg-slate-800"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-900 rounded-lg hover:bg-slate-800"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              No customer orders recorded yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((ord) => (
                <div
                  key={ord.orderId}
                  className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-cyan-400 text-sm">
                        {ord.orderId}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <span className="bg-amber-950 text-amber-300 border border-amber-500/50 px-2.5 py-1 rounded-lg text-xs font-bold self-start sm:self-auto">
                      {ord.status}
                    </span>
                  </div>

                  {/* Customer details & payment method */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] font-bold">CUSTOMER</span>
                      <span className="font-bold text-white">{ord.customer?.name}</span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] font-bold">PHONE & CITY</span>
                      <span className="font-bold text-white">
                        {ord.customer?.phone} ({ord.customer?.city})
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px] font-bold">PAYMENT METHOD</span>
                      <span className="font-bold text-cyan-400 uppercase">
                        {ord.customer?.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {ord.customer?.orderNote && (
                    <div className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                      Note / Player ID: {ord.customer?.orderNote}
                    </div>
                  )}

                  {/* Items Purchased */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Purchased Items ({ord.items?.length || 0})
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ord.items?.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-slate-900/80 p-2 rounded-lg text-xs border border-slate-800/80"
                        >
                          <span className="font-medium text-slate-200 truncate max-w-[180px]">
                            {it.product?.name} ({it.quantity}x)
                          </span>
                          <span className="font-bold text-cyan-400">
                            {formatPrice(it.unitPrice * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="pt-2 flex justify-end items-baseline gap-2">
                    <span className="text-xs text-slate-400">Total Order Revenue:</span>
                    <span className="text-base font-black text-cyan-400">
                      {formatPrice(ord.totalAmount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Product Modal Form */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
