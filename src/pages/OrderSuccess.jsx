import React from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const urlOrderId = searchParams.get('orderId');
  const locationOrder = location.state?.order;

  const order = React.useMemo(() => {
    if (locationOrder) return locationOrder;
    if (urlOrderId) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
        return savedOrders.find((o) => o.orderId === urlOrderId) || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [locationOrder, urlOrderId]);

  const displayOrderId = order?.orderId || urlOrderId || 'DANO-10002';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-[#0b101c] p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Order #{displayOrderId}</h1>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm text-cyan-200 font-semibold leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      {order && (
        <div className="bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Customer</span>
              <strong className="text-slate-200">{order.customerName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Phone</span>
              <strong className="text-slate-200">{order.phoneNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">City</span>
              <strong className="text-slate-200">{order.city}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Method</span>
              <strong className="text-cyan-400 font-bold">{order.paymentMethod}</strong>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 block">Purchased Items:</span>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-[#080d17] border border-slate-800/80"
              >
                <div>
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="text-cyan-400 ml-2 font-semibold">({item.packageName})</span>
                  <span className="text-slate-400 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-extrabold text-slate-200">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-300">Total Price (IQD)</span>
            <span className="text-xl font-black text-cyan-400">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      )}

      <div className="bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Contact Us to Confirm Payment
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Send your order ID <strong className="text-white">#{displayOrderId}</strong> to our official customer support channels to verify your transfer and receive instant fulfillment.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store, I made an order #${displayOrderId}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors shadow-lg shadow-indigo-950/40"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>

          <a
            href="https://tiktok.com/@danostore.iq"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-700"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>TikTok @danostore</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
