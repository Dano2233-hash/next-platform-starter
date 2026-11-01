import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  ExternalLink,
  ShoppingBag,
  ShieldCheck,
  ArrowRight,
  Wallet,
  Phone,
  CreditCard
} from 'lucide-react';
import { PAYMENT_METHODS, SOCIAL_CONTACTS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find((p) => p.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMethodIcon = () => {
    switch (order.paymentMethod) {
      case 'fastpay':
        return <Wallet className="w-5 h-5 text-cyan-400" />;
      case 'korek':
        return <Phone className="w-5 h-5 text-yellow-400" />;
      case 'mastercard':
        return <CreditCard className="w-5 h-5 text-red-400" />;
      default:
        return <Wallet className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8 pb-20">
      {/* Top Banner */}
      <div className="bg-[#090e1d] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl shadow-cyan-950/30">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center mx-auto text-cyan-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
            Order Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Placed Successfully!
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto pt-1 font-medium">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number pill */}
        <div className="inline-flex items-center gap-2 bg-[#05070f] border border-slate-700 rounded-xl px-4 py-2 mt-2">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="text-sm font-mono font-black text-cyan-300 tracking-wider">
            {order.orderNumber}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order Number"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-[11px] text-emerald-400 font-bold">Copied!</span>}
        </div>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          {getMethodIcon()}
          <span>Payment Details & Transfer Instructions</span>
        </h3>

        <div className="bg-[#05070f] border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-800">
            <span className="text-slate-400">Selected Payment Method:</span>
            <span className="font-bold text-white text-sm">{selectedPaymentInfo.name}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-800">
            <span className="text-slate-400">Account / Phone Number:</span>
            <span className="font-mono font-bold text-cyan-300 text-sm">{selectedPaymentInfo.accountNumber}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-slate-800">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-semibold text-slate-200">{selectedPaymentInfo.accountName}</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-slate-400">Exact Amount to Transfer:</span>
            <span className="font-black text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Please transfer the exact amount of <strong className="text-white">{formatPrice(order.totalAmount)}</strong> to the account above. Then click one of the contact buttons below to send us your transfer screenshot along with Order Number <strong className="text-cyan-300 font-mono">{order.orderNumber}</strong>.
        </p>
      </div>

      {/* Contact Channels */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          <span>Contact Us to Finalize Payment</span>
        </h3>
        <p className="text-xs text-slate-400">
          Our Kurdish & Iraqi customer service agents are standing by to verify your payment and send your digital keys or top-ups.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={SOCIAL_CONTACTS.whatsapp.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href={SOCIAL_CONTACTS.discord.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Discord Community</span>
          </a>

          {/* TikTok */}
          <a
            href={SOCIAL_CONTACTS.tiktok.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-lg shadow-pink-950/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>TikTok Support</span>
          </a>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
          Order Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Customer Name:</span>
            <span className="font-bold text-white">{order.customer?.name}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Phone Number:</span>
            <span className="font-mono text-white">{order.customer?.phone}</span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">City:</span>
            <span className="font-semibold text-white">{order.customer?.city}</span>
          </div>
          {order.orderNote && (
            <div>
              <span className="text-slate-400 block mb-0.5">Player ID / Notes:</span>
              <span className="font-medium text-cyan-300">{order.orderNote}</span>
            </div>
          )}
        </div>

        {/* Ordered items */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300 block mb-2">Purchased Items:</span>
          {order.items?.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-850">
              <div>
                <span className="font-bold text-white">{item.name}</span>
                {item.packageName && (
                  <span className="text-cyan-400 block text-[11px]">{item.packageName}</span>
                )}
                <span className="text-slate-500 text-[11px]">Qty: {item.quantity}</span>
              </div>
              <span className="font-black text-slate-200">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-baseline text-sm">
          <span className="font-bold text-white">Total Amount:</span>
          <span className="text-xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Continue Shopping at Dano Store</span>
        </Link>
      </div>
    </div>
  );
}
