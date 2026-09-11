import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Video,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  ShoppingBag,
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dano_last_order');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!orderIdFromUrl || parsed.orderId === orderIdFromUrl) {
          setOrder(parsed);
        }
      } catch (e) {
        console.error('Failed to parse last order', e);
      }
    }
  }, [orderIdFromUrl]);

  const displayOrderId = order?.orderId || orderIdFromUrl || 'DANO-SUCCESS';

  const copyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(displayOrderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${displayOrderId}. Customer Name: ${
      order?.customerName || ''
    }, Total: ${order ? formatPrice(order.totalPrice) : ''}. Payment Method: ${
      order?.paymentMethod || 'FastPay'
    }. Please confirm my payment!`
  );

  return (
    <div className="max-w-3xl mx-auto my-8 space-y-8 pb-16">

      {/* Success Hero Box */}
      <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mx-auto text-slate-950 shadow-xl shadow-cyan-500/30">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-md mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Your Order Number
            </span>
            <span className="text-xl font-black text-white tracking-wider">{displayOrderId}</span>
          </div>

          <button
            onClick={copyOrderId}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Contact Buttons */}
        <div className="pt-2 space-y-3">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Contact Support via:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Discord</span>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-400 font-bold text-xs flex items-center justify-center gap-2 border border-pink-500/30 transition-all"
            >
              <Video className="w-4 h-4" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 space-y-5">
          <h3 className="font-extrabold text-white text-lg border-b border-slate-800 pb-3">
            Order Details & Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Customer Name</span>
              <span className="text-white font-extrabold text-sm">{order.customerName}</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Phone Number</span>
              <span className="text-white font-extrabold text-sm">{order.phone}</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Selected Payment Method</span>
              <span className="text-cyan-400 font-extrabold text-sm">{order.paymentMethod}</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">City / Region</span>
              <span className="text-white font-extrabold text-sm">{order.city}</span>
            </div>
          </div>

          {order.orderNote && (
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-bold block uppercase text-[10px] mb-1">Player ID / Order Note</span>
              <p className="text-slate-200 font-medium">{order.orderNote}</p>
            </div>
          )}

          {/* Items Purchased */}
          <div className="space-y-2 pt-2">
            <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Items Ordered:</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="font-bold text-white block">{item.name}</span>
                    {item.selectedPackage && (
                      <span className="text-[11px] text-cyan-400 font-semibold">{item.selectedPackage}</span>
                    )}
                    <span className="text-slate-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-black text-cyan-400 text-sm">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-base font-black">
            <span className="text-white">Total Amount Paid / Due:</span>
            <span className="text-cyan-400 text-xl">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      )}

      {/* Return to home action */}
      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
