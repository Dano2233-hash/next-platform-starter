import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Phone, MessageSquare, ArrowLeft, Copy, Share2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      alert('Order number copied to clipboard!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Success Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center border border-cyan-400 shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Order Confirmation</h1>

          {/* Required exact prompt message */}
          <p className="text-sm sm:text-base text-cyan-300 font-bold max-w-xl mx-auto pt-2">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center space-x-3 bg-slate-950/90 border border-slate-800 px-4 py-2.5 rounded-2xl">
          <span className="text-xs text-slate-400 font-medium">Order Number:</span>
          <span className="text-sm font-black font-mono text-cyan-400">{orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-white text-sm uppercase tracking-wider text-center">
          Contact Support to Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store, I made an order ${orderId}. Total: ${formatPrice(order?.totalAmount || 0)}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-all shadow-lg shadow-emerald-900/20"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-indigo-900/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Channel</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-black text-xs border border-slate-700 transition-all"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>TikTok Community</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
            Order Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-slate-500 font-medium block">Customer</span>
              <span className="font-bold text-white">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Phone</span>
              <span className="font-bold text-white">{order.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">City</span>
              <span className="font-bold text-white">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Payment Method</span>
              <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="font-bold text-slate-300 block">Ordered Items</span>
            {order.items?.map((item, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
                <div>
                  <span className="font-extrabold text-white">{item.name}</span>
                  <span className="text-slate-400 text-[11px] block">{item.packageName} x {item.quantity}</span>
                </div>
                <span className="font-black text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 text-sm">
            <span className="font-bold text-slate-300">Total Price</span>
            <span className="font-black text-xl text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
