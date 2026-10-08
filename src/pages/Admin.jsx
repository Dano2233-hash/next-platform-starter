import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
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
  Check,
  X,
  Search,
  Sparkles,
  Flame,
  Star,
  Zap,
  RotateCcw,
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

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
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.platform.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header Bar */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Admin Management Panel</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Dano Store Control Center</h1>
          <p className="text-xs text-slate-400">Logged in as admin (dano.js)</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default preset products?')) {
                resetToDefault();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
            title="Reset catalog"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>Reset Default Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-800 hover:bg-rose-900 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext="Active in store catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
          subtext="Manual orders created"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="Cumulative gross sales"
        />
      </div>

      {/* Tab Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setShowProductForm(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'products'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Products Catalog ({totalProducts})
          </button>
          <button
            onClick={() => {
              setActiveTab('orders');
              setShowProductForm(false);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'orders'
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showProductForm && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Add / Edit Form Drawer */}
      {showProductForm && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search Filter Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products in admin table..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0b0f19] text-xs text-slate-100 placeholder-slate-500 pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Product Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Platform</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Flags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5 font-bold text-slate-100 min-w-[180px]">
                      <div>{p.name}</div>
                      <span className="text-[10px] text-slate-500">{p.slug}</span>
                    </td>
                    <td className="p-3.5">{p.category}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold">
                        {p.platform}
                      </span>
                    </td>
                    <td className="p-3.5 font-extrabold text-cyan-300">
                      {formatPrice(p.price)}
                    </td>
                    <td className="p-3.5 min-w-[120px]">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-16 bg-slate-950 text-xs text-slate-100 p-1 rounded border border-slate-800 focus:border-cyan-500 font-bold"
                      />
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}
                          title="Toggle Featured"
                          className={`p-1 rounded ${
                            p.isFeatured ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'text-slate-600'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isTrending: !p.isTrending })}
                          title="Toggle Trending"
                          className={`p-1 rounded ${
                            p.isTrending ? 'bg-blue-950 text-blue-400 border border-blue-800' : 'text-slate-600'
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isFlashDeal: !p.isFlashDeal })}
                          title="Toggle Flash Deal"
                          className={`p-1 rounded ${
                            p.isFlashDeal ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'text-slate-600'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => updateProduct(p.id, { isTopRated: !p.isTopRated })}
                          title="Toggle Top Rated"
                          className={`p-1 rounded ${
                            p.isTopRated ? 'bg-purple-950 text-purple-400 border border-purple-800' : 'text-slate-600'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900 border border-slate-800 rounded-lg"
                          title="Edit Product"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-lg"
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

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-8 text-center">
              <ShoppingBag className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-200">No orders created yet</h3>
              <p className="text-xs text-slate-400 mt-1">Orders placed by customers will appear here in real time.</p>
            </div>
          ) : (
            <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer Info</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5">Selected Payment Method</th>
                    <th className="p-3.5">Items</th>
                    <th className="p-3.5">Total Price</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 font-bold text-cyan-400">{o.id}</td>
                      <td className="p-3.5 font-semibold text-slate-100">
                        <div>{o.customerName}</div>
                        <div className="text-[11px] text-slate-400">{o.phone}</div>
                      </td>
                      <td className="p-3.5">{o.city}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-extrabold text-[11px]">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs">
                        {o.items?.map((item, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300">
                            &bull; {item.productName} ({item.packageName}) x{item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="p-3.5 font-extrabold text-slate-100">
                        {formatPrice(o.totalAmount)}
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 font-bold text-[10px]">
                          {o.status || 'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
