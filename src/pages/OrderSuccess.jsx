import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  ExternalLink,
  ShoppingBag,
  Clock,
  Send
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { orderId, createdAt, customer, items, totalAmount, status } = order;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert(`Order ID ${orderId} copied to clipboard!`);
  };

  const paymentNames = {
    fastpay: 'FastPay Direct Transfer',
    korek: 'Korek Cash Credit Transfer',
    mastercard: 'MasterCard / FIB Bank Transfer'
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 pb-16">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 rounded-3xl p-6 md:p-8 text-center shadow-2xl space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white">
          Order Created Successfully!
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us to complete the payment and receive your digital codes / top-ups instantly.
        </p>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-2 text-xs">
          <span className="text-slate-400 font-medium">Order Reference:</span>
          <span className="font-mono font-extrabold text-cyan-400 text-sm">
            {orderId}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-bold text-base text-white text-center">
          Send Your Payment Screenshot To Complete Order
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Hello Dano Store! I want to complete payment for Order ${orderId}. Total: ${totalAmount} IQD`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white">WhatsApp Support</span>
            <span className="text-[10px] text-slate-400">Instant Chat & Verification</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white">Discord Ticket</span>
            <span className="text-[10px] text-slate-400">Open Payment Ticket</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/80 to-slate-900 border border-rose-500/40 hover:border-rose-400 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-6 h-6 text-rose-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xs text-white">TikTok Direct</span>
            <span className="text-[10px] text-slate-400">Dano Store Official</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
          Order Information Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-medium">Customer Name:</span>
            <span className="font-bold text-white text-sm">{customer.name}</span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-medium">Phone & City:</span>
            <span className="font-bold text-white text-sm">
              {customer.phone} ({customer.city})
            </span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-medium">Selected Payment Method:</span>
            <span className="font-bold text-cyan-400 text-sm">
              {paymentNames[customer.paymentMethod] || customer.paymentMethod}
            </span>
          </div>

          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block font-medium">Order Status:</span>
            <span className="font-bold text-amber-400 text-sm flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {status}
            </span>
          </div>
        </div>

        {customer.orderNote && (
          <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 block font-semibold mb-1">In-Game Note / Player ID:</span>
            <span className="text-slate-200 font-mono">{customer.orderNote}</span>
          </div>
        )}

        {/* Purchased Items */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Ordered Products ({items.length})
          </h4>
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.packageId}`}
                className="flex items-center justify-between bg-slate-900/80 border border-slate-800 p-3 rounded-xl text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      platform={item.product.platform}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-white">{item.product.name}</h5>
                    <span className="text-[10px] text-slate-400">
                      Qty: {item.quantity} {item.packageName ? `• ${item.packageName}` : ''}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-cyan-400">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">Total Order Amount:</span>
          <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            {formatPrice(totalAmount)}
          </span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Back to Home Store</span>
        </Link>
      </div>
    </div>
  );
}
