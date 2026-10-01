import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';
import {
  CheckCircle2,
  Copy,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Home,
  CreditCard
} from 'lucide-react';

const ORDERS_STORAGE_KEY = 'dano_orders';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();

  // Retrieve order from state or Local Storage
  const orderFromState = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  const order = React.useMemo(() => {
    if (orderFromState) return orderFromState;
    try {
      const savedOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      return savedOrders.find((o) => o.orderId === orderId);
    } catch (e) {
      return null;
    }
  }, [orderFromState, orderId]);

  const handleCopyOrderId = () => {
    if (order?.orderId || orderId) {
      navigator.clipboard.writeText(order?.orderId || orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!order) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
        <h2 className="text-2xl font-extrabold text-white">Order Created</h2>
        <p className="text-sm font-semibold text-cyan-300">Order ID: {orderId}</p>
        <p className="text-xs text-gray-400 max-w-md">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>
        <div className="flex gap-3 pt-2">
          <a
            href="https://wa.me/9647500000000"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-2"
          >
            Contact on WhatsApp
          </a>
          <Link
            to="/"
            className="px-5 py-2.5 bg-gray-800 text-gray-200 font-bold text-xs rounded-xl"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-[#09162e] via-[#081226] to-[#0d0a28] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
            Order Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Created Successfully!
          </h1>
          {/* Exact required message */}
          <p className="text-sm md:text-base font-semibold text-cyan-200 max-w-xl mx-auto leading-relaxed pt-1">
            "Your order has been created successfully. Please contact us to complete the payment."
          </p>
        </div>

        {/* Order Number Box */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-[#050814] border border-gray-700 px-4 py-2.5 rounded-2xl shadow-inner">
            <span className="text-xs font-bold text-gray-400">Order Number:</span>
            <span className="text-lg font-black text-white font-mono">{order.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="p-1.5 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-lg transition-colors"
              title="Copy Order ID"
            >
              <Copy className="w-4 h-4" />
            </button>
            {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied!</span>}
          </div>
        </div>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <CreditCard className="w-5 h-5 text-amber-400" />
          Payment Information & Instructions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-[#050814] rounded-xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-semibold block">Selected Payment Method:</span>
            <span className="text-sm font-extrabold text-cyan-400 uppercase">
              {order.paymentMethod}
            </span>
          </div>

          <div className="p-3.5 bg-[#050814] rounded-xl border border-gray-800 space-y-1">
            <span className="text-gray-400 font-semibold block">Account Info / Transfer Details:</span>
            <span className="text-sm font-mono font-extrabold text-white">
              {order.accountInfo || 'FastPay: 0750 123 4567'}
            </span>
          </div>
        </div>

        <div className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-xl text-xs text-amber-200 leading-relaxed">
          <p className="font-bold mb-1">How to complete your payment:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li>Transfer <strong>{formatPrice(order.totalAmount)}</strong> via {order.paymentMethod}.</li>
            <li>Send the payment screenshot and Order ID (<strong>{order.orderId}</strong>) to our support team on WhatsApp or Discord.</li>
            <li>Your code or top-up will be delivered instantly upon verification!</li>
          </ol>
        </div>
      </div>

      {/* Contact Support Buttons (WhatsApp, Discord, TikTok) */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-3">
          Contact Us To Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store,%20I%20created%20order%20${order.orderId}%20for%20${order.totalAmount}%20IQD.`}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 bg-pink-600 hover:bg-pink-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>TikTok Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Order Items Summary Card */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          Order Summary ({order.items?.length || 0} Items)
        </h3>

        <div className="space-y-3">
          {order.items?.map((item) => (
            <div
              key={item.itemKey}
              className="flex items-center justify-between p-3 bg-[#050814] rounded-xl border border-gray-800 text-xs"
            >
              <div>
                <h4 className="font-bold text-white">{item.productName}</h4>
                {item.packageName && (
                  <span className="text-[10px] text-cyan-400 font-semibold">
                    Package: {item.packageName}
                  </span>
                )}
                <div className="text-[10px] text-gray-400">Qty: {item.quantity}</div>
              </div>
              <span className="font-black text-cyan-300">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-800 flex justify-between items-baseline">
          <span className="text-sm font-bold text-gray-300">Total Paid:</span>
          <span className="text-2xl font-black text-cyan-400">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Return to Home Action */}
      <div className="flex justify-center pt-2">
        <Link
          to="/"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Dano Store Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
