import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../components/PaymentMethodCard';
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Video,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = React.useState(false);

  // Retrieve order details from state or localStorage
  let order = location.state?.order;
  if (!order && orderId) {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      order = savedOrders.find((o) => o.orderId === orderId);
    } catch (e) {
      console.error(e);
    }
  }

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const selectedPaymentInfo = PAYMENT_METHODS.find((m) => m.id === order?.paymentMethod);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8 pb-16">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-950 border border-emerald-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Order Created Successfully!
        </h1>

        <p className="text-sm font-semibold text-emerald-300 max-w-lg mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-xs font-bold text-slate-200">
          <span>Order Number:</span>
          <span className="text-cyan-400 text-sm font-black">{orderId || order?.orderId || 'DANO-SUCCESS'}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 hover:text-cyan-300 text-slate-400 transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Payment Method Instructions */}
      <div className="bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-3 shadow-xl">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Payment Method Instructions
        </h3>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block">Selected Payment Method</span>
            <span className="text-base font-black text-white">
              {selectedPaymentInfo ? selectedPaymentInfo.name : order?.paymentMethod || 'Manual Payment'}
            </span>
            <p className="text-xs text-slate-400 mt-1">
              {selectedPaymentInfo?.details || 'Please send your payment via mobile wallet or card.'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
            Pending Payment
          </span>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-950 to-purple-950/40 border border-cyan-500/30 p-6 rounded-2xl space-y-4 shadow-xl">
        <h3 className="text-sm font-bold text-white text-center">
          Contact Us Now to Complete Payment & Receive Code
        </h3>
        <p className="text-xs text-slate-400 text-center">
          Click any button below to send your Order ID ({orderId}) to our support team:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Hello Dano Store! I want to complete payment for Order ID: ${orderId}`)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Items Summary */}
      {order && (
        <div className="bg-slate-950/90 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            Order Items Summary
          </h3>
          <div className="space-y-2">
            {order.items?.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-white block">{item.productName}</span>
                  {item.packageItem && <span className="text-cyan-400 text-[11px] font-semibold">{item.packageItem.name}</span>}
                  <span className="text-slate-400 text-[10px] block">Qty: {item.quantity}</span>
                </div>
                <span className="font-extrabold text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
            <span className="text-xs font-bold text-slate-400 uppercase">Total Amount</span>
            <span className="text-xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>

          <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60">
            <div>
              <span className="text-slate-500 block">Customer:</span>
              <strong className="text-slate-200">{order.customerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Phone:</span>
              <strong className="text-slate-200">{order.phone}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">City:</span>
              <strong className="text-slate-200">{order.city}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home Button */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-bold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Store Front</span>
        </Link>
      </div>
    </div>
  );
}
