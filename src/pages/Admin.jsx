import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  LogOut,
  RotateCcw,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Check
} from 'lucide-react';

export default function Admin() {
  const { logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProducts();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [stockEditId, setStockEditId] = useState(null);
  const [tempStockValue, setTempStockValue] = useState(0);

  // Load orders from localStorage (dano_orders)
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('dano_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (e) {
      console.error('Failed to parse orders:', e);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleSaveProduct = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSaveStock = (id) => {
    updateStock(id, tempStockValue);
    setStockEditId(null);
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
  const activeFlashDeals = products.filter((p) => p.isFlashDeal).length;

  const filteredProducts = products.filter((p) => {
    if (!productSearch) return true;
    const q = productSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Rajdhani',sans-serif]">
              DANO STORE CONTROL PANEL
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage product catalog, inventory stock levels, and customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog back to initial default products?')) {
                resetToDefault();
              }
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
            title="Reset catalog"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog inventory items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Submitted manual orders"
          icon={ShoppingBag}
          color="emerald"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Gross order volume"
          icon={DollarSign}
          color="purple"
        />
        <StatCard
          title="Active Flash Deals"
          value={activeFlashDeals}
          subtitle="Discounted spotlight items"
          icon={CheckCircle}
          color="blue"
        />
      </div>

      {/* Product Form Modal / Section */}
      {isFormOpen && (
        <div className="mb-8">
          <AdminProductForm
            initialProduct={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Products ({totalProducts})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Orders ({totalOrders})
          </button>
        </div>

        {activeTab === 'products' && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-950 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search catalog products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#0c1222] border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <span className="text-xs text-slate-400">
              Showing {filteredProducts.length} items
            </span>
          </div>

          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0c1222] text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Product</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Platform</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5">Badges</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredProducts.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                            <ProductImage
                              image={prod.image}
                              name={prod.name}
                              category={prod.category}
                              platform={prod.platform}
                              type={prod.type}
                              height="h-full"
                            />
                          </div>
                          <div>
                            <p className="font-bold text-white line-clamp-1">{prod.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {prod.packages?.length || 1} pkg | ID: {prod.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 font-medium">{prod.category}</td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 font-medium">
                          {prod.platform}
                        </span>
                      </td>

                      <td className="p-3.5 font-bold text-cyan-400">
                        {formatPrice(prod.price)}
                      </td>

                      {/* Stock with quick-edit */}
                      <td className="p-3.5">
                        {stockEditId === prod.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={tempStockValue}
                              onChange={(e) => setTempStockValue(e.target.value)}
                              className="w-16 bg-slate-900 border border-cyan-500 rounded px-1.5 py-0.5 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSaveStock(prod.id)}
                              className="p-1 bg-cyan-500 text-slate-950 rounded hover:bg-cyan-400"
                            >
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setStockEditId(prod.id);
                              setTempStockValue(prod.stock);
                            }}
                            className={`px-2 py-0.5 rounded font-bold cursor-pointer hover:underline ${
                              prod.stock <= 0
                                ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                                : 'bg-slate-800 text-slate-200'
                            }`}
                            title="Click to edit stock"
                          >
                            {prod.stock} units
                          </button>
                        )}
                      </td>

                      {/* Section Placement Flags */}
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {prod.isFeatured && (
                            <span className="text-[9px] bg-purple-950 text-purple-300 border border-purple-800/50 px-1.5 rounded">
                              Featured
                            </span>
                          )}
                          {prod.isFlashDeal && (
                            <span className="text-[9px] bg-red-950 text-red-300 border border-red-800/50 px-1.5 rounded">
                              Flash
                            </span>
                          )}
                          {prod.isTrending && (
                            <span className="text-[9px] bg-cyan-950 text-cyan-300 border border-cyan-800/50 px-1.5 rounded">
                              Trending
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(prod);
                            setIsFormOpen(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-red-400 transition-colors"
                          title="Delete Product"
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

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#090e1c] border border-slate-800 rounded-2xl">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No Orders Received Yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                When customers complete the manual checkout process, their orders will appear here.
              </p>
            </div>
          ) : (
            <div className="bg-[#090e1c] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0c1222] text-slate-400 uppercase font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer</th>
                      <th className="p-3.5">Phone & City</th>
                      <th className="p-3.5">Payment Method</th>
                      <th className="p-3.5">Items</th>
                      <th className="p-3.5">Total Amount</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {orders.map((order, idx) => (
                      <tr key={order.orderId || idx} className="hover:bg-slate-800/30 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">
                          {order.orderId}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          {order.customerName}
                          {order.note && (
                            <span className="block text-[10px] text-slate-400 italic font-normal">
                              Note: {order.note}
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          <div>{order.phone}</div>
                          <div className="text-[10px] text-slate-400">{order.city}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300 border border-slate-700">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="max-w-xs space-y-0.5">
                            {order.items?.map((it, i) => (
                              <p key={i} className="truncate">
                                • {it.name} ({it.selectedPackage?.name || 'Std'} × {it.quantity})
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {formatPrice(order.totalAmount)}
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800/40">
                            {order.status || 'Pending'}
                          </span>
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
    </div>
  );
}
