import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { CheckCircle2, MessageCircle, MessageSquare, Copy, ExternalLink, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useProducts();

  // Retrieve order from state or local storage hook
  const order = location.state?.order || orders.find((o) => o.orderId === orderId);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      alert('Order ID copied to clipboard!');
    }
  };

  const generateWhatsappMsg = () => {
    if (!order) return '';
    const text = `Hello Dano Store! I just created order #${order.orderId}.\n\nCustomer: ${order.customerName}\nPhone: ${order.phone}\nPayment Method: ${order.paymentMethod}\nTotal Amount: ${formatPrice(order.totalAmount)}\n\nPlease send me payment verification details to complete my order!`;
    return `https://wa.me/9647500000000?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Header Success Card */}
      <div className="bg-gradient-to-b from-[#0e1833] to-[#090d1a] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800/60">
            Order Created Successfully
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-slate-100 mt-2">
            Thank You for Shopping at Dano Store!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg mx-auto">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order Number Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Order Number</span>
            <span className="font-mono font-extrabold text-base text-cyan-400">{orderId}</span>
          </div>
          <button
            onClick={copyOrderId}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy ID</span>
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-400" />
          Contact Support to Complete Payment
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Send your Order ID <strong className="text-cyan-400">{orderId}</strong> to our support team on WhatsApp, Discord, or TikTok to receive the payment transfer account and get instant key activation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={generateWhatsappMsg()}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>TikTok Community</span>
          </a>
        </div>
      </div>

      {/* Summary Card */}
      {order && (
        <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
            Order Receipt & Invoice Details
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 block">Customer Name</span>
              <span className="font-bold text-slate-200">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Phone</span>
              <span className="font-bold text-slate-200">{order.phone}</span>
            </div>
            <div>
              <span className="text-slate-500 block">City</span>
              <span className="font-bold text-slate-200">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Selected Payment</span>
              <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
            </div>
          </div>

          {order.orderNote && (
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold block">Order Note / Game ID:</span>
              <p className="text-slate-200 mt-0.5">{order.orderNote}</p>
            </div>
          )}

          {/* Purchased Items */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Ordered Items</span>
            {order.items?.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage product={item.product || item} className="h-full w-full" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-200">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
            <span className="font-bold text-slate-300 text-xs">Total Amount Payable</span>
            <span className="font-black text-xl text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Return to Home CTA */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs transition-all"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
