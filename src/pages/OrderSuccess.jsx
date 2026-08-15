import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice.js';
import { CheckCircle2, Copy, Check, MessageSquare, ExternalLink, ShieldAlert, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPaymentDetails = () => {
    switch (order.customer.paymentMethod) {
      case 'fastpay':
        return {
          title: 'FastPay Mobile Wallet',
          accountNumber: '0750 123 4567',
          accountName: 'Dano Digital Store',
          instructions: 'Send exact total amount to FastPay number above. Send receipt screenshot via WhatsApp.'
        };
      case 'korek':
        return {
          title: 'Korek Telecom Balance Transfer',
          accountNumber: '0750 987 6543',
          accountName: 'Dano Store Korek',
          instructions: 'Transfer credit to Korek number above. Send transaction message via WhatsApp.'
        };
      case 'mastercard':
        return {
          title: 'MasterCard / FIB Local Bank',
          accountNumber: 'IBAN: IQ99 FIBK 0000 1234 5678 90',
          accountName: 'Dano Store Trading',
          instructions: 'Transfer funds via FIB or local MasterCard app. Send transfer receipt via WhatsApp.'
        };
      default:
        return {
          title: 'Manual Transfer',
          accountNumber: '0750 123 4567',
          accountName: 'Dano Store Support',
          instructions: 'Please contact us via WhatsApp to complete payment.'
        };
    }
  };

  const paymentInfo = getPaymentDetails();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/40 rounded-3xl p-6 text-center space-y-3 shadow-2xl">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Order Created Successfully!</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Your order <strong className="text-cyan-400">{order.orderId}</strong> has been created successfully. Please contact us to complete the payment.
        </p>
      </div>

      {/* Order Number & Transfer Info Box */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Reference</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-black text-cyan-400">{order.orderId}</span>
              <button
                onClick={handleCopyOrderNumber}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800 text-xs flex items-center gap-1 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Due</span>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {formatPrice(order.totalAmount)}
            </div>
          </div>
        </div>

        {/* Selected Payment Method Details */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Selected Payment Method:</span>
            <span className="text-xs font-extrabold text-cyan-400 uppercase">{paymentInfo.title}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400">Account / Phone Number:</span>
              <div className="text-sm font-extrabold text-white mt-0.5 select-all">{paymentInfo.accountNumber}</div>
            </div>
            <div>
              <span className="text-slate-400">Account Name:</span>
              <div className="text-sm font-semibold text-slate-200 mt-0.5">{paymentInfo.accountName}</div>
            </div>
          </div>

          <div className="bg-blue-950/40 border border-blue-900/60 p-3 rounded-lg text-xs text-blue-300 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>{paymentInfo.instructions}</p>
          </div>
        </div>
      </div>

      {/* Customer Info & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Customer Details</h3>
          <p><strong className="text-slate-400">Name:</strong> {order.customer.name}</p>
          <p><strong className="text-slate-400">Phone:</strong> {order.customer.phone}</p>
          <p><strong className="text-slate-400">City:</strong> {order.customer.city}</p>
          {order.customer.note && <p><strong className="text-slate-400">Note:</strong> {order.customer.note}</p>}
        </div>

        <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 space-y-2 text-xs">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Purchased Items</h3>
          <div className="space-y-1.5 max-h-32 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-slate-300">
                <span className="truncate pr-2">{item.quantity}x {item.name} {item.selectedPackage ? `(${item.selectedPackage})` : ''}</span>
                <span className="font-bold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Contact Us to Confirm Payment</h3>
        <p className="text-xs text-slate-400">Click any button below to send your receipt or order reference.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647501234567?text=${encodeURIComponent(`Hello Dano Store! I completed payment for Order: ${order.orderId}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Support
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ExternalLink className="w-4 h-4" /> Discord Server
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <ExternalLink className="w-4 h-4" /> TikTok Official
          </a>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-xl border border-slate-700"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
