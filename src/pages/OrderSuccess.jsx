import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  Send,
  Music2,
  ShieldCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 space-y-8 pb-12">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-[#0d1f36] via-[#09152b] to-[#120f2e] border border-cyan-500/30 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-inner animate-pulse">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-extrabold text-xs uppercase tracking-wider">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Thank You For Your Order!
          </h1>
          <p className="text-cyan-300 font-bold text-sm sm:text-base mt-2 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Box */}
        <div className="bg-[#05070f] border border-slate-800 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between gap-3 shadow-inner">
          <div className="text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Order Reference ID</span>
            <span className="text-lg font-mono font-extrabold text-cyan-400">{order.id}</span>
          </div>

          <button
            onClick={copyOrderNumber}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Payment Instructions & Contact Buttons */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Complete Your Manual Payment ({order.paymentMethod})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Send your payment via <span className="font-bold text-cyan-300">{order.paymentMethod}</span> and share your Order Reference ID ({order.id}) with our support team below:
          </p>
        </div>

        {/* Contact Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store!%20My%20Order%20ID%20is%20${order.id}.%20I%20want%20to%20complete%20my%20payment%20via%20${order.paymentMethod}.`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-200 font-extrabold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg"
          >
            <MessageCircle className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
            <span>Contact on WhatsApp</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900/90 border border-indigo-500/40 text-indigo-200 font-extrabold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg"
          >
            <Send className="w-6 h-6 text-indigo-400" />
            <span>Contact on Discord</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg"
          >
            <Music2 className="w-6 h-6 text-pink-400" />
            <span>Follow on TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Order Details</span>
          <span className="text-xs text-cyan-400 font-semibold">{order.paymentMethod}</span>
        </h3>

        {/* Customer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#05070f] p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-500 uppercase font-bold block mb-1">Customer Name</span>
            <span className="font-bold text-white text-sm">{order.customerName}</span>
          </div>

          <div>
            <span className="text-slate-500 uppercase font-bold block mb-1">Phone Number</span>
            <span className="font-bold text-slate-200 text-sm">{order.phone}</span>
          </div>

          <div>
            <span className="text-slate-500 uppercase font-bold block mb-1">City</span>
            <span className="font-bold text-slate-200 text-sm">{order.city}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="bg-[#05070f] p-3.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-500 uppercase font-bold block mb-1">Player ID / Note</span>
            <span className="font-medium text-cyan-300">{order.orderNote}</span>
          </div>
        )}

        {/* Purchased Items */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Purchased Products</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-[#05070f] p-3 rounded-xl border border-slate-800 text-xs">
                <div>
                  <h5 className="font-bold text-white">{item.productName}</h5>
                  <span className="text-[11px] text-cyan-400 font-semibold">
                    Package: {item.packageName} x {item.quantity}
                  </span>
                </div>
                <span className="font-extrabold text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-base font-extrabold text-white">
          <span>Total Order Value</span>
          <span className="text-cyan-400 text-xl">{formatPrice(order.total)}</span>
        </div>
      </div>

      {/* Return to Store Action */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-cyan-950 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
