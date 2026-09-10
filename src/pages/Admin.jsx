import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  Eye,
  RefreshCw,
  Layers,
  Sparkles,
  TrendingUp,
  Zap,
  Star
} from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';

const ORDERS_STORAGE_KEY = 'dano_orders';

export default function Admin() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('products');
  const [orders, setOrders] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Load saved orders from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingProduct(false);
    }
  };

  const handleToggleFeatureFlag = (product, flagKey) => {
    updateProduct(product.id, { [flagKey]: !product[flagKey] });
  };

  // Metric Stats Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 rounded-3xl border border-slate-800 p-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold mb-2 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Store Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Admin Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Reset Catalog to default initial dataset"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Default Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          trend="Catalog Active"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          trend="Live Storage"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          trend="Cumulative Sales"
        />
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('products');
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
            activeTab === 'orders'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* Tab 1: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add / Edit Form Modal/Container */}
          {(isAddingProduct || editingProduct) && (
            <AdminProductForm
              initialProduct={editingProduct}
              onSubmit={handleSaveProduct}
              onCancel={() => {
                setIsAddingProduct(false);
                setEditingProduct(null);
              }}
            />
          )}

          {/* Catalog Controls */}
          {!isAddingProduct && !editingProduct && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              </div>

              <button
                onClick={() => setIsAddingProduct(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          )}

          {/* Products Table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category & Platform</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Badges & Tags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <ProductImage
                          src={prod.image}
                          name={prod.name}
                          category={prod.category}
                          platform={prod.platform}
                          type={prod.type}
                          className="w-12 h-12 rounded-lg shrink-0"
                        />
                        <div>
                          <div className="font-extrabold text-slate-100 text-sm">{prod.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{prod.slug}</div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-semibold text-slate-200 block">{prod.category}</span>
                        <span className="text-[11px] text-cyan-400 font-bold">{prod.platform} • {prod.type}</span>
                      </td>

                      <td className="p-4 font-black text-cyan-400">
                        {formatPrice(prod.price)}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={prod.stock}
                            onChange={(e) => updateStock(prod.id, e.target.value)}
                            className="w-16 bg-slate-950 border border-slate-800 rounded-lg py-1 px-2 text-xs font-bold text-slate-100 text-center"
                          />
                          <span className={prod.stock > 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                            {prod.stock > 0 ? 'Available' : 'Out'}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          <button
                            onClick={() => handleToggleFeatureFlag(prod, 'isFeatured')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              prod.isFeatured
                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Featured
                          </button>
                          <button
                            onClick={() => handleToggleFeatureFlag(prod, 'isTrending')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              prod.isTrending
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Trending
                          </button>
                          <button
                            onClick={() => handleToggleFeatureFlag(prod, 'isFlashDeal')}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              prod.isFlashDeal
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : 'bg-slate-950 text-slate-500 border-slate-800'
                            }`}
                          >
                            Flash
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete Product"
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
        </div>
      )}

      {/* Tab 2: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-200">No Orders Created Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                When customers place manual orders via FastPay, Korek, or MasterCard, they will appear here.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-black text-cyan-400">{ord.id}</td>
                        <td className="p-4">
                          <div className="font-bold text-slate-100">{ord.customer?.name}</div>
                          <div className="text-[11px] text-slate-400">{ord.customer?.phone}</div>
                        </td>
                        <td className="p-4 text-slate-300 font-medium">{ord.customer?.city}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-bold text-cyan-400">
                            {ord.paymentMethod}
                          </span>
                        </td>
                        <td className="p-4 font-black text-emerald-400">
                          {formatPrice(ord.totalPrice)}
                        </td>
                        <td className="p-4 text-slate-400 text-[11px]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(ord)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 ml-auto"
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
            </div>
          )}

          {/* Modal for Order Details */}
          {selectedOrderDetails && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="font-black text-slate-100 text-base">
                    Order Details: <span className="text-cyan-400">{selectedOrderDetails.id}</span>
                  </h3>
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="text-slate-400 hover:text-white text-sm font-bold p-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-slate-500 block">Customer Name</span>
                      <span className="font-bold text-slate-100">{selectedOrderDetails.customer?.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone (WhatsApp)</span>
                      <span className="font-bold text-slate-100">{selectedOrderDetails.customer?.phone}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 block">City</span>
                      <span className="font-bold text-slate-100">{selectedOrderDetails.customer?.city}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-slate-500 block">Selected Payment</span>
                      <span className="font-bold text-cyan-400">{selectedOrderDetails.paymentMethod}</span>
                    </div>
                  </div>

                  {selectedOrderDetails.customer?.orderNote && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-500 font-bold block mb-1">Customer Note / Player ID:</span>
                      <p className="text-slate-200 font-mono">{selectedOrderDetails.customer.orderNote}</p>
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">
                      Order Items
                    </span>
                    {selectedOrderDetails.items?.map((item) => (
                      <div key={item.cartItemId} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div>
                          <div className="font-bold text-slate-100">{item.product?.name}</div>
                          <div className="text-[11px] text-slate-400">Package: {item.packageName} × {item.quantity}</div>
                        </div>
                        <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-300">Total Price:</span>
                    <span className="font-black text-cyan-400">{formatPrice(selectedOrderDetails.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
