import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Share2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Phone,
  CreditCard,
  FileText
} from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPayment = PAYMENT_METHODS.find((p) => p.id === order.customer?.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created order ${order.orderId} for ${formatPrice(order.totalPrice)}. Please process my payment.`
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Banner Success Header */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-[#090e1a] to-blue-950/60 border border-emerald-500/30 p-8 rounded-3xl text-center space-y-4 relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Order Created Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs sm:text-sm font-mono text-cyan-400">
          <span>Order ID: <strong className="text-white">{order.orderId}</strong></span>
          <button
            onClick={() => handleCopy(order.orderId)}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-[#090e1a] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-center">
          Contact Us to Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500001234?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all group"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-400 font-bold text-xs flex items-center justify-center gap-2 transition-all group"
          >
            <Share2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-400 font-bold text-xs flex items-center justify-center gap-2 transition-all group"
          >
            <Smartphone className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Payment Instructions Details */}
      <div className="bg-[#090e1a] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Selected Payment Method & Instructions
        </h3>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200">{selectedPayment.name}</span>
            <span className="text-xs font-mono text-cyan-400">{selectedPayment.accountNumber}</span>
          </div>
          <p className="text-xs text-slate-400">{selectedPayment.description}</p>
          <div className="pt-2 text-xs text-slate-300 space-y-1">
            <p>1. Transfer <strong className="text-cyan-400">{formatPrice(order.totalPrice)}</strong> to account: <span className="font-mono text-cyan-300">{selectedPayment.accountNumber}</span></p>
            <p>2. Take a screenshot of the transfer confirmation.</p>
            <p>3. Send the screenshot along with your Order ID (<strong className="text-cyan-400">{order.orderId}</strong>) to our WhatsApp/Discord support.</p>
          </div>
        </div>
      </div>

      {/* Order Itemized Summary */}
      <div className="bg-[#090e1a] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-slate-800/80 pb-3">
          Order Summary Breakdown
        </h3>

        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/40">
              <div>
                <span className="font-bold text-slate-200">{item.product?.name}</span>
                <span className="text-cyan-400 font-medium block">Package: {item.packageName} × {item.quantity}</span>
                {item.accountDetails && (
                  <span className="text-[11px] text-slate-500 block">ID: {item.accountDetails}</span>
                )}
              </div>
              <span className="font-extrabold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-sm font-black text-white pt-2">
          <span>Total Paid Amount:</span>
          <span className="text-cyan-400">{formatPrice(order.totalPrice)}</span>
        </div>

        {order.customer?.orderNote && (
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
            <strong className="text-slate-200">Customer Note:</strong> {order.customer.orderNote}
          </div>
        )}
      </div>

      {/* Action Navigation Button */}
      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};
