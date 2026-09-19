import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const [copiedNumber, setCopiedNumber] = React.useState(false);

  // Retrieve order from state or localStorage
  let order = location.state?.order;
  if (!order) {
    try {
      const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      order = savedOrders.find((o) => o.orderId === orderId);
    } catch (e) {
      console.error(e);
    }
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    (m) => m.id === order?.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopyNumber = () => {
    if (selectedPaymentInfo) {
      navigator.clipboard.writeText(selectedPaymentInfo.number);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created Order #${orderId || 'NEW'} for ${
      order ? formatPrice(order.totalAmount) : ''
    }. I would like to complete the payment via ${selectedPaymentInfo?.name}.`
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-8">
      {/* Success Badge Banner */}
      <div className="bg-[#0a0e1a] border border-cyan-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1.5px] mx-auto shadow-lg shadow-cyan-500/30">
          <div className="w-full h-full bg-[#070a12] rounded-[14px] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Order Confirmation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Created Successfully!
          </h1>
          <p className="text-sm font-semibold text-emerald-400 pt-1">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        <div className="inline-block bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2 font-mono text-xs text-slate-300">
          Order Number: <strong className="text-cyan-300">{orderId}</strong>
        </div>
      </div>

      {/* Payment Instructions Box */}
      <div className="bg-[#0a0e1a] border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Payment Details ({selectedPaymentInfo?.name})</span>
        </h3>

        <div className="p-4 rounded-2xl bg-[#060911] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Send Total Amount to {selectedPaymentInfo?.name}:
            </span>
            <div className="text-xl font-mono font-black text-cyan-300">
              {selectedPaymentInfo?.number}
            </div>
            <p className="text-[11px] text-slate-400">
              Account Name: <strong>{selectedPaymentInfo?.accountName}</strong>
            </p>
          </div>

          <button
            onClick={handleCopyNumber}
            className="px-4 py-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition flex items-center gap-1.5 shrink-0"
          >
            {copiedNumber ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied Number!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Number
              </>
            )}
          </button>
        </div>

        <div className="text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
          <strong className="text-white">Next Step:</strong> Transfer{' '}
          <strong className="text-cyan-400">{order ? formatPrice(order.totalAmount) : ''}</strong>{' '}
          to the account above, then click WhatsApp below to send your transfer screenshot and Order ID.
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
          Contact Support to Complete Order
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 hover:bg-emerald-900/80 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-950/40"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp (Fastest)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-indigo-950/80 border border-indigo-800 hover:bg-indigo-900/80 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-950/40"
          >
            <span>Discord Community</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 hover:bg-rose-900/80 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-rose-950/40"
          >
            <span>TikTok Direct</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#0a0e1a] border border-slate-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Summary
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Customer Name</span>
              <span className="font-bold text-white">{order.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Phone Number</span>
              <span className="font-bold text-white">{order.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>City</span>
              <span className="font-bold text-white">{order.city}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60 text-slate-400">
              <span>Selected Payment</span>
              <span className="font-bold text-cyan-400">{selectedPaymentInfo?.name}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 block">Items Purchased:</span>
            {order.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#060911] border border-slate-800"
              >
                <div>
                  <span className="font-bold text-slate-200">{item.name}</span>
                  {item.package && (
                    <span className="text-[10px] text-cyan-400 block">{item.package}</span>
                  )}
                  <span className="text-[10px] text-slate-400 block">Qty: {item.quantity}</span>
                </div>
                <span className="font-extrabold text-white">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base">
            <span className="font-extrabold text-white">Total Amount</span>
            <span className="text-xl font-black text-cyan-400">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>
      )}

      {/* Return to Home */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:underline"
        >
          <span>Return to Home Page</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
