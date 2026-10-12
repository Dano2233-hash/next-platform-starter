import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  ExternalLink,
  ShoppingBag,
  Home
} from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    alert(`Order ID ${order.id} copied to clipboard!`);
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store! I have created Order #${order.id} for ${formatPrice(
      order.totalAmount
    )}. Customer: ${order.customerName} (${order.phone}). Payment Method: ${order.paymentMethod}.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Banner Success Notice */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-green-500 to-cyan-400 p-0.5 mx-auto shadow-lg shadow-cyan-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
          Order Created Successfully!
        </h1>

        <p className="text-xs sm:text-sm text-cyan-300 font-semibold max-w-lg mx-auto bg-cyan-950/60 border border-cyan-800/60 py-3 px-4 rounded-2xl">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Order ID:</span>
          <span className="text-cyan-400 font-bold">{order.id}</span>
          <button
            onClick={copyOrderId}
            className="p-1 hover:text-white text-slate-400 transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Support & Contact Buttons */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-slate-100 text-center">
          Contact Us to Finalize FastPay, Korek, or MasterCard Transfer
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Direct
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
          >
            <ExternalLink className="w-5 h-5" />
            Discord Community
          </a>

          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <ExternalLink className="w-5 h-5" />
            TikTok Official
          </a>
        </div>
      </div>

      {/* Order Summary & Details */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
          Order Summary & Payment Instructions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              Customer Details
            </h5>
            <p className="text-slate-200">
              <strong className="text-slate-400">Name:</strong> {order.customerName}
            </p>
            <p className="text-slate-200">
              <strong className="text-slate-400">Phone:</strong> {order.phone}
            </p>
            <p className="text-slate-200">
              <strong className="text-slate-400">City:</strong> {order.city}
            </p>
            {order.orderNote && (
              <p className="text-slate-200">
                <strong className="text-slate-400">Note / Player ID:</strong> {order.orderNote}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
              Payment Method Chosen
            </h5>
            <span className="inline-block px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold">
              {order.paymentMethod}
            </span>
            <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
              Please transfer <strong className="text-slate-200">{formatPrice(order.totalAmount)}</strong> to our official {order.paymentMethod} number and send screenshot confirmation on WhatsApp.
            </p>
          </div>
        </div>

        {/* Purchased Items Table */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <h5 className="font-bold text-slate-400 uppercase tracking-wider text-[11px]">
            Items Ordered
          </h5>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs"
              >
                <div>
                  <span className="font-bold text-slate-100">{item.product.name}</span>
                  {item.selectedPackage && (
                    <span className="text-cyan-400 font-semibold block text-[11px]">
                      Package: {item.selectedPackage.name}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-[11px]">
                    {formatPrice(item.price)} x {item.quantity}
                  </span>
                  <span className="font-bold text-cyan-400 block">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-4 text-slate-100 font-bold text-base">
          <span>Total Paid Amount:</span>
          <span className="text-xl font-black text-cyan-400">
            {formatPrice(order.totalAmount)}
          </span>
        </div>
      </div>

      {/* Action Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" /> Return to Home
        </Link>
        <Link
          to="/products"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}
