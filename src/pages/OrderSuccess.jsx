import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  PhoneCall,
  Zap,
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      if (orderId) {
        const found = savedOrders.find((o) => o.orderId === orderId);
        if (found) setOrder(found);
      } else if (savedOrders.length > 0) {
        setOrder(savedOrders[0]);
      }
    } catch (e) {
      console.error('Failed to load order from localStorage:', e);
    }
  }, [orderId]);

  const handleCopyOrderId = () => {
    if (order?.orderId && navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!order) {
    return (
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-12 text-center space-y-4 my-12 max-w-lg mx-auto">
        <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Order Created Successfully</h2>
        <p className="text-xs text-slate-400">
          Your order has been recorded. Please contact support via WhatsApp to verify your payment.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/30"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const paymentDetails = PAYMENT_METHODS.find((p) => p.id === order.paymentMethod) || PAYMENT_METHODS[0];

  const whatsappText = encodeURIComponent(
    `Hello Dano Store! I just placed order #${order.orderId} for ${formatPrice(
      order.totalAmount
    )}. My payment method: ${paymentDetails.name}. Please confirm!`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Success Hero Header */}
      <div className="bg-gradient-to-b from-[#0e1838] via-[#090e1f] to-[#080d1a] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            ORDER CREATED SUCCESSFULLY
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 bg-[#050814] border border-cyan-500/30 px-4 py-2.5 rounded-2xl">
          <span className="text-xs text-slate-400">Order ID:</span>
          <span className="text-sm font-mono font-extrabold text-cyan-400">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Immediate Next Action: Direct Contact Buttons */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase font-mono tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Step 2: Complete Payment & Receive Digital Key / Top-Up</span>
        </h3>

        <p className="text-xs text-slate-300 leading-relaxed">
          Send payment to <span className="text-cyan-400 font-bold">{paymentDetails.name}</span> ({paymentDetails.accountNumber}) and click any button below to send your transfer screenshot to our 24/7 staff:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-green-600/20 border border-green-500/40 text-green-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-green-600/30 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-indigo-600/30 transition-all shadow-md"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Discord Ticket</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-pink-600/20 border border-pink-500/40 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-pink-600/30 transition-all shadow-md"
          >
            <Zap className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-5">
        <h3 className="text-sm font-bold text-white pb-3 border-b border-slate-800 font-mono">
          Order Summary & Payment Instructions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-bold text-white mt-0.5 block">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone</span>
            <span className="font-bold text-white mt-0.5 block">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-bold text-white mt-0.5 block">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Payment Method</span>
            <span className="font-bold text-cyan-400 mt-0.5 block">{paymentDetails.name}</span>
          </div>
        </div>

        {/* Selected Items */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Items Ordered ({order.items.length})
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">{item.name}</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-semibold">
                  {item.packageName} x {item.quantity}
                </span>
              </div>
              <span className="font-extrabold text-white">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between text-sm font-black text-white">
          <span>Total Order Value</span>
          <span className="text-cyan-400 font-mono text-lg">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 font-bold text-xs transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}
