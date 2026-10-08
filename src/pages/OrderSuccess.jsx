import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Video, Copy, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useProducts();

  // Try state or look up in order context
  const order = location.state?.order || orders.find((o) => o.id === orderId);

  const handleCopyOrderId = () => {
    if (orderId && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      alert(`Copied Order Number: ${orderId}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Success Hero Banner */}
      <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-cyan-400 rounded-full flex items-center justify-center text-slate-950 mx-auto shadow-lg shadow-cyan-950/50">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
            Order Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Order #{orderId || 'DS-000000'}
          </h1>
        </div>

        {/* Required message from prompt */}
        <p className="text-sm font-semibold text-emerald-300 max-w-lg mx-auto bg-emerald-950/60 border border-emerald-800/60 p-3.5 rounded-xl">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        <div className="pt-2 flex items-center justify-center gap-2">
          <button
            onClick={handleCopyOrderId}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Order ID</span>
          </button>
        </div>
      </div>

      {/* Social Contact Buttons Required */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3">
          Contact Us To Finalize Payment & Get Codes
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(
              `Hello Dano Store! I want to complete payment for Order #${orderId}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/60 hover:bg-emerald-900/60 text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-emerald-500/20" />
            <span>WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-700/60 hover:bg-indigo-900/60 text-indigo-300 font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md"
          >
            <Send className="w-5 h-5 fill-indigo-500/20" />
            <span>Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-xl bg-rose-950/60 border border-rose-700/60 hover:bg-rose-900/60 text-rose-300 font-extrabold text-xs flex items-center justify-center gap-2.5 transition-all shadow-md"
          >
            <Video className="w-5 h-5 fill-rose-500/20" />
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Summary Card */}
      {order && (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3">
            Order Details & Items
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[11px]">Customer</span>
              <span className="font-bold text-slate-100">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Phone</span>
              <span className="font-bold text-slate-100">{order.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">City</span>
              <span className="font-bold text-slate-100">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Payment Method</span>
              <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Items Purchased:</span>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs bg-slate-900/50 p-3 rounded-xl border border-slate-800/80"
              >
                <div>
                  <span className="font-bold text-slate-100">{item.productName}</span>
                  <span className="text-cyan-400 font-semibold block text-[11px]">
                    Package: {item.packageName} (Qty: {item.quantity})
                  </span>
                </div>
                <span className="font-extrabold text-slate-200">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-extrabold">
            <span className="text-slate-200">Total Amount:</span>
            <span className="text-cyan-300 text-lg">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
}
