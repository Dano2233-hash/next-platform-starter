import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  MessageSquare,
  Video,
  Home,
  ShieldCheck,
  PhoneCall,
  Info
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copiedId, setCopiedId] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // Payment Numbers & Accounts for manual transfers in Kurdistan/Iraq
  const paymentDetails = {
    FastPay: {
      account: '0750 123 4567',
      name: 'Dano Store FastPay'
    },
    Korek: {
      account: '0750 789 0123',
      name: 'Dano Store Korek Cash'
    },
    MasterCard: {
      account: 'FIB-8901-2345-6789',
      name: 'Dano Store (FIB / MasterCard)'
    }
  };

  const selectedDetails = paymentDetails[order.customer.paymentMethod] || paymentDetails.FastPay;

  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store! I placed order #${order.orderId} for total ${formatPrice(order.totalAmount)} via ${order.customer.paymentMethod}. Customer: ${order.customer.name} (${order.customer.phone}). Please verify my payment!`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-cyan-950/60 via-slate-900 to-blue-950/60 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Created Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-300 font-semibold max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Box */}
        <div className="inline-flex items-center gap-3 bg-slate-950 border border-slate-800 px-4 py-2.5 rounded-2xl">
          <span className="text-xs text-slate-400 font-bold uppercase">Order ID:</span>
          <span className="text-sm font-extrabold text-white tracking-widest">{order.orderId}</span>
          <button
            onClick={copyOrderId}
            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
            title="Copy Order ID"
          >
            {copiedId ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Manual Transfer Instructions Box */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Info className="w-5 h-5 text-cyan-400" />
          <span>Payment Details for {order.customer.paymentMethod}</span>
        </h3>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Payment Method:</span>
            <span className="font-extrabold text-cyan-400">{order.customer.paymentMethod}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Account / Phone Number:</span>
            <span className="font-mono font-bold text-white bg-slate-950 px-2.5 py-1 rounded border border-slate-800 text-sm">
              {selectedDetails.account}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Account Holder:</span>
            <span className="font-bold text-slate-200">{selectedDetails.name}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm">
            <span className="text-slate-300 font-bold">Total to Pay:</span>
            <span className="font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-3xl p-6 space-y-4 text-center">
        <h3 className="text-base font-bold text-white">Contact Us to Complete Payment</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Send a screenshot or payment reference code to one of our official support channels:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span>TikTok Support</span>
          </a>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="bg-[#090f1e] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Order Summary & Items
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div>Customer: <strong className="text-slate-200">{order.customer.name}</strong></div>
          <div>Phone: <strong className="text-slate-200">{order.customer.phone}</strong></div>
          <div>City: <strong className="text-slate-200">{order.customer.city}</strong></div>
          <div>Payment: <strong className="text-cyan-400">{order.customer.paymentMethod}</strong></div>
          {order.customer.note && (
            <div className="col-span-2 pt-1">
              Note/ID: <span className="text-slate-200">{order.customer.note}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50">
              <div>
                <p className="font-bold text-white">{item.name}</p>
                <p className="text-[11px] text-cyan-400">
                  {item.selectedPackage?.name} x {item.quantity}
                </p>
              </div>
              <span className="font-bold text-slate-200">
                {formatPrice(item.cartUnitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <Home className="w-4 h-4 text-cyan-400" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
