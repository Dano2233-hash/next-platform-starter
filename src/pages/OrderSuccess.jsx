import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, PhoneCall, ExternalLink, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // Safeguard if direct visit
  if (!order) {
    return <Navigate to="/products" replace />;
  }

  // Payment method specific text instructions
  let paymentInstruction = 'Please transfer the correct amount to FastPay wallet: 0750 XXX XXXX.';
  if (order.paymentMethod === 'korek') {
    paymentInstruction = 'Please transfer or send Korek Balance card worth the total amount to: 0770 XXX XXXX.';
  } else if (order.paymentMethod === 'mastercard') {
    paymentInstruction = 'Please submit manual wire payment to FIB/MasterCard Account ID: DANO-STORE-FIB.';
  }

  // Social message templates
  const whatsappMsg = encodeURIComponent(
    `Hello Dano Store team! I have completed order ${order.orderId} for ${formatPrice(order.total)}. Please process my delivery.`
  );

  return (
    <div className="max-w-3xl mx-auto py-12 pb-24 px-4 space-y-8">
      {/* Visual Header status */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-bounce">
          <CheckCircle className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-400">Order Created Successfully</span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">Thank You For Your Order!</h1>
        </div>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Your order has been created successfully. Please contact us via WhatsApp, Discord, or TikTok to complete the payment and receive your digital package.
        </p>
      </div>

      {/* Payment Instruction & Social Contact Actions */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-900 shadow-2xl space-y-6">
        <h3 className="text-sm font-black uppercase tracking-widest text-white border-b border-slate-900 pb-3 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-[#00e5ff]" />
          <span>Contact Us To Pay & Complete</span>
        </h3>

        <div className="p-4 rounded-2xl bg-[#08080b] border border-slate-900 space-y-2">
          <span className="text-[10px] text-[#00e5ff] uppercase tracking-widest font-extrabold block">
            Selected payment method: <strong className="text-white uppercase">{order.paymentMethod}</strong>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-bold">
            {paymentInstruction}
          </p>
        </div>

        {/* Dynamic Support Contact buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/20 text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            <span>WhatsApp Support</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#5865f2]/10 hover:bg-[#5865f2]/20 text-[#5865f2] border border-[#5865f2]/20 text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            <span>Discord Server</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore.js"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#ff0050]/10 hover:bg-[#ff0050]/20 text-white border border-[#ff0050]/20 text-xs font-extrabold uppercase tracking-wider transition-all"
          >
            <span>TikTok Shop</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Order Invoice summary */}
      <div className="p-6 rounded-3xl bg-[#08080b] border border-slate-900 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b border-slate-900 pb-3">
          Order Summary & Invoice
        </h3>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs font-bold border-b border-slate-900 pb-5">
          <div>
            <span className="text-slate-500 uppercase tracking-widest block">Order ID</span>
            <span className="text-slate-200 mt-1 block font-black text-sm text-[#00e5ff]">{order.orderId}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-widest block">Date</span>
            <span className="text-slate-200 mt-1 block">{new Date(order.date).toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-widest block">Customer Details</span>
            <span className="text-slate-200 mt-1 block">
              {order.customerName} ({order.phoneNumber})
            </span>
          </div>
          <div>
            <span className="text-slate-500 uppercase tracking-widest block">City</span>
            <span className="text-slate-200 mt-1 block">{order.city}</span>
          </div>
        </div>

        {/* Items mapping list */}
        <div className="space-y-3.5">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block">Purchased Packages</span>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-xs font-bold">
              <div>
                <span className="text-slate-200">{item.name}</span>
                <span className="text-slate-500 uppercase text-[10px] tracking-wider ml-2 bg-slate-900 px-1.5 py-0.5 rounded">
                  {item.packageName}
                </span>
              </div>
              <span className="text-slate-300">
                {item.quantity} × {formatPrice(item.price)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-900 pt-5 flex justify-between items-baseline">
          <span className="text-sm font-bold text-white uppercase tracking-wider">Total Invoiced Amount</span>
          <span className="text-xl font-black text-white">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-[#0066ff] hover:bg-[#0055dd] text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
