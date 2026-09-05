import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, ShoppingBag, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find((p) => p.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 pt-4">

      {/* Success Hero Header */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-950 text-emerald-300 border border-emerald-800">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Created Successfully!
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto pt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Generated Order ID Display */}
        <div className="inline-flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Order Number:</span>
          <span className="text-sm font-black text-cyan-400 tracking-wider font-mono">{order.orderId}</span>
          <button
            onClick={handleCopyOrderNumber}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-900"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Selected Payment Method Instructions Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded text-white bg-gradient-to-r from-cyan-600 to-blue-600">
              Payment Instruction
            </span>
            <h3 className="font-bold text-slate-100 text-sm mt-1">
              Pay via {selectedPaymentInfo.name}
            </h3>
          </div>
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <p className="text-slate-300 font-medium">
            Please send <strong className="text-cyan-400 font-extrabold">{formatPrice(order.totalAmount)}</strong> to our official {selectedPaymentInfo.name} account:
          </p>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center font-mono text-base font-black text-white">
            {selectedPaymentInfo.accountNumber}
          </div>
          <p className="text-[11px] text-slate-400">
            {selectedPaymentInfo.instruction}
          </p>
        </div>
      </div>

      {/* Contact Buttons Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
          Contact Us to Confirm Payment & Receive Code
        </h3>
        <p className="text-xs text-slate-400">
          Send your Order ID <strong className="text-cyan-400 font-mono">({order.orderId})</strong> and transfer screenshot to our team on your preferred platform:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">

          {/* WhatsApp */}
          <a
            href="https://wa.me/9647500000000"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-emerald-400" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-indigo-400" />
            <span>Discord Server</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-pink-400" />
            <span>TikTok Direct</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

        </div>
      </div>

      {/* Order Summary Summary Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
          Order Summary Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
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
          <div>
            <span className="text-slate-500 block">Total Amount</span>
            <span className="font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
          <span className="text-slate-500 block font-semibold">Purchased Items ({order.items.length}):</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-slate-300">
              <span>{item.title} x{item.quantity}</span>
              <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Return Home Button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Return to Homepage
        </Link>
      </div>

    </div>
  );
};
