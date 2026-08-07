import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Trophy, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      const stored = localStorage.getItem('dano_orders');
      if (stored) {
        try {
          const orders = JSON.parse(stored);
          const found = orders.find((o) => o.orderId === orderId);
          if (found) {
            setOrder(found);
          }
        } catch (e) {
          console.error('Error reading order for success page', e);
        }
      }
    }
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success Banner Card */}
      <div className="bg-[#0a0a14] border border-slate-900 rounded-2xl p-6 sm:p-10 text-center space-y-6 shadow-[0_0_40px_rgba(34,197,94,0.05)]">
        <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Order Created!
          </h1>
          <p className="text-sm font-bold text-slate-300">
            Order ID: <span className="text-cyan-400 font-extrabold">{orderId || 'DS-XXXXXX'}</span>
          </p>
        </div>

        {/* REQUIRED MESSAGE */}
        <div className="bg-slate-950/80 p-5 rounded-lg border border-slate-900 max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-slate-200 font-bold leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Contact CTA buttons */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Contact Us via our networks</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href="https://wa.me/9640000000"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase text-xs tracking-wider py-3 px-4 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black uppercase text-xs tracking-wider py-3 px-4 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Discord</span>
            </a>
            <a
              href="https://tiktok.com/@danostore"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black uppercase text-xs tracking-wider py-3 px-4 rounded-lg transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>

      {/* Order Invoice Details summary */}
      {order && (
        <div className="bg-[#0a0a14] border border-slate-900 rounded-xl p-6 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 border-b border-slate-900 pb-3">
            Order Receipt Details
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
            <div>
              <span className="block font-bold text-slate-500">Customer Name</span>
              <span className="text-white font-medium">{order.customerName}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-500">Phone Number</span>
              <span className="text-white font-medium">{order.phone}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-500">City / Location</span>
              <span className="text-white font-medium">{order.city}</span>
            </div>
            <div>
              <span className="block font-bold text-slate-500">Payment Method</span>
              <span className="text-cyan-400 font-extrabold uppercase">{order.paymentMethod}</span>
            </div>
            {order.note && (
              <div className="col-span-2">
                <span className="block font-bold text-slate-500">Notes / Instructions</span>
                <span className="text-slate-200 block bg-slate-950 p-2.5 rounded border border-slate-900 mt-1">{order.note}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-900 pt-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Ordered Items</h4>
            <div className="space-y-2.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <div>
                    <span className="text-white font-bold">{item.productName}</span>
                    <span className="text-slate-500 block uppercase text-[10px]">{item.platform} • {item.packageName} (x{item.quantity})</span>
                  </div>
                  <span className="text-slate-300 font-bold">
                    {formatPrice(item.packagePrice * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-slate-900 pt-2.5 flex justify-between text-xs font-black">
                <span className="text-white uppercase tracking-wider">Estimated Price Due</span>
                <span className="text-cyan-400 text-sm">{formatPrice(order.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Home CTA */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
