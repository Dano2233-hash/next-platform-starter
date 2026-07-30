import React from 'react';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle, PhoneCall, MessageCircle, Send, Video, ArrowRight, Gamepad2 } from 'lucide-react';

export default function OrderSuccess({ order, navigate }) {
  // If visited without a recent order, fallback to past orders or show a nice placeholder
  if (!order) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-500 mx-auto">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Active Order Found</h2>
        <p className="text-xs text-zinc-500">Go back to the store homepage to browse and make a new purchase.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs"
        >
          Back to Store
        </button>
      </div>
    );
  }

  // Format date
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 text-left animate-fadeIn">

      {/* Visual Header Success Badge */}
      <div className="bg-[#0b0c15] border border-white/5 rounded-3xl p-6 md:p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto shadow-lg">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-1.5">
          <span className="text-[10px] font-black tracking-widest text-[#00e5ff] uppercase bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/20">
            Order Created Successfully
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase mt-2">THANK YOU FOR YOUR ORDER!</h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Your order has been created successfully. <strong className="text-white">Please contact us to complete the payment.</strong>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* Left Side: Order details */}
        <div className="bg-[#0d0d12] border border-white/5 p-6 rounded-3xl space-y-5">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-3">Order Invoice Details</h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500">Invoice Number:</span>
              <span className="font-black text-[#00e5ff]">{order.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Date Created:</span>
              <span className="text-white font-semibold">{orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Customer Name:</span>
              <span className="text-white font-semibold">{order.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Contact Phone:</span>
              <span className="text-white font-semibold">{order.customer.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Manual Payment:</span>
              <span className="text-amber-400 font-bold uppercase">{order.paymentMethod}</span>
            </div>
            {order.customer.note && (
              <div className="flex flex-col gap-1 pt-1 text-left bg-white/[0.01] p-2.5 rounded-xl border border-white/[0.03]">
                <span className="text-zinc-600 font-bold uppercase text-[10px]">Customer Notes:</span>
                <span className="text-zinc-400 italic leading-relaxed text-[11px]">{order.customer.note}</span>
              </div>
            )}
          </div>

          {/* Items Summary list */}
          <div className="border-t border-white/5 pt-4 space-y-2.5">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Selected Products</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs items-start">
                <div className="text-zinc-400 text-left">
                  <span className="font-bold text-white">{item.name}</span>
                  <div className="text-[10px] text-zinc-500 mt-0.5">
                    {item.packageName ? `${item.packageName} • ` : ''}Qty {item.quantity}
                  </div>
                </div>
                <span className="font-bold text-[#00e5ff]">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-white/5 pt-4 flex justify-between text-sm font-black text-white">
              <span>Total Invoice Amount:</span>
              <span className="text-base text-[#00e5ff]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact / Help Buttons */}
        <div className="bg-[#0d0d12] border border-white/5 p-6 rounded-3xl space-y-6">
          <div className="text-left space-y-1">
            <h3 className="text-xs font-black text-white uppercase tracking-widest">Connect to Complete Transfer</h3>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Send your Order ID <strong className="text-white">{order.orderId}</strong> to any of our social channels below to receive manual payment details and instant activation!
            </p>
          </div>

          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20just%20placed%20order%20${order.orderId}%20and%20want%20to%20complete%20the%20payment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-500/40 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-white block">WhatsApp Channel</span>
                  <span className="text-[10px] text-zinc-500">Safe, automated local support</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-indigo-950/20 hover:bg-indigo-950/40 border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Send className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-white block">Discord Server</span>
                  <span className="text-[10px] text-zinc-500">Join Kurdistan's gamer guild</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@danostore.js"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 bg-pink-950/20 hover:bg-pink-950/40 border border-pink-500/20 hover:border-pink-500/40 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                  <Video className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-black text-white block">TikTok Profile</span>
                  <span className="text-[10px] text-zinc-500">Live gameplay & discount streams</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="border-t border-white/5 pt-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-white/5 hover:bg-white/10 text-white text-xs font-black py-3.5 rounded-xl uppercase tracking-wider transition-colors"
            >
              Back to Store Home
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
