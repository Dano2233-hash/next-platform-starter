import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, MessageCircle, Share2, Copy, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const paymentInstructions = {
    FastPay: {
      account: '0750 XXX XXXX (FastPay Account)',
      note: 'Send exact total amount via FastPay app with your Order ID in notes.'
    },
    Korek: {
      account: '0750 XXX XXXX (Korek Balance/Cash)',
      note: 'Transfer exact balance amount or Korek Cash to our phone number.'
    },
    MasterCard: {
      account: 'IBAN: IQ99 FIB 0000 0000 0000 0000',
      note: 'Send screenshot of FIB / Mastercard transfer to our WhatsApp.'
    }
  };

  const currentInstruction = paymentInstructions[order.paymentMethod] || paymentInstructions.FastPay;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      {/* Top Banner Success */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold uppercase tracking-wider">
            Order Created #{order.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Your order has been created successfully!
          </h1>
          <p className="text-xs sm:text-sm text-amber-300 font-semibold max-w-lg mx-auto mt-2 bg-amber-950/40 border border-amber-500/30 p-2.5 rounded-xl">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      {/* Payment Details Box */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
          Payment Instructions ({order.paymentMethod})
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
          <p className="text-slate-400">
            Selected Payment Method: <strong className="text-cyan-400 font-bold">{order.paymentMethod}</strong>
          </p>
          <p className="text-slate-400">
            Account Number / Target: <strong className="text-white font-mono">{currentInstruction.account}</strong>
          </p>
          <p className="text-slate-400">
            Total Amount Due: <strong className="text-cyan-400 font-black text-sm">{formatPrice(order.total)}</strong>
          </p>
          <p className="text-slate-400 leading-relaxed pt-1">{currentInstruction.note}</p>
        </div>

        {/* Contact Social Buttons */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-bold text-slate-300">Click below to send your payment proof:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/9647500000000?text=${encodeURIComponent(
                `Hello Dano Store! I completed order #${order.id} for ${formatPrice(order.total)} via ${order.paymentMethod}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>

            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Discord Community</span>
            </a>

            <a
              href="https://tiktok.com/@danostore"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 border border-pink-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>TikTok Channel</span>
            </a>
          </div>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Summary</h3>

        <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 border-b border-slate-800 pb-4">
          <div>
            <p className="font-semibold text-slate-500">Customer Name</p>
            <p className="text-white font-bold text-sm mt-0.5">{order.customer.name}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Phone Number</p>
            <p className="text-white font-bold text-sm mt-0.5">{order.customer.phone}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">City / Region</p>
            <p className="text-white font-bold text-sm mt-0.5">{order.customer.city}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-500">Order Note / Player ID</p>
            <p className="text-white font-bold text-sm mt-0.5">{order.customer.note || 'None'}</p>
          </div>
        </div>

        {/* Items */}
        <div className="space-y-3 pt-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <div>
                <p className="font-bold text-white">{item.productName}</p>
                <p className="text-cyan-400 text-[11px]">{item.selectedPackage?.name} x {item.quantity}</p>
              </div>
              <span className="font-bold text-slate-200">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-extrabold">
          <span className="text-slate-400">Total Price</span>
          <span className="text-cyan-400 text-base">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-colors"
        >
          <span>Return to Dano Store Home</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
