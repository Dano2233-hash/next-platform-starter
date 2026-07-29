import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, PhoneCall, Gift, HelpCircle } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Redirect to products catalog if no order structure exists in route state
  useEffect(() => {
    if (!order) {
      navigate('/products');
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-8">

      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
        <CheckCircle2 className="h-10 w-10 text-emerald-400" />
      </div>

      {/* Success Title */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/20">
          Order Created Successfully
        </span>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Receipt #{order.orderNumber}</h1>
        <p className="text-xs text-white/50 max-w-sm mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>
      </div>

      {/* Order Info Summary */}
      <div className="bg-[#0d0d11] border border-white/5 p-5 rounded-xl text-left text-xs space-y-3">
        <h3 className="font-bold text-white uppercase tracking-wider text-[10px] text-cyan-400 border-b border-white/5 pb-2">
          Order Summary & Details
        </h3>

        <div className="grid grid-cols-2 gap-y-2 text-white/60">
          <span>Customer:</span>
          <strong className="text-white text-right">{order.customerName}</strong>

          <span>Phone:</span>
          <strong className="text-white text-right">{order.phoneNumber}</strong>

          <span>City:</span>
          <strong className="text-white text-right">{order.city}</strong>

          <span>Payment Method:</span>
          <strong className="text-cyan-400 text-right uppercase tracking-wider">{order.paymentMethod}</strong>

          <span className="font-bold text-white pt-2 border-t border-white/5">Total Price:</span>
          <strong className="text-cyan-400 text-right text-sm font-black pt-2 border-t border-white/5">
            {formatPrice(order.totalAmount)}
          </strong>
        </div>

        {order.note && (
          <div className="bg-black/30 p-2.5 rounded border border-white/5 mt-2">
            <span className="text-[9px] text-white/40 block font-bold uppercase mb-1">Customer Note:</span>
            <p className="text-[10px] text-white/80 leading-relaxed italic">"{order.note}"</p>
          </div>
        )}
      </div>

      {/* Action Social Contact Channels */}
      <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Connect with our support team to activate:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=Hello%20Dano%20Store,%20I%20have%20created%20order%20%23${order.orderNumber}.%20Please%20verify%20my%20payment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold"
          >
            <MessageSquare className="h-5 w-5 fill-green-400/10" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore.js"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 border border-pink-500/20 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all text-xs font-bold"
          >
            <Gift className="h-5 w-5" />
            <span>TikTok Channel</span>
          </a>
        </div>
      </div>

      {/* Return Button */}
      <div className="pt-4">
        <Link
          to="/"
          className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-white/5 hover:border-white/10 transition-all inline-block"
        >
          Return to Store Home
        </Link>
      </div>

    </div>
  );
}
