import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard.jsx';
import AdminProductForm from '../components/AdminProductForm.jsx';
import ProductImage from '../components/ProductImage.jsx';
import { formatPrice } from '../utils/formatPrice.js';
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
  RefreshCw,
  Eye,
  User,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';

export default function Admin({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  resetToDefault,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders'
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(storedOrders);
    } catch (e) {
      console.error('Failed to load orders:', e);
    }
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    setIsEditing(false);
    setEditingProduct(null);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/80 via-slate-900 to-blue-950/80 border border-slate-800 p-6 rounded-3xl shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Package className="w-7 h-7 text-purple-400" /> Dano Store Admin Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage product catalog, stock counts, and view customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('Reset catalog to default products?')) {
                resetToDefault();
              }
            }}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Data
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded-xl text-xs font-bold border border-red-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Products" value={products.length} icon={Package} color="blue" />
        <StatCard title="Total Orders" value={orders.length} icon={ShoppingBag} color="purple" />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'products'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'orders'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-slate-900/80 text-slate-400 hover:text-white'
            }`}
          >
            View Customer Orders ({orders.length})
          </button>
        </div>

        {activeTab === 'products' && !isEditing && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsEditing(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        )}
      </div>

      {/* Edit / Add Product Form */}
      {isEditing ? (
        <AdminProductForm
          initialData={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setIsEditing(false);
            setEditingProduct(null);
          }}
        />
      ) : activeTab === 'products' ? (
        /* PRODUCTS TAB */
        <div className="space-y-4">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Filter products by name, category, platform..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 border border-slate-800 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
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
                <tbody className="divide-y divide-slate-800/80">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5 font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                          <ProductImage
                            src={product.image}
                            alt={product.name}
                            category={product.category}
                            platform={product.platform}
                            className="h-10"
                          />
                        </div>
                        <div>
                          <p className="line-clamp-1">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">
                            {product.packages?.length || 0} packages
                          </p>
                        </div>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-300">{product.category}</td>
                      <td className="p-3.5">
                        <span className="bg-slate-900 text-cyan-400 border border-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {product.platform}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-blue-400">
                        {formatPrice(product.price)}
                      </td>
                      <td className="p-3.5">
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => updateStock(product.id, e.target.value)}
                          className="w-16 bg-slate-950 border border-slate-800 text-center text-xs font-bold rounded py-1 text-white focus:outline-none focus:border-purple-500"
                        />
                      </td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1 text-[9px] font-bold">
                          {product.isFeatured && (
                            <span className="bg-blue-950 text-blue-300 px-1.5 py-0.5 rounded">Featured</span>
                          )}
                          {product.isTrending && (
                            <span className="bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded">Trending</span>
                          )}
                          {product.isFlashDeal && (
                            <span className="bg-red-950 text-red-300 px-1.5 py-0.5 rounded">Flash</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
                            title="Edit Product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 bg-slate-900 rounded-lg border border-slate-800"
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
        </div>
      ) : (
        /* ORDERS TAB */
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#090e1c] border border-slate-800 rounded-2xl py-12 px-4 text-center">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-2" />
              <h3 className="text-base font-bold text-white">No Orders Received Yet</h3>
              <p className="text-xs text-slate-400 mt-1">
                Orders created by customers will appear here with full customer contact & payment info.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-cyan-400">{order.orderId}</span>
                      <span className="text-xs text-slate-400 ml-3">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase">
                        {order.status || 'Pending Payment'}
                      </span>
                      <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Customer Info */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <h4 className="font-bold text-slate-200 flex items-center gap-1 text-xs">
                        <User className="w-3.5 h-3.5 text-cyan-400" /> Customer Details
                      </h4>
                      <p><strong className="text-slate-400">Name:</strong> {order.customer?.name}</p>
                      <p><strong className="text-slate-400">Phone:</strong> {order.customer?.phone}</p>
                      <p><strong className="text-slate-400">City:</strong> {order.customer?.city}</p>
                      <p className="flex items-center gap-1">
                        <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                        <strong className="text-slate-400">Selected Payment Method:</strong>{' '}
                        <span className="text-purple-300 font-extrabold uppercase">
                          {order.customer?.paymentMethod}
                        </span>
                      </p>
                      {order.customer?.note && (
                        <p><strong className="text-slate-400">Note:</strong> {order.customer?.note}</p>
                      )}
                    </div>

                    {/* Order Items */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <h4 className="font-bold text-slate-200 flex items-center gap-1 text-xs">
                        <ShoppingBag className="w-3.5 h-3.5 text-purple-400" /> Purchased Items ({order.items?.length})
                      </h4>
                      <div className="space-y-1 max-h-28 overflow-y-auto">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-slate-300">
                            <span>
                              {item.quantity}x {item.name} {item.selectedPackage ? `(${item.selectedPackage})` : ''}
                            </span>
                            <span className="font-bold text-cyan-400">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
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
