import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  LogOut,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldCheck,
  Star,
  Flame,
  Zap,
  Tag
} from 'lucide-react';

export const Admin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock } = useProducts();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  // Stats
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const getPaymentName = (methodId) => {
    const found = PAYMENT_METHODS.find((p) => p.id === methodId);
    return found ? found.name : methodId;
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-xs font-bold uppercase">
              Admin Portal
            </span>
            <span className="text-slate-400 text-xs">Logged in as dano.js</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading mt-1">
            Dano Store Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-950/50 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Active items in catalog"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Processed orders"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Gross transaction total"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tab Selectors & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Manage Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            View Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Tab Content: Products */}
      {activeTab === 'products' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category / Platform</th>
                  <th className="p-4">Starting Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Badges & Tags</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300 font-medium">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex-shrink-0">
                          <ProductImage
                            src={p.image}
                            alt={p.name}
                            name={p.name}
                            category={p.category}
                            platform={p.platform}
                            type={p.type}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-100 text-sm">{p.name}</div>
                          <div className="text-[11px] text-slate-400">{p.type} • {p.soldCount || 0} sold</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold uppercase">
                          {p.platform}
                        </span>
                        <div className="text-slate-400 text-[11px] capitalize">{p.category}</div>
                      </div>
                    </td>

                    <td className="p-4 font-bold text-cyan-400 text-sm">
                      {formatPrice(p.price)}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => updateStock(p.id, e.target.value)}
                          className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100 text-xs font-bold"
                        />
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.stock > 0 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {p.stock > 0 ? 'In Stock' : 'Out'}
                        </span>
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.isFeatured && <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-500/30 text-[9px] font-bold">Featured</span>}
                        {p.isTrending && <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-500/30 text-[9px] font-bold">Trending</span>}
                        {p.isFlashDeal && <span className="px-1.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-500/30 text-[9px] font-bold">Flash Deal</span>}
                        {p.isTopRated && <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold">Top Rated</span>}
                      </div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(p)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(p.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400"
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

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-2">
              <ShoppingBag className="w-8 h-8 mx-auto text-slate-500" />
              <p className="font-bold text-sm">No orders recorded yet</p>
              <p className="text-xs">Orders placed by customers will appear here automatically.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone / City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  {orders.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-mono font-bold text-cyan-400">
                        {ord.orderId}
                      </td>
                      <td className="p-4 font-bold text-slate-100">
                        {ord.customerName}
                      </td>
                      <td className="p-4">
                        <div className="text-slate-300 font-mono">{ord.phone}</div>
                        <div className="text-slate-500 text-[11px]">{ord.city}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-purple-300 font-bold text-[11px]">
                          {getPaymentName(ord.paymentMethod)}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-cyan-400 text-sm">
                        {formatPrice(ord.totalAmount)}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px]">
                        {new Date(ord.createdAt).toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setViewingOrder(ord)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
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

      {/* Edit/Add Form Modal */}
      {isFormOpen && (
        <AdminProductForm
          initialData={editingProduct}
          onSubmit={handleSaveProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100 font-heading">
                Order Details ({viewingOrder.orderId})
              </h3>
              <button
                onClick={() => setViewingOrder(null)}
                className="p-1 text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between"><span className="text-slate-400">Customer:</span> <span className="font-bold">{viewingOrder.customerName}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Phone:</span> <span className="font-mono">{viewingOrder.phone}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">City:</span> <span>{viewingOrder.city}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Payment Method:</span> <span className="font-bold text-cyan-400">{getPaymentName(viewingOrder.paymentMethod)}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Order Note / Game ID:</span> <span className="italic">{viewingOrder.orderNote}</span></div>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <h4 className="font-bold text-xs uppercase text-slate-400">Ordered Items:</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {viewingOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div>
                      <div className="font-bold text-slate-200">{it.name}</div>
                      <div className="text-[11px] text-cyan-400">{it.selectedPackageName} × {it.quantity}</div>
                    </div>
                    <div className="font-bold text-slate-100">{formatPrice(it.unitPrice * it.quantity)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              <span className="font-bold text-slate-200 text-xs">Total Amount</span>
              <span className="text-lg font-extrabold text-cyan-400">{formatPrice(viewingOrder.totalAmount)}</span>
            </div>

            <button
              onClick={() => setViewingOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
