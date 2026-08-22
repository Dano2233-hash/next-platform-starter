import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  LogOut,
  Search,
  Check,
  X,
  RefreshCw,
  Flame,
  Star,
  TrendingUp,
  ShieldCheck,
  User,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  // Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.platform || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">

      {/* Admin Dashboard Header */}
      <div className="bg-[#090e21] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Admin Authenticated
            </span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Dano Store Dashboard
          </h1>
          <p className="text-xs text-slate-400">
            Manage product inventory, packages, flags, and review customer orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Reset Catalog to Default"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          trend={`${lowStockCount} Low Stock Items`}
          color="from-blue-600 to-cyan-500"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          trend="Saved in Local Storage"
          color="from-purple-600 to-indigo-600"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          trend="Cumulative Manual Orders"
          color="from-emerald-600 to-teal-500"
        />
        <StatCard
          title="Stock Alerts"
          value={lowStockCount}
          icon={Flame}
          trend={lowStockCount > 0 ? 'Requires Refill' : 'Stock Optimal'}
          color="from-amber-500 to-rose-600"
        />
      </div>

      {/* Tabs Navigation & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 bg-[#050813] p-1.5 rounded-2xl border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0c1226] border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab Content: Products Table */}
      {activeTab === 'products' && (
        <div className="bg-[#090e21] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#050813] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Platform / Type</th>
                  <th className="p-4">Price (IQD)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#0d142d] transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                        <ProductImage
                          image={p.image}
                          title={p.name}
                          category={p.category}
                          platform={p.platform}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate max-w-[180px]">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">{p.packages ? `${p.packages.length} Packages` : 'Single'}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase">{p.platform}</span>
                        <span className="text-[10px] text-slate-400">{p.type}</span>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-white font-heading">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                          className="w-16 bg-[#050813] border border-slate-700/80 rounded-lg p-1 text-center font-bold text-xs"
                        />
                        {p.stock <= 0 ? (
                          <span className="text-[10px] text-red-400 font-bold">Out</span>
                        ) : p.stock <= 10 ? (
                          <span className="text-[10px] text-amber-400 font-bold">Low</span>
                        ) : null}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.isFeatured ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'bg-slate-900 text-slate-500'
                          }`}
                        >
                          Featured
                        </button>

                        <button
                          onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.isTrending ? 'bg-purple-950 text-purple-300 border border-purple-500/30' : 'bg-slate-900 text-slate-500'
                          }`}
                        >
                          Trending
                        </button>

                        <button
                          onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.isFlashDeal ? 'bg-rose-950 text-rose-300 border border-rose-500/30' : 'bg-slate-900 text-slate-500'
                          }`}
                        >
                          Flash
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="p-1.5 bg-red-950/60 hover:bg-red-900 text-red-400 rounded-lg transition-colors"
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

      {/* Tab Content: Orders View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#090e21] border border-slate-800 rounded-3xl space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="font-heading font-bold text-white text-base">No orders placed yet</h3>
              <p className="text-xs text-slate-400">
                Customer orders placed during test checkout flows will display here with payment information.
              </p>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.orderId}
                className="bg-[#090e21] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-cyan-400 text-base">{ord.orderId}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(ord.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
                    {ord.status || 'Pending Payment'}
                  </span>
                </div>

                {/* Customer info and selected payment */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs bg-[#050813] p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block flex items-center gap-1"><User className="w-3 h-3" /> Customer:</span>
                    <strong className="text-white text-sm">{ord.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block flex items-center gap-1"><Phone className="w-3 h-3" /> Phone:</span>
                    <strong className="text-slate-200">{ord.phoneNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block flex items-center gap-1"><MapPin className="w-3 h-3" /> City:</span>
                    <strong className="text-slate-200">{ord.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Selected Payment Method:</span>
                    <strong className="text-cyan-400 uppercase font-heading">{ord.paymentDetails?.name || ord.paymentMethod}</strong>
                  </div>
                </div>

                {/* Order items list */}
                <div className="space-y-2 text-xs">
                  {ord.items?.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between items-center bg-[#0c1226] p-2.5 rounded-xl">
                      <div>
                        <span className="font-bold text-slate-200">{item.productName}</span>
                        {item.selectedPackage && <span className="text-cyan-400 text-[11px] block">{item.selectedPackage}</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400">Qty: {item.quantity}</span>
                        <strong className="text-white block">{formatPrice(item.unitPrice * item.quantity)}</strong>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center border-t border-slate-800 pt-3">
                  <span className="text-xs text-slate-400">Total Order Amount</span>
                  <span className="text-xl font-black text-cyan-400 font-heading">{formatPrice(ord.totalAmount)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Admin Product Modal */}
      {isFormOpen && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </div>
  );
};

export default Admin;
