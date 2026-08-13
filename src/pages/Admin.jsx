import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  RefreshCw,
  CheckCircle,
  Clock
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { categories } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export function Admin({ products, onAddProduct, onEditProduct, onDeleteProduct, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products', 'orders', 'add-product', 'edit-product'
  const [editingProduct, setEditingProduct] = useState(null);

  // Retrieve current orders
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem('dano_orders') || '[]');
  });

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.orderId === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
  };

  const handleProductSubmit = (data) => {
    if (activeTab === 'edit-product') {
      onEditProduct(data);
      setEditingProduct(null);
    } else {
      onAddProduct(data);
    }
    setActiveTab('products');
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab('edit-product');
  };

  // Metrics calculators
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="pb-16 text-left space-y-6">

      {/* Dashboard Top Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#12121e] pb-5">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide text-white">Merchant Admin Portal</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Maintain digital catalog entries & track manual checkout vouchers</p>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/20 transition self-start sm:self-auto"
        >
          <LogOut size={14} />
          <span>Logout Portal</span>
        </button>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard title="Total Store Products" value={totalProducts} icon={Package} color="blue" />
        <StatCard title="Total Manual Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Estimated Revenue (IQD)" value={formatPrice(totalRevenue)} icon={DollarSign} color="cyan" />
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-[#12121e]">
        <button
          onClick={() => { setActiveTab('products'); setEditingProduct(null); }}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === 'products' || activeTab === 'edit-product'
              ? 'border-[#00e5ff] text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Manage Catalog
        </button>
        <button
          onClick={() => { setActiveTab('orders'); setEditingProduct(null); }}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-[#00e5ff] text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          Track Orders ({totalOrders})
        </button>
        <button
          onClick={() => { setActiveTab('add-product'); setEditingProduct(null); }}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1 ${
            activeTab === 'add-product'
              ? 'border-[#00e5ff] text-white'
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          <Plus size={12} />
          <span>New Product</span>
        </button>
      </div>

      {/* Active Tab rendering */}
      {activeTab === 'products' && (
        <div className="rounded-xl border border-[#12121e] bg-[#0c0c14] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-black/40 text-[10px] font-black uppercase text-gray-400 border-b border-[#12121e]">
                <tr>
                  <th className="px-6 py-4">Title / ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Platform / Type</th>
                  <th className="px-6 py-4">Starting Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Rating / Sold</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#12121d]">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                      No products found. Click "New Product" above to create one.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/2 bg-[#0c0c14] transition">
                      <td className="px-6 py-4">
                        <span className="block font-black text-white">{p.name}</span>
                        <span className="block text-[10px] text-gray-500">{p.id}</span>
                      </td>
                      <td className="px-6 py-4 capitalize font-semibold">{p.category}</td>
                      <td className="px-6 py-4 font-semibold text-[#00e5ff]">
                        {p.platform} / {p.type}
                      </td>
                      <td className="px-6 py-4 font-black">
                        {p.packages && p.packages.length > 0
                          ? formatPrice(Math.min(...p.packages.map((pkg) => pkg.price)))
                          : formatPrice(p.price)}
                      </td>
                      <td className="px-6 py-4 font-bold">{p.stock} units</td>
                      <td className="px-6 py-4">
                        <span className="block font-bold">⭐ {p.rating}</span>
                        <span className="block text-[10px] text-gray-500 font-medium">{p.soldCount} trans.</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => startEditProduct(p)}
                            className="rounded bg-blue-500/10 p-1.5 text-blue-400 hover:bg-blue-500/20 transition"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="rounded bg-red-500/10 p-1.5 text-red-500 hover:bg-red-500/20 transition"
                            title="Delete"
                          >
                            <Trash2 size={13} />
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
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#1e1e2d] bg-[#0c0c14] py-16 text-center text-gray-400">
              <ShoppingBag className="mx-auto text-gray-600 mb-3" size={36} />
              <p className="text-sm font-bold">No customer manual checkout records exist yet.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-xl border border-[#12121e] bg-[#0c0c14] p-5 space-y-4 text-xs"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#12121d] pb-3">
                  <div>
                    <span className="text-sm font-black text-white">{order.orderId}</span>
                    <span className="text-[10px] text-gray-500 ml-2">
                      {new Date(order.date).toLocaleString()}
                    </span>
                  </div>

                  {/* Status Indicator switcher */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-bold uppercase text-[9px]">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      className={`rounded px-2.5 py-1 text-[10px] font-black uppercase text-black ${
                        order.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    >
                      <option value="Pending Payment Verification">Pending Verification</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Split layout: customer info & items purchased */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Customer details */}
                  <div className="space-y-1">
                    <span className="block text-[10px] font-black uppercase text-gray-500">Customer Info</span>
                    <p><span className="font-extrabold text-gray-400">Name:</span> <span className="text-white font-medium">{order.customer.name}</span></p>
                    <p><span className="font-extrabold text-gray-400">Phone:</span> <span className="text-white font-medium">{order.customer.phone}</span></p>
                    <p><span className="font-extrabold text-gray-400">City / Region:</span> <span className="text-white font-medium">{order.customer.city}</span></p>
                    <p><span className="font-extrabold text-gray-400">Selected Gateway:</span> <span className="text-[#00e5ff] font-bold">{order.customer.paymentMethod}</span></p>
                    {order.customer.orderNote && (
                      <p><span className="font-extrabold text-gray-400">Delivery ID / Note:</span> <span className="text-gray-300 italic">{order.customer.orderNote}</span></p>
                    )}
                  </div>

                  {/* Items list */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-black uppercase text-gray-500">Purchased Items</span>
                    <div className="space-y-1 bg-black/40 rounded-lg p-3 border border-[#12121d]">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-[11px]">
                          <span className="text-gray-300 font-medium">
                            {item.name} ({item.selectedPackage.name}) x{item.quantity}
                          </span>
                          <span className="font-black text-white">
                            {formatPrice(item.selectedPackage.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                      <div className="border-t border-[#12121e] pt-2 mt-2 flex justify-between items-center text-xs font-black">
                        <span className="uppercase text-gray-400 text-[10px]">Grand Total:</span>
                        <span className="text-[#00e5ff]">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'add-product' && (
        <AdminProductForm
          categories={categories}
          onSubmit={handleProductSubmit}
          onCancel={() => setActiveTab('products')}
        />
      )}

      {activeTab === 'edit-product' && editingProduct && (
        <AdminProductForm
          initialData={editingProduct}
          categories={categories}
          onSubmit={handleProductSubmit}
          onCancel={() => {
            setActiveTab('products');
            setEditingProduct(null);
          }}
        />
      )}

    </div>
  );
}
