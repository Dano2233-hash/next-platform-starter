import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-slate-700 mx-auto" />
        <h2 className="text-xl font-bold text-slate-200">No Recent Order Found</h2>
        <p className="text-xs text-slate-400">
          You have not placed an order in this session or refreshed the page.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const handleCopyOrderNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I created order #${order.orderNumber} for ${formatPrice(order.subtotal)}. Payment Method: ${order.paymentMethod}. Customer Name: ${order.customerName}. Phone: ${order.phoneNumber}.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-cyan-500/40 rounded-2xl p-6 md:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[11px] font-extrabold uppercase tracking-wider">
            Order Created Successfully
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide pt-2">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-xs md:text-sm text-cyan-300 font-medium max-w-lg mx-auto">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl">
          <span className="text-xs text-slate-400 font-semibold">Order ID:</span>
          <span className="font-mono font-black text-cyan-400 text-sm md:text-base select-all">
            #{order.orderNumber}
          </span>
          <button
            onClick={handleCopyOrderNumber}
            className="p-1.5 text-slate-400 hover:text-white transition-colors"
            title="Copy Order Number"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Immediate Contact Buttons Section */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-sm md:text-base uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
          <PhoneCall className="w-5 h-5 text-cyan-400" />
          <span>Contact Us To Complete Payment & Get Codes</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647500001122?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Discord Support */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* TikTok Contact */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs shadow-lg shadow-pink-600/20 transition-all"
          >
            <span>TikTok @DanoStore</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="font-extrabold text-slate-100 text-base uppercase tracking-wider border-b border-slate-800 pb-3">
          Order Summary & Invoice
        </h3>

        {/* Customer & Payment Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-medium block">Customer</span>
            <span className="font-bold text-slate-200 mt-1 block">{order.customerName}</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-medium block">Phone Number</span>
            <span className="font-bold text-slate-200 mt-1 block">{order.phoneNumber}</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-medium block">City</span>
            <span className="font-bold text-slate-200 mt-1 block">{order.city}</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-medium block">Payment Method</span>
            <span className="font-bold text-cyan-400 mt-1 block">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Purchased Items List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">
            Items Purchased:
          </h4>
          <div className="space-y-2">
            {order.items?.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
              >
                <div>
                  <p className="font-bold text-slate-200">{item.productName}</p>
                  <p className="text-[11px] text-cyan-400 font-medium">
                    {item.packageName} x {item.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-slate-100">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-base">
          <span className="font-bold text-slate-300">Total Amount Due (IQD):</span>
          <span className="text-2xl font-black text-cyan-400">
            {formatPrice(order.subtotal)}
          </span>
        </div>
      </div>

      {/* Return to Store Link */}
      <div className="text-center pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-extrabold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
