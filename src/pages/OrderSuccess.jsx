import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Heart,
  Copy,
  ArrowRight,
  ShieldCheck,
  Calendar,
  CreditCard,
  MapPin,
  User,
  Phone,
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // If directly visited without state, fallback to home or last order
  if (!order) {
    return (
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
        <h2 className="text-xl font-bold text-white mb-2">No Active Order Found</h2>
        <p className="text-xs text-slate-400 mb-6">
          You can check your products or return to the main gaming store catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <span>Go to Catalog</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const [copied, setCopied] = React.useState(false);

  const copyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just placed order #${order.orderId} for ${formatPrice(
      order.totalAmount
    )} via ${order.paymentMethod}. My name is ${order.customerName}.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 my-6">
      {/* Success Banner */}
      <div className="bg-gradient-to-br from-[#0b1f33] via-[#09152b] to-[#0b1120] border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-lg shadow-cyan-500/30">
          <CheckCircle2 size={36} />
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest inline-block mb-2">
          Order Generated
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Your order has been created successfully.
        </h1>

        <p className="text-sm font-semibold text-cyan-200 mt-2 max-w-lg mx-auto">
          Please contact us to complete the payment.
        </p>

        {/* Order Number pill */}
        <div className="mt-6 inline-flex items-center gap-3 bg-slate-950/80 border border-slate-700/80 rounded-2xl px-5 py-3 shadow-inner">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Order Reference:
          </span>
          <span className="text-lg font-black text-cyan-400 font-mono tracking-wider">
            {order.orderId}
          </span>
          <button
            onClick={copyOrderId}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            <Copy size={16} />
          </button>
        </div>
        {copied && (
          <p className="text-[11px] text-cyan-400 mt-1 font-semibold">Order ID copied to clipboard!</p>
        )}
      </div>

      {/* Immediate Payment Action Callout */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <CreditCard size={18} className="text-cyan-400" />
          <span>Selected Payment Method: {order.paymentMethod}</span>
        </h3>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <p className="text-slate-300">
            Please transfer <strong className="text-cyan-400 font-mono text-sm">{formatPrice(order.totalAmount)}</strong> to our official {order.paymentMethod} account:
          </p>
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 font-mono text-sm text-cyan-300 font-bold">
            {order.paymentMethod === 'FastPay' && 'FastPay Number: 0750 123 4567 (Dano Store Erbil)'}
            {order.paymentMethod === 'Korek' && 'Korek Telecom: 0750 987 6543 (Direct Balance Transfer)'}
            {order.paymentMethod === 'MasterCard' && 'IBAN: IQ44FIB00012345678901 (First Iraqi Bank)'}
          </div>
          <p className="text-slate-400 text-[11px]">
            Once the transfer is sent, send a screenshot of the receipt via WhatsApp or Discord below.
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
          >
            <MessageCircle size={16} className="fill-slate-950" />
            <span>Confirm on WhatsApp</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/40"
          >
            <Send size={16} />
            <span>Discord Support</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-950/40"
          >
            <Heart size={16} />
            <span>TikTok Community</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-slate-800">
          Order Summary & Customer Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <User size={15} className="text-slate-400" />
            <span>Customer Name: <strong className="text-white">{order.customerName}</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={15} className="text-slate-400" />
            <span>Phone: <strong className="text-white">{order.phoneNumber}</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin size={15} className="text-slate-400" />
            <span>City: <strong className="text-white">{order.city}</strong></span>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar size={15} className="text-slate-400" />
            <span>Date: <strong className="text-white">{new Date(order.createdAt).toLocaleDateString()}</strong></span>
          </div>
          {order.orderNote && (
            <div className="sm:col-span-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
              <span className="text-slate-400 font-semibold block mb-0.5">Order Note / Game ID:</span>
              {order.orderNote}
            </div>
          )}
        </div>

        {/* Ordered items breakdown */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <h4 className="text-xs font-bold text-slate-300 mb-2">Purchased Items:</h4>
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1">
              <div>
                <span className="font-semibold text-white">{item.name}</span>
                <span className="text-cyan-400 text-[11px] ml-2">({item.selectedPackage})</span>
                <span className="text-slate-400 ml-2">x{item.quantity}</span>
              </div>
              <span className="font-mono font-bold text-slate-200">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
            <span className="text-sm font-bold text-white">Total Amount</span>
            <span className="text-xl font-black text-cyan-400 font-mono">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Return to Home */}
        <div className="pt-4 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
          >
            <span>Return to Dano Store Home</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
