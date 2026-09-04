import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Copy, Check, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (orderId) {
      try {
        const raw = localStorage.getItem('dano_orders');
        if (raw) {
          const list = JSON.parse(raw);
          const found = list.find((o) => o.orderId === orderId);
          if (found) setOrder(found);
        }
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
  }, [orderId]);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedPaymentInfo = order
    ? PAYMENT_METHODS.find((p) => p.id === order.paymentMethod) || PAYMENT_METHODS[0]
    : PAYMENT_METHODS[0];

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Success Hero Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 border border-emerald-500/30 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider">
          Order Created Successfully
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Thank You for Your Order!
        </h1>

        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>

        {orderId && (
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Order ID:</span>
            <span className="text-cyan-400 font-extrabold text-sm">{orderId}</span>
            <button
              onClick={copyOrderId}
              className="p-1 text-slate-400 hover:text-white transition-colors ml-1"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      {/* Payment Transfer Instructions */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400" /> Payment & Transfer Instructions
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Selected Payment Method:</span>
            <span className="font-bold text-cyan-300">{selectedPaymentInfo.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Transfer Account / Wallet Number:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">{selectedPaymentInfo.accountNumber}</span>
          </div>

          {order && (
            <div className="flex items-center justify-between text-xs border-t border-slate-900 pt-2">
              <span className="text-slate-400">Amount to Transfer:</span>
              <span className="font-black text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Direct Customer Support Contact Buttons */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-white">Contact Us to Finalize Payment</h3>
        <p className="text-xs text-slate-400">
          Click below to send your Order ID ({orderId || 'your order'}) to our active customer support team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647501234567?text=${encodeURIComponent(`Hello Dano Store! I want to complete payment for Order ID: ${orderId}`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md shadow-emerald-600/20"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Community</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all border border-slate-700"
          >
            <span>TikTok Store</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            Order Items Summary
          </h3>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <h4 className="font-bold text-slate-200">{item.productName}</h4>
                  <span className="text-[10px] text-cyan-300 font-semibold">{item.packageName} × {item.quantity}</span>
                </div>
                <span className="font-mono font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Customer Name:</span>
              <span className="font-bold text-slate-200">{order.customerName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Phone / City:</span>
              <span className="font-bold text-slate-200">{order.phone} ({order.city})</span>
            </div>
          </div>
        </div>
      )}

      {/* Return to Home CTA */}
      <div className="text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-bold transition-colors"
        >
          <span>Return to Store Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
