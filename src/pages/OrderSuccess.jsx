import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import { CheckCircle2, MessageCircle, MessageSquare, Video, Copy, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();

  const orderData = location.state?.order || (() => {
    try {
      const orders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return orders.find((o) => o.orderId === orderId);
    } catch (e) {
      return null;
    }
  })();

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    (m) => m.id === orderData?.customer?.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="space-y-8 pb-12 max-w-3xl mx-auto">
      {/* Success Banner */}
      <div className="bg-[#0d1322] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Order #{orderId || 'DS-00000'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-sans">
            Order Created Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-200 font-medium max-w-lg mx-auto pt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      {/* Selected Payment Instructions */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Payment Instructions
          </h3>
          <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {selectedPaymentInfo.name}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Please transfer the exact amount <strong className="text-cyan-300 font-mono text-sm">{formatPrice(orderData?.totalAmount || 0)}</strong> to our account details below:
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 font-mono uppercase block">{selectedPaymentInfo.name} Number / Account</span>
            <span className="text-base font-extrabold text-cyan-300 font-mono">
              {selectedPaymentInfo.accountNumber}
            </span>
          </div>
          <button
            onClick={() => handleCopyText(selectedPaymentInfo.accountNumber)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-cyan-400 font-bold flex items-center gap-1"
          >
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </div>

      {/* Contact Support Buttons */}
      <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Send Payment Receipt to Us
        </h3>
        <p className="text-xs text-slate-400">
          After sending your payment, send us your receipt or screenshot on any platform below with order code <strong className="text-cyan-400 font-mono">{orderId}</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="https://wa.me/9647501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Community</span>
          </a>

          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Video className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Summary Box */}
      {orderData && (
        <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Order Summary
          </h3>
          <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
            <div className="flex justify-between">
              <span>Customer Name:</span>
              <strong className="text-white">{orderData.customer?.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Phone:</span>
              <strong className="text-white">{orderData.customer?.phone}</strong>
            </div>
            <div className="flex justify-between">
              <span>City:</span>
              <strong className="text-white">{orderData.customer?.city}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800">
              <span>Total Amount:</span>
              <strong className="text-cyan-400 font-mono text-sm">{formatPrice(orderData.totalAmount)}</strong>
            </div>
          </div>
        </div>
      )}

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
