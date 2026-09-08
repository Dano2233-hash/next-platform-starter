import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const { orders } = useProducts();

  const currentOrder = orders.find((o) => o.id === orderId) || (orders.length > 0 ? orders[0] : null);

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">

      {/* Success Badge Banner */}
      <div className="bg-[#080d1a] border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You For Your Order!
          </h1>
          <p className="text-sm font-bold text-cyan-300 max-w-xl mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Reference Number Box */}
        {orderId && (
          <div className="inline-block bg-[#0d162a] border border-slate-700/80 rounded-2xl px-6 py-3 mt-2">
            <span className="text-xs text-slate-400 uppercase font-medium block">Order Reference ID:</span>
            <span className="text-xl font-black tracking-wider text-cyan-400 select-all">{orderId}</span>
          </div>
        )}
      </div>

      {/* Contact Agent Action Buttons (WhatsApp, Discord, TikTok) */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <PhoneCall className="w-5 h-5 text-cyan-400" />
          <span>Contact Us To Send Payment Receipt</span>
        </h3>
        <p className="text-xs text-slate-300">
          Click any button below to open direct chat with our sales agent. Mention your Order ID: <strong className="text-cyan-400">{orderId}</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20have%20created%20order%20${orderId}%20and%20want%20to%20complete%20payment.`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 font-extrabold text-xs hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-950/40"
          >
            <span>WhatsApp Agent</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 text-indigo-300 font-extrabold text-xs hover:bg-indigo-900 transition-colors shadow-lg shadow-indigo-950/40"
          >
            <span>Discord Support</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 rounded-2xl bg-pink-950/80 border border-pink-700/80 text-pink-300 font-extrabold text-xs hover:bg-pink-900 transition-colors shadow-lg shadow-pink-950/40"
          >
            <span>TikTok Direct</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {currentOrder && (
        <div className="bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            Order Details Breakdown
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">Customer Name</span>
              <span className="font-bold text-white">{currentOrder.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Phone Number</span>
              <span className="font-bold text-white">{currentOrder.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block">City</span>
              <span className="font-bold text-white">{currentOrder.city}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Payment Method</span>
              <span className="font-bold text-cyan-400 uppercase">{currentOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-4 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase block">Purchased Items:</span>
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/40">
                <span className="text-slate-200">
                  {item.productName} {item.packageName ? `(${item.packageName})` : ''} x {item.quantity}
                </span>
                <span className="font-extrabold text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm font-black text-white pt-2">
            <span>Total Payable:</span>
            <span className="text-lg text-cyan-400">{formatPrice(currentOrder.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Return Home Link */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 font-bold text-xs hover:border-cyan-500/50 hover:text-white transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
