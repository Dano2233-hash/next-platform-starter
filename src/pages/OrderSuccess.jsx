import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, MessageCircle, MessageSquare, Send, Copy, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!order) {
      try {
        const savedRaw = localStorage.getItem('dano_orders');
        if (savedRaw) {
          const parsed = JSON.parse(savedRaw);
          const found = parsed.find((o) => o.orderId === orderId);
          if (found) {
            setOrder(found);
          }
        }
      } catch (e) {
        console.error('Error fetching order', e);
      }
    }
  }, [orderId, order]);

  const handleCopyOrderId = () => {
    if (orderId && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappNumber = '9647501234567'; // Sample contact number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello Dano Store! I created order #${orderId || ''}. Please help me complete the payment.`
  )}`;

  return (
    <div className="max-w-3xl mx-auto space-y-8 my-8">
      {/* Top Banner Card */}
      <div className="bg-[#090d1a] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
          Order Created Successfully!
        </h1>

        {/* Required Message */}
        <p className="text-sm sm:text-base text-cyan-300 font-semibold bg-cyan-950/40 border border-cyan-800/60 p-4 rounded-2xl max-w-xl mx-auto">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order Number Badge */}
        <div className="inline-flex items-center gap-3 bg-[#05070f] border border-slate-800 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono">
          <span className="text-slate-400">Order ID:</span>
          <span className="font-bold text-cyan-400">{orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="text-slate-400 hover:text-white p-1"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>}
        </div>
      </div>

      {/* Contact Channels Section */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-cyan-400" />
          <span>Contact Us to Complete Payment</span>
        </h3>
        <p className="text-xs text-slate-400">
          Send your Order ID <strong className="text-cyan-400">{orderId}</strong> to one of our official support channels below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-indigo-400" />
            <span>Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-xs transition-all"
          >
            <Send className="w-4 h-4 fill-rose-400" />
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Details Summary */}
      {order && (
        <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800">
            Order Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Customer Name</span>
              <span className="font-bold text-slate-200">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Phone Number</span>
              <span className="font-bold text-slate-200">{order.phoneNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block">City</span>
              <span className="font-bold text-slate-200">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Payment Method</span>
              <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase text-slate-400 block">Purchased Items</span>
            {order.items &&
              order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#05070f] border border-slate-800"
                >
                  <div>
                    <span className="font-bold text-slate-200">{item.productName}</span>
                    {item.packageName && (
                      <span className="text-cyan-400 font-semibold block text-[10px]">
                        Pkg: {item.packageName}
                      </span>
                    )}
                  </div>
                  <span className="font-bold text-cyan-300">
                    {item.quantity} x {formatPrice(item.price)}
                  </span>
                </div>
              ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black text-slate-100">
            <span>Total Amount</span>
            <span className="text-cyan-300">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Return Home Button */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-extrabold text-xs transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
