import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Package,
  ShoppingBag,
  DollarSign,
  Edit,
  Trash2,
  X,
  RefreshCw,
  Eye,
} from 'lucide-react';

export default function Admin({
  products = [],
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onLogout,
  onResetProducts,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to load orders from Local Storage:', e);
    }
  }, []);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  const handleLogout = () => {
    localStorage.removeItem('dano_admin_auth');
    if (onLogout) onLogout();
    navigate('/admin-login');
  };

  const handleCreateProduct = (productData) => {
    onAddProduct(productData);
    setShowAddForm(false);
  };

  const handleSaveEditedProduct = (productData) => {
    if (editingProduct) {
      onUpdateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    }
  };

  const handleToggleStock = (product) => {
    const newStock = product.stock > 0 ? 0 : 100;
    onUpdateProduct(product.id, { stock: newStock });
  };

  const handleToggleFlag = (product, flagName) => {
    onUpdateProduct(product.id, { [flagName]: !product[flagName] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-cyan-400" />
            <span>Admin Control Panel</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage store catalog, stock availability, homepage features, and customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onResetProducts}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white cursor-pointer"
            title="Reset Catalog to Default Demo Products"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-300 font-bold text-xs hover:bg-rose-900 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} color="cyan" />
        <StatCard title="Total Orders" value={totalOrders} icon={ShoppingBag} color="purple" />
        <StatCard title="Total Products" value={totalProducts} icon={Package} color="emerald" />
      </div>

      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('products');
            setShowAddForm(false);
            setEditingProduct(null);
          }}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
              : 'bg-[#090e18] text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          Products Management ({totalProducts})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-950/40'
              : 'bg-[#090e18] text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          Orders Viewer ({totalOrders})
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="space-y-6">
          {!showAddForm && !editingProduct && (
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white">Product Catalog</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-md shadow-cyan-950/50 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add Product</span>
              </button>
            </div>
          )}

          {showAddForm && (
            <AdminProductForm
              onSubmit={handleCreateProduct}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          {editingProduct && (
            <AdminProductForm
              initialData={editingProduct}
              onSubmit={handleSaveEditedProduct}
              onCancel={() => setEditingProduct(null)}
            />
          )}

          {!showAddForm && !editingProduct && (
            <div className="bg-[#0b101c] rounded-2xl border border-slate-800 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b13] text-slate-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Price (IQD)</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Featured Badges</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {products.map((product) => {
                    const isInStock = product.stock > 0;
                    return (
                      <tr key={product.id} className="hover:bg-slate-900/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <ProductImage product={product} className="w-10 h-10 rounded-lg shrink-0" />
                            <div className="min-w-0">
                              <span className="font-bold text-white block truncate">{product.name}</span>
                              <span className="text-[11px] text-slate-500">{product.type}</span>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-semibold text-slate-300">{product.category}</td>

                        <td className="p-4 font-semibold text-cyan-400">{product.platform}</td>

                        <td className="p-4 font-black text-white">{formatPrice(product.price)}</td>

                        <td className="p-4">
                          <button
                            onClick={() => handleToggleStock(product)}
                            className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer ${
                              isInStock
                                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                                : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            }`}
                          >
                            {isInStock ? `In Stock (${product.stock})` : 'Out of Stock'}
                          </button>
                        </td>

                        <td className="p-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleToggleFlag(product, 'isFeatured')}
                              title="Toggle Featured"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer ${
                                product.isFeatured
                                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                                  : 'bg-slate-900 text-slate-600 border-slate-800'
                              }`}
                            >
                              Feat
                            </button>
                            <button
                              onClick={() => handleToggleFlag(product, 'isTrending')}
                              title="Toggle Trending"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer ${
                                product.isTrending
                                  ? 'bg-purple-500/20 text-purple-300 border-purple-500'
                                  : 'bg-slate-900 text-slate-600 border-slate-800'
                              }`}
                            >
                              Trend
                            </button>
                            <button
                              onClick={() => handleToggleFlag(product, 'isFlashDeal')}
                              title="Toggle Flash Deal"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer ${
                                product.isFlashDeal
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                                  : 'bg-slate-900 text-slate-600 border-slate-800'
                              }`}
                            >
                              Flash
                            </button>
                            <button
                              onClick={() => handleToggleFlag(product, 'isTopRated')}
                              title="Toggle Top Rated"
                              className={`p-1.5 rounded-lg border text-[10px] font-bold cursor-pointer ${
                                product.isTopRated
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                                  : 'bg-slate-900 text-slate-600 border-slate-800'
                              }`}
                            >
                              Top
                            </button>
                          </div>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete ${product.name}?`)) {
                                  onDeleteProduct(product.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900 cursor-pointer"
                              title="Delete"
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
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Customer Orders ({totalOrders})</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-[#0b101c] rounded-2xl border border-slate-800 text-slate-400">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No orders placed yet</p>
              <p className="text-xs text-slate-500 mt-1">
                When customers place an order, it will show up here with selected payment method details.
              </p>
            </div>
          ) : (
            <div className="bg-[#0b101c] rounded-2xl border border-slate-800 overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#070b13] text-slate-400 font-extrabold uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Phone Number</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-4 font-black text-cyan-400">{order.orderId}</td>
                      <td className="p-4 font-bold text-white">{order.customerName}</td>
                      <td className="p-4 text-slate-300">{order.phoneNumber}</td>
                      <td className="p-4 text-slate-300">{order.city}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-extrabold text-[11px]">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="p-4 font-extrabold text-white">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="p-4 text-slate-500 text-[11px]">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="p-2 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedOrderDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <div className="bg-[#0b101c] border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4 relative">
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-white">Order Details #{selectedOrderDetails.orderId}</h3>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 block">Name:</span>
                    <strong className="text-white">{selectedOrderDetails.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Phone:</span>
                    <strong className="text-white">{selectedOrderDetails.phoneNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">City:</span>
                    <strong className="text-white">{selectedOrderDetails.city}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Payment Method:</span>
                    <strong className="text-cyan-400">{selectedOrderDetails.paymentMethod}</strong>
                  </div>
                </div>

                {selectedOrderDetails.orderNote && (
                  <div className="text-xs p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 block font-bold mb-1">Order Note / Game ID:</span>
                    <p className="text-slate-200">{selectedOrderDetails.orderNote}</p>
                  </div>
                )}

                <div className="space-y-2 text-xs">
                  <span className="font-bold text-slate-300 block">Ordered Items:</span>
                  {selectedOrderDetails.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between p-2 bg-[#070b13] rounded-lg border border-slate-800">
                      <span>{item.name} ({item.packageName}) x{item.quantity}</span>
                      <span className="font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-sm font-bold">
                  <span>Total Amount</span>
                  <span className="text-cyan-400">{formatPrice(selectedOrderDetails.totalAmount)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
