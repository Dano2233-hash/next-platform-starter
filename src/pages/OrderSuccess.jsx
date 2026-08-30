import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  MessageCircle,
  Send,
  Zap,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Copy
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const { orderId } = useParams();
  const location = useLocation();

  // Try to load order from location state or local storage
  const [order, setOrder] = React.useState(() => {
    if (location.state?.order) return location.state.order;
    try {
      const orders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return orders.find(o => o.id === orderId) || null;
    } catch (e) {
      return null;
    }
  });

  const [copiedText, setCopiedText] = React.useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const getPaymentInstructions = (method) => {
    switch (method) {
      case 'FastPay':
        return {
          title: 'FastPay Transfer Details',
          number: '0750 123 4567',
          account: 'Dano Store FastPay Wallet',
          instruction: 'Please transfer the exact order amount to the FastPay number below, then send the screenshot to our WhatsApp.'
        };
      case 'Korek':
        return {
          title: 'Korek Transfer Details',
          number: '0750 987 6543',
          account: 'Dano Store Korek',
          instruction: 'Send Korek balance or card code to our WhatsApp with your Order ID.'
        };
      case 'MasterCard':
        return {
          title: 'MasterCard / FIB Bank Details',
          number: '964-750-1234567',
          account: 'Dano Store International / FIB',
          instruction: 'Transfer to the card account below and share payment confirmation via WhatsApp or Discord.'
        };
      default:
        return {
          title: 'Payment Details',
          number: '0750 123 4567',
          account: 'Dano Store',
          instruction: 'Please contact us on WhatsApp to finalize your manual payment.'
        };
    }
  };

  const paymentDetails = getPaymentInstructions(order?.paymentMethod);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">

      {/* Top Banner Success Confirmation */}
      <div className="bg-gradient-to-r from-[#0b0f19] via-[#09152b] to-[#0b0f19] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mx-auto shadow-xl shadow-cyan-500/20">
          <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Order Created #{orderId || order?.id}
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Thank You For Your Order!
        </h1>

        {/* Required Prompt Message */}
        <p className="text-sm sm:text-base font-semibold text-cyan-300 max-w-lg mx-auto bg-cyan-950/40 border border-cyan-800/60 p-3.5 rounded-xl">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>
      </div>

      {/* Payment Instructions Card */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <span>Selected Payment Method: {order?.paymentMethod || 'FastPay'}</span>
          </h3>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800">
            Pending Manual Payment
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          {paymentDetails.instruction}
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 block">{paymentDetails.title}</span>
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-700/70">
            <div>
              <span className="text-xs text-slate-400 block">{paymentDetails.account}</span>
              <span className="text-base font-extrabold text-cyan-400 font-mono tracking-wider">
                {paymentDetails.number}
              </span>
            </div>
            <button
              onClick={() => handleCopy(paymentDetails.number)}
              className="flex items-center gap-1 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-600 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-cyan-400" />
              <span>{copiedText === paymentDetails.number ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Contact Buttons: WhatsApp, Discord, TikTok */}
      <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-center">
        <h3 className="text-base font-bold text-white">Contact Us To Complete Payment & Receive Code</h3>
        <p className="text-xs text-slate-400">Click any button below to send your Order ID <strong>#{orderId || order?.id}</strong></p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=Hello%20Dano%20Store!%20My%20Order%20ID%20is%20${orderId || order?.id}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord Channel</span>
          </a>

          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Zap className="w-4 h-4" />
            <span>TikTok @danostore</span>
          </a>
        </div>
      </div>

      {/* Order Summary Details */}
      {order && (
        <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl text-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Order Information Summary</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-slate-300">
            <div>
              <span className="text-slate-400 block text-[11px]">Customer Name</span>
              <span className="font-bold text-white">{order.customerName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Phone</span>
              <span className="font-bold text-white">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">City</span>
              <span className="font-bold text-white">{order.customerCity}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Total Price</span>
              <span className="font-bold text-cyan-400 text-sm">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>

          {order.items && order.items.length > 0 && (
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="font-bold text-slate-400 block">Ordered Products:</span>
              <div className="space-y-1.5">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    <div>
                      <span className="font-bold text-white">{item.productName}</span>
                      {item.packageName && (
                        <span className="text-[10px] text-cyan-400 block">Package: {item.packageName}</span>
                      )}
                    </div>
                    <span className="font-extrabold text-cyan-400">
                      Qty: {item.quantity} &bull; {formatPrice(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Return Action */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
}
