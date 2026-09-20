import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  Send,
  Video,
  ShoppingBag,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Try loading order details from sessionStorage or localStorage
    try {
      const latest = sessionStorage.getItem('dano_latest_order');
      if (latest) {
        const parsed = JSON.parse(latest);
        if (parsed.orderId === id) {
          setOrder(parsed);
          return;
        }
      }

      const allOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const found = allOrders.find((o) => o.orderId === id);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error('Failed to load order', e);
    }
  }, [id]);

  const copyOrderId = () => {
    navigator.clipboard.writeText(id || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created an order.\n\nOrder Number: ${id}\nName: ${order?.customer?.name || ''}\nPayment Method: ${order?.customer?.paymentMethodName || ''}\nTotal: ${order?.totalPrice ? formatPrice(order.totalPrice) : ''}\n\nPlease help me complete the payment.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 pt-6">

      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Thank You For Ordering At Dano Store!
          </h1>
        </div>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-3 bg-slate-950/80 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-sm font-mono font-bold text-slate-200">
          <span>Order #: <strong className="text-cyan-300">{id}</strong></span>
          <button
            onClick={copyOrderId}
            className="p-1 hover:text-cyan-400 text-slate-400 transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>}
        </div>

        {/* Mandatory Message Notice */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-xs text-slate-200 text-center font-medium max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </div>
      </div>

      {/* Selected Payment Method Info & Instructions */}
      {order && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
          <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400" />
            Selected Payment Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400">Customer Name:</span>
              <p className="font-bold text-slate-100">{order.customer?.name}</p>
            </div>
            <div>
              <span className="text-slate-400">Phone Number:</span>
              <p className="font-bold text-slate-100">{order.customer?.phone}</p>
            </div>
            <div>
              <span className="text-slate-400">Selected Method:</span>
              <p className="font-bold text-cyan-400">{order.customer?.paymentMethodName}</p>
            </div>
            <div>
              <span className="text-slate-400">Total Amount Due:</span>
              <p className="font-bold text-cyan-300 text-sm">{formatPrice(order.totalPrice)}</p>
            </div>
          </div>

          {order.customer?.paymentDetails && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Manual Transfer Info:</span>
              <div className="font-mono text-cyan-300 font-bold">{order.customer.paymentDetails}</div>
            </div>
          )}
        </div>
      )}

      {/* Contact Channels Section */}
      <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100">
          Contact Support To Confirm Payment
        </h3>
        <p className="text-xs text-slate-400">
          Click any button below to send your Order ID ({id}) to our team on WhatsApp, Discord, or TikTok:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            WhatsApp Support
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Send className="w-4 h-4 text-indigo-400" />
            Discord Community
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-pink-950/80 hover:bg-pink-900/80 border border-pink-500/40 text-pink-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Video className="w-4 h-4 text-pink-400" />
            TikTok Official
          </a>
        </div>
      </div>

      {/* Order Items Detail */}
      {order && order.items && (
        <div className="p-6 rounded-2xl bg-[#080d1a] border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-slate-200">Purchased Items Summary</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                  <span className="text-slate-400 ml-2">({item.selectedPackageName} × {item.quantity})</span>
                </div>
                <span className="font-bold text-cyan-300">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Continue Shopping
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
