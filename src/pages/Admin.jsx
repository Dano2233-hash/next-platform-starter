import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Trash2,
  Edit,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Search,
  Check,
  X,
  RotateCcw,
  Eye,
  ShieldCheck,
  Star,
  Zap,
  Flame,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

const Admin = () => {
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, resetToDefaultProducts } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);

  // Filtered products for admin search
  const filteredProducts = products.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.platform && p.platform.toLowerCase().includes(q))
    );
  });

  const handleCreateProduct = (newProduct) => {
    addProduct(newProduct);
    setIsAddingProduct(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    updateProduct(updatedProduct.id, updatedProduct);
    setEditingProduct(null);
  };

  const handleStockToggle = (product) => {
    const newStock = product.stock > 0 ? 0 : 100;
    updateProduct(product.id, { stock: newStock });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Admin Authenticated
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-100 tracking-tight pt-1">
            Dano Store Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default products list? Custom additions will be overwritten.')) {
                resetToDefaultProducts();
              }
            }}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset Default Catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog active items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Customer submitted orders"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Completed manual payments"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Catalog ({totalProducts})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-cyan-300'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders Log ({totalOrders})</span>
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>

            {!isAddingProduct && !editingProduct && (
              <button
                onClick={() => setIsAddingProduct(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20 hover:from-blue-500 hover:to-cyan-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Product</span>
              </button>
            )}
          </div>

          {/* Add Product Form Modal */}
          {isAddingProduct && (
            <AdminProductForm
              onSubmit={handleCreateProduct}
              onCancel={() => setIsAddingProduct(false)}
            />
          )}

          {/* Edit Product Form Modal */}
          {editingProduct && (
            <AdminProductForm
              product={editingProduct}
              onSubmit={handleUpdateProduct}
              onCancel={() => setEditingProduct(null)}
            />
          )}

          {/* Products Table */}
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-cyan-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Flags</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ProductImage
                              src={p.image}
                              alt={p.name}
                              category={p.category}
                              platform={p.platform}
                              type={p.type}
                              className="h-10"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-100 block line-clamp-1">{p.name}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{p.type}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 capitalize text-slate-300">{p.category}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-bold text-cyan-300">
                          {p.platform}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-cyan-400">{formatPrice(p.price)}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleStockToggle(p)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider transition-colors cursor-pointer ${
                            p.stock > 0
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900'
                              : 'bg-red-950 text-red-400 border border-red-500/40 hover:bg-red-900'
                          }`}
                        >
                          {p.stock > 0 ? `${p.stock} In Stock` : 'Out of Stock'}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          {p.isFeatured && <span className="p-1 rounded bg-blue-950 text-blue-400" title="Featured"><Zap className="w-3 h-3" /></span>}
                          {p.isTrending && <span className="p-1 rounded bg-purple-950 text-purple-400" title="Trending"><TrendingUp className="w-3 h-3" /></span>}
                          {p.isFlashDeal && <span className="p-1 rounded bg-amber-950 text-amber-400" title="Flash Deal"><Flame className="w-3 h-3" /></span>}
                          {p.isTopRated && <span className="p-1 rounded bg-cyan-950 text-cyan-400" title="Top Rated"><Star className="w-3 h-3" /></span>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsAddingProduct(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-cyan-950 text-slate-400 hover:text-cyan-300 border border-slate-800 transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors"
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
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400 space-y-2">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="font-bold text-slate-300">No Orders Submitted Yet</p>
                <p className="text-xs text-slate-500">Orders created by customers will appear here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-extrabold uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {orders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-4 font-mono font-bold text-cyan-300">{o.orderId}</td>
                        <td className="p-4 font-bold text-slate-100">{o.customerName}</td>
                        <td className="p-4 text-slate-300">{o.phone}</td>
                        <td className="p-4 text-slate-300">{o.city}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 uppercase">
                            {o.paymentMethod}
                          </span>
                        </td>
                        <td className="p-4 font-black text-cyan-400">{formatPrice(o.totalAmount)}</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(o)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Selected Order Modal View */}
          {selectedOrderDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <div className="glass-panel w-full max-w-lg p-6 rounded-2xl border border-cyan-500/30 space-y-4 shadow-2xl relative">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-extrabold text-slate-100 text-base">Order Details: {selectedOrderDetails.orderId}</h3>
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Customer Name:</strong> {selectedOrderDetails.customerName}</p>
                  <p><strong>Phone Number:</strong> {selectedOrderDetails.phone}</p>
                  <p><strong>City:</strong> {selectedOrderDetails.city}</p>
                  <p><strong>Selected Payment Method:</strong> <span className="text-cyan-400 font-bold uppercase">{selectedOrderDetails.paymentMethod}</span></p>
                  {selectedOrderDetails.orderNote && <p><strong>Note/Player ID:</strong> {selectedOrderDetails.orderNote}</p>}
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="font-bold text-xs text-cyan-400">Ordered Items:</h4>
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs p-2 rounded bg-slate-900 border border-slate-800">
                      <span>{item.productName} ({item.packageName}) x{item.quantity}</span>
                      <span className="font-bold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                  <span className="font-bold text-xs text-slate-300">Total Amount</span>
                  <span className="font-black text-lg text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
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
