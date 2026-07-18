import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, Compass, Send, PhoneCall } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Safeguard direct page access
  if (!order) {
    return <Navigate to="/" replace />;
  }

  // Define payment transfer numbers or guidelines
  const paymentDetails = {
    FastPay: {
      account: "0750 123 4567",
      instructions: "Open FastPay Cash App, select 'Send Money' or 'Transfer', enter our official phone number and send the exact IQD amount. Keep the payment transaction ID."
    },
    Korek: {
      account: "0750 987 6543",
      instructions: "Perform Korek balance transfer or Korek Pay. Take a screenshot of the transaction response once completed."
    },
    MasterCard: {
      account: "5123 4567 8901 2345",
      instructions: "Transfer manually via FIB, Bank of Baghdad, or standard online MasterCard applications into our account."
    }
  };

  const selectedPayment = paymentDetails[order.paymentMethod] || { account: "Contact Support", instructions: "Please contact support for instructions." };

  return (
    <div className="max-w-3xl mx-auto space-y-8 text-left py-6">
      {/* 1. Success Message Panel */}
      <div className="p-8 rounded-3xl bg-gradient-to-tr from-cyan-950/20 via-[#0a0f1d]/60 to-purple-950/20 border border-blue-500/15 text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="h-10 w-10 fill-emerald-950/30" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">ORDER SUBMITTED</h1>
          <p className="text-cyan-400 font-extrabold text-xs uppercase tracking-widest">
            Invoice ID: {order.orderNumber}
          </p>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Payment Details */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
              HOW TO COMPLETE YOUR PAYMENT
            </h3>

            <div className="space-y-2">
              <span className="text-xs text-gray-500 block font-semibold">Selected Method</span>
              <span className="inline-block px-3 py-1 rounded bg-cyan-950/50 text-cyan-400 border border-cyan-800/20 font-bold text-xs uppercase">
                {order.paymentMethod} Manual Transfer
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-gray-500 block font-semibold">Our Payment Address</span>
              <span className="block font-mono font-black text-base text-white tracking-widest bg-black/40 p-3 rounded-lg border border-white/5 text-center">
                {selectedPayment.account}
              </span>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-gray-400">
              <span className="font-bold text-gray-300 block">Transfer Instructions:</span>
              <p>{selectedPayment.instructions}</p>
            </div>
          </div>

          {/* Social Contact Links */}
          <div className="p-6 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
              CONTACT US TO ACTIVATE
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Once you have completed the manual transfer, please send your **Invoice ID ({order.orderNumber})** and payment screenshot to our customer service on any platform below to receive your product codes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/9647501234567?text=Hello%20Dano%20Store,%20I%20have%20completed%20the%20payment%20for%20order%20${order.orderNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 font-bold text-xs hover:bg-emerald-900/30 transition shadow"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 font-bold text-xs hover:bg-indigo-900/30 transition shadow"
              >
                <Compass className="h-4 w-4" />
                <span>Discord</span>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-950/30 border border-pink-500/20 text-pink-400 font-bold text-xs hover:bg-pink-900/30 transition shadow"
              >
                <Send className="h-4 w-4" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Summary Recap */}
        <div className="md:col-span-5">
          <div className="p-6 rounded-2xl bg-[#0a0f1d]/50 border border-blue-500/10 space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider border-b border-white/[0.04] pb-2">
              ORDER SUMMARY
            </h3>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 text-xs text-gray-300">
                  <div className="min-w-0">
                    <p className="font-bold text-white truncate">{item.name}</p>
                    <p className="text-[10px] text-gray-500">
                      Qty: {item.quantity} {item.package ? `| Option: ${item.package}` : ''}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-100 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.04] pt-4 text-xs space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Customer Name</span>
                <span className="font-semibold text-white">{order.customerName}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Phone Number</span>
                <span className="font-semibold text-white">{order.customerPhone}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>City / Region</span>
                <span className="font-semibold text-white">{order.customerCity}</span>
              </div>
              {order.orderNote && (
                <div className="border-t border-white/[0.03] pt-2 text-gray-500">
                  <span className="font-bold block text-[10px] uppercase text-gray-400 mb-0.5">Note:</span>
                  <p className="italic">{order.orderNote}</p>
                </div>
              )}
              <div className="border-t border-white/[0.03] pt-3 flex justify-between text-sm">
                <span className="font-bold text-gray-300">Total Charged</span>
                <span className="font-black text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-block text-xs font-black uppercase text-cyan-400 hover:text-cyan-300 transition"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
