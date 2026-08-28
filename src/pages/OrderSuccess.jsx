import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import ProductImage from '../components/ProductImage';
import {
  CheckCircle2,
  MessageSquare,
  Share2,
  ShoppingBag,
  ArrowRight,
  Send,
  PhoneCall,
  Copy,
  Check
} from 'lucide-react';

export function OrderSuccess() {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const found = savedOrders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      } else if (savedOrders.length > 0) {
        setOrder(savedOrders[0]);
      }
    } catch (e) {
      console.error('Failed to load order details', e);
    }
  }, [orderId]);

  const paymentDetails = order
    ? PAYMENT_METHODS.find((m) => m.id === order.paymentMethod) || PAYMENT_METHODS[0]
    : PAYMENT_METHODS[0];

  const handleCopyOrderNumber = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed an order.\n\nOrder Number: ${order?.orderId || orderId}\nCustomer: ${order?.customerName || ''}\nPhone: ${order?.phone || ''}\nTotal: ${formatPrice(order?.totalAmount || 0)}\nPayment Method: ${paymentDetails.name}`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      {/* Success Card Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center mx-auto text-cyan-400 shadow-xl shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-widest">
            Order Placed
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Thank You for Your Order!</h1>

          {/* EXACT MANDATED MESSAGE FROM PROMPT */}
          <p className="text-sm font-semibold text-cyan-300 max-w-lg mx-auto leading-relaxed pt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Number Box */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs">
            <span className="text-slate-400 font-medium">Order Number:</span>
            <span className="font-mono font-black text-cyan-400 text-sm tracking-wider">
              {order?.orderId || orderId}
            </span>
            <button
              onClick={handleCopyOrderNumber}
              className="p-1 hover:text-cyan-400 text-slate-400 transition-colors cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Contact Buttons (WhatsApp, Discord, TikTok) */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white text-center">
          Contact Support to Complete Payment & Receive Code
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>WhatsApp Contact</span>
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/40 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Discord Community</span>
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Selected Payment Instructions */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Payment Method Instructions
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-cyan-400">{paymentDetails.name}</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300">
              {paymentDetails.badge}
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-1 pt-1">
            <p className="font-mono text-cyan-300 font-bold text-sm">{paymentDetails.accountNumber}</p>
            <p className="text-slate-400 leading-relaxed">{paymentDetails.instructions}</p>
          </div>
        </div>
      </div>

      {/* Order Items & Customer Details Summary */}
      {order && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            Order Details Summary
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
            <div>
              <span className="block font-medium">Customer Name</span>
              <span className="text-slate-200 font-bold">{order.customerName}</span>
            </div>
            <div>
              <span className="block font-medium">Phone Number</span>
              <span className="text-slate-200 font-bold">{order.phone}</span>
            </div>
            <div>
              <span className="block font-medium">City</span>
              <span className="text-slate-200 font-bold">{order.city}</span>
            </div>
            <div>
              <span className="block font-medium">Total Amount</span>
              <span className="text-cyan-400 font-black">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {/* Items list */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-800">
                    <ProductImage product={item.product} height="h-10" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-200">{item.product?.name}</h5>
                    <span className="text-cyan-400 font-medium text-[11px]">{item.selectedPackage?.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                  <span className="block text-[10px] text-slate-500">Qty: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
}

export default OrderSuccess;
