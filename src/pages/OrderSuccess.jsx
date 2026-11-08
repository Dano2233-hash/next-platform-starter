import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle,
  MessageCircle,
  Send,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check
} from 'lucide-react';

/**
 * Order Success page:
 * - Generate order number
 * - Show order summary
 * - Show selected payment method
 * - Show contact buttons: WhatsApp, Discord, TikTok
 * - Show message: “Your order has been created successfully. Please contact us to complete the payment.”
 */
export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = React.useState(false);

  // If page was directly refreshed without state, fallback gracefully
  if (!order) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-white">Order Status</h2>
        <p className="text-xs text-slate-400">No active recent order session was found.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentMethodDisplay = (id) => {
    switch (id) {
      case 'fastpay':
        return { name: 'FastPay', note: 'Send to FastPay Number: 0750 123 4567' };
      case 'korek':
        return { name: 'Korek Telecom', note: 'Send to Korek Number: 0750 987 6543' };
      case 'mastercard':
        return { name: 'MasterCard Manual', note: 'IBAN: IQ98KORE00001234567890' };
      default:
        return { name: id, note: 'Manual verification' };
    }
  };

  const paymentInfo = getPaymentMethodDisplay(order.paymentMethod);

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Success Banner */}
      <div className="bg-[#090d1c] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
          <CheckCircle className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Order Placed</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300 font-semibold mt-2 px-4 py-2 bg-cyan-950/60 rounded-xl border border-cyan-800/60 inline-block">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Badge */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center gap-3">
            <span className="text-xs text-slate-400">Order Number:</span>
            <span className="text-sm font-extrabold text-white font-mono tracking-wider">
              {order.orderId}
            </span>
            <button
              onClick={copyOrderId}
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Selected Payment Method & Next Steps */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Selected Payment Method: {paymentInfo.name}</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Please transfer the total amount of <strong className="text-cyan-300 font-mono">{formatPrice(order.totalAmount)}</strong> to:
        </p>
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs font-bold text-cyan-300">
          {paymentInfo.note}
        </div>
        <p className="text-xs text-slate-400">
          Once transferred, send a screenshot or receipt along with your Order ID (<span className="text-white font-mono">{order.orderId}</span>) to any of our contact channels below for instant digital delivery:
        </p>

        {/* Contact Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store, I have placed order ${order.orderId} with ${paymentInfo.name}. Total: ${order.totalAmount} IQD. Here is my payment receipt.`)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
          >
            <span className="font-extrabold text-sm">♪</span>
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Order Summary & Customer Details
        </h3>

        {/* Customer fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="text-slate-200 font-semibold">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone</span>
            <span className="text-slate-200 font-semibold font-mono">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="text-slate-200 font-semibold">{order.city}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="text-xs pt-1">
            <span className="text-slate-500 block">Note / Player ID:</span>
            <span className="text-slate-300 font-mono">{order.orderNote}</span>
          </div>
        )}

        {/* Items */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          {order.items?.map((it, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-200 font-semibold">{it.name}</span>
                {it.packageName && <span className="text-cyan-400 font-mono ml-1.5">({it.packageName})</span>}
                <span className="text-slate-500 ml-2">x{it.quantity}</span>
              </div>
              <span className="font-mono text-slate-300">{formatPrice(it.price * it.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="font-bold text-sm text-white">Grand Total</span>
          <span className="text-xl font-extrabold text-cyan-300 font-mono">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Home link */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all"
        >
          <span>Return to Store Home</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
