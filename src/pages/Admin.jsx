import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import AdminProductForm from '../components/AdminProductForm';
import StatCard from '../components/StatCard';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  Star,
  Flame,
  Layers
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders in admin', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (prodData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, prodData);
    } else {
      addProduct(prodData);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleStockChange = (id, newStock) => {
    updateProduct(id, { stock: Math.max(0, Number(newStock)) });
  };

  const toggleFlag = (id, flagKey, currentValue) => {
    updateProduct(id, { [flagKey]: !currentValue });
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 flex items-center gap-2">
            <Layers className="w-7 h-7 text-cyan-400" />
            <span>Dano Store Admin Panel</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage inventory, update stock, toggle section features, and view customer manual orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-black text-xs shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-bold text-xs transition"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="amber" />
      </div>

      {/* Product Form Modal / Section */}
      {showProductForm && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSubmit={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            View Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={resetToDefault}
            className="text-[11px] font-semibold text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Default Catalog
          </button>
        )}
      </div>

      {/* Tab 1: Manage Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title or category..."
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#070a14] text-slate-400 uppercase font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Flags</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/40">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                        <ProductImage product={product} className="w-full h-full" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-100 line-clamp-1">{product.name}</div>
                        <div className="text-[10px] text-slate-500">{product.platform} • {product.type}</div>
                      </div>
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-cyan-400 font-semibold border border-slate-800">
                        {product.category}
                      </span>
                    </td>

                    <td className="p-3 font-extrabold text-slate-100">
                      {formatPrice(product.price)}
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        className="w-20 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-center text-xs text-slate-100 font-bold"
                      />
                    </td>

                    {/* Section Feature Toggles */}
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFlag(product.id, 'isFeatured', product.isFeatured)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.isFeatured ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-950 text-slate-600'
                          }`}
                          title="Toggle Featured"
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => toggleFlag(product.id, 'isTrending', product.isTrending)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.isTrending ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-950 text-slate-600'
                          }`}
                          title="Toggle Trending"
                        >
                          Trending
                        </button>
                        <button
                          onClick={() => toggleFlag(product.id, 'isFlashDeal', product.isFlashDeal)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            product.isFlashDeal ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-950 text-slate-600'
                          }`}
                          title="Toggle Flash Deal"
                        >
                          Flash
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setShowProductForm(true);
                          }}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-400"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-red-400"
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

      {/* Tab 2: View Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-500">
              No orders placed yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400">Order ID:</span>
                    <span className="text-sm font-extrabold text-cyan-400 ml-2">#{order.orderId}</span>
                    <span className="text-[11px] text-slate-500 ml-3">
                      {new Date(order.date).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Payment Method:</span>
                    <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                      {order.customer?.paymentMethod || 'Manual'}
                    </span>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Customer:</span>
                    <p className="font-bold text-slate-200">{order.customer?.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone:</span>
                    <p className="font-bold text-slate-200">{order.customer?.phone}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">City:</span>
                    <p className="font-bold text-slate-200">{order.customer?.city}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Order Note / ID:</span>
                    <p className="font-bold text-slate-200 truncate">{order.customer?.note || 'None'}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-1.5 pt-2">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 rounded bg-slate-950">
                      <span>{item.product?.name} ({item.package?.name} x {item.quantity})</span>
                      <span className="font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                  <span className="text-xs text-slate-400 font-bold">Total Amount Paid / Due:</span>
                  <span className="text-base font-extrabold text-cyan-400">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
