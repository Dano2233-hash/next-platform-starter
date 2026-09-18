import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { ProductImage } from '../components/ProductImage';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  MessageSquare,
  Share2,
  ArrowRight,
  ShoppingBag,
  Clock,
  Phone,
  User,
  MapPin,
  FileText
} from 'lucide-react';

export function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const orderIdFromQuery = searchParams.get('orderId');

  const [order, setOrder] = useState(() => {
    if (location.state && location.state.order) {
      return location.state.order;
    }
    if (orderIdFromQuery) {
      try {
        const saved = localStorage.getItem('dano_orders');
        if (saved) {
          const orders = JSON.parse(saved);
          const found = orders.find((o) => o.orderId === orderIdFromQuery);
          if (found) return found;
        }
      } catch (e) {
        console.error('Failed to load order from storage:', e);
      }
    }
    return null;
  });

  const [copiedId, setCopiedId] = useState(false);

  const displayOrderId = order ? order.orderId : orderIdFromQuery || 'DS-00000';

  const handleCopyId = () => {
    navigator.clipboard.writeText(displayOrderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const paymentMethodNames = {
    fastpay: 'FastPay',
    korek: 'Korek Telecom',
    mastercard: 'MasterCard / FIB / Local Card'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 pb-16">

      {/* Success Banner Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-slate-900 border border-cyan-500/30 px-3 py-1 rounded-full inline-block">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Thank You For Your Order!
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
            Your order has been created successfully. Please contact us to complete the payment and receive your digital codes instantly.
          </p>
        </div>

        {/* Order ID Tag */}
        <div className="inline-flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-inner mt-2">
          <span className="text-xs font-bold text-slate-400">Order Reference:</span>
          <span className="text-base font-black text-cyan-400 font-mono tracking-wider">{displayOrderId}</span>
          <button
            onClick={handleCopyId}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

        {copiedId && (
          <p className="text-emerald-400 text-xs font-bold animate-fade-in">
            Order ID copied!
          </p>
        )}
      </div>

      {/* Payment Action Instructions */}
      <div className="bg-[#090d16] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-lg sm:text-xl font-extrabold text-white flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Complete Your Manual Payment</span>
          </h2>
          <p className="text-xs text-slate-300 max-w-lg mx-auto">
            Click one of the official contact buttons below to send your Order ID <strong className="text-cyan-400">{displayOrderId}</strong> to our customer support team for instant verification.
          </p>
        </div>

        {/* Social / Contact CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(
              `Hello Dano Store! I want to complete payment for Order ID: ${displayOrderId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl border border-slate-700 shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      {/* Order Details Overview */}
      {order && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* Left: Customer Info */}
          <div className="md:col-span-5 bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
              Customer Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <User className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Name</span>
                  <span className="font-bold text-white">{order.customerName}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Phone</span>
                  <span className="font-bold text-white">{order.phoneNumber}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">City</span>
                  <span className="font-bold text-white">{order.city}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <ShoppingBag className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Selected Payment Method</span>
                  <span className="font-extrabold text-cyan-400">
                    {paymentMethodNames[order.paymentMethod] || order.paymentMethod}
                  </span>
                </div>
              </div>

              {order.orderNote && (
                <div className="flex items-start gap-2.5 text-slate-300 pt-2 border-t border-slate-800">
                  <FileText className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Player ID / Note</span>
                    <span className="font-medium text-slate-200">{order.orderNote}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Items Purchased */}
          <div className="md:col-span-7 bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Ordered Items</span>
              <span className="text-cyan-400 font-mono text-sm">{formatPrice(order.totalPrice)}</span>
            </h3>

            <div className="space-y-3 text-xs">
              {order.items && order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden bg-slate-950">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        category={item.category}
                        platform={item.platform}
                        heightClass="h-10"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white truncate text-xs">{item.name}</h4>
                      <p className="text-[10px] text-cyan-400">Pkg: {item.packageName} x{item.quantity}</p>
                    </div>
                  </div>

                  <span className="font-bold text-white shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm font-black">
              <span className="text-slate-300">Total IQD:</span>
              <span className="text-cyan-400 text-base">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>

        </div>
      )}

      {/* Return Button */}
      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Continue Shopping</span>
        </Link>
      </div>

    </div>
  );
}
