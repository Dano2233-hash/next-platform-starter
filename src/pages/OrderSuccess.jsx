import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Radio } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function OrderSuccess({ currentOrder }) {
  // If navigated here by mistake without an active order redirect
  if (!currentOrder) {
    return <Navigate to="/" replace />;
  }

  const { orderId, customer, items, total } = currentOrder;
  const paymentMethod = customer.paymentMethod;

  // Compile detailed receipt message for the customer to copy/paste to support channels
  const compiledMessage = `Hello Dano Store! I just submitted an order on your website.
Order ID: ${orderId}
Customer: ${customer.name}
Phone: ${customer.phone}
City: ${customer.city}
Selected Payment Method: ${paymentMethod}
Items purchased:
${items.map(item => `- ${item.name} (${item.selectedPackage.name}) x${item.quantity}`).join('\n')}
Total Invoice: ${formatPrice(total)}
Notes: ${customer.orderNote || 'None'}

Please verify my manual payment so I can get my digital codes!`;

  const encodedMsg = encodeURIComponent(compiledMessage);

  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-6 text-gray-200">

      {/* Visual Header */}
      <div className="space-y-2">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 premium-glow-cyan border border-emerald-500/20">
          <CheckCircle2 size={36} />
        </div>
        <h1 className="text-2xl font-black uppercase text-white tracking-wide">Order Created Successfully!</h1>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>
      </div>

      {/* Invoice Details Container */}
      <div className="rounded-xl border border-[#12121e] bg-[#0c0c14] p-6 text-left space-y-4">
        <div className="flex justify-between items-center border-b border-[#12121e] pb-3">
          <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400">Order Reference</span>
          <span className="text-sm font-black text-[#00e5ff]">{orderId}</span>
        </div>

        <div className="space-y-1 text-xs">
          <p><span className="font-extrabold text-gray-400 uppercase">Customer Name:</span> <span className="text-white font-medium">{customer.name}</span></p>
          <p><span className="font-extrabold text-gray-400 uppercase">Phone Number:</span> <span className="text-white font-medium">{customer.phone}</span></p>
          <p><span className="font-extrabold text-gray-400 uppercase">City:</span> <span className="text-white font-medium">{customer.city}</span></p>
          <p><span className="font-extrabold text-gray-400 uppercase">Selected Payment Method:</span> <span className="text-[#00e5ff] font-bold">{paymentMethod}</span></p>
        </div>

        {/* Selected payment detailed manual guides */}
        <div className="bg-black/30 rounded-lg p-3 border border-[#1e1e2d] text-xs space-y-2 text-gray-400">
          <span className="block text-xs font-black text-white uppercase">How to pay manually:</span>
          {paymentMethod === 'FastPay' && (
            <p>1. Open your FastPay App in Iraq. Send <span className="text-white font-bold">{formatPrice(total)}</span> to wallet number: <span className="text-emerald-400 font-extrabold">0750 123 4567</span>. Save receipt screenshot!</p>
          )}
          {paymentMethod === 'Korek' && (
            <p>1. Complete a balance transfer of <span className="text-white font-bold">{formatPrice(total)}</span> to number: <span className="text-purple-400 font-extrabold">0750 987 6543</span>. Send the receipt!</p>
          )}
          {paymentMethod === 'MasterCard' && (
            <p>1. Transfer <span className="text-white font-bold">{formatPrice(total)}</span> manually to IBAN: <span className="text-[#00e5ff] font-extrabold">IQ123456789012345678</span>. Send proof of transfer!</p>
          )}
        </div>
      </div>

      {/* Support Direct Action Channels */}
      <div className="space-y-3">
        <span className="block text-xs font-black uppercase text-gray-400">
          Click below to send receipt screenshot to our team:
        </span>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <a
            href={`https://wa.me/9647501234567?text=${encodedMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-xs font-black uppercase text-black hover:opacity-90 transition shadow-lg"
          >
            <MessageCircle size={15} />
            <span>WhatsApp Support</span>
          </a>
          <a
            href={`https://discord.gg/danostore`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#5865F2] py-3 text-xs font-black uppercase text-white hover:opacity-90 transition shadow-lg"
          >
            <Send size={15} />
            <span>Discord Support</span>
          </a>
          <a
            href={`https://tiktok.com/@danostore`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 py-3 text-xs font-black uppercase text-white hover:opacity-90 transition shadow-lg"
          >
            <Radio size={15} />
            <span>TikTok Direct</span>
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-[#12121e]">
        <Link
          to="/products"
          className="text-xs text-gray-500 font-bold hover:text-white transition"
        >
          Return to digital catalog to buy more packages
        </Link>
      </div>

    </div>
  );
}
