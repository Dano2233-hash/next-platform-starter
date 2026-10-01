import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useProducts } from '../hooks/useProducts.jsx';
import StatCard from '../components/StatCard.jsx';
import AdminProductForm from '../components/AdminProductForm.jsx';
import ProductImage from '../components/ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
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
  TrendingUp,
  CheckCircle2,
  CreditCard,
  User,
  Phone,
  MapPin
} from 'lucide-react';

const ORDERS_STORAGE_KEY = 'dano_orders';

export const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFeatured,
    toggleTrending,
    toggleFlashDeal,
    toggleTopRated,
    resetProducts
  } = useProducts();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders:', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login', { replace: true });
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingNew(false);
    }
  };

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Bar */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" /> Admin Portal
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Dano Store Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage product catalog, inventory stock, section highlights, and customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProducts}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            title="Reset catalog to default dataset"
          >
            <RefreshCw className="w-4 h-4" /> Reset Default Catalog
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          description="Active catalog items"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
          description="Customer orders received"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          description="Combined total order value"
        />
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-3 border-b border-gray-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#080d1e] text-gray-400 border border-gray-800 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" /> Manage Products ({totalProducts})
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setIsAddingNew(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-gray-950 shadow-md shadow-cyan-500/20'
              : 'bg-[#080d1e] text-gray-400 border border-gray-800 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> View Customer Orders ({totalOrders})
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'products' ? (
        <div className="space-y-6">
          {/* Add Product Button / Form */}
          {!isAddingNew && !editingProduct ? (
            <div className="flex items-center justify-between bg-[#080d1e] border border-gray-800 rounded-2xl p-4">
              <span className="text-sm font-bold text-white">Product Catalog List</span>
              <button
                onClick={() => setIsAddingNew(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-gray-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Add New Product
              </button>
            </div>
          ) : (
            <AdminProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Product Table / Cards List */}
          <div className="bg-[#080d1e] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#050814] text-gray-400 uppercase tracking-wider font-bold border-b border-gray-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category / Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Toggles</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/80">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#0c132b] transition-colors">
                      {/* Product Name & Thumbnail */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-900 overflow-hidden shrink-0 border border-gray-800">
                            <ProductImage product={p} className="h-12" />
                          </div>
                          <div>
                            <span className="font-extrabold text-white text-sm block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-cyan-400 font-semibold">
                              {p.type} • {p.packages?.length || 0} Options
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Platform */}
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="px-2 py-0.5 rounded bg-gray-900 text-gray-200 text-[10px] font-bold uppercase inline-block">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-gray-400 block font-semibold">
                            Platform: {p.platform}
                          </span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-black text-white">
                        {formatPrice(p.price)}
                        {p.oldPrice && (
                          <span className="text-[10px] text-gray-500 line-through block font-normal">
                            {formatPrice(p.oldPrice)}
                          </span>
                        )}
                      </td>

                      {/* Stock Selector */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            value={p.stock}
                            onChange={(e) => updateStock(p.id, e.target.value)}
                            className="w-16 bg-[#050814] text-xs text-cyan-300 font-bold px-2 py-1 rounded border border-gray-800 focus:outline-none"
                          />
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              p.stock > 0
                                ? 'bg-emerald-950 text-emerald-400'
                                : 'bg-red-950 text-red-400'
                            }`}
                          >
                            {p.stock > 0 ? 'In Stock' : 'Out'}
                          </span>
                        </div>
                      </td>

                      {/* Section Display Toggles */}
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => toggleFeatured(p.id)}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isFeatured
                                ? 'bg-cyan-950 text-cyan-400 border-cyan-700'
                                : 'bg-gray-900 text-gray-500 border-gray-800'
                            }`}
                            title="Toggle Featured"
                          >
                            <Star className="w-3 h-3" /> Feat
                          </button>

                          <button
                            onClick={() => toggleTrending(p.id)}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isTrending
                                ? 'bg-purple-950 text-purple-400 border-purple-700'
                                : 'bg-gray-900 text-gray-500 border-gray-800'
                            }`}
                            title="Toggle Trending"
                          >
                            <TrendingUp className="w-3 h-3" /> Trend
                          </button>

                          <button
                            onClick={() => toggleFlashDeal(p.id)}
                            className={`p-1.5 rounded-lg border text-[10px] font-bold flex items-center gap-1 transition-colors ${
                              p.isFlashDeal
                                ? 'bg-amber-950 text-amber-400 border-amber-700'
                                : 'bg-gray-900 text-gray-500 border-gray-800'
                            }`}
                            title="Toggle Flash Deal"
                          >
                            <Flame className="w-3 h-3" /> Flash
                          </button>
                        </div>
                      </td>

                      {/* Edit / Delete Buttons */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAddingNew(false);
                            }}
                            className="p-2 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-2 bg-gray-800 hover:bg-red-900/60 text-gray-400 hover:text-red-400 rounded-lg transition-colors"
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
      ) : (
        /* Orders Tab Content */
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No Customer Orders Yet</h3>
              <p className="text-xs text-gray-400">
                Orders created by customers will appear here automatically with selected payment details.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-[#080d1e] border border-gray-800 rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-800 pb-3 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-cyan-400 font-mono bg-cyan-950/80 px-3 py-1 rounded-lg border border-cyan-800">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 text-xs font-bold rounded-lg uppercase tracking-wider self-start sm:self-auto">
                      {order.status || 'Pending Payment'}
                    </span>
                  </div>

                  {/* Customer Info & Payment Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 bg-[#050814] rounded-xl border border-gray-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                        <User className="w-3.5 h-3.5 text-cyan-400" /> Customer Name:
                      </div>
                      <div className="text-sm font-extrabold text-white">{order.customerName}</div>
                    </div>

                    <div className="p-3 bg-[#050814] rounded-xl border border-gray-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                        <Phone className="w-3.5 h-3.5 text-cyan-400" /> Phone & City:
                      </div>
                      <div className="text-sm font-extrabold text-white">
                        {order.phone} ({order.city})
                      </div>
                    </div>

                    <div className="p-3 bg-[#050814] rounded-xl border border-gray-800 space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-400 font-bold">
                        <CreditCard className="w-3.5 h-3.5 text-cyan-400" /> Selected Payment Method:
                      </div>
                      <div className="text-sm font-black text-amber-400 uppercase">
                        {order.paymentMethod}
                      </div>
                    </div>
                  </div>

                  {order.orderNote && (
                    <div className="text-xs text-gray-300 bg-gray-900/60 p-2.5 rounded-xl border border-gray-800">
                      <strong className="text-cyan-400">Note / Player ID:</strong> {order.orderNote}
                    </div>
                  )}

                  {/* Order Items Table */}
                  <div className="space-y-2 pt-2">
                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Purchased Items ({order.items?.length || 0})
                    </h5>
                    <div className="space-y-1.5">
                      {order.items?.map((item) => (
                        <div
                          key={item.itemKey}
                          className="flex items-center justify-between p-2.5 bg-[#050814] rounded-lg border border-gray-800/80 text-xs"
                        >
                          <div className="font-bold text-white">
                            {item.productName}
                            {item.packageName && (
                              <span className="text-[10px] text-cyan-400 ml-2 font-normal">
                                ({item.packageName})
                              </span>
                            )}
                            <span className="text-[10px] text-gray-400 ml-2">
                              x{item.quantity}
                            </span>
                          </div>
                          <span className="font-black text-cyan-300">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-2 border-t border-gray-800 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-gray-300">Total Order Amount:</span>
                    <span className="text-xl font-black text-cyan-400">
                      {formatPrice(order.totalAmount)}
                    </span>
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
