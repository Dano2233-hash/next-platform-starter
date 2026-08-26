import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, PhoneCall, MessageSquare, ArrowRight, Copy, Check } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;
  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No Order Found</h2>
        <p className="text-xs text-gray-400">Return to the store to start a new purchase.</p>
        <Link to="/" className="inline-block px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created Order ${order.orderId} for ${formatPrice(order.totalAmount)} using ${order.paymentMethodName}. Please verify my payment.`
  );

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6">
      {/* Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#090d18] to-cyan-950/40 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Order Created Successfully
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-1">
            Thank You for Shopping with Dano Store!
          </h1>
        </div>

        {/* Required Prompt Message */}
        <div className="p-4 rounded-2xl bg-[#050811] border border-cyan-500/30 max-w-lg mx-auto">
          <p className="text-xs md:text-sm font-bold text-cyan-300">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#090d18] border border-gray-800 rounded-xl px-4 py-2">
          <span className="text-xs text-gray-400">Order Number:</span>
          <span className="text-sm font-extrabold text-white">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="text-gray-400 hover:text-cyan-400 p-1 cursor-pointer"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Social Contact Buttons */}
      <div className="p-6 rounded-3xl bg-[#090d18] border border-gray-800 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-center">
          Contact Support to Finalize Payment
        </h3>
        <p className="text-xs text-gray-400 text-center max-w-md mx-auto">
          Click below to send your Order Number ({order.orderId}) to our support agent via WhatsApp, Discord, or TikTok:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>WhatsApp Agent</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noreferrer"
            className="py-3 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-pink-600/20 transition-all"
          >
            <span>TikTok Store</span>
          </a>
        </div>
      </div>

      {/* Order Summary & Payment Method Details */}
      <div className="p-6 rounded-3xl bg-[#090d18] border border-gray-800 space-y-4 text-xs">
        <h3 className="text-sm font-bold text-white pb-3 border-b border-gray-800">
          Order Details Summary
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-400 block">Customer Name</span>
            <span className="font-bold text-white text-sm">{order.customerName}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Phone / WhatsApp</span>
            <span className="font-bold text-white text-sm">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-gray-400 block">City</span>
            <span className="font-bold text-white">{order.city}</span>
          </div>
          <div>
            <span className="text-gray-400 block">Selected Payment Method</span>
            <span className="font-bold text-cyan-400">{order.paymentMethodName}</span>
          </div>
        </div>

        {order.paymentDetails && (
          <div className="p-3 rounded-xl bg-[#050811] border border-gray-800 text-cyan-300 font-mono">
            Payment Info: {order.paymentDetails}
          </div>
        )}

        {/* Itemized List */}
        <div className="pt-3 border-t border-gray-800 space-y-2">
          <span className="font-bold text-white block">Items Ordered:</span>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-gray-300 bg-[#050811] p-2.5 rounded-xl border border-gray-800/60">
              <div>
                <span className="font-bold text-white">{item.product.name}</span>
                {item.selectedPackage && (
                  <span className="text-[10px] text-cyan-400 block">{item.selectedPackage.name}</span>
                )}
                <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
              </div>
              <span className="font-bold text-white">{formatPrice(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-sm font-black">
          <span className="text-white">Total Amount:</span>
          <span className="text-cyan-400 text-base">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-400 hover:underline"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
