import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  Shield,
  LogOut,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  Search
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const { orders } = useCart();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Top Admin Bar */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Dano Store Control Panel</h1>
            <p className="text-xs text-slate-400">Authenticated as Admin (dano.js)</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Products
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
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
          changeText="Catalog size"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          color="purple"
          changeText="Completed checkouts"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
          changeText="Local IQD earnings"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => { setActiveTab('products'); setEditingProduct(null); setIsAdding(false); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'products'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Manage Catalog ({totalProducts})
        </button>
        <button
          onClick={() => { setActiveTab('orders'); setEditingProduct(null); setIsAdding(false); }}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-cyan-400 text-cyan-400'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Customer Orders ({totalOrders})
        </button>
      </div>

      {/* Catalog Tab Content */}
      {activeTab === 'products' && (
        <div className="space-y-6">

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl pl-9 pr-4 py-2 text-xs"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            </div>

            {!isAdding && !editingProduct && (
              <button
                onClick={() => setIsAdding(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            )}
          </div>

          {/* Product Form Modal/Card */}
          {(isAdding || editingProduct) && (
            <AdminProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={() => { setIsAdding(false); setEditingProduct(null); }}
            />
          )}

          {/* Products Table */}
          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Platform</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/50">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                          <ProductImage
                            src={p.image}
                            alt={p.name}
                            category={p.category}
                            platform={p.platform}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-white line-clamp-1">{p.name}</span>
                      </td>
                      <td className="px-4 py-3 capitalize">{p.category}</td>
                      <td className="px-4 py-3 font-semibold text-cyan-400">{p.platform}</td>
                      <td className="px-4 py-3 font-bold text-cyan-300">{formatPrice(p.price)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          p.stock > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => { setEditingProduct(p); setIsAdding(false); }}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900 rounded-lg border border-slate-800"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-900 rounded-lg border border-slate-800"
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

      {/* Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
              No orders have been placed yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <span className="text-xs font-mono font-bold text-cyan-400">#{order.orderId}</span>
                      <h4 className="font-extrabold text-white text-sm">{order.customerName} ({order.phone})</h4>
                      <span className="text-[11px] text-slate-400">{order.city} • {new Date(order.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Payment Method</span>
                      <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs rounded-lg inline-block mt-0.5">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-2">
                    {order.items && order.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                        <span className="font-bold text-white">{item.name} x{item.quantity}</span>
                        <span className="text-cyan-300 font-extrabold">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400">Total Amount:</span>
                    <span className="text-base font-black text-cyan-300">{formatPrice(order.totalAmount)}</span>
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
