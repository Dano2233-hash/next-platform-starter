import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, MessageSquare, ExternalLink, ShieldCheck, Copy, ShoppingBag, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();

  // Retrieve order details passed via router state or LocalStorage fallback
  let order = location.state?.order;

  if (!order && orderId) {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      order = savedOrders.find((o) => o.orderId === orderId);
    } catch (e) {
      console.error(e);
    }
  }

  const handleCopyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      alert(`Order number ${orderId} copied to clipboard!`);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-20 flex-1 w-full">

        {/* Success Header Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">

          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800/60">
              Order Registered
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight mt-3">
              Order Reference #{orderId || 'DS-00000'}
            </h1>

            {/* Required Message */}
            <p className="text-sm sm:text-base text-cyan-300 font-extrabold mt-3 max-w-xl mx-auto leading-relaxed bg-cyan-950/40 p-4 rounded-2xl border border-cyan-800/40">
              “Your order has been created successfully. Please contact us to complete the payment.”
            </p>
          </div>

          <button
            onClick={handleCopyOrderId}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700"
          >
            <Copy className="w-4 h-4 text-cyan-400" />
            <span>Copy Order ID #{orderId}</span>
          </button>

          {/* Contact Support Buttons (WhatsApp, Discord, TikTok) */}
          <div className="pt-4 border-t border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Contact Support To Finalize Payment
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hello Dano Store, I created order #${orderId}. Please send payment details.`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Contact</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Discord */}
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Discord Community</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>TikTok Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Order Details Summary Card */}
        {order && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-base font-black text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Information Summary
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Customer Name</span>
                <span className="font-bold text-slate-200 mt-0.5 block">{order.customerName}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Phone Number</span>
                <span className="font-bold text-slate-200 mt-0.5 block">{order.phone}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">City</span>
                <span className="font-bold text-slate-200 mt-0.5 block">{order.city}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">Payment Method</span>
                <span className="font-extrabold text-cyan-400 mt-0.5 block uppercase">
                  {order.paymentMethod}
                </span>
              </div>
            </div>

            {/* Purchased items */}
            <div>
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-3">
                Purchased Digital Items
              </h4>
              <div className="space-y-2">
                {order.items && order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-200 block">{item.name}</span>
                      <span className="text-[10px] text-slate-400">
                        Qty: {item.quantity} {item.selectedPackage ? `(${item.selectedPackage.name})` : ''}
                      </span>
                    </div>
                    <span className="font-extrabold text-cyan-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="font-extrabold text-slate-200 text-sm">Total Price</span>
              <span className="text-xl font-black text-cyan-300">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 font-extrabold text-xs transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Dano Store Home</span>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
};
