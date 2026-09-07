import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PAYMENT_METHODS } from '../data/categories'
import { formatPrice } from '../utils/formatPrice'
import {
  CheckCircle2,
  MessageSquare,
  Send,
  Video,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert
} from 'lucide-react'

export function OrderSuccess() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]')
      const found = savedOrders.find(o => o.orderId === orderId)
      if (found) {
        setOrder(found)
      }
    } catch (e) {
      console.error('Failed to load order:', e)
    }
  }, [orderId])

  const handleCopyOrderId = () => {
    if (!orderId) return
    navigator.clipboard.writeText(orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    m => m.id === order?.customer?.paymentMethod
  ) || PAYMENT_METHODS[0]

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Order Placed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Order Created Successfully!</h1>
        </div>

        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-3 bg-[#070b15] px-4 py-2 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400">Order ID:</span>
          <span className="text-sm font-mono font-extrabold text-cyan-300">{orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Social Contact Buttons */}
      <div className="bg-[#080d1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white text-center">
          Contact Us To Complete Payment & Receive Code
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store, I made order ${orderId} for ${formatPrice(order?.totalAmount || 0)}. Please assist with payment.`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-bold text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 font-bold text-xs transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Discord Community</span>
          </a>

          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 border border-pink-500/40 font-bold text-xs transition-colors"
          >
            <Video className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Payment Instructions Box */}
      <div className="bg-[#080d1a] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200">Payment Transfer Details:</h3>
        <div className="p-4 rounded-2xl bg-[#0d1326] border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Payment Method:</span>
            <span className="font-bold text-cyan-400">{selectedPaymentInfo.name}</span>
          </div>
          <div className="flex items-center justify-between font-mono">
            <span className="text-slate-400">Account Number:</span>
            <span className="font-bold text-white bg-slate-900 px-2 py-1 rounded border border-slate-800">
              {selectedPaymentInfo.accountNumber}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            {selectedPaymentInfo.instructions}
          </p>
        </div>
      </div>

      {/* Order Details List */}
      {order && (
        <div className="bg-[#080d1a] p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-200">Ordered Items Summary:</h3>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#0d1326] border border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <span className="font-bold text-slate-200 block">{item.name}</span>
                    <span className="text-cyan-400 text-[11px]">{item.selectedPackage} × {item.quantity}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-100">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-extrabold text-white">
            <span>Total Payable:</span>
            <span className="text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
        >
          <span>Return to Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
