import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Copy, MessageCircle, ArrowRight, ShieldCheck, ShoppingBag, ExternalLink } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    alert(`Order Number ${order.id} copied to clipboard!`);
  };

  const getPaymentLabel = (method) => {
    switch (method) {
      case 'fastpay':
        return 'FastPay Mobile Wallet';
      case 'korek':
        return 'Korek Cash / Balance Transfer';
      case 'mastercard':
        return 'MasterCard / FIB / Bank Transfer';
      default:
        return 'Manual Transfer';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 pb-16">
      {/* Success Hero */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-[#071324] to-[#0a1e38] border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[11px] font-extrabold uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white pt-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order ID Badge & Copy */}
        <div className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
          <span className="text-xs font-semibold text-slate-400">Order Number:</span>
          <span className="text-base font-black text-cyan-400 tracking-wider">{order.id}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Direct Social Media Contact Section */}
      <div className="p-6 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-cyan-400" />
          Contact Us To Complete Payment
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Send your Order Number (<strong className="text-cyan-400">{order.id}</strong>) to our customer team on WhatsApp, Discord, or TikTok to receive the account/transfer details and get instant code activation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9640000000000?text=${encodeURIComponent(`Hello Dano Store, I created order ${order.id} for ${formatPrice(order.totalAmount)} via ${getPaymentLabel(order.paymentMethod)}. Please give me the payment details.`)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900/80 text-white font-extrabold text-xs flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2 text-emerald-300">
              WhatsApp Support
            </span>
            <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-950/80 border border-indigo-500/40 hover:bg-indigo-900/80 text-white font-extrabold text-xs flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2 text-indigo-300">
              Discord Channel
            </span>
            <ExternalLink className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-pink-950/80 border border-pink-500/40 hover:bg-pink-900/80 text-white font-extrabold text-xs flex items-center justify-between transition-all group"
          >
            <span className="flex items-center gap-2 text-pink-300">
              TikTok Direct
            </span>
            <ExternalLink className="w-4 h-4 text-pink-400 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Order Summary & Customer Details */}
      <div className="p-6 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-6">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
          Order Summary & Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 font-bold block uppercase text-[10px]">Customer Name:</span>
            <span className="text-slate-200 font-extrabold text-sm">{order.customer.name}</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 font-bold block uppercase text-[10px]">Phone Number:</span>
            <span className="text-slate-200 font-extrabold text-sm">{order.customer.phone}</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 font-bold block uppercase text-[10px]">City:</span>
            <span className="text-slate-200 font-extrabold text-sm">{order.customer.city}</span>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 font-bold block uppercase text-[10px]">Selected Payment Method:</span>
            <span className="text-cyan-400 font-extrabold text-sm">{getPaymentLabel(order.paymentMethod)}</span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Digital Items</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="space-y-0.5">
                  <h5 className="font-bold text-white">{item.name}</h5>
                  <p className="text-[11px] text-cyan-400 font-semibold">{item.packageName} x {item.quantity}</p>
                </div>
                <span className="font-extrabold text-white">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm font-black text-white">
          <span>Total Payable Amount</span>
          <span className="text-cyan-400 text-lg">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-800 transition-colors"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
