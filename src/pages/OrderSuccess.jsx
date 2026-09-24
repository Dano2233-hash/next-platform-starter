import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, MessageSquare, ExternalLink, ShieldCheck, ShoppingBag, Copy } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied Order ID to clipboard!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Success Hero Banner */}
      <div className="bg-[#0c1021] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase block">Order Created Successfully</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Thank You For Ordering!</h1>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto space-y-2">
          <p className="text-xs text-slate-400 font-semibold">Your Unique Order Number:</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-black text-cyan-300 tracking-wider">{order.orderNumber}</span>
            <button
              onClick={() => copyToClipboard(order.orderNumber)}
              className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
              title="Copy Order ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <p className="text-sm text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-800/60 p-3 rounded-xl max-w-lg mx-auto">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Direct Customer Contact Buttons */}
      <div className="bg-[#0c1021] border border-[#1a223e] rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" /> Contact Support to Complete Payment
        </h3>
        <p className="text-xs text-slate-400">
          Click any of our official channels below and send your Order ID (<span className="text-cyan-300 font-bold">{order.orderNumber}</span>) to receive the payment details for <span className="text-slate-200 font-bold">{order.paymentMethod}</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store! I created order ${order.orderNumber} for ${formatPrice(order.totalAmount)} using ${order.paymentMethod}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>WhatsApp Support</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Discord Channel</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-pink-950/60 hover:bg-pink-900/60 text-pink-300 border border-pink-800/60 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>TikTok Direct</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#0c1021] border border-[#1a223e] rounded-3xl p-6 space-y-4">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
          Order Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-bold text-slate-100 text-sm">{order.customerName}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="font-bold text-slate-100 text-sm">{order.phone}</span>
          </div>

          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-bold text-slate-100">{order.city}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Payment Method</span>
            <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Ordered items summary */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200 block">{item.product.name}</span>
                  <span className="text-slate-400">Pkg: {item.packageName} x {item.quantity}</span>
                </div>
                <span className="font-black text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-between items-center text-base font-black text-white border-t border-slate-800">
            <span>Total Payable Amount</span>
            <span className="text-cyan-400 text-xl">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Return to Store Home
        </Link>
      </div>
    </div>
  );
}
