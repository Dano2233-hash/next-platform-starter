import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, Plus, Edit2, Trash2, Package, ShoppingCart, DollarSign, Check, X, Star, Flame, Zap, RefreshCw, Eye, Search } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, addProduct, editProduct, deleteProduct, toggleStock, toggleFlag, resetToDefault } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Load orders from Local Storage
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('dano_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      editProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Metrics calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Admin Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">Admin Control Dashboard</h1>
            <p className="text-xs text-slate-400">
              Manage Dano Store catalog, stock, flags, and manual payment orders.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 flex items-center gap-1.5"
            title="Reset Catalog to Initial Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Metrics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog Items"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          color="purple"
          subtitle="Customer Orders"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtitle="Accumulated Sales"
        />
      </div>

      {/* Tab Controls */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'products'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Product Management ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Orders Management ({orders.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-4">

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#080d1a] p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter products by title..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <button
              onClick={handleCreateClick}
              className="w-full sm:w-auto px-4 py-2 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Section Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => {
                    const isOutOfStock = p.stock <= 0;
                    return (
                      <tr key={p.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-[10px] font-bold text-cyan-300">
                                  {p.name.substring(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-100">{p.name}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5 font-semibold text-slate-300 capitalize">{p.category}</td>
                        <td className="p-3.5 font-semibold text-cyan-400">{p.platform}</td>

                        <td className="p-3.5 font-extrabold text-slate-100">{formatPrice(p.price)}</td>

                        {/* Stock toggle */}
                        <td className="p-3.5">
                          <button
                            onClick={() => toggleStock(p.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                              isOutOfStock
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {isOutOfStock ? 'Out of Stock' : `In Stock (${p.stock})`}
                          </button>
                        </td>

                        {/* Flags Toggles */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleFlag(p.id, 'isFeatured')}
                              className={`p-1 rounded text-[10px] border ${
                                p.isFeatured
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              }`}
                              title="Toggle Featured"
                            >
                              Featured
                            </button>

                            <button
                              onClick={() => toggleFlag(p.id, 'isTrending')}
                              className={`p-1 rounded text-[10px] border ${
                                p.isTrending
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 font-bold'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              }`}
                              title="Toggle Trending"
                            >
                              Trending
                            </button>

                            <button
                              onClick={() => toggleFlag(p.id, 'isFlashDeal')}
                              className={`p-1 rounded text-[10px] border ${
                                p.isFlashDeal
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              }`}
                              title="Toggle Flash Deal"
                            >
                              Flash
                            </button>

                            <button
                              onClick={() => toggleFlag(p.id, 'isTopRated')}
                              className={`p-1 rounded text-[10px] border ${
                                p.isTopRated
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              }`}
                              title="Toggle Top Rated"
                            >
                              Top
                            </button>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(p)}
                              className="p-1.5 rounded-lg bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-slate-800"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 rounded-lg bg-slate-900 text-rose-400 hover:bg-slate-800 border border-slate-800"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No customer orders recorded yet in Local Storage (`dano_orders`).
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Phone & City</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Items Count</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">{ord.orderId}</td>
                        <td className="p-3.5 font-bold text-slate-100">{ord.customer?.name}</td>
                        <td className="p-3.5 text-slate-400">
                          <div>{ord.customer?.phone}</div>
                          <div className="text-[10px] font-semibold text-slate-500">{ord.customer?.city}</div>
                        </td>
                        <td className="p-3.5 font-bold text-purple-400 uppercase">{ord.paymentMethod}</td>
                        <td className="p-3.5">{ord.items?.length || 0} items</td>
                        <td className="p-3.5 font-extrabold text-slate-100">{formatPrice(ord.totalAmount)}</td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(ord)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold border border-slate-800 flex items-center gap-1 ml-auto"
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
        </div>
      )}

      {/* Product Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100">
                Order Details - <span className="text-cyan-400">{selectedOrderDetails.orderId}</span>
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p><strong className="text-slate-400">Customer:</strong> {selectedOrderDetails.customer?.name}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedOrderDetails.customer?.phone}</p>
              <p><strong className="text-slate-400">City:</strong> {selectedOrderDetails.customer?.city}</p>
              <p><strong className="text-slate-400">Payment Method:</strong> <span className="text-purple-400 font-bold uppercase">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.customer?.note && (
                <p><strong className="text-slate-400">Note:</strong> {selectedOrderDetails.customer?.note}</p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1.5">
              <span className="text-xs font-bold text-slate-300 block mb-1">Items List:</span>
              {selectedOrderDetails.items?.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs p-2 rounded bg-slate-950 border border-slate-800">
                  <span>{it.product?.name} {it.selectedPackage ? `(${it.selectedPackage.name})` : ''} x{it.quantity}</span>
                  <span className="font-bold text-slate-100">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between font-extrabold text-sm">
              <span>Total Amount:</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
