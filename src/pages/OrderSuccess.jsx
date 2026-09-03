import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, MessageCircle, Send, Copy, ArrowRight, ShieldCheck, Video } from 'lucide-react';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order && orderId) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
        const found = savedOrders.find((o) => o.orderId === orderId);
        if (found) {
          setOrder(found);
        }
      } catch (e) {
        console.error('Error reading order from LocalStorage:', e);
      }
    }
  }, [orderId, order]);

  const paymentMethodInfo = PAYMENT_METHODS.find(
    (m) => m.id === order?.customer?.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard?.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-slate-100">

      {/* Success Card Header */}
      <div className="bg-[#090d1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl shadow-cyan-950/50 relative overflow-hidden">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-emerald-950">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Order Created</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Thank You For Your Order!</h1>

          {/* REQUIRED MESSAGE */}
          <p className="text-sm font-semibold text-cyan-300 mt-2 bg-cyan-950/60 py-2 px-4 rounded-xl border border-cyan-800/50 inline-block">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-sm mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Order Number</span>
            <p className="text-lg font-black text-white tracking-widest">{orderId}</p>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Payment Instructions Box */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-cyan-400 uppercase tracking-wider">
          Payment Instructions ({paymentMethodInfo.name})
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {paymentMethodInfo.instructions}
        </p>
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center">
          <span className="text-slate-400 font-semibold">Account / Number:</span>
          <span className="font-mono font-bold text-white text-sm">{paymentMethodInfo.accountNumber}</span>
        </div>
      </div>

      {/* Social Contact Buttons (WhatsApp, Discord, TikTok) */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
        <h3 className="font-bold text-sm text-white uppercase tracking-wider">
          Contact Us To Complete Payment & Instant Delivery
        </h3>
        <p className="text-xs text-slate-400">
          Send your Order ID <strong className="text-cyan-300">{orderId}</strong> to any of our Kurdistan support channels below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20have%20created%20Order%20${orderId}%20and%20want%20to%20complete%20payment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Support
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50"
          >
            <Send className="w-4 h-4" />
            Discord Server
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700"
          >
            <Video className="w-4 h-4 text-rose-400" />
            TikTok Official
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">Order Items Summary</h3>

          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-800 pb-2">
                <div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                  {item.package && <span className="text-cyan-400 ml-1">({item.package})</span>}
                  <span className="text-slate-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-bold text-slate-100">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 text-sm font-black text-white">
            <span>Total Amount:</span>
            <span className="text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Back to Home */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
        >
          Return to Home Page
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
