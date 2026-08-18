import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { AdminProductForm } from '../components/AdminProductForm';
import { ProductImage } from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  Package,
  ShoppingBag,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Search,
  Star,
  Check,
  XCircle,
  Eye,
  Sliders,
  Sparkles
} from 'lucide-react';

export function Admin({
  products,
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  toggleFlag,
  resetToDefault,
  onLogout,
}) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'orders'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Load saved orders from localStorage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      setOrders(savedOrders);
    } catch (e) {
      console.error('Failed to parse orders from localStorage', e);
    }
  }, []);

  const handleLogout = () => {
    onLogout();
    navigate('/admin-login');
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.platform.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] font-black uppercase">
              Admin Portal
            </span>
            <span className="text-xs text-slate-400">Authenticated: dano.js</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={resetToDefault}
            className="px-3 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            title="Reset catalog to default preset products"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reset Products</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Analytics Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Catalog Products"
          value={totalProducts}
          subtext="Active digital items"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders Placed"
          value={totalOrders}
          subtext="Manual orders history"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Total Store Revenue"
          value={formatPrice(totalRevenue)}
          subtext="Processed IQD volume"
          icon={DollarSign}
          color="purple"
        />
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => {
            setActiveTab('products');
            setEditingProduct(null);
            setIsAddingNew(false);
          }}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'products'
              ? 'text-cyan-400 border-cyan-400'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-sm font-extrabold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'text-cyan-400 border-cyan-400'
              : 'text-slate-400 border-transparent hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({orders.length})</span>
        </button>
      </div>

      {/* Products Tab View */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          {/* Add / Edit Form Modal or Section */}
          {(isAddingNew || editingProduct) && (
            <AdminProductForm
              productToEdit={editingProduct}
              onSave={(savedProduct) => {
                if (editingProduct) {
                  updateProduct(editingProduct.id, savedProduct);
                } else {
                  addProduct(savedProduct);
                }
                setEditingProduct(null);
                setIsAddingNew(false);
              }}
              onCancel={() => {
                setEditingProduct(null);
                setIsAddingNew(false);
              }}
            />
          )}

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Filter products..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-slate-950 text-white rounded-xl pl-9 pr-4 py-2 text-xs border border-slate-800 focus:outline-none focus:border-cyan-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            </div>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsAddingNew(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 uppercase text-[10px] font-extrabold tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Platform</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Flags (Featured / Flash / Trend / Top)</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800 bg-slate-950">
                        <ProductImage
                          image={product.image}
                          name={product.name}
                          category={product.category}
                          platform={product.platform}
                          className="h-10"
                        />
                      </div>
                      <div>
                        <p className="line-clamp-1">{product.name}</p>
                        <span className="text-[10px] text-slate-400 font-normal">
                          ID: {product.id}
                        </span>
                      </div>
                    </td>

                    <td className="p-3.5 capitalize font-medium text-slate-300">
                      {product.category}
                    </td>

                    <td className="p-3.5 font-medium text-cyan-400">
                      {product.platform}
                    </td>

                    <td className="p-3.5 font-extrabold text-white">
                      {formatPrice(product.price)}
                    </td>

                    <td className="p-3.5">
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => updateStock(product.id, e.target.value)}
                        className="w-16 bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-white font-bold"
                      />
                    </td>

                    {/* Flags toggles */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => toggleFlag(product.id, 'isFeatured')}
                          className={`px-2 py-0.5 text-[10px] rounded font-bold border transition-all ${
                            product.isFeatured
                              ? 'bg-cyan-950 text-cyan-400 border-cyan-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => toggleFlag(product.id, 'isFlashDeal')}
                          className={`px-2 py-0.5 text-[10px] rounded font-bold border transition-all ${
                            product.isFlashDeal
                              ? 'bg-purple-950 text-purple-400 border-purple-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                        >
                          Flash
                        </button>
                        <button
                          onClick={() => toggleFlag(product.id, 'isTrending')}
                          className={`px-2 py-0.5 text-[10px] rounded font-bold border transition-all ${
                            product.isTrending
                              ? 'bg-blue-950 text-blue-400 border-blue-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                        >
                          Trend
                        </button>
                        <button
                          onClick={() => toggleFlag(product.id, 'isTopRated')}
                          className={`px-2 py-0.5 text-[10px] rounded font-bold border transition-all ${
                            product.isTopRated
                              ? 'bg-amber-950 text-amber-400 border-amber-500/40'
                              : 'bg-slate-950 text-slate-600 border-slate-800'
                          }`}
                        >
                          Top
                        </button>
                      </div>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setIsAddingNew(false);
                            setEditingProduct(product);
                          }}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
                          title="Delete"
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

      {/* Orders Tab View */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto shadow-xl">
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="font-bold text-white">No customer orders placed yet.</p>
                <p className="text-xs text-slate-500">
                  New orders submitted via Checkout will appear here.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 uppercase text-[10px] font-extrabold tracking-wider text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer Name</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">City</th>
                    <th className="p-3.5">Selected Payment Method</th>
                    <th className="p-3.5">Total IQD</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {orders.map((order) => {
                    const paymentInfo = PAYMENT_METHODS.find(
                      (p) => p.id === order.paymentMethod
                    );
                    return (
                      <tr key={order.orderId} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-cyan-400">
                          {order.orderId}
                        </td>
                        <td className="p-3.5 font-bold text-white">{order.customerName}</td>
                        <td className="p-3.5 text-slate-300">{order.customerPhone}</td>
                        <td className="p-3.5 text-slate-300">{order.customerCity}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-slate-950 border border-cyan-500/30 text-cyan-300 rounded font-semibold text-[11px]">
                            {paymentInfo ? paymentInfo.name : order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3.5 font-black text-white">
                          {formatPrice(order.totalAmount)}
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedOrderDetails(order)}
                            className="p-1.5 text-cyan-400 hover:bg-slate-800 rounded-lg text-xs font-bold flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Modal for viewing order items */}
          {selectedOrderDetails && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full text-white space-y-4 shadow-2xl">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <h3 className="font-bold text-lg text-cyan-400">
                    Order Details #{selectedOrderDetails.orderId}
                  </h3>
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-xs space-y-1">
                  <p><strong>Customer:</strong> {selectedOrderDetails.customerName}</p>
                  <p><strong>Phone:</strong> {selectedOrderDetails.customerPhone}</p>
                  <p><strong>City:</strong> {selectedOrderDetails.customerCity}</p>
                  <p><strong>Note:</strong> {selectedOrderDetails.orderNote || 'None'}</p>
                  <p>
                    <strong>Payment Method:</strong>{' '}
                    <span className="text-cyan-400 font-bold">
                      {selectedOrderDetails.paymentMethod}
                    </span>
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Ordered Items</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedOrderDetails.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between"
                      >
                        <div>
                          <p className="font-bold">{item.productName}</p>
                          <p className="text-[10px] text-slate-400">{item.packageName} x {item.quantity}</p>
                        </div>
                        <span className="font-bold text-cyan-400">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-300">Total Price:</span>
                  <span className="font-black text-cyan-400 text-base">
                    {formatPrice(selectedOrderDetails.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
