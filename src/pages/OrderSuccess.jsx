import React from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  MessageSquare,
  Send,
  Video,
  Copy,
  ExternalLink,
  ShieldCheck,
  PackageCheck,
  Home,
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const orderFromState = location.state?.order;
  const queryOrderId = searchParams.get('orderId');

  // Fallback order info if visited directly
  const order = orderFromState || {
    orderId: queryOrderId || 'DS-849201',
    customerName: 'Valued Customer',
    phone: '0750 XXX XXXX',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    items: [],
    totalAmount: 0,
    currency: 'IQD',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied "${text}" to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#080e22] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-2">
            Order #{order.orderId}
          </h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto mt-2 leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      {/* Order Details Summary Box */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-cyan-400" /> Order Summary
          </h3>
          <span className="text-xs font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2.5 py-1 rounded-md">
            Pending Payment
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-bold text-slate-200">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="font-bold text-slate-200">{order.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-bold text-slate-200">{order.city}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Selected Payment Method</span>
            <span className="font-black text-cyan-400">{order.paymentMethod}</span>
          </div>
        </div>

        {order.items && order.items.length > 0 && (
          <div className="border-t border-slate-800/80 pt-3 space-y-2">
            <span className="text-xs font-bold text-slate-400">Purchased Items:</span>
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                  {item.packageName && <span className="text-[10px] text-cyan-400 block">{item.packageName}</span>}
                </div>
                <span className="font-black text-cyan-300">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
          <span className="font-extrabold text-slate-100 text-sm">Total Amount Payable</span>
          <span className="font-black text-cyan-300 text-lg">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Official Contact Buttons */}
      <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
        <h3 className="font-bold text-slate-100 text-sm">Contact Us to Finalize Payment</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Send your Order Number <span className="text-cyan-300 font-bold">#{order.orderId}</span> and payment screenshot via one of our official support channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20would%20like%20to%20complete%20payment%20for%20order%20%23${order.orderId}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            WhatsApp
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-950/40"
          >
            <Send className="w-4 h-4 text-indigo-400" />
            Discord
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/40 text-rose-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-950/40"
          >
            <Video className="w-4 h-4 text-rose-400" />
            TikTok
          </a>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition-colors"
        >
          <Home className="w-4 h-4 text-cyan-400" /> Back to Home Page
        </Link>
      </div>
    </div>
  );
}
