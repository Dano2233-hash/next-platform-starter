import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, Copy, MessageCircle, Send, Video, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentInstructionText = `Hi Dano Store! I just placed an order on your website:
Order ID: ${order.orderId}
Total: ${formatPrice(order.totalPrice)}
Payment Method: ${order.paymentMethod}
Customer: ${order.customer.name} (${order.customer.phone})
City: ${order.customer.city}`;

  const whatsappUrl = `https://wa.me/9647500000000?text=${encodeURIComponent(paymentInstructionText)}`;
  const discordUrl = 'https://discord.gg';
  const tiktokUrl = 'https://www.tiktok.com';

  return (
    <div className="max-w-3xl mx-auto py-8 sm:py-12 space-y-8 pb-20">

      {/* Top Success Badge */}
      <div className="text-center space-y-3 bg-[#090d1a] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/60">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Order Created Successfully!
        </h1>

        <p className="text-sm sm:text-base text-cyan-200 font-semibold max-w-xl mx-auto">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        {/* Order ID pill */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm font-bold text-white mt-2">
          <span>Order Number:</span>
          <span className="font-mono text-cyan-400 text-base">{order.orderId}</span>
          <button
            onClick={handleCopyOrderId}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
            title="Copy Order ID"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && <span className="text-[10px] text-emerald-400">Copied!</span>}
        </div>
      </div>

      {/* Contact Channels for Payment Completion */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="font-bold text-white text-base">Contact Us to Complete Payment</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Send your Order ID and payment receipt via your preferred messaging platform below for instant activation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>

          {/* Discord Button */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-indigo-950/30"
          >
            <Send className="w-4 h-4" />
            <span>Discord Server</span>
          </a>

          {/* TikTok Button */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all border border-slate-700"
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span>TikTok Live / DM</span>
          </a>
        </div>
      </div>

      {/* Itemized Order Summary */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          <span>Order Summary</span>
        </h3>

        <div className="space-y-3 border-b border-slate-800 pb-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div>
                <h5 className="font-bold text-slate-200">{item.name}</h5>
                <span className="text-slate-400 text-[11px]">
                  Package: {item.packageName} × {item.quantity}
                </span>
              </div>
              <span className="font-extrabold text-cyan-400">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <span className="text-slate-500 block">Customer Name:</span>
            <span className="font-bold text-slate-200">{order.customer.name}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Phone Number:</span>
            <span className="font-bold text-slate-200">{order.customer.phone}</span>
          </div>

          <div>
            <span className="text-slate-500 block">City / Region:</span>
            <span className="font-bold text-slate-200">{order.customer.city}</span>
          </div>

          <div>
            <span className="text-slate-500 block">Selected Payment Method:</span>
            <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
          </div>

          {order.customer.note && (
            <div className="col-span-2">
              <span className="text-slate-500 block">Customer Note / Player ID:</span>
              <span className="font-medium text-slate-300">{order.customer.note}</span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="font-bold text-slate-300">Total Amount Due</span>
          <span className="text-2xl font-black text-cyan-400">
            {formatPrice(order.totalPrice)}
          </span>
        </div>
      </div>

      {/* Return to Store CTA */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-colors"
        >
          <span>Continue Shopping at Dano Store</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
