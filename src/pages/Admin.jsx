import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'
import { StatCard } from '../components/StatCard'
import { AdminProductForm } from '../components/AdminProductForm'
import { formatPrice } from '../utils/formatPrice'
import {
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Star,
  Zap,
  Flame,
  TrendingUp,
  Search,
  RotateCcw,
  Shield,
  Layers,
  Check,
  AlertCircle
} from 'lucide-react'

export function Admin() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetProducts } = useProducts()

  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('products') // 'products' | 'orders'
  const [editingProduct, setEditingProduct] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch orders from local storage
  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]')
      setOrders(savedOrders)
    } catch (e) {
      console.error('Failed to parse orders:', e)
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/admin-login')
  }

  // Admin stats calculations
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalRevenue = orders.reduce((acc, order) => acc + (Number(order.totalAmount) || 0), 0)

  // Filter products by search
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSaveProduct = (productPayload) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload)
      setEditingProduct(null)
    } else {
      addProduct(productPayload)
      setShowAddForm(false)
    }
  }

  const toggleFlag = (productId, flagName, currentValue) => {
    updateProduct(productId, { [flagName]: !currentValue })
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-cyan-400" />
            <h1 className="text-2xl font-extrabold text-white">Admin Control Center</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage catalog items, product flags, inventory stock, and customer orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetProducts}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 flex items-center gap-1.5 transition-colors"
            title="Reset catalog to default preset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Catalog size"
          icon={Package}
          color="cyan"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          subtitle="Customer transactions"
          icon={ShoppingBag}
          color="purple"
        />
        <StatCard
          title="Total Revenue"
          value={formatPrice(totalRevenue)}
          subtitle="Accumulated orders value"
          icon={DollarSign}
          color="emerald"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('products')
            setShowAddForm(false)
            setEditingProduct(null)
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Management ({totalProducts})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('orders')
            setShowAddForm(false)
            setEditingProduct(null)
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
            activeTab === 'orders'
              ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
              : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Customer Orders ({totalOrders})</span>
        </button>
      </div>

      {/* ADD / EDIT FORM MODAL / PANEL */}
      {(showAddForm || editingProduct) && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      {/* PRODUCTS TAB CONTENT */}
      {activeTab === 'products' && !showAddForm && !editingProduct && (
        <div className="space-y-5">
          {/* Action & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#080d1a] p-4 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Filter by title, category, platform..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1326] border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-[#080d1a] rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0d1326] text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Product</th>
                  <th className="p-3.5">Category / Platform</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Stock</th>
                  <th className="p-3.5">Badges & Flags</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/50 transition-colors">
                    {/* Title & Image */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-900 border border-slate-800 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-white block">{p.name}</span>
                          <span className="text-[10px] text-slate-500">ID: {p.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category & Platform */}
                    <td className="p-3.5">
                      <span className="block font-semibold text-slate-200">{p.category}</span>
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-400 font-mono mt-0.5">
                        {p.platform}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5 font-bold text-cyan-300">
                      {formatPrice(p.price)}
                    </td>

                    {/* Stock Input */}
                    <td className="p-3.5">
                      <input
                        type="number"
                        value={p.stock}
                        onChange={(e) => updateStock(p.id, e.target.value)}
                        className="w-20 bg-[#0d1326] border border-slate-800 text-slate-100 text-xs rounded-lg px-2 py-1 focus:border-cyan-500 font-mono"
                      />
                    </td>

                    {/* Feature Toggles */}
                    <td className="p-3.5">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => toggleFlag(p.id, 'isFeatured', p.isFeatured)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            p.isFeatured
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-900 text-slate-500 border-slate-800'
                          }`}
                        >
                          Featured
                        </button>
                        <button
                          onClick={() => toggleFlag(p.id, 'isTrending', p.isTrending)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            p.isTrending
                              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                              : 'bg-slate-900 text-slate-500 border-slate-800'
                          }`}
                        >
                          Trending
                        </button>
                        <button
                          onClick={() => toggleFlag(p.id, 'isFlashDeal', p.isFlashDeal)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            p.isFlashDeal
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-slate-900 text-slate-500 border-slate-800'
                          }`}
                        >
                          Flash Deal
                        </button>
                        <button
                          onClick={() => toggleFlag(p.id, 'isTopRated', p.isTopRated)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            p.isTopRated
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-slate-900 text-slate-500 border-slate-800'
                          }`}
                        >
                          Top Rated
                        </button>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* ORDERS TAB CONTENT */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-12 text-center space-y-2">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No Orders Placed Yet</h3>
              <p className="text-xs text-slate-500">
                Customer orders will appear here automatically after checkout.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-[#080d1a] p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs text-slate-400">Order ID: </span>
                      <span className="font-mono font-bold text-cyan-400 text-sm">{order.orderId}</span>
                      <span className="text-[11px] text-slate-500 ml-3">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
                      {order.status || 'Pending Payment'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Customer Info */}
                    <div className="space-y-1 bg-[#0d1326] p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-300 block mb-1">Customer Info:</span>
                      <p className="text-slate-200"><strong className="text-slate-400">Name:</strong> {order.customer?.name}</p>
                      <p className="text-slate-200"><strong className="text-slate-400">Phone:</strong> {order.customer?.phone}</p>
                      <p className="text-slate-200"><strong className="text-slate-400">City:</strong> {order.customer?.city}</p>
                      {order.customer?.note && (
                        <p className="text-slate-400 italic pt-1">Note: "{order.customer.note}"</p>
                      )}
                    </div>

                    {/* Payment Info */}
                    <div className="space-y-1 bg-[#0d1326] p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-300 block mb-1">Payment Method:</span>
                      <span className="inline-block px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold uppercase text-[10px]">
                        {order.customer?.paymentMethod}
                      </span>
                      <p className="text-slate-200 font-extrabold text-sm pt-2">
                        Total Amount: <span className="text-cyan-400">{formatPrice(order.totalAmount)}</span>
                      </p>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1 bg-[#0d1326] p-3 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-300 block mb-1">Items ({order.items?.length}):</span>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {order.items?.map((item, i) => (
                          <p key={i} className="text-slate-300 text-[11px]">
                            • {item.name} ({item.selectedPackage}) x{item.quantity}
                          </p>
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
  )
}
