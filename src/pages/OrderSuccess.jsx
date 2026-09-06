import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  PhoneCall
} from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order && orderId) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
        const found = savedOrders.find((o) => o.id === orderId);
        if (found) setOrder(found);
      } catch (e) {
        console.error('Failed to load order', e);
      }
    }
  }, [orderId, order]);

  const displayOrderId = orderId || order?.id || 'DS-000000';

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(displayOrderId);
    alert('Order ID copied to clipboard!');
  };

  const paymentMethodNames = {
    fastpay: 'FastPay Wallet',
    korek: 'Korek Cash / Balance',
    mastercard: 'MasterCard / FIB'
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${displayOrderId} for total ${order ? formatPrice(order.totalPrice) : ''}. Please guide me to complete payment via ${order ? paymentMethodNames[order.paymentMethod] || order.paymentMethod : 'FastPay'}.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Success Card Header */}
      <div className="bg-gradient-to-br from-[#0c162d] via-[#0a1020] to-[#150a2e] border border-slate-800 rounded-3xl p-8 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-950">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-cyan-950 text-cyan-300 border border-cyan-800 rounded-full text-xs font-extrabold uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium max-w-lg mx-auto leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Copy Box */}
        <div className="bg-[#060a14] border border-slate-800 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">Your Order Reference Number</span>
            <span className="text-lg font-black text-white tracking-widest">{displayOrderId}</span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy ID</span>
          </button>
        </div>
      </div>

      {/* Order Details & Summary */}
      {order && (
        <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Breakdown</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Customer Name:</span>
              <span className="text-white font-extrabold">{order.customerName}</span>
            </div>
            <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Phone Number:</span>
              <span className="text-white font-extrabold">{order.phone}</span>
            </div>
            <div className="bg-[#0c1220] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-bold block mb-1">Selected Payment Method:</span>
              <span className="text-cyan-400 font-black">
                {paymentMethodNames[order.paymentMethod] || order.paymentMethod}
              </span>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Purchased Items:</span>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#0c1220] border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-medium">{item.packageName} x {item.quantity}</p>
                  </div>
                  <span className="font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-black text-white">
            <span>Total Payable Amount:</span>
            <span className="text-xl text-cyan-400">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Contact Buttons Section */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider text-center">
          Contact Us On Social Media To Finalize Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Direct</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>TikTok Support</span>
          </a>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline"
        >
          <span>Continue Shopping for Games & Top-Ups</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
