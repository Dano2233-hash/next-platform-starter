import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Send,
  Video,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

const ORDERS_STORAGE_KEY = 'dano_orders';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (!order && orderId) {
      try {
        const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (saved) {
          const orders = JSON.parse(saved);
          const found = orders.find((o) => o.id === orderId);
          if (found) setOrder(found);
        }
      } catch (e) {
        console.error('Failed to load order', e);
      }
    }
  }, [order, orderId]);

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPaymentDetails = (method) => {
    switch (method) {
      case 'FastPay':
        return {
          title: 'FastPay Number:',
          account: '0750 123 4567',
          instruction: 'Open your FastPay app and send the total amount to the number above with your Order ID in the transfer note.'
        };
      case 'Korek':
        return {
          title: 'Korek Cash Number / Transfer:',
          account: '0770 123 4567',
          instruction: 'Transfer the amount to our Korek cash line or send the 14-digit recharge code to us via WhatsApp.'
        };
      case 'MasterCard':
      default:
        return {
          title: 'FIB / Card IBAN:',
          account: 'FIB-9647501234567',
          instruction: 'Complete the bank transfer via First Iraqi Bank (FIB) or send card transfer screenshot to our WhatsApp.'
        };
    }
  };

  const paymentDetails = getPaymentDetails(order?.paymentMethod || 'FastPay');

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Top Hero Confirmation Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-cyan-500/40 p-6 sm:p-10 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            Order Created Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Generated Order ID Display */}
        <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold">Order Number:</span>
          <span className="text-sm font-black text-cyan-400 tracking-wider">
            {orderId || 'DANO-9999'}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Manual Payment Instructions Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-slate-100 text-sm sm:text-base flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Payment Instructions ({order?.paymentMethod || 'Manual'})</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold">
            Action Required
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">{paymentDetails.title}</span>
            <span className="font-black text-slate-100 text-sm tracking-wide text-cyan-400">
              {paymentDetails.account}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed pt-1">
            {paymentDetails.instruction}
          </p>
        </div>

        <p className="text-xs text-amber-400 font-semibold bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-center gap-2">
          <Clock className="w-4 h-4 shrink-0" />
          <span>Please send the transfer receipt or screenshot to our customer care team below.</span>
        </p>
      </div>

      {/* Contact Customer Care Buttons */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-sm sm:text-base">
          Contact Us To Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20want%20to%20complete%20payment%20for%20order%20${orderId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Care</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs border border-indigo-500/40 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord Support</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold text-xs border border-purple-500/40 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Order Details & Summary */}
      {order && (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-4">
          <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 border-b border-slate-800 pb-4">
            <div>
              <span className="text-slate-400 block mb-0.5">Customer Name</span>
              <span className="font-bold text-slate-100">{order.customer?.name}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Phone Number</span>
              <span className="font-bold text-slate-100">{order.customer?.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">City</span>
              <span className="font-bold text-slate-100">{order.customer?.city}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-0.5">Selected Payment Method</span>
              <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Purchased Items
            </span>
            {order.items?.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800">
                <ProductImage
                  src={item.product?.image}
                  name={item.product?.name}
                  category={item.product?.category}
                  platform={item.product?.platform}
                  type={item.product?.type}
                  className="w-12 h-12 rounded-lg shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-100 truncate">{item.product?.name}</h4>
                  <p className="text-[11px] text-slate-400">
                    Package: {item.packageName} × {item.quantity}
                  </p>
                </div>
                <span className="font-black text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-300">Total Price Paid:</span>
            <span className="text-lg font-black text-cyan-400">
              {formatPrice(order.totalPrice)}
            </span>
          </div>
        </div>
      )}

      {/* Return Home Action */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
