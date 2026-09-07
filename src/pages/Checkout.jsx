import React from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { CheckoutForm } from '../components/CheckoutForm'
import { generateOrderId } from '../utils/orderId'
import { formatPrice } from '../utils/formatPrice'
import { ShieldCheck, ShoppingBag } from 'lucide-react'

export function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const handleCreateOrder = (formData) => {
    const orderId = generateOrderId()

    const newOrder = {
      orderId,
      customer: formData,
      items: cartItems,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    }

    // Save order in dano_orders local storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]')
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]))
    } catch (e) {
      console.error('Failed to save order to local storage:', e)
    }

    // Clear cart and navigate to order success
    clearCart()
    navigate(`/order-success/${orderId}`)
  }

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <span>Checkout & Manual Payment</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Provide your details and select your payment method (FastPay, Korek, or MasterCard).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Checkout Form (7 cols) */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} />
        </div>

        {/* Right Summary Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-[#080d1a] p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Summary ({cartItems.length} items)</span>
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cartItems.map(item => (
              <div key={item.cartItemId} className="flex items-center gap-3 text-xs bg-[#0d1326] p-2.5 rounded-xl border border-slate-800">
                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-200 truncate">{item.name}</h4>
                  <p className="text-cyan-400 font-semibold mt-0.5">{item.selectedPackage} × {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-100 shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee:</span>
              <span className="text-emerald-400 font-bold">0 IQD (Digital)</span>
            </div>
            <div className="flex justify-between text-slate-200 font-extrabold text-sm pt-2 border-t border-slate-800">
              <span>Total Payable:</span>
              <span className="text-cyan-400 text-lg">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
