import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';
import { CheckCircle2, MessageCircle, Send, Video, Copy, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Fallback if accessed directly without state
  if (!order) {
    return (
      <div className="text-center py-20 space-y-4 max-w-md mx-auto">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
        <h2 className="text-2xl font-bold font-heading text-white">Order Completed</h2>
        <p className="text-xs text-slate-400">If you just placed an order, thank you for choosing Dano Store!</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
        >
          <Gamepad2 className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    alert(`Order ID ${order.orderId} copied!`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created order ${order.orderId} for total ${formatPrice(order.totalAmount)} via ${order.paymentMethod.name}. Please confirm my payment!`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Success Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Order Placed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Order Created Successfully!
          </h1>
          {/* Exact required message string */}
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto pt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Order ID:</span>
          <span className="font-mono font-extrabold text-white text-base tracking-wider">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Instructions & Contact Action Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white font-heading">
            Selected Payment Method: <span className="text-cyan-400">{order.paymentMethod.name}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Please transfer <span className="text-white font-bold">{formatPrice(order.totalAmount)}</span> to the details below and send transaction proof to our support team:
          </p>

          <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 block">Account / Number:</span>
            <span className="text-base font-mono font-bold text-cyan-300 tracking-wider block">
              {order.paymentMethod.number}
            </span>
            <span className="text-xs text-slate-400 block">{order.paymentMethod.instructions}</span>
          </div>
        </div>

        {/* Contact Buttons required: WhatsApp, Discord, TikTok */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Contact Support to Finalize Payment & Receive Digital Code:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Support</span>
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Discord Community</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@danostore.iq"
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Video className="w-4 h-4" />
              <span>TikTok Channel</span>
            </a>
          </div>
        </div>
      </div>

      {/* Order Items Summary */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-3">
          Order Summary
        </h3>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-200">{item.product.name}</h4>
                <span className="text-[11px] text-cyan-400">{item.package?.name || 'Standard'} × {item.quantity}</span>
              </div>
              <span className="font-extrabold text-white font-heading">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-sm font-bold">
          <span className="text-slate-300">Total Paid</span>
          <span className="text-cyan-400 font-heading text-lg">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Return to Store Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
