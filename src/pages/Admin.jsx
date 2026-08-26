import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package, ShoppingBag, DollarSign, LogOut, Plus, Edit2, Trash2,
  CheckCircle, RefreshCw, Star, Flame, Sparkles, Shield, ToggleLeft, ToggleRight, Eye
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

export default function Admin() {
  const { logout } = useAuth();
  const {
    products, addProduct, updateProduct, deleteProduct,
    toggleStock, toggleFlag, orders, resetProductsToDefault
  } = useProducts();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'featured'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Dashboard Statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAddingProduct(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Dano Store Admin Dashboard</h1>
            <p className="text-xs text-gray-400">Manage catalog products, stock, feature sections & customer orders</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={resetProductsToDefault}
            className="px-3 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
            title="Reset Catalog to Initial Mock Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtitle="Catalog size"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtitle="Customer transactions"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="green"
          subtitle="Generated sales"
        />
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Product Catalog ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            View Customer Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'featured'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Manage Section Flags
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => setIsAddingProduct(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-extrabold flex items-center space-x-1.5 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        )}
      </div>

      {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="bg-[#090d18] border border-gray-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#050811] text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-800">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-900 shrink-0 overflow-hidden border border-gray-800">
                        <img
                          src={product.image || undefined}
                          alt={product.name}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-white block line-clamp-1">{product.name}</span>
                        <span className="text-[10px] text-cyan-400">{product.type}</span>
                      </div>
                    </td>

                    <td className="p-4 font-medium uppercase text-[11px]">{product.category}</td>
                    <td className="p-4 font-semibold text-gray-300">{product.platform}</td>

                    <td className="p-4 font-black text-white">
                      {formatPrice(product.price)}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => toggleStock(product.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center space-x-1 cursor-pointer transition-all ${
                          product.stock > 0
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-red-950 text-red-300 border border-red-500/40'
                        }`}
                      >
                        <span>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
                      </button>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${product.name}?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-gray-800 hover:bg-red-950 text-red-400 cursor-pointer"
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
      )}

      {/* TAB 2: VIEW CUSTOMER ORDERS & PAYMENT METHOD */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#090d18] border border-gray-800">
              <ShoppingBag className="w-10 h-10 text-gray-500 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white">No Customer Orders Yet</h3>
              <p className="text-xs text-gray-400">Orders placed by customers will appear here with selected payment methods.</p>
            </div>
          ) : (
            <div className="bg-[#090d18] border border-gray-800 rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead className="bg-[#050811] text-gray-400 font-bold uppercase tracking-wider text-[11px] border-b border-gray-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Phone / City</th>
                      <th className="p-4">Selected Payment Method</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Date</th>
                      <th className="p-4 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {orders.map((ord) => (
                      <tr key={ord.orderId} className="hover:bg-gray-800/40">
                        <td className="p-4 font-black text-white">{ord.orderId}</td>
                        <td className="p-4 font-bold text-cyan-300">{ord.customerName}</td>
                        <td className="p-4 text-gray-300">
                          <div>{ord.phoneNumber}</div>
                          <div className="text-[10px] text-gray-500">{ord.city}</div>
                        </td>
                        <td className="p-4 font-bold text-purple-300">
                          <span className="px-2.5 py-1 rounded-full bg-purple-950 border border-purple-500/40">
                            {ord.paymentMethodName}
                          </span>
                        </td>
                        <td className="p-4 font-black text-white">{formatPrice(ord.totalAmount)}</td>
                        <td className="p-4 text-gray-400 text-[11px]">
                          {new Date(ord.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(ord)}
                            className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-cyan-400 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MANAGE SECTION FLAGS */}
      {activeTab === 'featured' && (
        <div className="bg-[#090d18] border border-gray-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Toggle Home Page Featured Sections</h3>
          <p className="text-xs text-gray-400">
            Easily toggle items into Featured, Trending, Flash Deals, or Top Rated sections on the Home page.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#050811] text-gray-400 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3 text-center">Featured</th>
                  <th className="p-3 text-center">Trending</th>
                  <th className="p-3 text-center">Flash Deal</th>
                  <th className="p-3 text-center">Top Rated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td className="p-3 font-bold text-white">{prod.name}</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleFlag(prod.id, 'isFeatured')}
                        className={`p-1 rounded cursor-pointer ${prod.isFeatured ? 'text-cyan-400' : 'text-gray-600'}`}
                      >
                        {prod.isFeatured ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleFlag(prod.id, 'isTrending')}
                        className={`p-1 rounded cursor-pointer ${prod.isTrending ? 'text-purple-400' : 'text-gray-600'}`}
                      >
                        {prod.isTrending ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleFlag(prod.id, 'isFlashDeal')}
                        className={`p-1 rounded cursor-pointer ${prod.isFlashDeal ? 'text-amber-400' : 'text-gray-600'}`}
                      >
                        {prod.isFlashDeal ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleFlag(prod.id, 'isTopRated')}
                        className={`p-1 rounded cursor-pointer ${prod.isTopRated ? 'text-emerald-400' : 'text-gray-600'}`}
                      >
                        {prod.isTopRated ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit or Add Product Modal */}
      {(isAddingProduct || editingProduct) && (
        <AdminProductForm
          initialProduct={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setIsAddingProduct(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Order Details View Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#090d18] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 text-xs text-gray-200">
            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
              <h3 className="text-base font-bold text-white">Order Details: {selectedOrderDetails.orderId}</h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Customer:</strong> {selectedOrderDetails.customerName}</p>
              <p><strong>Phone:</strong> {selectedOrderDetails.phoneNumber}</p>
              <p><strong>City:</strong> {selectedOrderDetails.city}</p>
              <p><strong>Payment Method:</strong> <span className="text-cyan-400 font-bold">{selectedOrderDetails.paymentMethodName}</span></p>
              {selectedOrderDetails.orderNote && (
                <p><strong>Order Note / ID:</strong> {selectedOrderDetails.orderNote}</p>
              )}
            </div>

            <div className="border-t border-gray-800 pt-3 space-y-2">
              <span className="font-bold text-white">Items Ordered:</span>
              {selectedOrderDetails.items.map((it, idx) => (
                <div key={idx} className="flex justify-between bg-[#050811] p-2 rounded-xl">
                  <span>{it.product.name} ({it.selectedPackage?.name || 'Standard'}) x{it.quantity}</span>
                  <span className="font-bold text-white">{formatPrice(it.unitPrice * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-800 pt-3 flex justify-between font-black text-sm">
              <span>Total:</span>
              <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
