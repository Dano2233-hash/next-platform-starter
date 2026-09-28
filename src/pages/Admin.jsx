import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Check,
  Star
} from 'lucide-react';

export const Admin = () => {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Handlers
  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage product inventory, stock levels, sections, and customer orders.
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-red-900/40 hover:bg-red-900/80 text-red-300 border border-red-800/80 flex items-center gap-2 self-start sm:self-auto transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout Admin</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="from-cyan-500 to-blue-600"
          subtitle="Catalog size"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="from-purple-500 to-indigo-600"
          subtitle="Customer transactions"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="from-emerald-500 to-teal-600"
          subtitle="Cumulative IQD sales"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('products');
              setIsAddingNew(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Manage Products ({totalProducts})
          </button>

          <button
            onClick={() => {
              setActiveTab('orders');
              setIsAddingNew(false);
              setEditingProduct(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            Manage Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !isAddingNew && !editingProduct && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Main Tab Content */}
      {activeTab === 'products' ? (
        <div className="space-y-6">
          {/* Add or Edit Form View */}
          {(isAddingNew || editingProduct) ? (
            <AdminProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          ) : (
            <div className="space-y-4">
              {/* Search Filter */}
              <div className="max-w-md relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog by title, category, or platform..."
                  className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-cyan-500"
                />
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              </div>

              {/* Products Table */}
              <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Category / Platform</th>
                      <th className="p-3.5">Base Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Flags</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <ProductImage
                              src={p.image}
                              alt={p.name}
                              category={p.category}
                              platform={p.platform}
                              className="w-12 h-12 shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-white line-clamp-1">{p.name}</h4>
                              <p className="text-[10px] text-slate-500">{p.type} • {p.packages ? `${p.packages.length} packages` : 'Single'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <span className="px-2 py-0.5 font-extrabold uppercase bg-slate-900 text-cyan-400 border border-slate-800 rounded">
                            {p.platform}
                          </span>
                        </td>

                        <td className="p-3.5 font-bold text-slate-200">
                          {formatPrice(p.price)}
                        </td>

                        <td className="p-3.5">
                          <input
                            type="number"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, e.target.value)}
                            className="w-20 bg-slate-900 border border-slate-800 text-white rounded-lg p-1.5 font-bold text-center focus:border-cyan-500"
                          />
                        </td>

                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1">
                            {p.isFeatured && <span className="px-1.5 py-0.5 text-[9px] bg-cyan-900/60 text-cyan-300 rounded">Featured</span>}
                            {p.isTrending && <span className="px-1.5 py-0.5 text-[9px] bg-purple-900/60 text-purple-300 rounded">Trending</span>}
                            {p.isFlashDeal && <span className="px-1.5 py-0.5 text-[9px] bg-amber-900/60 text-amber-300 rounded">Flash</span>}
                          </div>
                        </td>

                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700"
                              title="Edit Product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400 hover:bg-slate-700"
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
        </div>
      ) : (
        /* Orders View */
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-[#090d1a] border border-slate-800 rounded-2xl">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-extrabold text-white">No Orders Received Yet</h3>
              <p className="text-xs text-slate-400">Orders placed by customers will be displayed here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div
                  key={o.orderId}
                  className="bg-[#090d1a] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                        Order #{o.orderId}
                      </span>
                      <h4 className="font-extrabold text-white text-sm mt-0.5">
                        Customer: {o.customer?.name} ({o.customer?.phone})
                      </h4>
                      <p className="text-xs text-slate-400">City: {o.customer?.city}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-black text-cyan-400 text-base">{formatPrice(o.totalAmount)}</p>
                      <span className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-md">
                        {o.status || 'Pending Payment'}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selected */}
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-xs flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 font-bold">Selected Payment Method:</span>
                      <p className="font-bold text-white mt-0.5">{o.paymentMethod?.name}</p>
                      <p className="text-[11px] text-slate-400">{o.paymentMethod?.description}</p>
                    </div>

                    <span className="font-mono font-bold text-cyan-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                      {o.paymentMethod?.accountNumber}
                    </span>
                  </div>

                  {/* Order Note / Player ID */}
                  {o.customer?.orderNote && (
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                      <span className="text-slate-500 font-bold">Player ID / Customer Note:</span>
                      <p className="font-mono text-cyan-300 mt-1">{o.customer.orderNote}</p>
                    </div>
                  )}

                  {/* Order Items */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ordered Items:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {o.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                          <ProductImage
                            src={item.image}
                            alt={item.productName}
                            category={item.category}
                            platform={item.platform}
                            className="w-10 h-10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-white truncate">{item.productName}</h5>
                            <p className="text-[11px] text-cyan-400">{item.packageName}</p>
                          </div>
                          <span className="font-extrabold text-slate-300">
                            {item.quantity} x {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
