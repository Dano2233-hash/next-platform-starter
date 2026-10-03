import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, MessageSquare, ExternalLink, ArrowLeft, ShieldCheck, Copy } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-white">No Recent Order Found</h2>
        <p className="text-slate-400 text-sm">Please place an order from the catalog first.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentMethodDisplay = (pm) => {
    switch (pm) {
      case 'fastpay': return 'FastPay (Wallet)';
      case 'korek': return 'Korek Mobile / Cash';
      case 'mastercard': return 'MasterCard / Local Banking';
      default: return pm;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

      {/* Top Banner Success */}
      <div className="bg-[#0a0e1a] border border-cyan-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center text-cyan-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Order Created Successfully!</h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number badge */}
        <div className="inline-flex items-center gap-2 bg-[#070b18] border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-200">
          <span>Order #: {order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 hover:text-cyan-400 transition-colors text-slate-400"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
          {copied && <span className="text-[10px] text-cyan-400 font-sans">Copied!</span>}
        </div>
      </div>

      {/* Contact Channels for Payment Completion */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="text-center sm:text-left">
          <h3 className="font-extrabold text-base text-white">Contact Us to Complete Payment</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Send your Order ID <strong className="text-cyan-400">{order.orderId}</strong> to our team via any channel below to complete payment and receive your digital codes instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20want%20to%20complete%20payment%20for%20Order%20${order.orderId}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 font-extrabold text-xs rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 font-extrabold text-xs rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-400 font-extrabold text-xs rounded-xl transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TikTok</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>
      </div>

      {/* Order Breakdown */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-base text-white pb-3 border-b border-slate-800">
          Order Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block font-semibold">Customer Name</span>
            <span className="text-white font-bold">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Phone Number</span>
            <span className="text-white font-bold">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">City / Region</span>
            <span className="text-white font-bold">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Payment Method Selected</span>
            <span className="text-cyan-400 font-extrabold">{getPaymentMethodDisplay(order.paymentMethod)}</span>
          </div>
        </div>

        {/* Item List */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-300">Items Ordered:</span>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1">
              <span className="text-slate-300">
                {item.name} {item.packageName ? `(${item.packageName})` : ''} × {item.quantity}
              </span>
              <span className="font-extrabold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
          <span className="text-sm font-extrabold text-white">Total Price</span>
          <span className="text-xl font-extrabold text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Back to Catalog button */}
      <div className="text-center pt-2">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-extrabold text-xs rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dano Store
        </Link>
      </div>

    </div>
  );
}
