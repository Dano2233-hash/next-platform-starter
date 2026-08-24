import React, { useState } from 'react';
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
  Trash2,
  Edit2,
  LogOut,
  RefreshCw,
  Star,
  Flame,
  Zap,
  Award,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onToggleFlag,
  onResetProducts,
  onLogout,
}) {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'add-product'
  const [editingProduct, setEditingProduct] = useState(null);

  // Read orders from local storage
  const [orders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dano_orders') || '[]');
    } catch (e) {
      return [];
    }
  });

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalPrice || 0), 0);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      onAddProduct(productData);
    }
    setActiveTab('products');
  };

  return (
    <div className="py-6 space-y-8 pb-16">

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Control Panel</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">Manage product catalog, inventory stock, orders, and section placements.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetProducts}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 flex items-center gap-1.5 transition"
            title="Reset to default seed products"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 text-red-200 text-xs font-bold border border-red-500/30 flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="green" />
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setEditingProduct(null);
            setActiveTab('products');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'products'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Product Catalog ({totalProducts})
        </button>

        <button
          onClick={() => {
            setEditingProduct(null);
            setActiveTab('orders');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'orders'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Orders History ({totalOrders})
        </button>

        <button
          onClick={() => {
            setEditingProduct(null);
            setActiveTab('add-product');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center gap-1 ml-auto shadow-md shadow-cyan-500/20`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Tab 1: Product Form (Add or Edit) */}
      {(activeTab === 'add-product' || editingProduct) && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setEditingProduct(null);
            setActiveTab('products');
          }}
        />
      )}

      {/* Tab 2: Products Management List */}
      {activeTab === 'products' && !editingProduct && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Platform / Type</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Section Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                          <ProductImage
                            src={prod.image}
                            name={prod.name}
                            category={prod.category}
                            platform={prod.platform}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-100">{prod.name}</p>
                          <p className="text-[10px] text-slate-500 uppercase">{prod.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-bold text-[10px] uppercase border border-cyan-500/30 mr-1">
                        {prod.platform}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold text-[10px] uppercase border border-purple-500/30">
                        {prod.type}
                      </span>
                    </td>

                    <td className="p-4 font-extrabold text-cyan-300">
                      {formatPrice(prod.price)}
                    </td>

                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        value={prod.stock}
                        onChange={(e) => onUpdateStock(prod.id, e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-center font-bold text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleFlag(prod.id, 'isFeatured')}
                          className={`p-1 rounded text-[10px] font-bold border transition ${
                            prod.isFeatured
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Featured"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onToggleFlag(prod.id, 'isTrending')}
                          className={`p-1 rounded text-[10px] font-bold border transition ${
                            prod.isTrending
                              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Trending"
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onToggleFlag(prod.id, 'isFlashDeal')}
                          className={`p-1 rounded text-[10px] font-bold border transition ${
                            prod.isFlashDeal
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Flash Deal"
                        >
                          <Zap className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onToggleFlag(prod.id, 'isTopRated')}
                          className={`p-1 rounded text-[10px] font-bold border transition ${
                            prod.isTopRated
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                          title="Top Rated"
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setActiveTab('add-product');
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders History */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-4">
          <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Customer Orders ({totalOrders})</h3>

          {orders.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-8">No customer orders created yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.map((ord, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2 border-b border-slate-800 pb-2">
                    <div>
                      <span className="font-extrabold text-cyan-400">{ord.orderId}</span>
                      <span className="text-slate-500 ml-2">({new Date(ord.createdAt).toLocaleString()})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/30">
                        {ord.status || 'Pending'}
                      </span>
                      <span className="font-extrabold text-emerald-400 text-sm">{formatPrice(ord.totalPrice)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div>
                      <p><strong className="text-slate-400">Customer:</strong> {ord.customerName} ({ord.city})</p>
                      <p><strong className="text-slate-400">Phone:</strong> {ord.phoneNumber}</p>
                    </div>
                    <div>
                      <p><strong className="text-slate-400">Selected Payment Method:</strong> <span className="text-cyan-300 font-bold">{ord.paymentMethodName || ord.paymentMethod}</span></p>
                      {ord.orderNote && <p><strong className="text-slate-400">Note / Player ID:</strong> {ord.orderNote}</p>}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <strong>Items Ordered:</strong>{' '}
                    {ord.items?.map((i) => `${i.productName} (${i.selectedPackageName}) x${i.quantity}`).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
