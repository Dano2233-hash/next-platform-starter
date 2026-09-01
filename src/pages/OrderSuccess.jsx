import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
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
  Clock,
  Wallet
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const paymentMethodLabel = {
    fastpay: 'FastPay Wallet',
    korek: 'Korek Telecom Credit',
    mastercard: 'MasterCard / Bank Transfer'
  }[order.paymentMethod] || order.paymentMethod;

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I created order #${order.orderId} for ${formatPrice(order.totalAmount)} via ${paymentMethodLabel}. Please guide me on completing the payment.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8 pb-16">
      {/* Success Hero Header */}
      <div className="bg-gradient-to-b from-[#09153d] to-[#05091c] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] mx-auto shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full bg-[#05091c] rounded-[15px] flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9 text-cyan-400 animate-bounce" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white pt-2">
            Thank You For Your Order!
          </h1>
        </div>

        {/* Primary Required Instructions Message */}
        <p className="text-sm sm:text-base text-slate-200 font-semibold max-w-xl mx-auto bg-blue-950/60 p-4 rounded-2xl border border-blue-500/30 leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order ID bar */}
        <div className="inline-flex items-center gap-2 bg-[#05081c] border border-cyan-900/40 rounded-xl px-4 py-2.5 text-xs font-mono">
          <span className="text-slate-400">Order Reference:</span>
          <span className="text-cyan-400 font-bold text-sm">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="ml-2 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Required Contact Buttons Section */}
      <div className="bg-[#080d2b] border border-cyan-900/30 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-cyan-400" />
          <span>Contact Us to Complete Payment</span>
        </h3>
        <p className="text-xs text-slate-300">
          Click any button below to connect directly with our support team in Kurdistan. Mention your Order ID: <strong className="text-cyan-400 font-mono">{order.orderId}</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9640000000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 rounded-xl bg-gradient-to-r from-slate-900 via-pink-950 to-slate-900 hover:from-slate-800 hover:to-slate-800 text-white font-extrabold text-xs border border-pink-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Order Summary & Details */}
      <div className="bg-[#080d2b] border border-cyan-900/30 rounded-3xl p-6 space-y-6">
        <h3 className="text-base font-bold text-white border-b border-cyan-900/30 pb-3 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          <span>Order Details & Summary</span>
        </h3>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#04081c] p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Customer Name:</span>
            <p className="font-bold text-white text-sm">{order.customer?.name}</p>
          </div>
          <div className="bg-[#04081c] p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Phone Number:</span>
            <p className="font-bold text-white text-sm">{order.customer?.phone}</p>
          </div>
          <div className="bg-[#04081c] p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">City / Location:</span>
            <p className="font-bold text-white text-sm">{order.customer?.city}</p>
          </div>
          <div className="bg-[#04081c] p-3.5 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 font-medium">Payment Method Selected:</span>
            <p className="font-bold text-cyan-400 text-sm flex items-center gap-1.5 mt-0.5">
              <Wallet className="w-4 h-4" /> {paymentMethodLabel}
            </p>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ordered Items</h4>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {order.items?.map((item) => (
              <div key={item.cartKey} className="flex items-center justify-between bg-[#04081c] p-3 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <h5 className="font-bold text-white">{item.name}</h5>
                  <p className="text-cyan-400 text-[11px] font-medium">{item.selectedPackage.name} (Qty: {item.quantity})</p>
                </div>
                <div className="font-bold text-white font-mono text-sm">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="border-t border-slate-800/80 pt-4 flex justify-between items-baseline text-sm">
          <span className="text-slate-300 font-bold">Total Amount Due:</span>
          <span className="text-2xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Action back home */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs transition-all"
        >
          <span>Return to Store Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
