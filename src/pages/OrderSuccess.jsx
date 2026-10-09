import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Video, Copy, ArrowRight, ShieldCheck, Home } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">No active order found</h2>
        <Link to="/" className="inline-block px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl">
          Return to Home
        </Link>
      </div>
    );
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    alert(`Order ID #${order.orderId} copied to clipboard!`);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed an order.\nOrder ID: #${order.orderId}\nName: ${order.customer.name}\nPhone: ${order.customer.phone}\nPayment Method: ${order.customer.paymentMethod}\nTotal: ${formatPrice(order.totalAmount)}`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 min-h-screen">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-100">Order Placed Successfully!</h1>
        <p className="text-sm font-semibold text-cyan-400 max-w-lg mx-auto bg-cyan-950/60 p-3 rounded-xl border border-cyan-500/30">
          "Your order has been created successfully. Please contact us to complete the payment."
        </p>
      </div>

      {/* Order Summary Box */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs text-slate-400 font-medium">Order Number</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-extrabold text-cyan-400">#{order.orderId}</span>
              <button
                onClick={copyOrderId}
                className="p-1 text-slate-400 hover:text-slate-100 transition"
                title="Copy Order ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 font-medium">Selected Payment Method</span>
            <div className="text-sm font-bold text-yellow-400 mt-0.5">{order.customer.paymentMethod}</div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-500 font-medium">Customer Name:</span>
            <p className="font-bold text-slate-200 mt-0.5">{order.customer.name}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium">Phone Number:</span>
            <p className="font-bold text-slate-200 mt-0.5">{order.customer.phone}</p>
          </div>
          <div>
            <span className="text-slate-500 font-medium">City:</span>
            <p className="font-bold text-slate-200 mt-0.5">{order.customer.city}</p>
          </div>
        </div>

        {/* Purchased Items */}
        <div className="space-y-3 pt-3 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <div>
                  <span className="font-bold text-slate-200">{item.product.name}</span>
                  <span className="text-slate-500 ml-2">({item.package?.name} x {item.quantity})</span>
                </div>
                <span className="font-bold text-cyan-400">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-baseline pt-4 border-t border-slate-800">
          <span className="text-sm font-bold text-slate-300">Total Price</span>
          <span className="text-2xl font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      {/* Contact Buttons */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 text-center uppercase tracking-wider">
          Send Order ID to Complete Payment
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg transition"
          >
            <Send className="w-4 h-4" />
            <span>Discord Support</span>
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs shadow-lg transition"
          >
            <Video className="w-4 h-4" />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
