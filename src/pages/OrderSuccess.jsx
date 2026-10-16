import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';
import {
  CheckCircle2,
  Copy,
  MessageSquare,
  Phone,
  Share2,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentDetails = () => {
    switch (order.customer.paymentMethod) {
      case 'FastPay':
        return {
          number: '0750 888 2233',
          name: 'Dano Store FastPay',
          instructions: 'Send the exact total amount to FastPay account below and share payment screenshot on WhatsApp or Discord.'
        };
      case 'Korek':
        return {
          number: '0750 888 2233',
          name: 'Dano Store Korek Cash',
          instructions: 'Transfer the exact total amount to our Korek Cash number and contact us with transaction details.'
        };
      case 'MasterCard':
        return {
          number: 'FIB / MasterCard: 1002 8849 2201',
          name: 'Dano Digital Gaming',
          instructions: 'Transfer the total amount via FIB or MasterCard app and send receipt screenshot.'
        };
      default:
        return {
          number: '0750 888 2233',
          name: 'Dano Store Support',
          instructions: 'Contact us on WhatsApp or Discord to finalize manual transfer.'
        };
    }
  };

  const paymentDetails = getPaymentDetails();

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created Order #${order.id}.\nName: ${order.customer.name}\nTotal: ${order.totalPrice} IQD\nPayment Method: ${order.customer.paymentMethod}`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-[#080d1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl shadow-cyan-950/20">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest block">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 mt-1">
            Order Number: <span className="text-cyan-400">{order.id}</span>
          </h1>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs font-bold text-slate-300">
          <span>Order ID: {order.id}</span>
          <button
            onClick={handleCopyOrderId}
            className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-emerald-400 text-[10px]">Copied!</span>}
        </div>

        {/* Required Message */}
        <p className="text-sm font-semibold text-amber-300 bg-amber-950/40 border border-amber-800/50 p-3.5 rounded-2xl max-w-xl mx-auto">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Payment Transfer Instructions */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShieldAlert className="w-5 h-5 text-amber-400" />
          Payment Instructions ({order.customer.paymentMethod})
        </h3>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2">
          <p className="text-xs text-slate-300">{paymentDetails.instructions}</p>
          <div className="pt-2">
            <span className="text-[11px] text-slate-500 block uppercase font-bold">Transfer To:</span>
            <span className="text-lg font-black text-cyan-400 font-mono">{paymentDetails.number}</span>
            <span className="text-xs text-slate-400 block font-medium">Account: {paymentDetails.name}</span>
          </div>
        </div>
      </div>

      {/* Official Contact Buttons */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100">
          Contact Us to Confirm Payment
        </h3>
        <p className="text-xs text-slate-400">
          Click one of the official channels below to send your transfer screenshot:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-extrabold text-xs transition-colors shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp Support
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors shadow-md"
          >
            <Phone className="w-4 h-4" />
            Discord Ticket
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-extrabold text-xs transition-colors shadow-md"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            TikTok Direct
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-slate-100 border-b border-slate-800 pb-3">
          Order Summary & Customer Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-bold text-slate-200">{order.customer.name}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="font-bold text-slate-200">{order.customer.phone}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-bold text-slate-200">{order.customer.city}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Payment Method</span>
            <span className="font-bold text-cyan-400">{order.customer.paymentMethod}</span>
          </div>
        </div>

        {order.customer.note && (
          <div className="text-xs bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-500 block">Order Note / Player ID:</span>
            <span className="font-bold text-slate-200">{order.customer.note}</span>
          </div>
        )}

        {/* Ordered items list */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 block">Purchased Items:</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/40 p-2.5 rounded-xl border border-slate-800">
              <div>
                <span className="font-bold text-slate-200">{item.product.name}</span>
                {item.selectedPackage && (
                  <span className="text-cyan-400 block text-[11px]">
                    {item.selectedPackage.name} (x{item.quantity})
                  </span>
                )}
              </div>
              <span className="font-black text-slate-100">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center text-sm font-black text-slate-100 pt-2 border-t border-slate-800">
            <span>Total Price</span>
            <span className="text-cyan-400 text-lg">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-slate-700 transition-colors"
        >
          Return to Store Homepage
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
