import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  Globe,
  Share2,
  Phone,
  User,
  MapPin,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const paymentInstructions = {
    FastPay: {
      number: '0750 123 4567',
      steps: 'Send total IQD amount to our FastPay number. Reply to WhatsApp with transaction screenshot and Order ID.',
    },
    Korek: {
      number: '0750 987 6543',
      steps: 'Direct Korek credit transfer or send Korek scratch card pin code to our WhatsApp support.',
    },
    MasterCard: {
      number: 'FIB / Local MasterCard Transfer',
      steps: 'Transfer total IQD to FIB Account: 9647501234567. Send receipt screenshot to WhatsApp.',
    },
  };

  const currentInstr = paymentInstructions[order.paymentMethod] || paymentInstructions.FastPay;

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">

      {/* Top Banner Success */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-[#0a1524] to-cyan-950/60 border border-emerald-500/30 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-black text-white font-sans">
            Order Created Successfully!
          </h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-3 bg-[#070b14] border border-slate-800 rounded-2xl px-5 py-3 shadow-inner">
          <div className="text-left">
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Order Reference ID</span>
            <span className="text-lg font-black text-white font-mono">{order.orderId}</span>
          </div>
          <button
            onClick={handleCopyOrder}
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl border border-slate-700 transition-colors"
            title="Copy Order ID"
          >
            {copiedOrderId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons Box */}
      <div className="bg-[#090d18] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-base text-white text-center font-sans">
          Contact Support to Complete Payment &amp; Receive Code
        </h3>
        <p className="text-xs text-slate-400 text-center max-w-md mx-auto">
          Tap one of the messaging buttons below to send your Order ID ({order.orderId}) and payment screenshot:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(
              `Hello Dano Store! I want to complete payment for Order ID: ${order.orderId}. Selected Payment: ${order.paymentMethod}. Total: ${order.totalAmount} IQD.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Official</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Discord Support</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs py-3.5 px-4 rounded-2xl shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Payment Details & Instructions Box */}
      <div className="bg-[#090d18] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <CreditCard className="w-4 h-4 text-cyan-400" />
          <span>Selected Payment Method: <span className="text-cyan-300">{order.paymentMethod}</span></span>
        </h3>

        <div className="bg-[#0c1324] border border-cyan-500/30 rounded-2xl p-4 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="font-bold">Payment Account / Number:</span>
            <span className="text-cyan-400 font-mono font-black">{currentInstr.number}</span>
          </div>
          <p className="text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
            <span className="text-slate-200 font-semibold">Instructions: </span>
            {currentInstr.steps}
          </p>
        </div>
      </div>

      {/* Order Summary Receipt */}
      <div className="bg-[#090d18] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Customer &amp; Item Details</span>
        </h3>

        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#060a14] p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-bold block">Customer Name</span>
            <span className="text-slate-200 font-bold">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-bold block">Phone Number</span>
            <span className="text-slate-200 font-bold">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase text-[10px] font-bold block">City</span>
            <span className="text-slate-200 font-bold">{order.city}</span>
          </div>
          {order.orderNote && (
            <div className="sm:col-span-3 pt-2 border-t border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] font-bold block">Note / Player ID</span>
              <span className="text-cyan-300 font-medium">{order.orderNote}</span>
            </div>
          )}
        </div>

        {/* Ordered Items Table */}
        <div className="space-y-2 pt-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-0">
              <div>
                <span className="font-bold text-slate-100">{item.name}</span>
                <span className="text-slate-400 ml-2">({item.packageName} × {item.quantity})</span>
              </div>
              <span className="font-black text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Grand Total */}
        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="font-bold text-white text-sm">Total Amount Due</span>
          <span className="text-2xl font-black text-cyan-300">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Return Home Button */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 transition-colors"
        >
          <span>Return to Store Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
