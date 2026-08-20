import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Tag
} from 'lucide-react';

export default function Admin({
  products = [],
  orders = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetProducts,
  onLogout
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.subtotal || 0), 0);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(id);
    }
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
    } else {
      onAddProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const q = searchFilter.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Header & Admin Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Admin Authenticated
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetProducts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all"
            title="Reset default products"
          >
            <RefreshCw className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-950/80 border border-red-700/80 hover:bg-red-900 text-red-200 text-xs font-extrabold transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tabs Row & Add Product Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d1322] border border-slate-800/80 p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Products Management ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders Log ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* Product Form Modal / View */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TAB 1: Products View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products by title, category or platform..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Product Title</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Base Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-bold">
                        <div className="flex items-center gap-2">
                          <span className="truncate max-w-xs">{p.name}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-semibold">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400">{p.type}</td>
                      <td className="p-3.5 font-extrabold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5 font-bold">
                        {p.stock > 0 ? (
                          <span className="text-emerald-400">{p.stock}</span>
                        ) : (
                          <span className="text-red-400">Out of Stock</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1 flex-wrap text-[10px]">
                          {p.isFeatured && (
                            <span className="px-1.5 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">
                              Featured
                            </span>
                          )}
                          {p.isTrending && (
                            <span className="px-1.5 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">
                              Trending
                            </span>
                          )}
                          {p.isFlashDeal && (
                            <span className="px-1.5 py-0.5 bg-red-950 text-red-300 rounded border border-red-800">
                              Flash
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-red-400 border border-slate-700"
                          title="Delete"
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

      {/* TAB 2: Orders View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-2" />
              <p className="font-bold text-slate-200">No Orders Placed Yet</p>
              <p className="text-xs text-slate-500 mt-1">
                New customer checkouts will automatically appear here.
              </p>
            </div>
          ) : (
            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Phone & City</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Items Purchased</th>
                      <th className="p-3.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    {orders.map((o) => (
                      <tr key={o.orderNumber || o.createdAt} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">
                          #{o.orderNumber}
                        </td>
                        <td className="p-3.5 font-bold text-slate-100">
                          {o.customerName}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {o.phoneNumber} ({o.city})
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-bold">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5 font-black text-cyan-400">
                          {formatPrice(o.subtotal)}
                        </td>
                        <td className="p-3.5 text-slate-300 max-w-xs">
                          {o.items?.map((i) => `${i.productName} (${i.packageName})`).join(', ')}
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {new Date(o.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
