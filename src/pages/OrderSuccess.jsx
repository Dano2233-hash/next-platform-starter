import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageSquare, ExternalLink, Copy, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = useState(false);

  if (!order) {
    return <Navigate to="/products" replace />;
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentMethodNames = {
    fastpay: 'FastPay Mobile Wallet',
    korek: 'Korek Telecom Cash',
    mastercard: 'MasterCard / FIB Card Transfer'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

      {/* Top Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-[#0c1836] via-[#091126] to-[#070c1a] border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-orbitron font-bold text-cyan-400 uppercase tracking-widest">
            ORDER CREATED SUCCESSFULLY
          </span>
          <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white">
            Thank you, {order.customerName}!
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order ID Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#050814] border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">Order ID:</span>
          <span className="font-extrabold text-cyan-400 font-orbitron text-sm">{order.orderId}</span>
          <button
            onClick={copyOrderId}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Direct Contact Buttons */}
      <div className="p-6 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-4 text-center">
        <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-wider">
          Complete Payment via Official Support
        </h3>
        <p className="text-xs text-slate-400">
          Click any button below to send your Order ID (<span className="text-cyan-400 font-bold">{order.orderId}</span>) to our agent:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={`https://wa.me/9640000000000?text=${encodeURIComponent(`Hello Dano Store! I want to pay for Order ID: ${order.orderId}`)}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Channel</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>TikTok Direct</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="p-6 rounded-2xl bg-[#090e1f] border border-slate-800 space-y-6">
        <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
          <h3 className="font-orbitron font-bold text-base text-slate-100">Order Receipt Summary</h3>
          <span className="text-xs text-cyan-400 font-semibold bg-cyan-950/50 px-2.5 py-0.5 rounded border border-cyan-500/30">
            {order.status || 'Pending Payment'}
          </span>
        </div>

        {/* Customer Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-lg bg-[#0c1224] border border-slate-800">
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Customer Name</span>
            <span className="font-bold text-slate-100">{order.customerName}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1224] border border-slate-800">
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Phone Number</span>
            <span className="font-bold text-slate-100">{order.phone}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1224] border border-slate-800">
            <span className="text-slate-500 block uppercase font-mono text-[10px]">City</span>
            <span className="font-bold text-slate-100">{order.city}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#0c1224] border border-slate-800">
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Payment Method</span>
            <span className="font-bold text-cyan-400">{paymentMethodNames[order.paymentMethod] || order.paymentMethod}</span>
          </div>
        </div>

        {order.note && (
          <div className="p-3 rounded-lg bg-[#0c1224] border border-slate-800 text-xs">
            <span className="text-slate-500 block uppercase font-mono text-[10px]">Player ID / Note</span>
            <span className="text-slate-200">{order.note}</span>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-3 pt-2">
          <h4 className="font-orbitron font-bold text-xs uppercase text-slate-400">Purchased Items:</h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="p-3 bg-[#0c1224] border border-slate-800/80 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage
                      image={item.image}
                      name={item.name}
                      platform={item.platform}
                      category="Item"
                      className="h-12 w-12"
                    />
                  </div>
                  <div>
                    <h5 className="font-orbitron font-semibold text-xs text-slate-200">{item.name}</h5>
                    <p className="text-[11px] text-purple-300 font-mono">{item.packageName} x {item.quantity}</p>
                  </div>
                </div>

                <div className="font-orbitron font-bold text-xs text-cyan-400">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Row */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-baseline font-orbitron">
          <span className="font-bold text-sm text-slate-200">Total Order Amount</span>
          <span className="font-extrabold text-xl text-cyan-400">{formatPrice(order.totalPrice)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-200 hover:text-cyan-400 font-orbitron font-bold text-xs uppercase transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

    </div>
  );
}
