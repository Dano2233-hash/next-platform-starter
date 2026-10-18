import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Send, MessageCircle, Gamepad2, Copy, Check } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = React.useState(false);

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

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I created order #${order.orderId} for ${formatPrice(order.totalAmount)}. Customer name: ${order.customerName}. Payment method: ${order.paymentMethod}. Please provide payment transfer details.`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Success Hero Header */}
      <div className="bg-[#0b0f1d] border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl shadow-cyan-500/10">
        <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto shadow-lg shadow-cyan-500/30">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-extrabold text-xs rounded-full">
          Order Created Successfully
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Thank You For Your Order!
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 inline-flex items-center gap-3 max-w-full">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Order Number:
          </span>
          <span className="text-cyan-400 font-black text-base sm:text-lg font-mono">
            {order.orderId}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Clear Notice Banner */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-amber-200 text-xs sm:text-sm font-semibold max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us via WhatsApp or Discord to complete the payment.”
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-6 space-y-6">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Order Details & Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-bold block mb-0.5">Customer Name</span>
            <span className="text-slate-200 font-bold text-sm">{order.customerName}</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-0.5">Phone Number</span>
            <span className="text-slate-200 font-bold text-sm">{order.phone}</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-0.5">City / Location</span>
            <span className="text-slate-200 font-bold text-sm">{order.city}</span>
          </div>

          <div>
            <span className="text-slate-400 font-bold block mb-0.5">Selected Payment Method</span>
            <span className="text-cyan-400 font-extrabold text-sm">{order.paymentMethod}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Purchased Products
          </span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div>
                <h4 className="font-bold text-white">{item.name}</h4>
                <p className="text-slate-400 text-[11px]">
                  Package: {item.selectedPackage} × {item.quantity}
                </p>
              </div>
              <span className="font-extrabold text-cyan-400">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-slate-300 font-bold text-sm">Total Amount Due</span>
          <span className="text-cyan-400 font-black text-2xl">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Contact Channels for Payment Completion */}
      <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white text-center">
          Contact Dano Store Team to Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9640000000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Contact via WhatsApp</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Contact via Discord</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-pink-600/20 border border-pink-500/40 hover:bg-pink-600/30 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>TikTok Support</span>
          </a>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold text-xs cursor-pointer"
        >
          Return to Dano Store Homepage
        </Link>
      </div>
    </div>
  );
}
