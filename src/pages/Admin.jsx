import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { Package, ShoppingBag, DollarSign, LogOut, Plus, Edit2, Trash2, CheckCircle2, RotateCcw, Eye, Search } from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock, resetToDefaultProducts } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered products for admin view
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Row */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
            Admin Panel
          </span>
          <h1 className="text-2xl font-black text-white mt-1">Dano Store Management</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefaultProducts}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
            title="Reset catalog to original products"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/80 hover:bg-red-900 text-red-300 font-extrabold text-xs rounded-xl border border-red-800/80 flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="w-6 h-6" />}
          badgeText="Active Catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="w-6 h-6" />}
          badgeText="Lifetime"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={<DollarSign className="w-6 h-6" />}
          badgeText="IQD Earnings"
        />
      </div>

      {/* Navigation Tabs (Products vs Orders) */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'products'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Manage Products ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            View Customer Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showAddForm && !editingProduct && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* ADD / EDIT PRODUCT FORM MODAL OR INLINE AREA */}
      {(showAddForm || editingProduct) && (
        <div className="scroll-mt-6">
          <AdminProductForm
            initialData={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setShowAddForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* TAB 1: PRODUCTS TABLE */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          {/* Search bar inside products table */}
          <div className="relative max-w-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, platform..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Starting Price</th>
                    <th className="p-3.5">Flags</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-medium">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No products match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                              <ProductImage product={product} heightClass="h-10" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-white block truncate max-w-[180px]">
                                {product.name}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {product.packages ? product.packages.length : 1} Pkgs
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5 capitalize text-slate-400">{product.category}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900 text-cyan-300 border border-slate-700">
                            {product.platform}
                          </span>
                        </td>

                        {/* Stock Adjustment Input */}
                        <td className="p-3.5">
                          <input
                            type="number"
                            value={product.stock}
                            onChange={(e) => updateStock(product.id, Number(e.target.value))}
                            className="w-16 bg-slate-950 border border-slate-800 rounded-lg py-1 px-2 text-xs font-bold text-cyan-400"
                          />
                        </td>

                        <td className="p-3.5 font-bold text-white">
                          {formatPrice(product.price)}
                        </td>

                        {/* Flags */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 text-[9px] font-bold">
                            {product.isFeatured && <span className="text-cyan-400 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">Featured</span>}
                            {product.isTrending && <span className="text-purple-400 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800">Trending</span>}
                            {product.isFlashDeal && <span className="text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800">Flash</span>}
                            {product.isTopRated && <span className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">Top</span>}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingProduct(product);
                                setShowAddForm(false);
                              }}
                              className="p-1.5 text-slate-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORDERS TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-[#090e1a] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-[10px] tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Order ID</th>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Phone & City</th>
                  <th className="p-3.5">Selected Payment Method</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No customer orders recorded yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((ord, idx) => (
                    <tr key={ord.orderId || idx} className="hover:bg-slate-900/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-cyan-300">
                        #{ord.orderId}
                      </td>
                      <td className="p-3.5 font-bold text-white">{ord.customerName}</td>
                      <td className="p-3.5">
                        <span className="block text-slate-200">{ord.phone}</span>
                        <span className="text-[10px] text-slate-500">{ord.city}</span>
                      </td>

                      {/* Explicit Selected Payment Method requirement */}
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase bg-slate-900 text-cyan-400 border border-cyan-500/30">
                          {ord.paymentMethod}
                        </span>
                      </td>

                      <td className="p-3.5 font-extrabold text-white">
                        {formatPrice(ord.totalAmount)}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                          {ord.status || 'Pending'}
                        </span>
                      </td>

                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(ord)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-cyan-300 rounded-lg border border-slate-700 flex items-center gap-1 text-xs ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs text-slate-300 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white">Order Details</h3>
                <span className="font-mono text-cyan-400">#{selectedOrderDetails.orderId}</span>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-2.5 py-1 bg-slate-800 text-slate-400 hover:text-white rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <p><strong className="text-slate-400">Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong className="text-slate-400">Phone:</strong> {selectedOrderDetails.phone}</p>
              <p><strong className="text-slate-400">City:</strong> {selectedOrderDetails.city}</p>
              <p><strong className="text-slate-400">Selected Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethod}</span></p>
              {selectedOrderDetails.orderNote && (
                <p><strong className="text-slate-400">Note:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <strong className="text-slate-400 block">Ordered Items:</strong>
              {selectedOrderDetails.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <div>
                    <span className="font-bold text-white">{item.product?.name}</span>
                    <span className="text-[10px] text-cyan-400 block">{item.selectedPackage?.name} × {item.quantity}</span>
                  </div>
                  <span className="font-bold">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-white text-sm">Total:</span>
              <span className="text-lg font-black text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
