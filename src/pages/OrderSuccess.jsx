import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Copy, MessageSquare, ExternalLink, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { CONTACT_LINKS, PAYMENT_METHODS } from '../data/categories';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback demo order if navigated directly
  const displayOrder = order || {
    orderId: 'DS-984210',
    customer: {
      name: 'Valued Customer',
      phone: '0750 123 4567',
      city: 'Erbil',
      note: 'Instant Top-Up Order'
    },
    paymentMethod: 'fastpay',
    items: [],
    totalAmount: 25000,
    createdAt: new Date().toISOString()
  };

  const paymentDetails = PAYMENT_METHODS.find((p) => p.id === displayOrder.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(displayOrder.orderId);
    alert(`Order ID ${displayOrder.orderId} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">

      {/* Success Hero Header */}
      <div className="text-center space-y-4 bg-gradient-to-b from-[#09152a] via-[#080e1b] to-transparent p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20 animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
          Order Created Successfully!
        </h1>

        {/* MANDATORY MESSAGE FROM SPEC */}
        <p className="text-sm sm:text-base text-cyan-300 font-bold max-w-lg mx-auto bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order Number Box */}
        <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <span className="text-xs text-slate-400">Order Number:</span>
          <span className="font-mono font-extrabold text-cyan-400 text-base sm:text-lg">
            {displayOrder.orderId}
          </span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Transfer Instructions Box */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Payment & Transfer Details</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300">
            {paymentDetails.name}
          </span>
        </h3>

        <div className="space-y-2 text-xs sm:text-sm text-slate-300">
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Selected Payment:</span>
            <span className="font-bold text-cyan-400">{paymentDetails.name}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Account / Phone Number:</span>
            <span className="font-mono font-bold text-slate-100 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              {paymentDetails.accountNumber}
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800/60">
            <span className="text-slate-400">Total to Pay:</span>
            <span className="font-extrabold text-cyan-300 text-base">
              {formatPrice(displayOrder.totalAmount)}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
          <strong className="text-slate-200">Instructions:</strong> Send the total amount to the account above via {paymentDetails.name}. After sending, click one of the contact buttons below to send us your receipt and Order ID <strong className="text-cyan-400">({displayOrder.orderId})</strong>.
        </p>
      </div>

      {/* Contact Buttons Section (Mandatory WhatsApp, Discord, TikTok) */}
      <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
          Contact Us to Complete Payment
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`${CONTACT_LINKS.whatsapp}&text=Hello%20Dano%20Store!%20My%20Order%20ID%20is%20${displayOrder.orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={CONTACT_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={CONTACT_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      {displayOrder.items && displayOrder.items.length > 0 && (
        <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Purchased Items Summary</h3>
          <div className="space-y-2">
            {displayOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800"
              >
                <div>
                  <span className="font-bold text-slate-200">{item.product?.name}</span>
                  {item.selectedPackage && (
                    <span className="text-cyan-400 font-medium ml-2">
                      ({item.selectedPackage.name})
                    </span>
                  )}
                  <span className="text-slate-400 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-extrabold text-slate-100">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs transition-colors"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
