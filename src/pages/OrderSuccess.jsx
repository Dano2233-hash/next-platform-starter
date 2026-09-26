import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  Send,
  Home,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  CreditCard,
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const lastOrder = localStorage.getItem('dano_last_order');
      if (lastOrder) {
        const parsed = JSON.parse(lastOrder);
        if (!orderId || parsed.orderId === orderId) {
          setOrder(parsed);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  const displayOrderId = orderId || (order ? order.orderId : 'DS-884920');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayOrderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I would like to complete payment for Order #${displayOrderId}. Total: ${order ? formatPrice(order.totalAmount) : ''}`
  );
  const whatsappUrl = `https://wa.me/9647500000000?text=${whatsappMessage}`;
  const discordUrl = `https://discord.gg/danostore`;
  const tiktokUrl = `https://tiktok.com/@danostore`;

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-950 via-[#07131b] to-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
            Order #{displayOrderId}
          </h1>
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Copy Order ID button */}
        <div className="pt-2">
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-700 hover:border-cyan-400 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 cursor-pointer transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
            <span>{copied ? 'Order Number Copied!' : 'Copy Order Number'}</span>
          </button>
        </div>
      </div>

      {/* Social Contact Buttons Section */}
      <div className="bg-[#090f22] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider text-center">
          Contact Us to Complete Payment &amp; Receive Code
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all hover:scale-102"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/50 transition-all hover:scale-102"
          >
            <Send className="w-5 h-5" />
            <span>Discord Community</span>
          </a>

          {/* TikTok */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-pink-950/50 transition-all hover:scale-102"
          >
            <ExternalLink className="w-5 h-5" />
            <span>TikTok Page</span>
          </a>
        </div>
      </div>

      {/* Order Details Breakdown */}
      {order && (
        <div className="bg-[#090f22] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3">
            Order Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">Customer Name:</span>
              <span className="font-bold text-slate-100">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Phone Number:</span>
              <span className="font-bold text-slate-100">{order.phone}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">City:</span>
              <span className="font-bold text-slate-100">{order.city}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Payment Method:</span>
              <span className="font-bold text-cyan-400 uppercase">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-800">
            <h4 className="font-bold text-slate-300 text-xs uppercase">Purchased Items</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-100 block">{item.productName}</span>
                    <span className="text-[11px] text-cyan-400 font-semibold">{item.packageName} x {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-slate-200">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-800 font-black text-sm">
            <span className="text-slate-200">Total Amount Due:</span>
            <span className="text-cyan-400 text-xl">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-xs hover:text-white flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
