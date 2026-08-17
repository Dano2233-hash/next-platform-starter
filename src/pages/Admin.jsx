import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  LogOut,
  Eye,
  X,
  RotateCcw,
} from 'lucide-react';

export default function Admin({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onResetProducts,
  onLogout,
}) {
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, formData);
      setEditingProduct(null);
    } else {
      onAddProduct(formData);
      setShowAddForm(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Top Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-blue-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Dano Store Management Panel</h1>
          <p className="text-xs text-slate-400">Manage catalog products, stock levels, and customer orders</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetProducts}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5"
            title="Reset Catalog to Defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900/80 text-red-300 text-xs font-bold border border-red-500/40 transition flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Overview Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Products"
          value={totalProducts}
          icon={Package}
          color="cyan"
          subtext="Active items in store catalog"
        />
        <StatCard
          label="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          subtext="Customer orders placed"
        />
        <StatCard
          label="Total Store Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          subtext="IQD revenue from orders"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('products');
            setSelectedOrder(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" /> Products ({totalProducts})
        </button>

        <button
          onClick={() => {
            setActiveTab('orders');
            setShowAddForm(false);
            setEditingProduct(null);
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders ({totalOrders})
        </button>
      </div>

      {/* Products Management Tab */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add Form or Edit Form Overlay */}
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

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search products by title, category, or platform..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#090d16] text-slate-100 placeholder-slate-500 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setShowAddForm(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          {/* Table */}
          <div className="bg-[#090d16] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Starting Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <span>{prod.name}</span>
                        {prod.isFlashDeal && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950 text-red-400 font-bold border border-red-500/30">
                            Flash
                          </span>
                        )}
                      </td>
                      <td className="p-4 uppercase text-[11px] text-cyan-400 font-semibold">{prod.category}</td>
                      <td className="p-4">{prod.platform}</td>
                      <td className="p-4">{prod.type}</td>
                      <td className="p-4 font-extrabold text-cyan-300">{formatPrice(prod.price)}</td>
                      <td className="p-4">
                        <input
                          type="number"
                          value={prod.stock}
                          onChange={(e) => onUpdateStock(prod.id, e.target.value)}
                          className="w-16 bg-slate-950 text-slate-200 text-xs font-mono font-bold px-2 py-1 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                        />
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setShowAddForm(false);
                            setEditingProduct(prod);
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 transition"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/40 text-red-400 border border-red-500/30 transition"
                          title="Delete"
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
        </div>
      )}

      {/* Orders Management Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#090d16] rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
              <h3 className="text-base font-bold text-white">No Customer Orders Yet</h3>
              <p className="text-xs text-slate-500">
                Orders created via checkout will appear here with selected payment methods.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Order List */}
              <div className={selectedOrder ? 'lg:col-span-7' : 'lg:col-span-12'}>
                <div className="bg-[#090d16] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Phone</th>
                          <th className="p-4">Payment Method</th>
                          <th className="p-4">Total</th>
                          <th className="p-4 text-right">View</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 text-slate-200">
                        {orders.map((ord) => {
                          const pInfo = PAYMENT_METHODS.find((m) => m.id === ord.paymentMethod);
                          const isSel = selectedOrder?.id === ord.id;
                          return (
                            <tr
                              key={ord.id}
                              className={`hover:bg-slate-900/50 transition cursor-pointer ${
                                isSel ? 'bg-slate-900/90 border-l-2 border-cyan-400' : ''
                              }`}
                              onClick={() => setSelectedOrder(ord)}
                            >
                              <td className="p-4 font-mono font-bold text-cyan-400">{ord.id}</td>
                              <td className="p-4 font-bold text-white">{ord.customerName}</td>
                              <td className="p-4">{ord.phone}</td>
                              <td className="p-4">
                                <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-semibold text-slate-300">
                                  {pInfo?.name || ord.paymentMethod}
                                </span>
                              </td>
                              <td className="p-4 font-extrabold text-cyan-300">{formatPrice(ord.totalAmount)}</td>
                              <td className="p-4 text-right">
                                <button className="p-1.5 rounded-lg bg-slate-800 text-cyan-400">
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Order Detail View Drawer */}
              {selectedOrder && (
                <div className="lg:col-span-5 bg-[#090d16] p-6 rounded-2xl border border-slate-800 space-y-4 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="font-extrabold text-white text-base">Order #{selectedOrder.id}</h3>
                      <span className="text-[11px] text-slate-400">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Customer Name</span>
                      <span className="font-bold text-white text-sm">{selectedOrder.customerName}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Phone</span>
                        <span className="font-mono text-cyan-300 font-bold">{selectedOrder.phone}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">City</span>
                        <span className="font-bold text-white">{selectedOrder.city}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Selected Payment Method</span>
                      <span className="font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-1 rounded inline-block mt-0.5">
                        {PAYMENT_METHODS.find((m) => m.id === selectedOrder.paymentMethod)?.name || selectedOrder.paymentMethod}
                      </span>
                    </div>

                    {selectedOrder.orderNote && (
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Player ID / Order Note</span>
                        <p className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-cyan-300">
                          {selectedOrder.orderNote}
                        </p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-800 space-y-2">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Order Items:</span>
                      {selectedOrder.items?.map((item, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                          <div>
                            <p className="font-bold text-white">{item.productName}</p>
                            <p className="text-[10px] text-slate-400">{item.packageName} × {item.quantity}</p>
                          </div>
                          <span className="font-bold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between text-base font-extrabold text-white">
                      <span>Total Pay</span>
                      <span className="text-cyan-400 text-lg">{formatPrice(selectedOrder.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
