import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Send, Video, Copy, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created Order #${order.id}.\nCustomer: ${order.customerName}\nTotal: ${formatPrice(order.totalAmount)}\nPayment Method: ${order.paymentMethod}\nPlease provide payment transfer details.`
  );

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8 pb-20">

      {/* Top Banner Success Icon */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-2xl shadow-emerald-500/20 animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
          Order Created Successfully!
        </h1>

        <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto leading-relaxed bg-cyan-950/40 p-3 rounded-xl border border-cyan-500/30">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Order Number Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Order Reference Number:</span>
          <span className="text-2xl font-black text-cyan-400 tracking-wider">{order.id}</span>
        </div>

        <button
          onClick={copyOrderNumber}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
        >
          <Copy className="w-4 h-4 text-cyan-400" />
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>

      {/* Order Summary Details */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs text-slate-300">
        <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2">
          Customer &amp; Payment Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-500 block">Customer Name:</span>
            <span className="font-bold text-slate-200">{order.customerName}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Phone Number:</span>
            <span className="font-bold text-slate-200">{order.phone}</span>
          </div>

          <div>
            <span className="text-slate-500 block">City / Region:</span>
            <span className="font-bold text-slate-200">{order.city}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Selected Payment Method:</span>
            <span className="font-extrabold text-cyan-400 uppercase">{order.paymentMethod}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="pt-2 border-t border-slate-800/80">
            <span className="text-slate-500 block">Order Note / Player ID:</span>
            <span className="font-medium text-slate-300">{order.orderNote}</span>
          </div>
        )}

        {/* Items list */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <span className="text-slate-400 font-bold block">Ordered Items:</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-800/40">
              <span className="text-slate-200 font-semibold">
                {item.quantity}x {item.product.name} {item.packageItem ? `(${item.packageItem.name})` : ''}
              </span>
              <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          <div className="flex justify-between pt-2 text-sm font-black text-slate-100">
            <span>Total Amount Due:</span>
            <span className="text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Contact Buttons Section */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a0e1a] to-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-100 text-center uppercase tracking-wider">
          Click Below to Contact Support &amp; Finish Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Chat</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/20 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs shadow-lg shadow-pink-600/20 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>TikTok @danostore</span>
          </a>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs hover:text-cyan-400 transition-all"
        >
          <Gamepad2 className="w-4 h-4 text-cyan-400" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>

    </div>
  );
}
