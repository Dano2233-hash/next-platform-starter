import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  Plus,
  Trash2,
  Edit,
  LogOut,
  DollarSign,
  Boxes,
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';

export default function Admin() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  // Metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Bar */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-bold text-[10px] uppercase tracking-wider">
              Protected Portal
            </span>
            <span className="text-xs text-slate-400">Welcome, dano.js</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wide mt-1">
            Admin Dashboard
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-rose-950/60 border border-rose-800/80 hover:bg-rose-900/60 text-rose-300 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Logout Admin
        </button>
      </div>

      {/* Analytics Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          icon={Boxes}
          color="cyan"
          subtext="Active items in store catalog"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="blue"
          subtext="Processed & pending purchases"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="purple"
          subtext="Lifetime order value (IQD)"
        />
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('products');
              setShowProductForm(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'products'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" /> Products Catalog ({totalProducts})
          </button>

          <button
            onClick={() => {
              setActiveTab('orders');
              setShowProductForm(false);
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'orders'
                ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders Viewer ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && !showProductForm && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowProductForm(true);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950/40"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Show Product Form if active */}
      {showProductForm && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Products Tab View */}
      {activeTab === 'products' && !showProductForm && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products in admin list..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 min-w-[700px]">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Platform</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="p-4 font-semibold text-slate-100">
                      <div>
                        <span>{product.name}</span>
                        {product.tag && (
                          <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-amber-500 text-slate-950 font-extrabold">
                            {product.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium text-cyan-400">{product.category}</td>
                    <td className="p-4 uppercase text-slate-400">{product.platform}</td>
                    <td className="p-4 font-bold text-slate-200">{formatPrice(product.price)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => updateStock(product.id, e.target.value)}
                        className="w-20 bg-slate-950 border border-slate-800 text-xs text-center py-1 rounded text-slate-100 focus:outline-none focus:border-cyan-500 font-bold"
                      />
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="p-1.5 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${product.name}"?`)) deleteProduct(product.id);
                        }}
                        className="p-1.5 text-rose-500 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors"
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

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-10 h-10 mx-auto text-slate-600" />
              <p className="font-semibold text-slate-300">No orders received yet</p>
              <p className="text-xs text-slate-500">Orders placed by customers will appear here in real-time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.orderId || ord.createdAt}
                  className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-extrabold text-base text-cyan-400">
                        {ord.orderId}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-purple-950 border border-purple-800 text-purple-300">
                        Payment: {ord.paymentMethod}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {ord.createdAt ? new Date(ord.createdAt).toLocaleString() : 'Recent'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Customer Name</span>
                      <span className="font-semibold text-slate-200">{ord.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Phone / WhatsApp</span>
                      <span className="font-semibold text-slate-200">{ord.phoneNumber}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">City</span>
                      <span className="font-semibold text-slate-200">{ord.city}</span>
                    </div>
                  </div>

                  {ord.note && (
                    <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <span className="text-slate-500 font-semibold">Note / Game ID:</span> {ord.note}
                    </div>
                  )}

                  {/* Items in this order */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Ordered Products
                    </span>
                    {ord.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-900/60 px-3 py-2 rounded-lg border border-slate-800/60 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-200">
                          {item.product?.name} ({item.selectedPackage?.name}) × {item.quantity}
                        </span>
                        <span className="font-bold text-cyan-400">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <span className="text-xs text-slate-400">Total Order Amount</span>
                    <span className="font-heading font-black text-lg text-cyan-400">
                      {formatPrice(ord.totalAmount)}
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
}
