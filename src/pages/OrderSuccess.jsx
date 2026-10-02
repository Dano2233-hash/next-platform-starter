import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, MessageCircle, Copy, Check, ShoppingBag, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find((p) => p.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedOrderId(true);
    setTimeout(() => setCopiedOrderId(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have placed an order.\n\nOrder ID: ${order.orderId}\nName: ${order.customerName}\nPhone: ${order.phone}\nPayment Method: ${selectedPaymentInfo.name}\nTotal Amount: ${formatPrice(order.totalAmount)}\n\nI am ready to transfer payment.`
  );

  const whatsappUrl = `https://wa.me/9647501234567?text=${whatsappMessage}`;

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 pt-6">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Order Created Successfully</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading">
            Thank You, {order.customerName}!
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us via WhatsApp or Discord to complete your payment and receive your digital codes.
        </p>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-3 bg-slate-950/80 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <span className="text-slate-400">Order Reference:</span>
          <span className="font-mono font-extrabold text-cyan-400 text-sm">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-400"
            title="Copy Order ID"
          >
            {copiedOrderId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 font-heading border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Payment Instructions ({selectedPaymentInfo.name})</span>
          <span className="text-xs font-bold text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </h3>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Account Number:</span>
            <span className="font-mono font-bold text-slate-100 text-sm">{selectedPaymentInfo.accountNumber}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-bold text-slate-100">{selectedPaymentInfo.accountHolder}</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg">
          {selectedPaymentInfo.instructions}
        </p>
      </div>

      {/* Direct Contact Action Buttons */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
          Contact Us To Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 transition-all cursor-pointer"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Join Discord</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <span>TikTok Support</span>
          </a>
        </div>
      </div>

      {/* Order Items Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 font-heading border-b border-slate-800 pb-3">
          Order Summary Breakdown
        </h3>

        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-0">
              <div>
                <div className="font-bold text-slate-200">{item.name}</div>
                <div className="text-slate-400">{item.selectedPackageName} × {item.quantity}</div>
              </div>
              <div className="font-extrabold text-cyan-400">
                {formatPrice(item.unitPrice * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline text-xs">
          <span className="font-bold text-slate-300">Total Paid / Payable</span>
          <span className="text-lg font-extrabold text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping on Dano Store
        </Link>
      </div>

    </div>
  );
};
