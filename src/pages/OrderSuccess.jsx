import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, ArrowLeft, Copy, Check, ShieldCheck, Smartphone, Send } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();

  // Retrieve order from router state or Local Storage
  const order = location.state?.order || (() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return storedOrders.find((o) => o.id === orderId) || null;
    } catch (e) {
      return null;
    }
  })();

  const [copied, setCopied] = React.useState(false);

  const displayOrderId = orderId || order?.id || 'DS-10000';

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(displayOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${displayOrderId}. Total: ${formatPrice(order?.totalAmount || 0)}. Payment method: ${order?.paymentMethod?.name || 'FastPay'}.`
  );

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 pb-16">

      {/* Top Banner Success */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#0c101c] to-cyan-950/60 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full inline-block">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Thank You For Your Order!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order ID Badge & Copy */}
        <div className="inline-flex items-center gap-3 bg-[#080b14] border border-slate-800 rounded-2xl p-3 px-5">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">
              Order Reference ID
            </span>
            <span className="text-cyan-400 font-mono font-black text-lg">
              #{displayOrderId}
            </span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Selected Payment Method Information */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <span>Payment Instructions — Selected Method</span>
        </h3>

        {order?.paymentMethod && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-extrabold text-sm">{order.paymentMethod.name}</span>
              <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                Manual Transfer
              </span>
            </div>
            {order.paymentMethod.accountNumber && (
              <p className="text-xs font-mono font-bold text-cyan-300">
                Send payment to: {order.paymentMethod.accountNumber} ({order.paymentMethod.accountHolder || 'Dano Store'})
              </p>
            )}
            <p className="text-xs text-slate-400">
              Please transfer the total amount of <strong className="text-white">{formatPrice(order.totalAmount || 0)}</strong> to the account above and message us with your Order ID <strong className="text-cyan-400">#{displayOrderId}</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Contact Buttons Required: WhatsApp, Discord, TikTok */}
      <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3">
          Contact Us To Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord Community</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-600/20 active:scale-95 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>

        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3">
            Order Items & Details
          </h3>

          <div className="space-y-2">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/40">
                <div>
                  <h4 className="text-white font-bold">{item.productName}</h4>
                  {item.package && (
                    <span className="text-cyan-400 text-[11px] block">{item.package.name}</span>
                  )}
                  <span className="text-slate-400 text-[10px]">Qty: {item.quantity}</span>
                </div>
                <span className="text-white font-bold">{formatPrice(item.totalPrice)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-sm">
            <span className="text-slate-300 font-bold">Total Amount</span>
            <span className="text-cyan-400 font-black text-lg">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Navigation link */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
}
