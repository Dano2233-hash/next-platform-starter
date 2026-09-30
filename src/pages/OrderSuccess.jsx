import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Send,
  Video,
  ShoppingBag,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = React.useState(false);

  // Retrieve order details from state or local storage
  const orderData = location.state?.order || (() => {
    try {
      const orders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return orders.find((o) => o.orderId === orderId);
    } catch (e) {
      return null;
    }
  })();

  const currentOrderId = orderId || orderData?.orderId || 'DS-2025-000000';
  const paymentDetails = PAYMENT_METHODS.find((m) => m.id === orderData?.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(currentOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950/60 via-[#0c1024] to-[#070b1a] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Order Created Successfully!</h1>
          <p className="text-xs sm:text-sm text-emerald-300 font-semibold mt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Order ID:</span>
          <span className="font-bold text-cyan-300 text-sm">{currentOrderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Selected Payment Instructions */}
      <div className="p-6 rounded-2xl bg-[#0c1024] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Payment Instructions ({paymentDetails.name})</span>
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <p className="text-slate-300 leading-relaxed">
            Send the exact total amount of{' '}
            <strong className="text-cyan-300">{formatPrice(orderData?.totalAmount || 0)}</strong> to our{' '}
            {paymentDetails.name} number below:
          </p>
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-mono block">
                {paymentDetails.name} Number
              </span>
              <span className="text-base font-mono font-bold text-cyan-300">
                {paymentDetails.accountNumber}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Name: {paymentDetails.accountName}</span>
          </div>
        </div>
      </div>

      {/* Customer Contact Action Buttons */}
      <div className="p-6 rounded-2xl bg-[#0c1024] border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
          Contact Us to Complete Order
        </h3>
        <p className="text-xs text-slate-400">
          Send a screenshot of your payment along with your Order ID (<span className="text-cyan-300 font-mono">{currentOrderId}</span>) to any of our official channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(
              `Hello Dano Store, I created order ${currentOrderId}. Here is my payment confirmation.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-xs hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-xs hover:bg-indigo-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 text-indigo-400" />
            <span>Discord Channel</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-rose-400" />
            <span>TikTok Community</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {orderData && (
        <div className="p-6 rounded-2xl bg-[#0c1024] border border-slate-800 space-y-3 text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Order Summary</h3>
          <div className="grid grid-cols-2 gap-2 text-slate-400">
            <div>Customer Name: <strong className="text-slate-200">{orderData.customerName}</strong></div>
            <div>Phone: <strong className="text-slate-200">{orderData.phoneNumber}</strong></div>
            <div>City: <strong className="text-slate-200">{orderData.city}</strong></div>
            <div>Payment: <strong className="text-slate-200">{paymentDetails.name}</strong></div>
          </div>
          {orderData.orderNote && (
            <div className="pt-2 text-slate-400 border-t border-slate-800">
              Note/Player ID: <strong className="text-cyan-300 font-mono">{orderData.orderNote}</strong>
            </div>
          )}
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Back to Dano Store Home</span>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
