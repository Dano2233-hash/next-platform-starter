import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  CreditCard,
  User,
  Phone,
  MapPin,
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store! I have created a new order.\n\nOrder Number: ${order.orderId}\nCustomer Name: ${order.customer.name}\nPayment Method: ${order.paymentMethod}\nTotal Amount: ${formatPrice(order.totalAmount)}\n\nPlease provide payment details to process my order.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Thank You For Your Order!
          </h1>
          <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
            Your order has been created successfully. Please contact us to complete the payment and receive your code or top-up.
          </p>
        </div>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl">
          <span className="text-xs text-slate-400 font-semibold">Order ID:</span>
          <span className="text-sm font-black text-cyan-400 tracking-wider">{order.orderId}</span>
          <button
            onClick={copyOrderId}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Social Contact Action Grid */}
      <div className="bg-[#0a0e1c] p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-black text-white text-center uppercase tracking-wider">
          Complete Payment & Instant Code Fulfillment
        </h3>
        <p className="text-xs text-slate-400 text-center max-w-lg mx-auto">
          Click any button below to connect with Dano Store customer support directly with your Order ID.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>WhatsApp Fast Chat</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
          >
            <span>Discord Community</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-100 font-bold text-xs transition-all active:scale-95"
          >
            <span>TikTok Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="bg-[#0a0e1c] p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
          Order Summary & Details
        </h3>

        {/* Customer Information Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Customer Name</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{order.customer.name}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Phone / WhatsApp</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{order.customer.phone}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">City / Governorate</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{order.customer.city}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Badge */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <CreditCard className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 font-medium">Selected Payment Method:</span>
            <span className="font-extrabold text-white bg-slate-950 px-2.5 py-0.5 rounded border border-slate-700">
              {order.paymentMethod}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
            {order.status || 'Pending Payment'}
          </span>
        </div>

        {order.orderNote && (
          <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-xs">
            <span className="text-slate-400 font-bold block mb-0.5">Player ID / Order Note:</span>
            <p className="text-slate-200">{order.orderNote}</p>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            Items Ordered
          </h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-100">{item.name}</h5>
                  <span className="text-[11px] text-cyan-400 font-medium">
                    Package: {item.packageName} x {item.quantity}
                  </span>
                </div>
                <span className="font-black text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-black text-sm text-white">
            <span>Total Payable Amount</span>
            <span className="text-cyan-400 text-lg">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Return to Home */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>

    </div>
  );
}
