import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, Copy, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-100">No Active Order Found</h2>
        <p className="text-xs text-slate-400">Order details are not available or session expired.</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="py-8 max-w-3xl mx-auto space-y-8">

      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-cyan-500/30 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Order Created Successfully!</h1>

        <p className="text-xs sm:text-sm text-cyan-300 font-medium max-w-lg mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-sm">
          <span className="text-slate-400">Order #:</span>
          <span className="font-extrabold text-cyan-400">{order.orderId}</span>
          <button
            onClick={() => copyToClipboard(order.orderId)}
            className="text-slate-400 hover:text-white ml-2"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Details & Contact Actions */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Payment Instructions ({order.paymentMethodName})</span>
        </h3>

        {order.paymentAccountDetails && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-cyan-300 text-sm">{order.paymentAccountDetails.accountNumber}</span>
                <button
                  onClick={() => copyToClipboard(order.paymentAccountDetails.accountNumber)}
                  className="text-slate-400 hover:text-white"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Account Holder:</span>
              <span className="font-bold text-slate-200">{order.paymentAccountDetails.accountName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">Total Amount to Send:</span>
              <span className="font-extrabold text-emerald-400 text-sm">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        )}

        {/* Contact Support Buttons */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Contact Us to Confirm Payment:</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/?text=Hello%20Dano%20Store,%20I%20have%20created%20Order%20${order.orderId}%20for%20${formatPrice(order.totalPrice)}.`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 transition"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition"
            >
              <span>Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800/80 pb-2">Order Items Summary</h3>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs text-slate-300">
              <span>{item.productName} ({item.selectedPackageName}) × {item.quantity}</span>
              <span className="font-bold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
          <span>Customer: {order.customerName} ({order.city})</span>
          <span>Phone: {order.phoneNumber}</span>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 font-bold text-xs border border-slate-800"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
