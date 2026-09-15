import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Search,
  CheckCircle,
  Eye,
  Layers,
  Sparkles,
  Flame,
  Star,
  RefreshCw,
  X
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';

const Admin = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Statistics calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  // Filtered products list
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
    }
  };

  const handleUpdateStock = (id, newStock) => {
    const val = parseInt(newStock);
    if (!isNaN(val) && val >= 0) {
      updateProduct(id, { stock: val });
    }
  };

  const toggleFlag = (id, flagKey, currentValue) => {
    updateProduct(id, { [flagKey]: !currentValue });
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Top Header & Admin Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-600/20 text-cyan-300 border border-blue-500/30 text-[11px] font-bold uppercase tracking-wider">
              Management Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
            Dano Store Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingProduct(null);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 font-bold text-xs text-white shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Inventory"
          value={totalProducts}
          subtitle="Active items in store catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Completed & pending purchases"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Accumulated store earnings"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* ADD / EDIT FORM MODAL CONTAINER */}
      {(showAddForm || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* TABS SELECTOR BAR */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Products Inventory ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Orders Log ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="relative w-48 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl py-2 pl-8 pr-3 focus:outline-none focus:border-cyan-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
          </div>
        )}
      </div>

      {/* TAB CONTENT: PRODUCTS MANAGEMENT TABLE */}
      {activeTab === 'products' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category & Platform</th>
                  <th className="p-4">Price (IQD)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Store Flags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">

                    {/* Item Thumbnail & Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                          <ProductImage
                            src={p.image}
                            title={p.name}
                            platform={p.platform}
                            category={p.category}
                            className="w-10 h-10"
                          />
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-100 text-xs line-clamp-1">{p.name}</div>
                          <div className="text-[10px] text-slate-400">ID: {p.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category & Platform */}
                    <td className="p-4">
                      <span className="font-bold text-slate-200 uppercase">{p.platform}</span>
                      <span className="text-[10px] text-slate-400 block capitalize">{p.category} ({p.type})</span>
                    </td>

                    {/* Price */}
                    <td className="p-4 font-bold text-cyan-400">
                      {formatPrice(p.price)}
                      {p.oldPrice && (
                        <span className="text-[10px] text-slate-500 line-through block">
                          {formatPrice(p.oldPrice)}
                        </span>
                      )}
                    </td>

                    {/* Editable Stock */}
                    <td className="p-4">
                      <input
                        type="number"
                        defaultValue={p.stock}
                        onBlur={(e) => handleUpdateStock(p.id, e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-bold text-slate-100 focus:border-cyan-500"
                      />
                    </td>

                    {/* Toggle Flags */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFlag(p.id, 'isFeatured', p.isFeatured)}
                          title="Featured (Top Sales)"
                          className={`p-1 rounded-md transition-colors ${
                            p.isFeatured ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-600 hover:text-slate-300'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleFlag(p.id, 'isTrending', p.isTrending)}
                          title="Trending"
                          className={`p-1 rounded-md transition-colors ${
                            p.isTrending ? 'bg-purple-600 text-white' : 'bg-slate-950 text-slate-600 hover:text-slate-300'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => toggleFlag(p.id, 'isFlashDeal', p.isFlashDeal)}
                          title="Flash Deal"
                          className={`p-1 rounded-md transition-colors ${
                            p.isFlashDeal ? 'bg-red-600 text-white' : 'bg-slate-950 text-slate-600 hover:text-slate-300'
                          }`}
                        >
                          <Flame className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Edit & Delete */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-red-400 transition-colors"
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
      )}

      {/* TAB CONTENT: ORDERS LOG TABLE */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No orders registered yet. New customer orders will appear here automatically.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Selected Payment Method</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((o) => (
                    <tr key={o.orderId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400">{o.orderId}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-100">{o.customerName}</div>
                        <div className="text-[10px] text-slate-400">{o.phoneNumber} • {o.city}</div>
                      </td>
                      <td className="p-4 uppercase font-bold text-cyan-300">
                        {o.paymentMethod}
                      </td>
                      <td className="p-4 font-black text-emerald-400">
                        {formatPrice(o.totalAmount)}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(o)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5 text-cyan-400" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ORDER DETAILS MODAL */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-slate-100">
                Order Info: <span className="text-cyan-400 font-mono">{selectedOrderDetails.orderId}</span>
              </h3>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block">Customer Name:</span>
                  <strong className="text-slate-200">{selectedOrderDetails.customerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone / WhatsApp:</span>
                  <strong className="text-slate-200">{selectedOrderDetails.phoneNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">City:</span>
                  <strong className="text-slate-200">{selectedOrderDetails.city}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Payment Method:</span>
                  <strong className="text-cyan-400 uppercase">{selectedOrderDetails.paymentMethod}</strong>
                </div>
              </div>

              {selectedOrderDetails.orderNote && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Order Note / Player ID:</span>
                  <p className="text-slate-200 mt-1">{selectedOrderDetails.orderNote}</p>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-300 block">Purchased Items:</span>
                {selectedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-slate-950/50">
                    <span>{item.name} ({item.packageName}) x{item.quantity}</span>
                    <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm font-extrabold">
                <span className="text-slate-200">Total Charged:</span>
                <span className="text-emerald-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-slate-200"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
