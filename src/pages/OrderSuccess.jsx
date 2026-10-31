import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  Copy,
  ArrowRight,
  ShoppingBag,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // If no order data, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard?.writeText(order.orderId);
    alert(`Order ID copied: ${order.orderId}`);
  };

  const getPaymentName = (id) => {
    switch (id) {
      case 'fastpay':
        return 'FastPay (0750 123 4567)';
      case 'korek':
        return 'Korek Telecom (0750 987 6543)';
      case 'mastercard':
        return 'MasterCard (IQ88 0000 1234 5678 9012)';
      default:
        return id;
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed an order.\nOrder ID: ${order.orderId}\nTotal: ${formatPrice(order.totalAmount)}\nPayment Method: ${getPaymentName(order.paymentMethod)}\nName: ${order.customerName}`
  );

  return (
    <div className="py-10 max-w-2xl mx-auto space-y-8">
      {/* Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-950/40 animate-pulse">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white font-['Rajdhani',sans-serif]">
          Order Created Successfully!
        </h1>
        <p className="text-sm text-cyan-300 font-medium">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Order ID Banner */}
      <div className="bg-[#090e1c] border border-cyan-500/40 rounded-2xl p-6 text-center shadow-2xl relative overflow-hidden">
        <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
          Your Order Number
        </span>
        <div className="flex items-center justify-center gap-3 my-2">
          <span className="text-3xl font-black font-mono tracking-widest text-cyan-400">
            {order.orderId}
          </span>
          <button
            onClick={copyOrderId}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-slate-400">
          Save this order number to quote during manual payment verification.
        </p>
      </div>

      {/* Contact Channels to complete payment */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-['Rajdhani',sans-serif] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          Contact Us to Complete Payment
        </h3>
        <p className="text-xs text-slate-400">
          Click any link below to chat with our staff, share your payment receipt, and receive your digital codes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-950"
          >
            <span>WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-950"
          >
            <span>Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-pink-950"
          >
            <span>TikTok</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Order Summary Box */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white font-['Rajdhani',sans-serif] border-b border-slate-800 pb-3">
          Order Summary
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Customer Name:</span>
            <span className="font-bold text-white">{order.customerName}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Phone Number:</span>
            <span className="font-mono text-white">{order.phone}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>City:</span>
            <span className="text-white">{order.city}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Selected Payment Method:</span>
            <span className="font-bold text-cyan-400 uppercase">
              {getPaymentName(order.paymentMethod)}
            </span>
          </div>
          {order.note && (
            <div className="flex justify-between text-slate-300 pt-1">
              <span>Player ID / Note:</span>
              <span className="text-slate-300 italic max-w-xs text-right">{order.note}</span>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="border-t border-slate-800 pt-3 space-y-2">
          <span className="text-xs uppercase font-bold text-slate-400">Items Ordered:</span>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs py-1">
              <div>
                <span className="font-medium text-slate-200">{item.name}</span>
                <span className="text-slate-400 ml-1">
                  ({item.selectedPackage?.name || 'Standard'} × {item.quantity})
                </span>
              </div>
              <span className="font-bold text-slate-200">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline text-sm font-bold text-white">
          <span>Total Amount to Pay:</span>
          <span className="text-cyan-400 text-xl font-black">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Back to Store Home</span>
        </Link>
      </div>
    </div>
  );
}
