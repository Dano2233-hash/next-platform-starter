import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Copy,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Video
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export function OrderSuccess() {
  const { orderId } = useParams();

  // Load order details from localStorage 'dano_orders'
  const order = useMemo(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return orders.find((o) => o.orderId === orderId) || orders[0] || null;
    } catch {
      return null;
    }
  }, [orderId]);

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    (m) => m.id === order?.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);
      alert(`Order number ${order.orderId} copied to clipboard!`);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just placed order #${order?.orderId || orderId} for ${formatPrice(order?.totalAmount || 0)}. Payment method: ${order?.paymentMethod || 'FastPay'}. Please find my payment transfer details.`
  );

  return (
    <div className="py-8 max-w-3xl mx-auto space-y-8 pb-16">
      {/* Success Hero Header */}
      <div className="bg-gradient-to-b from-[#0d172e] to-[#0a1020] border border-cyan-500/30 rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Order Placed</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Your Order Has Been Created Successfully!
          </h1>
        </div>

        {/* Highlighted Instruction Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
          &ldquo;Your order has been created successfully. Please contact us to complete the payment.&rdquo;
        </div>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 bg-[#05070f] border border-slate-700 px-5 py-2.5 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-semibold">Order Number:</span>
          <span className="text-base font-black text-white font-mono">{order?.orderId || orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-cyan-400"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contact Channels for Payment Completion */}
      <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Contact Channels to Finalize Payment</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any button below to message our 24/7 support with your order number and payment receipt screenshot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-sm transition-all hover:scale-[1.02]"
          >
            <Send className="w-5 h-5" />
            <span>Discord Server</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 font-bold text-sm transition-all hover:scale-[1.02]"
          >
            <Video className="w-5 h-5" />
            <span>TikTok @danostore</span>
          </a>
        </div>
      </div>

      {/* Selected Payment Transfer Instructions */}
      {selectedPaymentInfo && (
        <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <span>Payment Transfer Details ({selectedPaymentInfo.name})</span>
          </h3>

          <div className="p-4 rounded-2xl bg-[#05070f] border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Account Name:</span>
              <strong className="text-white">{selectedPaymentInfo.accountName}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Account Number / Phone:</span>
              <strong className="text-cyan-400 font-mono text-sm">{selectedPaymentInfo.accountNumber}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total to Transfer:</span>
              <strong className="text-amber-400 font-mono text-sm">{formatPrice(order?.totalAmount || 0)}</strong>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Payment Method:</span>
              <strong className="text-white">{order?.paymentMethod || selectedPaymentInfo.name}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary & Customer Info */}
      {order && (
        <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            <span>Order Summary & Delivery Target</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#05070f] p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-slate-500 block">Customer</span>
              <span className="font-semibold text-slate-200">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Phone</span>
              <span className="font-semibold text-slate-200">{order.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">City</span>
              <span className="font-semibold text-slate-200">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Status</span>
              <span className="font-semibold text-amber-400">{order.status}</span>
            </div>
          </div>

          {order.items && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-300 uppercase">Purchased Items:</span>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs py-2 border-b border-slate-800 last:border-0 text-slate-300">
                    <span>
                      {item.name} {item.packageName ? `(${item.packageName})` : ''} × {item.quantity}
                    </span>
                    <span className="font-mono font-bold text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
