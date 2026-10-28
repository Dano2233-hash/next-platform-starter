import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Video, Copy, ExternalLink, ArrowRight, ShieldCheck, Wallet } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find((m) => m.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    alert(`Order ID ${order.id} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Success Banner */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-emerald-950/40 via-[#070b18] to-[#05070f] border border-emerald-500/30 rounded-3xl p-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          Order Created Successfully!
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Your order <span className="text-cyan-400 font-extrabold">{order.id}</span> has been created. Please contact us via WhatsApp, Discord, or TikTok to complete the manual payment transfer.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
          <span>Order Reference ID:</span>
          <span className="font-extrabold text-cyan-400 select-all">{order.id}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 hover:text-cyan-300 text-slate-400 transition-colors ml-1"
            title="Copy ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Manual Payment Step Box */}
      <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-amber-400" /> Payment Transfer Details ({selectedPaymentInfo.name})
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
            <span className="text-slate-400">Selected Payment Method:</span>
            <span className="font-extrabold text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {selectedPaymentInfo.name} ({selectedPaymentInfo.description})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2 border-t border-slate-800/80 pt-2">
            <span className="text-slate-400">Total Amount to Send:</span>
            <span className="text-lg font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>

        <p className="text-xs text-amber-400 bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/40 leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Immediate Contact Buttons */}
      <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
        <h3 className="font-bold text-base text-white">Contact Us Now to Finalize Payment</h3>
        <p className="text-xs text-slate-400">
          Send your Order ID <span className="text-cyan-400 font-bold">({order.id})</span> to our support team on your preferred platform:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store!%20I%20placed%20order%20${order.id}%20for%20${order.totalAmount}%20IQD.`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Support
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" /> Discord Server
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
          >
            <Video className="w-4 h-4" /> TikTok Support
          </a>
        </div>
      </div>

      {/* Full Order Summary */}
      <div className="bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">Order Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-bold text-slate-200">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="font-bold text-slate-200">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-bold text-slate-200">{order.city}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="text-xs border-t border-slate-800/80 pt-2">
            <span className="text-slate-500 block">Player ID / Note:</span>
            <span className="text-cyan-300 font-mono mt-0.5 block">{order.orderNote}</span>
          </div>
        )}

        <div className="border-t border-slate-800 pt-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Ordered Items</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-950">
              <div>
                <span className="font-bold text-slate-100">{item.name}</span>
                <span className="text-cyan-400 text-[11px] block">{item.packageName} × {item.quantity}</span>
              </div>
              <span className="font-extrabold text-white">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-slate-200 hover:text-white border border-slate-800 font-bold text-xs"
        >
          Return to Store Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
