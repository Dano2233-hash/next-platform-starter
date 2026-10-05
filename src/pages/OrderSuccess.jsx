import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  Smartphone,
  CreditCard,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Send
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPaymentInstructions = (method) => {
    switch (method) {
      case 'fastpay':
        return {
          title: 'FastPay Wallet Transfer Instructions',
          accountNumber: '0750 000 0000',
          accountName: 'Dano Store FastPay Business',
          steps: [
            'Open your FastPay mobile app on your phone.',
            'Select Send Money / Transfer.',
            'Enter FastPay number: 0750 000 0000',
            `Transfer exact amount: ${formatPrice(order.totalAmount)}`,
            `Include reference or order note: ${order.orderId}`,
            'Send payment screenshot to our WhatsApp or Discord below.'
          ]
        };
      case 'korek':
        return {
          title: 'Korek Cash / Direct Transfer Instructions',
          accountNumber: '0770 000 0000',
          accountName: 'Dano Store Korek Direct',
          steps: [
            'Dial Korek Cash menu or use Korek app.',
            'Transfer to Korek number: 0770 000 0000',
            `Transfer exact amount: ${formatPrice(order.totalAmount)}`,
            'Take screenshot or save transaction ID.',
            'Send screenshot with your Order ID to our WhatsApp.'
          ]
        };
      case 'mastercard':
        return {
          title: 'MasterCard / FIB Bank Transfer Instructions',
          accountNumber: 'IQ99 FIB 0000 1234 5678 9000',
          accountName: 'Dano Store Digital Services',
          steps: [
            'Open your First Iraqi Bank (FIB) or Banking App.',
            'Transfer to Account / IBAN: IQ99 FIB 0000 1234 5678 9000',
            `Transfer exact amount: ${formatPrice(order.totalAmount)}`,
            `Reference Note: ${order.orderId}`,
            'Contact support with payment receipt for instant verification.'
          ]
        };
      default:
        return {
          title: 'Manual Payment Instructions',
          accountNumber: '0750 000 0000',
          accountName: 'Dano Store Support',
          steps: ['Please contact support on WhatsApp with your Order ID.']
        };
    }
  };

  const paymentInfo = getPaymentInstructions(order.paymentMethod);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Success Top Hero Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
          <CheckCircle2 className="w-10 h-10 text-slate-950 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
            Order Created Successfully
          </span>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight pt-2">
            Thank You, {order.customerName}!
          </h1>
          <p className="text-sm text-slate-300 max-w-lg mx-auto font-medium">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order ID Badge Box */}
        <div className="inline-flex items-center gap-3 p-3 px-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Your Order Number</span>
            <span className="font-mono font-black text-xl text-cyan-400 tracking-wider">{order.orderId}</span>
          </div>
          <button
            onClick={handleCopyOrderId}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Payment Instructions & Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

        {/* Left Column: Manual Payment Instructions */}
        <div className="md:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-extrabold text-slate-100 text-base flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              <span>{paymentInfo.title}</span>
            </h3>
            <span className="text-xs font-bold text-cyan-300 uppercase bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
              {order.paymentMethod}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Target Account / Number:</span>
              <span className="text-cyan-300 font-mono text-sm">{paymentInfo.accountNumber}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Account Name:</span>
              <span className="text-slate-200">{paymentInfo.accountName}</span>
            </div>
            <div className="flex justify-between text-xs font-semibold pt-1 border-t border-slate-800/80">
              <span className="text-slate-400">Exact Amount to Pay:</span>
              <span className="text-cyan-400 font-black text-sm">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step-by-step Instructions:</h4>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1.5 font-medium leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              {paymentInfo.steps.map((step, idx) => (
                <li key={idx} className="pl-1">{step}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Column: Direct Contact Buttons */}
        <div className="md:col-span-5 space-y-4">
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
            <h3 className="font-extrabold text-slate-100 text-base">Contact Us To Complete Order</h3>
            <p className="text-xs text-slate-400">
              Click any official channel below to send your Order ID <strong>({order.orderId})</strong> and transfer screenshot for instant manual code delivery.
            </p>

            <div className="space-y-2.5 pt-2">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/9647500000000?text=${encodeURIComponent(`Hello Dano Store! I created order ${order.orderId} for ${formatPrice(order.totalAmount)} using ${order.paymentMethod}. Here is my receipt.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contact via WhatsApp</span>
              </a>

              {/* Discord Button */}
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Contact via Discord</span>
              </a>

              {/* TikTok Button */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Send className="w-4 h-4 text-cyan-400" />
                <span>Contact via TikTok</span>
              </a>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Customer Details:</span>
            </div>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>City:</strong> {order.city}</p>
            {order.orderNote && <p><strong>Note/Player ID:</strong> {order.orderNote}</p>}
          </div>
        </div>
      </div>

      {/* Order Summary Breakdown */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-slate-100 text-sm pb-2 border-b border-slate-800">
          Ordered Items Breakdown
        </h3>

        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div>
                <h4 className="font-bold text-slate-100">{item.productName}</h4>
                <p className="text-[11px] text-cyan-400">{item.packageName} x{item.quantity}</p>
              </div>
              <span className="font-extrabold text-slate-200">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-bold text-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
