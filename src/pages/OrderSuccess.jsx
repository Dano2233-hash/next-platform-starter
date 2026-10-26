import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Copy, ShoppingBag, ArrowRight, Smartphone, MessageSquare } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let paymentLabel = "FastPay Mobile Wallet";
  if (order.paymentMethod === "korek") paymentLabel = "Korek Telecom Transfer";
  if (order.paymentMethod === "mastercard") paymentLabel = "MasterCard / Visa";

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-16">

      {/* Success Hero Header */}
      <div className="bg-[#080d1e] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-4 glow-cyan">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">Order Created Successfully!</h1>
          <p className="text-sm font-semibold text-cyan-400">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold">Order Number:</span>
          <span className="text-white font-black tracking-wider">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="ml-2 text-cyan-400 hover:text-cyan-300 p-1"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
        </div>
      </div>

      {/* Contact Channels Card */}
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-center border-b border-slate-800 pb-3">
          Contact Us To Finalize Payment
        </h3>

        <p className="text-xs text-slate-300 text-center leading-relaxed">
          Send your Order ID (<span className="text-cyan-400 font-bold">{order.orderId}</span>) to our support channels below. We will send you our FastPay, Korek, or MasterCard payment details immediately.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store, I created order ${order.orderId} for ${formatPrice(order.totalAmount)}. I want to complete payment via ${paymentLabel}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all font-bold text-xs space-y-1"
          >
            <span>WhatsApp Support</span>
            <span className="text-[10px] text-emerald-300/80 font-normal">Fastest Response</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 transition-all font-bold text-xs space-y-1"
          >
            <span>Discord Server</span>
            <span className="text-[10px] text-indigo-300/80 font-normal">Ticket Support</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 hover:bg-pink-500/20 transition-all font-bold text-xs space-y-1"
          >
            <span>TikTok Direct Msg</span>
            <span className="text-[10px] text-pink-300/80 font-normal">Dano Store Official</span>
          </a>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Details</h3>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Customer Name</span>
            <span className="text-white font-semibold">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Phone Number</span>
            <span className="text-white font-semibold">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block">City</span>
            <span className="text-white font-semibold">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Payment Method Selected</span>
            <span className="text-cyan-400 font-bold">{paymentLabel}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300 block">Purchased Items:</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs py-1 text-slate-300">
              <span>{item.name} ({item.packageName}) x {item.quantity}</span>
              <span className="font-bold text-white">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-black text-white">
          <span>Total Price</span>
          <span className="text-cyan-400 text-lg">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-cyan-400 font-bold text-xs"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

    </div>
  );
}
