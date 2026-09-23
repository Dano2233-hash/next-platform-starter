import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Zap,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData;
  const [copied, setCopied] = useState(false);

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find((m) => m.id === orderData.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${orderData.orderId}.\nName: ${orderData.customerName}\nTotal: ${formatPrice(orderData.totalAmount)}\nPayment Method: ${selectedPaymentInfo.name}\nPlease complete my order.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 pb-12">
      {/* Success Hero Header */}
      <div className="bg-gradient-to-br from-emerald-950/60 via-[#090d1a] to-cyan-950/60 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-2xl px-4 py-2.5 shadow-md">
          <span className="text-xs text-slate-400 font-bold uppercase">Order Number:</span>
          <span className="text-base font-extrabold text-cyan-400 font-mono tracking-wider">
            #{orderData.orderId}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        {copied && (
          <p className="text-[11px] text-emerald-400 font-bold animate-fade-in">
            Order Number copied to clipboard!
          </p>
        )}
      </div>

      {/* Payment Instructions & Direct Contact */}
      <div className="bg-[#090d1a] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Next Steps to Receive Your Digital Item</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Send your payment via <span className="text-cyan-300 font-bold">{selectedPaymentInfo.name}</span> then contact our support team with your order number.
          </p>
        </div>

        {/* Payment Account Details */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400 font-bold uppercase">Selected Payment Method:</span>
            <h4 className="text-sm font-extrabold text-white mt-0.5">{selectedPaymentInfo.name}</h4>
            <p className="text-xs text-slate-400 mt-1">{selectedPaymentInfo.description}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-left sm:text-right shrink-0">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Send Money To Account:</span>
            <span className="text-sm font-extrabold text-amber-400 font-mono">{selectedPaymentInfo.accountNumber}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-3">
          <p className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
            Contact Support to Complete Payment:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
            </a>

            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-indigo-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Discord Support</span>
            </a>

            <a
              href="https://tiktok.com/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-extrabold shadow-lg shadow-pink-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>TikTok Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Order Summary Receipt */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Order Details Summary</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold block">Customer Name:</span>
            <span className="font-bold text-white">{orderData.customerName}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold block">Phone Number:</span>
            <span className="font-bold text-white">{orderData.phone}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold block">City Location:</span>
            <span className="font-bold text-white">{orderData.city}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="text-slate-500 font-semibold block">Status:</span>
            <span className="font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30 inline-block">
              {orderData.status || 'Pending Payment'}
            </span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="pt-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Items Ordered ({orderData.items.length}):
          </span>
          <div className="space-y-2">
            {orderData.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800"
              >
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                    {item.packageName} × {item.quantity}
                  </p>
                </div>
                <span className="font-black text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-300">Total Order Amount:</span>
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {formatPrice(orderData.totalAmount)}
          </span>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs border border-slate-800 transition-all"
        >
          <span>Return to Dano Store Home</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </Link>
      </div>
    </div>
  );
}
