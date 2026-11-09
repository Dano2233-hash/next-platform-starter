import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle,
  MessageCircle,
  Send,
  Video,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

/**
 * Order Success Page Requirements:
 * - Generate order number (displayed from param/state)
 * - Show order summary
 * - Show selected payment method
 * - Show contact buttons: WhatsApp, Discord, TikTok
 * - Show message: “Your order has been created successfully. Please contact us to complete the payment.”
 */
export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const [copied, setCopied] = React.useState(false);

  // Retrieve order details from state or localStorage
  const orderFromState = location.state?.order;
  const order = React.useMemo(() => {
    if (orderFromState) return orderFromState;
    try {
      const orders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return orders.find((o) => o.orderId === orderId);
    } catch {
      return null;
    }
  }, [orderFromState, orderId]);

  const paymentMethodDetails = React.useMemo(() => {
    const methodId = order?.paymentMethod || 'fastpay';
    return PAYMENT_METHODS.find((m) => m.id === methodId) || PAYMENT_METHODS[0];
  }, [order]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just placed order #${orderId} for ${order ? formatPrice(order.totalAmount) : 'my items'}. My payment method is ${paymentMethodDetails.name}. Here is my receipt:`
  );

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">

      {/* Success Hero Alert */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-cyan-950/40 via-[#0a0f24] to-[#070b1a] border border-cyan-500/30 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/20">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-black text-white font-heading">
            ORDER #{orderId}
          </h1>
        </div>

        {/* Required Success Message */}
        <p className="text-sm sm:text-base font-semibold text-slate-200 max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        <div className="inline-flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 border border-white/10 text-xs">
          <span className="text-slate-400">Order Reference:</span>
          <span className="font-mono font-bold text-cyan-400">{orderId}</span>
          <button
            onClick={() => handleCopy(orderId)}
            className="p-1 rounded text-slate-400 hover:text-white"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Manual Payment Instructions Card */}
      <div className="p-6 rounded-2xl bg-[#090d1e] border border-white/5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Selected Payment Method: <span className="text-cyan-400">{paymentMethodDetails.name}</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Pending Manual Transfer
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Transfer to Number / IBAN:</span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-base font-bold text-cyan-400">
                {paymentMethodDetails.accountNumber}
              </span>
              <button
                onClick={() => handleCopy(paymentMethodDetails.accountNumber)}
                className="text-xs text-slate-400 hover:text-white font-semibold"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-1">
            <span className="text-slate-400 text-[11px] block">Account Recipient:</span>
            <span className="font-bold text-white text-sm block">
              {paymentMethodDetails.accountHolder}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-xl border border-white/5">
          {paymentMethodDetails.instructions}
        </p>
      </div>

      {/* Contact Channels (WhatsApp, Discord, TikTok) */}
      <div className="p-6 rounded-2xl bg-[#090d1e] border border-white/5 space-y-4">
        <div>
          <h3 className="text-base font-bold text-white font-heading">
            Contact Us to Finalize Payment
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Send your Order ID and transaction screenshot directly to our gaming team:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#00c389]/15 border border-[#00c389]/30 hover:bg-[#00c389]/25 text-white flex items-center justify-center gap-2.5 font-bold text-xs transition-all shadow-md group"
          >
            <MessageCircle className="w-5 h-5 text-[#00c389] group-hover:scale-110 transition-transform" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#5865F2]/15 border border-[#5865F2]/30 hover:bg-[#5865F2]/25 text-white flex items-center justify-center gap-2.5 font-bold text-xs transition-all shadow-md group"
          >
            <Send className="w-5 h-5 text-[#5865F2] group-hover:scale-110 transition-transform" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-pink-500/15 border border-pink-500/30 hover:bg-pink-500/25 text-white flex items-center justify-center gap-2.5 font-bold text-xs transition-all shadow-md group"
          >
            <Video className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="p-6 rounded-2xl bg-[#090d1e] border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Summary</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 text-xs border-b border-white/5">
            <div>
              <span className="text-slate-500 text-[11px] block">Customer:</span>
              <span className="font-semibold text-white">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Phone:</span>
              <span className="font-semibold text-white">{order.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">City:</span>
              <span className="font-semibold text-white">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[11px] block">Total IQD:</span>
              <span className="font-bold text-cyan-400 text-sm font-heading">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 block">Purchased Products:</span>
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-200">
                    {item.name} ({item.selectedPackage?.name}) × {item.quantity}
                  </span>
                  <span className="font-mono text-cyan-400">
                    {formatPrice((item.unitPrice || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {order.orderNote && (
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Order Note / ID:</span> {order.orderNote}
            </div>
          )}
        </div>
      )}

      {/* Continue shopping button */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-slate-900 border border-white/10 text-slate-200 hover:text-white hover:border-cyan-500/40"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
