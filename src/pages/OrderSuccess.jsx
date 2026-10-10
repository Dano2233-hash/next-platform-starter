import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  MessageSquare,
  Send,
  Home,
  ShoppingBag,
  ExternalLink,
  PhoneCall,
  ShieldAlert
} from 'lucide-react';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();

  // Try retrieving order from location state or Local Storage
  const order = location.state?.order || (() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return savedOrders.find(o => o.orderId === orderId);
    } catch (e) {
      return null;
    }
  })();

  const displayOrderId = orderId || order?.orderId || 'DANO-SUCCESS';

  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store! I have placed an order (${displayOrderId}). Please provide payment details for ${order?.paymentMethod || 'Manual Payment'}.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">

      {/* Top Banner Success Card */}
      <div className="bg-slate-900/90 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 mx-auto flex items-center justify-center shadow-lg shadow-cyan-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-3 tracking-tight">
            Order #{displayOrderId}
          </h1>
          <p className="text-cyan-300 font-bold text-sm sm:text-base mt-2">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Contact Buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Contact Dano Store to Complete Payment:
          </h3>

          <div className="flex flex-wrap justify-center gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/50 flex items-center gap-2 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact via WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-950/50 flex items-center gap-2 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discord Community</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4 text-cyan-400" />
              <span>TikTok Support</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>
      </div>

      {/* Order Details Summary */}
      {order && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            Order Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Customer Name:</span>
              <strong className="text-slate-100 text-sm">{order.customer?.name}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">Phone Number:</span>
              <strong className="text-slate-100 text-sm">{order.customer?.phone}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">City / Region:</span>
              <strong className="text-slate-100 text-sm">{order.customer?.city}</strong>
            </div>

            <div>
              <span className="text-slate-400 block">Selected Payment Method:</span>
              <strong className="text-cyan-400 text-sm">{order.paymentMethod}</strong>
            </div>
          </div>

          {order.customer?.orderNote && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 block font-semibold">Note / Player ID:</span>
              <span className="text-slate-200 mt-1 block">{order.customer.orderNote}</span>
            </div>
          )}

          {/* Ordered Items */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Ordered Digital Items:</h3>
            <div className="space-y-2">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
                  <div>
                    <strong className="text-slate-100 block">{item.product?.name}</strong>
                    {item.selectedPackage && (
                      <span className="text-slate-400">{item.selectedPackage?.name}</span>
                    )}
                    <span className="text-slate-500 block text-[11px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-cyan-400 text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-base font-black text-white">
            <span>Total IQD Amount:</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Return to Home */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          <span>Return to Dano Store Home</span>
        </Link>
      </div>

    </div>
  );
};
