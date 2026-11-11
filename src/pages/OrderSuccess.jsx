import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

/**
 * Order Success Page Requirements:
 * - Generate order number
 * - Show order summary
 * - Show selected payment method
 * - Show contact buttons: WhatsApp, Discord, TikTok
 * - Show message: “Your order has been created successfully. Please contact us to complete the payment.”
 */
export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback if accessed directly without an order state
  if (!order) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-white">No Active Order Found</h2>
        <p className="text-xs text-slate-400">Please choose your products and complete checkout.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <span>Return Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const paymentNames = {
    fastpay: 'FastPay Mobile Transfer',
    korek: 'Korek Telecom Balance / PIN',
    mastercard: 'MasterCard / FIB Bank Transfer'
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${order.orderNumber} for ${formatPrice(order.totalAmount)} via ${paymentNames[order.paymentMethod] || order.paymentMethod}. Here is my transfer screenshot.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">

      {/* Top Success Banner */}
      <div className="text-center space-y-3 pt-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Order Created Successfully!
        </h1>
        <div className="inline-block px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs">
          Order Number: <strong className="text-cyan-400 font-mono text-sm ml-1">#{order.orderNumber}</strong>
        </div>
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-medium">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Manual Payment Action Cards */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c152a] via-[#091020] to-[#060a14] border border-cyan-500/30 shadow-2xl space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-base text-white">Payment Instructions ({paymentNames[order.paymentMethod] || order.paymentMethod})</h3>
        </div>

        <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
          <p>
            1. Total payable amount is <strong className="text-cyan-400 font-bold">{formatPrice(order.totalAmount)}</strong>.
          </p>
          <p>
            2. Send the payment to our official account and take a screenshot of the transaction receipt.
          </p>
          <p>
            3. Tap any contact button below to submit your receipt along with Order <strong>#{order.orderNumber}</strong>.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/gaming"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-extrabold text-xs shadow-lg shadow-indigo-950/40 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Join Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Official TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Receipt Summary</span>
        </h3>

        {/* Customer details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-slate-400 block">Customer</span>
            <strong className="text-white">{order.customerName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Phone</span>
            <strong className="text-white">{order.phoneNumber}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">City</span>
            <strong className="text-white">{order.city}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Method</span>
            <strong className="text-cyan-400 uppercase">{order.paymentMethod}</strong>
          </div>
        </div>

        {order.orderNote && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
            <span className="text-slate-400 block">Order Note / In-game ID:</span>
            <p className="text-slate-200 mt-0.5">{order.orderNote}</p>
          </div>
        )}

        {/* Itemised list */}
        <div className="space-y-2 border-t border-slate-800 pt-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div>
                <span className="text-white font-medium">{item.name}</span>
                {item.package && <span className="text-cyan-400 ml-1.5">({item.package})</span>}
                <span className="text-slate-400 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-bold text-slate-200">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}

          <div className="flex justify-between items-baseline pt-3 border-t border-slate-800 text-sm">
            <span className="font-bold text-white">Total Amount</span>
            <span className="text-lg font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>

      </div>

      {/* Return to Shopping */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>Continue Browsing Dano Store</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}

export default OrderSuccess;
