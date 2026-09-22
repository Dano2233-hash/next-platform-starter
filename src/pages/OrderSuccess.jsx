import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Video, Copy, Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-slate-200">No active order found</h2>
        <p className="text-xs text-slate-400">Please visit our store to place an order.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl"
        >
          Return to Dano Store
        </Link>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store! I placed order #${order.orderId} for ${order.customerName}. Payment method: ${order.paymentMethod}. Total: ${formatPrice(order.totalAmount)}.`
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Success Banner Header */}
      <div className="bg-[#091122] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full uppercase tracking-wider border border-cyan-800">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Thank You for Your Order!
          </h1>
        </div>

        {/* Mandatory Message Requirement */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-200 text-xs leading-relaxed font-semibold">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </div>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="text-sm font-black text-cyan-300 font-mono">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mandatory Contact Buttons (WhatsApp, Discord, TikTok) */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-sm border-b border-slate-800 pb-2">
          Contact Us to Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Send className="w-4 h-4" /> Discord
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
          >
            <Video className="w-4 h-4" /> TikTok
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
        <h3 className="font-extrabold text-slate-100 text-sm border-b border-slate-800 pb-2">
          Order Details
        </h3>

        <div className="grid grid-cols-2 gap-4 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">Customer Name:</span>
            <span className="font-bold text-slate-200">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Phone Number:</span>
            <span className="font-bold text-slate-200">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">City:</span>
            <span className="font-bold text-slate-200">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Selected Payment Method:</span>
            <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="border-t border-slate-800 pt-2 text-slate-400">
            <span className="text-slate-500 block text-[10px]">Order Note:</span>
            <p className="font-mono bg-slate-950 p-2 rounded-lg border border-slate-800 mt-1">
              {order.orderNote}
            </p>
          </div>
        )}

        {/* Ordered Items List */}
        <div className="border-t border-slate-800 pt-3 space-y-2">
          <span className="text-slate-500 block text-[10px] font-bold uppercase">Items Ordered:</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-slate-200 block">{item.product.name}</span>
                <span className="text-[10px] text-cyan-400">
                  {item.selectedPackage?.name} × {item.quantity}
                </span>
              </div>
              <span className="font-extrabold text-white">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
          <span className="font-extrabold text-slate-200 text-sm">Total Price:</span>
          <span className="text-xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
