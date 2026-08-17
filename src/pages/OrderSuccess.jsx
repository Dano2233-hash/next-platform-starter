import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Home,
  ShoppingBag,
  Send,
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const [copiedId, setCopiedId] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const paymentInfo = PAYMENT_METHODS.find((m) => m.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${order.id}. Customer Name: ${order.customerName}. Payment Method: ${paymentInfo.name}. Total Amount: ${formatPrice(order.totalAmount)}.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 my-8">
      {/* Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1428] to-slate-950 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You, {order.customerName}!
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="font-mono font-extrabold text-cyan-400 text-sm">{order.id}</span>
          <button
            onClick={handleCopyOrderNumber}
            className="p-1 rounded text-slate-400 hover:text-white transition"
            title="Copy Order ID"
          >
            {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Payment Details Card */}
      <div className="bg-[#090d16] p-6 rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> Payment Instructions ({paymentInfo.name})
          </h3>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-full">
            Pending Transfer
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {paymentInfo.instructions}
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Selected Payment Method</span>
            <span className="font-bold text-white text-sm">{paymentInfo.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Send Payment To Account</span>
            <span className="font-mono font-extrabold text-cyan-400 text-sm">{paymentInfo.accountNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Exact Amount to Pay</span>
            <span className="font-extrabold text-cyan-300 text-base">{formatPrice(order.totalAmount)}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Currency</span>
            <span className="font-bold text-white">IQD</span>
          </div>
        </div>
      </div>

      {/* Contact Channels for Payment Confirmation */}
      <div className="bg-[#090d16] p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Contact Us to Complete Payment
        </h3>
        <p className="text-xs text-slate-400">
          Send a screenshot or transaction reference number along with Order ID <strong className="text-cyan-400">#{order.id}</strong> on any platform below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9640000000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/50 text-emerald-300 flex items-center justify-between font-bold text-xs transition"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 hover:bg-indigo-900/50 text-indigo-300 flex items-center justify-between font-bold text-xs transition"
          >
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5 text-indigo-400" />
              <span>Discord</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 flex items-center justify-between font-bold text-xs transition"
          >
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-pink-400">TikTok</span>
            </div>
            <ExternalLink className="w-4 h-4 opacity-70" />
          </a>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="bg-[#090d16] p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
          Order Summary Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Customer Name</span>
            <span className="font-bold text-white">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Phone</span>
            <span className="font-bold text-white">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">City</span>
            <span className="font-bold text-white">{order.city}</span>
          </div>
          {order.orderNote && (
            <div className="col-span-2 sm:col-span-3">
              <span className="text-slate-500 block text-[10px] uppercase">Note / Player ID</span>
              <span className="font-mono text-cyan-300">{order.orderNote}</span>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="space-y-2 border-t border-slate-800 pt-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Purchased Items</span>
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800"
            >
              <div>
                <span className="font-bold text-white">{item.productName}</span>
                <span className="text-slate-400 text-[11px] block">
                  Pkg: {item.packageName} × {item.quantity}
                </span>
              </div>
              <span className="font-extrabold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4">
        <Link
          to="/"
          className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/products"
          className="py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Browse More Games
        </Link>
      </div>
    </div>
  );
}
