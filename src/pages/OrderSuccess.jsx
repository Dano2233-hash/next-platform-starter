import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2, MessageSquare, ExternalLink, ArrowRight,
  Copy, Phone, ShieldCheck, ShoppingBag
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const [copiedId, setCopiedId] = React.useState(false);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Order Processed</h2>
        <p className="text-xs text-slate-400">Thank you for visiting Dano Store.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-xl"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created an order.\nOrder ID: ${order.orderId}\nCustomer: ${order.customerName}\nTotal: ${formatPrice(order.totalPrice)}\nPayment Method: ${order.paymentMethod}\nPlease provide payment transfer instructions.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

      {/* Top Banner */}
      <div className="bg-gradient-to-br from-[#0c1836] via-[#091024] to-[#05070f] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 rounded-full text-xs font-extrabold uppercase tracking-wider">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300 font-medium max-w-lg mx-auto mt-2 leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-3 bg-[#05070f] border border-slate-800 rounded-2xl px-5 py-3 shadow-inner">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Order Reference Number</span>
            <span className="font-mono text-base font-black text-white tracking-widest">{order.orderId}</span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors flex items-center gap-1 text-xs"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4 text-cyan-400" />
            <span>{copiedId ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Quick Action Contact Buttons */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-base text-white text-center sm:text-left flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <span>Contact Us to Complete Payment & Receive Code</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-emerald-950/60 border border-emerald-500/50 hover:bg-emerald-900/80 text-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-indigo-950/60 border border-indigo-500/50 hover:bg-indigo-900/80 text-indigo-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Discord Community</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-pink-950/60 border border-pink-500/50 hover:bg-pink-900/80 text-pink-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
          >
            <Phone className="w-4 h-4 text-pink-400" />
            <span>TikTok @DanoStore</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Order Details Summary */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
        <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
          Order Summary & Payment Info
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#05070f] p-4 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Customer</span>
            <span className="font-bold text-slate-200">{order.customerName}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Phone</span>
            <span className="font-bold text-slate-200">{order.phone}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">City</span>
            <span className="font-bold text-slate-200">{order.city}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">Payment Selected</span>
            <span className="font-extrabold text-cyan-400">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Purchased Items */}
        <div className="space-y-2 pt-2">
          <span className="font-semibold text-slate-300 block">Purchased Items:</span>
          {order.items?.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-slate-800/50">
              <span className="text-slate-200 font-medium">
                {item.name} ({item.packageName}) x{item.quantity}
              </span>
              <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
          <span className="font-bold text-slate-100 text-sm">Total Payable Amount</span>
          <span className="font-black text-xl text-cyan-400">{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      {/* Back button */}
      <div className="text-center pt-2">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Back to Dano Store Home</span>
        </button>
      </div>

    </div>
  );
}
