import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle2,
  Star,
  Flame,
  Zap,
  TrendingUp,
  CreditCard,
  Phone,
  User,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, editProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const { orders } = useCart();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [productSearch, setProductSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  // Metrics calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.totalAmount) || 0), 0);

  // Filtered products list in table
  const displayedProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.platform?.toLowerCase().includes(q)
    );
  });

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      editProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const toggleFlag = (prod, flagKey) => {
    editProduct(prod.id, { [flagKey]: !prod[flagKey] });
  };

  return (
    <div className="space-y-8">
      {/* Admin Header Bar */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
            Admin Console
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight mt-1">
            Store Management
          </h1>
          <p className="text-xs text-slate-400">
            Signed in as <strong className="text-cyan-400">dano.js</strong>. Manage products, live stock, featured deals, and view customer orders.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset to 49 original default products"
          >
            <RefreshCw size={14} />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* High Level Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          label="Total Products"
          value={totalProducts}
          icon={Package}
          change={`${products.filter((p) => p.stock > 0).length} in stock`}
          color="cyan"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          change="Real LocalStorage Orders"
          color="blue"
        />
        <StatCard
          label="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          change="Accumulated volume"
          color="emerald"
        />
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Package size={15} />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag size={15} />
          <span>Customer Orders ({totalOrders})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Action bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products by title..."
                className="w-full bg-[#0b1120] border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/40 transition-all self-start sm:self-auto"
            >
              <Plus size={15} />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-3">Platform</th>
                    <th className="py-3 px-3">Type</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Stock</th>
                    <th className="py-3 px-3 text-center">Sections</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {displayedProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      {/* Product Name & Visual */}
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                          <ProductImage
                            product={{
                              name: p.name,
                              image: p.image,
                              category: p.category,
                              platform: p.platform,
                            }}
                            height="h-10"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate max-w-[180px]">{p.name}</p>
                          <p className="text-[11px] text-slate-400">{p.packages?.length || 1} pkg(s)</p>
                        </div>
                      </td>

                      {/* Platform */}
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-[10px]">
                          {p.platform}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="py-3 px-3 text-slate-400 font-medium">
                        {p.type}
                      </td>

                      {/* Price */}
                      <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                        {formatPrice(p.price)}
                      </td>

                      {/* Stock inline editor */}
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-1 text-center font-mono text-xs text-white"
                        />
                      </td>

                      {/* Section Badges / Toggles */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => toggleFlag(p, 'isFeatured')}
                            title="Toggle Featured"
                            className={`p-1 rounded ${
                              p.isFeatured ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-slate-600 hover:text-slate-400'
                            }`}
                          >
                            <Star size={13} />
                          </button>
                          <button
                            onClick={() => toggleFlag(p, 'isTrending')}
                            title="Toggle Trending"
                            className={`p-1 rounded ${
                              p.isTrending ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40' : 'text-slate-600 hover:text-slate-400'
                            }`}
                          >
                            <TrendingUp size={13} />
                          </button>
                          <button
                            onClick={() => toggleFlag(p, 'isFlashDeal')}
                            title="Toggle Flash Deal"
                            className={`p-1 rounded ${
                              p.isFlashDeal ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'text-slate-600 hover:text-slate-400'
                            }`}
                          >
                            <Zap size={13} />
                          </button>
                          <button
                            onClick={() => toggleFlag(p, 'isTopRated')}
                            title="Toggle Top Rated"
                            className={`p-1 rounded ${
                              p.isTopRated ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-600 hover:text-slate-400'
                            }`}
                          >
                            <Flame size={13} />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
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

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <ShoppingBag size={32} className="mx-auto mb-2 text-slate-600" />
              <h3 className="text-white font-bold text-sm">No Orders Yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                When customers place manual orders, they will appear right here with selected payment methods.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b1120] border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  {/* Top order row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-cyan-400 text-base">
                        #{ord.orderId}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {ord.status || 'Pending Payment'}
                      </span>
                      <span className="text-xs text-slate-400">
                        {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : 'Recent'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Selected Payment:</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono">
                        {ord.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span>{ord.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      <span>{ord.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      <span>{ord.city}</span>
                    </div>
                  </div>

                  {/* Order Note */}
                  {ord.orderNote && (
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                      <span className="text-slate-400 font-semibold mr-1">Note/ID:</span>
                      {ord.orderNote}
                    </div>
                  )}

                  {/* Purchased Items List */}
                  <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
                    {ord.items?.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between items-center text-xs">
                        <div className="text-slate-200">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-cyan-400 text-[11px] ml-2">
                            ({item.selectedPackage})
                          </span>
                          <span className="text-slate-400 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-300">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}

                    <div className="pt-2 flex justify-between items-baseline font-bold text-xs">
                      <span className="text-slate-300">Total Order Amount</span>
                      <span className="text-base font-black text-cyan-400 font-mono">
                        {formatPrice(ord.totalAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Admin Add/Edit Modal */}
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
