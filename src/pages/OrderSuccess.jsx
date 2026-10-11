import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageSquare, ArrowRight, ShieldCheck, Copy, PhoneCall } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    alert(`Order ID ${order.orderId} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12 pt-6">

      {/* Top Banner */}
      <div className="bg-[#090d1a] border border-cyan-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-950 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-white">
            Thank You For Your Order!
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>

        {/* Order ID Tag */}
        <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold">Order ID:</span>
          <span className="font-heading font-extrabold text-cyan-400 text-base">{order.orderId}</span>
          <button
            onClick={copyOrderId}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-white text-center">
          Contact Us To Finalize Payment & Get Your Code
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Hello Dano Store, I placed an order ${order.orderId} via ${order.paymentMethod}. My total is ${formatPrice(order.totalAmount)}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold text-xs hover:bg-emerald-900/80 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Support
          </a>

          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 font-bold text-xs hover:bg-indigo-900/80 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Discord Server
          </a>

          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" /> TikTok Channel
          </a>
        </div>
      </div>

      {/* Order Summary Card */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-white border-b border-slate-800 pb-3">
          Order Summary Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Customer Name</span>
            <span className="font-semibold text-slate-200">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Phone Number</span>
            <span className="font-semibold text-slate-200">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block">City</span>
            <span className="font-semibold text-slate-200">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Selected Payment Method</span>
            <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Purchased Products
          </span>
          {order.items?.map((item) => (
            <div
              key={item.cartId}
              className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <div>
                <span className="font-heading font-semibold text-slate-100">{item.product.name}</span>
                <span className="text-cyan-400 block text-[11px]">{item.selectedPackage?.name} × {item.quantity}</span>
              </div>
              <span className="font-heading font-bold text-cyan-300">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-semibold">Total Amount Due</span>
          <span className="font-heading font-black text-xl text-cyan-400">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs hover:border-cyan-500 hover:text-cyan-400 transition-all"
        >
          Return to Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
