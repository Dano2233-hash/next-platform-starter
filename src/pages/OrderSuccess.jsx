import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, ShoppingBag, ArrowLeft, Copy, Check } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../components/PaymentMethodCard';
import { useState } from 'react';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const order = location.state?.order || {
    orderId: orderId || 'DANO-100000',
    createdAt: new Date().toISOString(),
    customer: {
      name: 'Valued Customer',
      phone: '0750 XXX XXXX',
      city: 'Erbil',
      paymentMethod: 'fastpay',
      note: ''
    },
    items: [],
    totalAmount: 0,
    status: 'Pending Payment'
  };

  const selectedPaymentObj = PAYMENT_METHODS.find(
    (p) => p.id === order.customer?.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 pb-16">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#0c1a30] via-[#0f2142] to-[#0a1529] border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/50 rounded-2xl flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 border border-cyan-500/30 px-3 py-1 rounded-full">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Order #{order.orderId}</h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Copy Order Number Button */}
        <div className="pt-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Order ID Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-cyan-400" />
                <span>Copy Order ID</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Contact Channels Section */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" /> Contact Us To Finalize Payment
        </h3>

        <p className="text-xs text-slate-400">
          Send your Order ID <strong className="text-cyan-400">#{order.orderId}</strong> and payment receipt to any of our official channels below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=Hello%20Dano%20Store!%20My%20Order%20ID%20is%20${order.orderId}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/60 text-emerald-400 font-bold text-xs flex items-center justify-between transition shadow cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>WhatsApp</span>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400/70 group-hover:translate-x-0.5 transition" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/40 hover:bg-indigo-900/60 text-indigo-400 font-bold text-xs flex items-center justify-between transition shadow cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🎮</span>
              <span>Discord</span>
            </div>
            <ExternalLink className="w-4 h-4 text-indigo-400/70 group-hover:translate-x-0.5 transition" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-pink-950/50 border border-pink-500/40 hover:bg-pink-900/60 text-pink-400 font-bold text-xs flex items-center justify-between transition shadow cursor-pointer group"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base">🎵</span>
              <span>TikTok Support</span>
            </div>
            <ExternalLink className="w-4 h-4 text-pink-400/70 group-hover:translate-x-0.5 transition" />
          </a>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block font-semibold">Customer Name:</span>
            <span className="font-bold text-slate-200">{order.customer?.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">Phone Number:</span>
            <span className="font-bold text-slate-200">{order.customer?.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">City:</span>
            <span className="font-bold text-slate-200">{order.customer?.city}</span>
          </div>
          <div>
            <span className="text-slate-500 block font-semibold">Selected Payment Method:</span>
            <span className="font-extrabold text-cyan-400">{selectedPaymentObj.name} ({selectedPaymentObj.number})</span>
          </div>
        </div>

        {/* Purchased Items Table */}
        {Array.isArray(order.items) && order.items.length > 0 && (
          <div className="border-t border-slate-800 pt-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-300">Purchased Items:</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-[#060a14] p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="font-bold text-slate-200">{item.name}</span>
                    {item.selectedPackage && (
                      <span className="text-cyan-400 text-[11px] block">Option: {item.selectedPackage}</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-semibold">{item.quantity} x </span>
                    <span className="font-black text-cyan-400">{formatPrice(item.unitPrice)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 text-base font-black border-t border-slate-800/80">
              <span className="text-slate-200">Total Amount:</span>
              <span className="text-cyan-400">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Back to Store CTA */}
      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" /> Return to Main Store
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
