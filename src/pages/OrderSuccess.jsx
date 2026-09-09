import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageCircle,
  Share2,
  Home,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const lastOrder = localStorage.getItem('dano_last_order');
      if (lastOrder) {
        const parsed = JSON.parse(lastOrder);
        if (!orderId || parsed.orderId === orderId) {
          setOrder(parsed);
          return;
        }
      }

      const allOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const found = allOrders.find((o) => o.orderId === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error('Error reading order details:', e);
    }
  }, [orderId]);

  const handleCopyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getPaymentDetails = () => {
    if (!order) return null;
    return PAYMENT_METHODS.find((m) => m.id === order.paymentMethod) || PAYMENT_METHODS[0];
  };

  const paymentObj = getPaymentDetails();

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 bg-[#080d1a] border border-slate-800 rounded-3xl text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-2xl font-black text-white">Order Processed</h2>
        <p className="text-xs text-slate-400">
          Your order has been recorded. If you do not see your details, please contact our support team.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created an order.\nOrder ID: ${order.orderId}\nTotal: ${formatPrice(
      order.total
    )}\nPayment Method: ${paymentObj?.name}\nPlease guide me to finish payment.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Success Banner */}
      <div className="bg-gradient-to-br from-cyan-950/60 via-[#080d1a] to-blue-950/60 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 relative overflow-hidden shadow-2xl">
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/30">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-3">Thank You for Your Order!</h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg mx-auto leading-relaxed">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID & Copy */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono">
            <span className="text-slate-400">Order ID:</span>
            <span className="text-cyan-300 font-bold text-sm">{order.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Payment Transfer Instructions Box */}
      <div className="bg-[#090d18] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base flex items-center gap-2 pb-2 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-cyan-400" /> Payment & Completion Steps
        </h3>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span>Selected Payment Method:</span>
            <span className="font-bold text-cyan-300">{paymentObj?.name}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Send Amount:</span>
            <span className="font-extrabold text-white text-sm">{formatPrice(order.total)}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Transfer Account Number:</span>
            <span className="font-mono text-cyan-400 font-bold">{paymentObj?.accountNumber}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-slate-300">
            Contact us now via any channel to confirm payment and receive your digital code:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>Discord</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-4 h-4 text-cyan-400" />
              <span>TikTok</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Order Summary details */}
      <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base pb-3 border-b border-slate-800 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Details
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div>
            <span className="text-slate-500 block">Customer Name</span>
            <span className="font-semibold text-white">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number</span>
            <span className="font-semibold text-white">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City</span>
            <span className="font-semibold text-white">{order.city}</span>
          </div>
        </div>

        {order.orderNote && (
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-cyan-400 block mb-0.5">Order Note / ID:</span>
            <span>{order.orderNote}</span>
          </div>
        )}

        <div className="border-t border-slate-800 pt-3 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Items Purchased</span>
          {order.items &&
            order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-slate-200">
                <span>
                  {item.productName} ({item.packageName}) x{item.quantity}
                </span>
                <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition-all"
        >
          <Home className="w-4 h-4" /> Return to Dano Store
        </Link>
      </div>
    </div>
  );
};
