import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Copy, MessageCircle, ExternalLink, ArrowRight, ShieldCheck, Gamepad2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useProducts } from '../hooks/useProducts';
import { PAYMENT_METHODS } from '../data/categories';

const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const { orders } = useProducts();

  // Try retrieving order from navigation state or local storage
  const order =
    location.state?.order ||
    orders.find((o) => o.orderId === id) ||
    {
      orderId: id || 'DANO-SUCCESS',
      customerName: 'Customer',
      phoneNumber: 'N/A',
      city: 'Kurdistan',
      paymentMethod: 'fastpay',
      totalAmount: 0,
      items: [],
      createdAt: new Date().toISOString()
    };

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    (m) => m.id === order.paymentMethod
  ) || PAYMENT_METHODS[0];

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    alert(`Order ID ${order.orderId} copied to clipboard!`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      {/* Top Banner */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-b from-blue-950/60 via-slate-900 to-slate-950 border border-blue-500/30 space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-cyan-500/20">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Order Placed Successfully</span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100">
            Thank You For Your Order!
          </h1>
        </div>

        {/* Required Banner Message */}
        <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-500/40 max-w-xl mx-auto text-xs sm:text-sm text-cyan-200 font-semibold leading-relaxed shadow-inner">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
          <span>Order Reference: <strong className="text-white text-sm">{order.orderId}</strong></span>
          <button
            onClick={copyOrderId}
            className="p-1 hover:text-white transition-colors ml-1"
            title="Copy Order ID"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Payment Details Box */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400" /> Transfer Instructions ({selectedPaymentInfo.name})
        </h3>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Payment Method Selected:</span>
            <strong className="text-cyan-400 text-sm font-bold">{selectedPaymentInfo.name}</strong>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span>Transfer Account Number:</span>
            <span className="font-mono text-cyan-300 font-bold text-sm bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
              {selectedPaymentInfo.accountNumber}
            </span>
          </div>

          <div className="flex justify-between items-center text-slate-300">
            <span>Total Amount To Send:</span>
            <strong className="text-emerald-400 text-base font-black">
              {formatPrice(order.totalAmount)}
            </strong>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          👉 Please transfer the total amount to the account number above, then send your payment receipt/screenshot alongside your Order ID <strong>({order.orderId})</strong> to our support agents via WhatsApp or Discord below.
        </p>
      </div>

      {/* Direct Contact Buttons */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-sm text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3">
          Contact Us To Complete Delivery
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store!%20I%20have%20completed%20the%20payment%20for%20Order%20${order.orderId}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp Support
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/50"
          >
            <Gamepad2 className="w-4 h-4" />
            Discord Community
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            TikTok Official
          </a>

        </div>
      </div>

      {/* Order Summary Specs */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
          Order Items Breakdown
        </h3>

        <div className="space-y-2">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs text-slate-300">
                <span>
                  {item.name} ({item.packageName}) x{item.quantity}
                </span>
                <span className="font-bold text-slate-100">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500">Standard digital items</p>
          )}
        </div>
      </div>

      {/* Return Home */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          Return to Store Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
