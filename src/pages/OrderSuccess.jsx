import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, MessageCircle, Home } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { orderId, customer, items, totalPrice, paymentMethod } = order;

  const paymentMethodNames = {
    fastpay: 'FastPay Wallet',
    korek: 'Korek Cash',
    mastercard: 'MasterCard / FIB'
  };

  const whatsappMessage = `Hello Dano Store! I placed an order:
Order ID: ${orderId}
Name: ${customer.name}
Phone: ${customer.phone}
Payment Method: ${paymentMethodNames[paymentMethod] || paymentMethod}
Total: ${formatPrice(totalPrice)}
Note: ${customer.orderNote || 'None'}`;

  const whatsappUrl = `https://wa.me/9647500000000?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 pb-16">

      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Order Created</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You For Your Order!
          </h1>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 inline-block">
          <span className="text-xs text-slate-400 font-medium mr-2">Order Reference:</span>
          <strong className="text-sm font-mono text-cyan-400">{orderId}</strong>
        </div>

        <p className="text-sm text-slate-300 max-w-lg mx-auto font-medium">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* WhatsApp Contact Action */}
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>Complete Payment on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Order Summary & Payment Instructions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-medium">Customer Details</span>
            <div className="font-bold text-slate-200">{customer.name}</div>
            <div className="text-slate-400">{customer.phone} &bull; {customer.city}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-medium">Selected Payment Method</span>
            <div className="font-bold text-cyan-400">
              {paymentMethodNames[paymentMethod] || paymentMethod}
            </div>
            <div className="text-slate-400">Manual Payment Verification</div>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</span>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/60 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  {item.packageName && (
                    <div className="text-[11px] text-cyan-400">{item.packageName} x {item.quantity}</div>
                  )}
                </div>
                <div className="font-extrabold text-cyan-400">{formatPrice(item.total)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-sm font-bold text-white">Total Amount</span>
          <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {/* Social Contact Buttons */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4">
        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Need Immediate Support?</h4>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold hover:bg-emerald-900 transition-colors"
          >
            WhatsApp Support
          </a>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 text-xs font-bold hover:bg-indigo-900 transition-colors"
          >
            Discord Community
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-rose-950 border border-rose-800 text-rose-400 text-xs font-bold hover:bg-rose-900 transition-colors"
          >
            TikTok Channel
          </a>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>
        </div>
      </div>

    </div>
  );
}
