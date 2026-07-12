import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Package,
  ShoppingCart,
  DollarSign,
  LogOut,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';
import StatCard from '../components/StatCard';
import AdminProductForm from '../components/AdminProductForm';

const Admin = () => {
  const { products, addProduct, editProduct, deleteProduct, updateStock } = useProducts();
  const { logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
    setOrders(savedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const totalOrders = orders.length;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    window.location.href = '/admin-login';
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updatedOrders);
    localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
  };

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      editProduct(productData);
    } else {
      addProduct(productData);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 border-r border-white/10 hidden lg:flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-extrabold text-accent-cyan">Dano Admin</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">Management Console</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
            { id: 'products', name: 'Manage Products', icon: Package },
            { id: 'orders', name: 'View Orders', icon: ShoppingCart },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                activeTab === item.id
                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:ml-0 overflow-y-auto max-h-screen">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white capitalize">{activeTab}</h2>
            <p className="text-gray-500 text-sm">Welcome back, Administrator</p>
          </div>
          <div className="flex items-center gap-3">
             {activeTab === 'products' && (
               <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowProductForm(true);
                }}
                className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-2.5 px-6 rounded-lg flex items-center gap-2 shadow-lg shadow-accent-blue/20 transition-all"
               >
                 <Plus size={18} /> Add Product
               </button>
             )}
             <button className="lg:hidden text-gray-400 p-2" onClick={handleLogout}>
               <LogOut size={20} />
             </button>
          </div>
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <StatCard title="Total Revenue" value={formatPrice(totalRevenue)} icon={DollarSign} colorClass="bg-green-500/20 text-green-500" />
               <StatCard title="Total Orders" value={totalOrders} icon={ShoppingCart} colorClass="bg-accent-blue/20 text-accent-blue" />
               <StatCard title="Products" value={totalProducts} icon={Package} colorClass="bg-accent-purple/20 text-accent-purple" />
               <StatCard title="Pending" value={orders.filter(o => o.status === 'Pending').length} icon={Clock} colorClass="bg-yellow-500/20 text-yellow-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               {/* Recent Orders */}
               <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-lg">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-accent-cyan text-xs font-bold uppercase hover:underline">View All</button>
                  </div>
                  <div className="space-y-4">
                     {orders.slice(0, 5).map((order) => (
                       <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-accent-cyan font-bold text-xs">
                                #{order.id.split('-').pop()}
                             </div>
                             <div>
                                <p className="text-white font-bold text-sm">{order.customer.name}</p>
                                <p className="text-gray-500 text-[10px]">{new Date(order.date).toLocaleDateString()}</p>
                             </div>
                          </div>
                          <span className="text-accent-cyan font-bold text-sm">{formatPrice(order.total)}</span>
                       </div>
                     ))}
                     {orders.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No orders yet.</p>}
                  </div>
               </div>

               {/* Top Products */}
               <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-bold text-lg">Top Rated Products</h3>
                    <button onClick={() => setActiveTab('products')} className="text-accent-cyan text-xs font-bold uppercase hover:underline">Manage</button>
                  </div>
                  <div className="space-y-4">
                     {products.filter(p => p.isTopRated).slice(0, 5).map((product) => (
                       <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                <img src={product.image} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <p className="text-white font-bold text-sm truncate max-w-[150px]">{product.name}</p>
                                <p className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">{product.platform}</p>
                             </div>
                          </div>
                          <div className="text-right">
                             <p className="text-white font-bold text-sm">{product.soldCount}</p>
                             <p className="text-gray-500 text-[10px]">sold</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="glass-card overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="relative w-full md:w-96">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search products by name or category..."
                    className="w-full bg-dark-700 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent-cyan transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] font-extrabold text-gray-500 uppercase tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">Sold</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-dark-700">
                               <img src={p.image} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-white font-bold group-hover:text-accent-cyan transition-colors">{p.name}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-medium">{p.category}</td>
                      <td className="px-6 py-4 text-white font-bold">{formatPrice(p.price)}</td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <span className={`w-2 h-2 rounded-full ${p.stock > 10 ? 'bg-green-500' : p.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                           <span className="text-white">{p.stock}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{p.soldCount}</td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setShowProductForm(true);
                              }}
                              className="p-2 text-gray-400 hover:text-accent-cyan hover:bg-white/5 rounded-lg transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-500/5 rounded-lg transition-all"
                            >
                              <Trash2 size={18} />
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

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                      <div className="bg-accent-blue/10 text-accent-blue font-black px-4 py-2 rounded-xl text-xs uppercase border border-accent-blue/20">
                         #{order.id}
                      </div>
                      <div>
                        <p className="text-white font-bold">{order.customer.name}</p>
                        <p className="text-gray-500 text-xs">{new Date(order.date).toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="text-right">
                         <p className="text-gray-500 text-[10px] uppercase font-black">Method</p>
                         <p className="text-white font-bold text-xs">{order.payment}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-gray-500 text-[10px] uppercase font-black">Total</p>
                         <p className="text-accent-cyan font-black">{formatPrice(order.total)}</p>
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        order.status === 'Completed'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                      }`}>
                        {order.status}
                      </div>
                   </div>
                </div>
                <div className="p-6 bg-dark-800/30 flex flex-col md:flex-row gap-8">
                   <div className="flex-1 space-y-3">
                      <h4 className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Ordered Items</h4>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                           <span className="text-gray-300"><span className="text-white font-bold">{item.quantity}x</span> {item.name} <span className="text-accent-cyan">({item.selectedPackage.name})</span></span>
                           <span className="text-white">{formatPrice(item.selectedPackage.price * item.quantity)}</span>
                        </div>
                      ))}
                   </div>
                   <div className="flex-1 space-y-3 border-l border-white/5 pl-0 md:pl-8">
                      <h4 className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Customer Details</h4>
                      <div className="space-y-1 text-sm">
                         <p className="text-gray-400">Phone: <span className="text-white">{order.customer.phone}</span></p>
                         <p className="text-gray-400">City: <span className="text-white">{order.customer.city}</span></p>
                         {order.customer.note && <p className="text-gray-400">Note: <span className="text-white italic">"{order.customer.note}"</span></p>}
                      </div>
                   </div>
                   <div className="flex flex-col gap-2 shrink-0">
                      {order.status !== 'Completed' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Completed')}
                          className="bg-green-600 hover:bg-green-700 text-white font-black py-2.5 px-6 rounded-lg text-[10px] uppercase transition-all"
                        >
                          Mark Completed
                        </button>
                      )}
                      {order.status !== 'Cancelled' && (
                        <button
                          onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                          className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 font-black py-2.5 px-6 rounded-lg text-[10px] uppercase transition-all"
                        >
                          Cancel Order
                        </button>
                      )}
                   </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-20 glass-card">
                 <ShoppingCart className="mx-auto text-gray-700 mb-4" size={48} />
                 <h3 className="text-white font-bold">No orders found</h3>
                 <p className="text-gray-500 text-sm">When customers buy products, they will appear here.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showProductForm && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Admin;
