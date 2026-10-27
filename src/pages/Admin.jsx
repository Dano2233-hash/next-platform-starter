import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Plus, Edit, Trash2, Package, ShoppingCart, DollarSign, Layers, CheckCircle, RefreshCw, Eye, Tag, Sparkles } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

const Admin = () => {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to parse orders:', e);
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
      setIsAddingNew(false);
    }
  };

  const toggleStock = (prod) => {
    const newStock = prod.stock > 0 ? 0 : 100;
    updateProduct(prod.id, { stock: newStock });
  };

  // Metrics Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Admin Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-[#080e22] border border-slate-800 shadow-xl">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-extrabold uppercase tracking-widest">
            Authenticated Admin
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Dano Store Management Panel</h1>
          <p className="text-xs text-slate-400">Manage digital products, stock, feature tags, and customer orders</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset catalog to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-500/40 hover:bg-red-900/80 text-red-200 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtext="Active items in store"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtext="Customer orders placed"
          icon={ShoppingCart}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Calculated from orders"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Form Modal / In-Line Form */}
          {(isAddingNew || editingProduct) && (
            <AdminProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAddingNew(false);
                setEditingProduct(null);
              }}
            />
          )}

          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white">All Store Products</h2>
            {!isAddingNew && !editingProduct && (
              <button
                onClick={() => setIsAddingNew(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}
          </div>

          {/* Products Table */}
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Lowest Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Section Tags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                    {/* Title & Image */}
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        {prod.image ? (
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-cyan-950 flex items-center justify-center font-bold text-cyan-400 text-xs">
                            {prod.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{prod.name}</h4>
                        <span className="text-[10px] text-slate-500">{prod.type}</span>
                      </div>
                    </td>

                    {/* Category / Platform */}
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400 font-bold uppercase text-[10px]">
                        {prod.platform}
                      </span>
                      <span className="block text-[10px] text-slate-400 capitalize mt-1">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-black text-cyan-400">
                      {formatPrice(prod.price)}
                    </td>

                    {/* Stock */}
                    <td className="p-4">
                      <button
                        onClick={() => toggleStock(prod)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer ${
                          prod.stock > 0
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                            : 'bg-red-950/80 border-red-500/40 text-red-300'
                        }`}
                      >
                        {prod.stock > 0 ? `In Stock (${prod.stock})` : 'Out of Stock'}
                      </button>
                    </td>

                    {/* Flags */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[9px] font-bold">Featured</span>}
                        {prod.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 text-[9px] font-bold">Trending</span>}
                        {prod.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 text-[9px] font-bold">Flash</span>}
                        {prod.isTopRated && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 text-[9px] font-bold">Top Rated</span>}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsAddingNew(false);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${prod.name}?`)) deleteProduct(prod.id);
                        }}
                        className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-red-400 border border-slate-800 cursor-pointer"
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

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-base font-extrabold text-white">Customer Orders</h2>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#090d1a] border border-slate-800 text-slate-400 space-y-2">
              <ShoppingCart className="w-8 h-8 text-slate-600 mx-auto" />
              <p className="text-xs font-bold">No orders placed yet.</p>
            </div>
          ) : (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone & City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4 font-black text-cyan-400">{order.id}</td>
                      <td className="p-4 font-bold text-white">{order.customer?.name}</td>
                      <td className="p-4">
                        <div>{order.customer?.phone}</div>
                        <span className="text-[10px] text-slate-500">{order.customer?.city}</span>
                      </td>
                      <td className="p-4 font-bold text-slate-200 capitalize">
                        {order.paymentMethod}
                      </td>
                      <td className="p-4 font-black text-white">{formatPrice(order.totalAmount)}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-900/50 cursor-pointer flex items-center gap-1 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Selected Order Detail Modal */}
          {selectedOrder && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-extrabold text-white">Order Details - {selectedOrder.id}</h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <p><strong className="text-slate-400">Customer:</strong> {selectedOrder.customer?.name}</p>
                  <p><strong className="text-slate-400">Phone:</strong> {selectedOrder.customer?.phone}</p>
                  <p><strong className="text-slate-400">City:</strong> {selectedOrder.customer?.city}</p>
                  <p><strong className="text-slate-400">Selected Payment:</strong> <span className="text-cyan-400 font-bold uppercase">{selectedOrder.paymentMethod}</span></p>
                  {selectedOrder.orderNote && <p><strong className="text-slate-400">Note / Player ID:</strong> {selectedOrder.orderNote}</p>}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400">Items Ordered:</h4>
                  {selectedOrder.items?.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-xs bg-slate-900 p-2 rounded-lg">
                      <span>{item.name} ({item.packageName}) x {item.quantity}</span>
                      <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
