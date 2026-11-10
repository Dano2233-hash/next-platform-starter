import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ExternalLink, ArrowRight, ShieldCheck, Copy, Phone, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS, SOCIAL_LINKS } from '../data/categories';
import { useProducts } from '../hooks/useProducts';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useProducts();

  // Find order from state or context
  const order = location.state?.order || orders.find((o) => o.orderId === orderId);

  // Find selected payment details
  const paymentMethodDetails = PAYMENT_METHODS.find(
    (m) => m.id === (order?.paymentMethod || 'fastpay')
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Success Badge & Header */}
      <div className="bg-[#0b101e] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-[0_0_40px_rgba(0,229,255,0.1)]">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mx-auto text-cyan-400 shadow-inner">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-3">
            Thank You for Your Order!
          </h1>
          <p className="text-sm font-semibold text-cyan-300 mt-2 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-2 bg-[#060a14] border border-slate-700/80 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="text-base font-black text-cyan-400 tracking-wider font-mono">
            {orderId}
          </span>
        </div>
      </div>

      {/* Manual Payment Instructions & Action */}
      <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Complete Your Payment</span>
          </h2>
          <span className="text-xs text-amber-400 font-bold">
            Method: {paymentMethodDetails?.name || 'Manual Payment'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Please transfer the exact amount of{' '}
          <strong className="text-white text-sm">
            {order ? formatPrice(order.totalAmount) : 'the order'}
          </strong>{' '}
          to the account below, then send a screenshot of your transfer along with Order #{orderId}.
        </p>

        {paymentMethodDetails && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Payment Channel:</span>
              <span className="font-bold text-white">{paymentMethodDetails.name}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Account Name:</span>
              <span className="font-semibold text-white">{paymentMethodDetails.accountName}</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">Account / Phone Number:</span>
              <span className="font-mono font-black text-cyan-400 text-sm bg-black/60 px-2 py-0.5 rounded border border-cyan-900/60">
                {paymentMethodDetails.accountNumber}
              </span>
            </div>
          </div>
        )}

        {/* Contact Buttons (WhatsApp, Discord, TikTok) */}
        <div className="pt-2">
          <span className="block text-xs font-bold text-slate-300 mb-3">
            Click to send receipt & confirm delivery:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
                `Hello Dano Store, I placed order #${orderId} for ${order?.totalAmount ? formatPrice(order.totalAmount) : ''}. Here is my payment receipt.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <span>WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <span>Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow transition"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Order Summary
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-b border-slate-800 pb-4">
            <div>
              <span className="text-slate-400 block">Customer:</span>
              <span className="font-semibold text-white">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Phone Number:</span>
              <span className="font-semibold text-white">{order.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">City:</span>
              <span className="font-semibold text-white">{order.city}</span>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300">Purchased Items:</span>
            {order.items?.map((item) => (
              <div
                key={item.cartItemId}
                className="flex justify-between items-center text-xs py-1.5 border-b border-slate-800/40"
              >
                <div>
                  <span className="text-white font-semibold">{item.name}</span>
                  {item.packageName && (
                    <span className="text-cyan-400 ml-1.5">({item.packageName})</span>
                  )}
                  <span className="text-slate-400 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {order.orderNote && (
            <div className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-semibold block mb-0.5">Order Note / ID:</span>
              <span className="text-slate-200">{order.orderNote}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2">
            <span className="text-sm font-bold text-white">Total IQD:</span>
            <span className="text-xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Return to home button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
