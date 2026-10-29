import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created order #${order.orderNumber}. My name is ${order.customerName}. Payment method: ${order.paymentMethod}. Total: ${formatPrice(order.totalPrice)}.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

      {/* Success Hero Header */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Order Confirmed</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
            Your order has been created successfully!
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
            Please contact us via WhatsApp or Discord to complete the payment and receive your digital code / top-up instantly.
          </p>
        </div>
      </div>

      {/* Order Number Badge Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-cyan-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="text-xs font-bold text-slate-400 block">Order Reference Number</span>
          <span className="text-2xl font-black text-white tracking-wider font-mono">{order.orderNumber}</span>
        </div>
        <button
          onClick={handleCopyOrderNumber}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-cyan-400" />
              <span>Copy Order ID</span>
            </>
          )}
        </button>
      </div>

      {/* Direct Contact Social Buttons */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-400" /> Complete Payment & Instant Claim
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Send your Order ID <strong className="text-white">#{order.orderNumber}</strong> to our customer service via your preferred platform below to complete payment via {order.paymentMethod}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <span>TikTok Community</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Order Details</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <strong className="text-slate-100 text-sm">{order.customerName}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <strong className="text-slate-100 text-sm">{order.customerPhone}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <strong className="text-slate-100 text-sm">{order.customerCity}</strong>
          </div>
          <div>
            <span className="text-slate-500 block">Payment Method</span>
            <strong className="text-cyan-400 text-sm">{order.paymentMethod}</strong>
          </div>
        </div>

        {/* Ordered items list */}
        <div className="space-y-2.5 pt-2">
          <span className="text-slate-400 font-bold block">Purchased Products</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80">
              <div>
                <span className="font-bold text-slate-200 block">{item.name}</span>
                {item.selectedPackage && (
                  <span className="text-[11px] text-cyan-400 font-semibold">{item.selectedPackage}</span>
                )}
                <span className="text-slate-500 text-[11px] block">Qty: {item.quantity}</span>
              </div>
              <span className="font-black text-cyan-400 text-sm">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        {order.orderNote && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <span className="text-slate-500 font-bold block">Order Note / Player ID:</span>
            <span>{order.orderNote}</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 text-sm">
          <span className="font-extrabold text-white">Total Amount</span>
          <span className="font-black text-cyan-400 text-lg">{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      {/* Return Button */}
      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Continue Shopping in Dano Store
        </Link>
      </div>

    </div>
  );
}
