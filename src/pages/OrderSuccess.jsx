import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Gamepad2,
  Send,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { orders } = useCart();
  const [copied, setCopied] = useState(false);

  const order = orders.find((o) => o.orderId === orderId) || orders[0];

  const handleCopyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = order
    ? `Hello Dano Store! I want to complete payment for Order ID: ${order.orderId}. Total: ${order.totalAmount} IQD via ${order.paymentMethod}.`
    : 'Hello Dano Store! I have a question about my order.';

  const whatsappUrl = `https://wa.me/9647500000000?text=${encodeURIComponent(whatsappMessage)}`;

  if (!order) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Order Receipt Generated</h2>
        <p className="text-slate-400 text-xs">Thank you for your order!</p>
        <Link to="/" className="inline-block px-5 py-2.5 bg-cyan-600 text-white font-bold rounded-xl text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">

      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/40">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Order Placed</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Thank you, {order.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
            Your order has been created successfully. <span className="text-cyan-300 font-bold">Please contact us via WhatsApp, Discord, or TikTok to complete the payment.</span>
          </p>
        </div>

        {/* Copyable Order Number */}
        <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2.5">
          <span className="text-xs text-slate-400 font-medium">Order Number:</span>
          <span className="text-sm font-black text-cyan-300 font-mono">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900 rounded-lg border border-slate-800"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Immediate Payment Contact Buttons */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          Contact Support to Pay & Claim Order
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold transition-all"
          >
            <Send className="w-4 h-4" /> WhatsApp Support
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-extrabold transition-all"
          >
            <Gamepad2 className="w-4 h-4" /> Join Discord Community
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/40 text-xs font-extrabold transition-all"
          >
            <MessageCircle className="w-4 h-4" /> TikTok @DanoStore
          </a>

        </div>
      </div>

      {/* Order Summary Receipt */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          Order Receipt Breakdown
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-slate-400 block">Customer Name:</span>
            <span className="text-white font-bold">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Phone Number:</span>
            <span className="text-white font-bold">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 block">City / Location:</span>
            <span className="text-white font-bold">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Selected Payment Method:</span>
            <span className="text-cyan-300 font-extrabold">{order.paymentMethod}</span>
          </div>
          {order.orderNote && (
            <div className="sm:col-span-2 border-t border-slate-800/80 pt-2">
              <span className="text-slate-400 block">Order Note / ID:</span>
              <span className="text-slate-200 font-medium">{order.orderNote}</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Items Purchased:</span>
          {order.items && order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  category={item.category || 'games'}
                  platform={item.platform || 'PC'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white truncate">{item.name}</h4>
                {item.selectedPackage && (
                  <span className="text-[10px] font-semibold text-cyan-400">{item.selectedPackage.name}</span>
                )}
                <span className="text-slate-400 text-[11px] block">Qty: {item.quantity}</span>
              </div>
              <span className="font-bold text-cyan-300">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-slate-300 font-bold text-sm">Total Price:</span>
          <span className="text-xl font-black text-cyan-300">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 font-extrabold rounded-xl text-xs transition-all"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
