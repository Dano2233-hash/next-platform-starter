import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Send,
  ArrowRight,
  Copy,
  Clock,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../components/CheckoutForm';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const { orders } = useProducts();

  const order = orders.find(o => o.orderId === orderId);

  // Fallback demo order if directly accessed or refreshed
  const orderDetails = order || {
    orderId: orderId || 'DS-DEMO',
    customerName: 'Customer',
    phoneNumber: '0750 000 0000',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    items: [],
    totalAmount: 0,
    status: 'Pending Payment',
  };

  const paymentInfo = PAYMENT_METHODS.find(p => p.id === orderDetails.paymentMethod) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(orderDetails.orderId);
    alert(`Order ID ${orderDetails.orderId} copied!`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Success Notification Box */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-xl shadow-emerald-950/40 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Order Registered
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Order Created Successfully!
        </h1>

        {/* Required User Message */}
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/50 max-w-xl mx-auto">
          <p className="text-sm font-semibold text-cyan-200">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>
      </div>

      {/* Order ID Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold text-slate-400">Your Order Number</span>
          <div className="text-2xl font-mono font-black text-white tracking-wider">
            {orderDetails.orderId}
          </div>
        </div>

        <button
          onClick={handleCopyOrderId}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Copy className="w-3.5 h-3.5" /> Copy Order ID
        </button>
      </div>

      {/* Manual Payment Instructions */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-base">Selected Payment Method</h2>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
            {paymentInfo.name}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Transfer Number / Account:</span>
            <span className="font-mono font-bold text-cyan-400 text-sm">
              {paymentInfo.accountNumber}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Account Name:</span>
            <span className="font-semibold text-white">{paymentInfo.accountHolder}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-900">
            <span className="text-slate-400">Total Amount to Send:</span>
            <span className="font-black text-white text-sm">
              {formatPrice(orderDetails.totalAmount)}
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Please send exactly <strong>{formatPrice(orderDetails.totalAmount)}</strong> using {paymentInfo.name}. Take a screenshot or transaction reference number, then click one of the contact buttons below to send it to us.
        </p>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-3">
        <h3 className="font-bold text-white text-sm text-center">Contact Us to Confirm & Receive Keys:</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store! I just created order ${orderDetails.orderId} for ${formatPrice(orderDetails.totalAmount)}. Here is my payment confirmation.`)}`}
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 fill-current" />
            WhatsApp Support
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/50 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Discord Ticket
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="p-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50 transition-all active:scale-95"
          >
            <Send className="w-4 h-4 fill-current" />
            TikTok DM
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-sm">Order Summary</h3>

        <div className="text-xs space-y-2 border-b border-slate-800 pb-3 text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Customer Name:</span>
            <span className="font-medium text-white">{orderDetails.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Phone:</span>
            <span className="font-medium text-white">{orderDetails.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">City / Province:</span>
            <span className="font-medium text-white">{orderDetails.city}</span>
          </div>
          {orderDetails.orderNote && (
            <div className="flex justify-between">
              <span className="text-slate-400">Order Note / ID:</span>
              <span className="font-medium text-white">{orderDetails.orderNote}</span>
            </div>
          )}
        </div>

        {orderDetails.items && orderDetails.items.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">Purchased Items:</span>
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs py-1">
                <span className="text-white">
                  {item.name} ({item.packageName}) × {item.quantity}
                </span>
                <span className="text-cyan-400 font-bold">{formatPrice(item.subtotal)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
        >
          Return to Home Page <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
