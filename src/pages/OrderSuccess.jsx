import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, MessageCircle, Send, Music2, Copy, Check, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';

export function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  const [copied, setCopied] = React.useState(false);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const selectedPaymentInfo = PAYMENT_METHODS.find(
    (p) => p.id === order.paymentMethod
  ) || PAYMENT_METHODS[0];

  const handleCopyOrderId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(order.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed order #${order.orderId} for total ${formatPrice(order.totalAmount)}. I chose ${selectedPaymentInfo.name}. Please confirm my payment.`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 pt-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-300 text-xs font-black uppercase tracking-wider rounded-full border border-emerald-500/30 inline-block mb-2">
            Order Created
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">Order Created Successfully!</h1>
        </div>

        {/* Required Banner Message */}
        <div className="bg-emerald-950/60 border border-emerald-500/30 rounded-2xl p-4 max-w-xl mx-auto text-sm text-emerald-200 font-semibold leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <span className="text-xs text-slate-400 uppercase font-bold">Order Number</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-mono font-black text-cyan-400">{order.orderId}</span>
              <button
                onClick={handleCopyOrderId}
                className="p-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded border border-slate-800 transition-colors text-xs font-bold flex items-center gap-1"
                title="Copy Order ID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 uppercase font-bold">Total Amount</span>
            <p className="text-2xl font-black text-white">{formatPrice(order.totalAmount)}</p>
          </div>
        </div>

        {/* Selected Payment Method Info */}
        <div className="bg-slate-950/90 rounded-xl p-4 border border-cyan-500/30 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Selected Payment Method
          </h4>
          <p className="text-sm font-black text-white">{selectedPaymentInfo.name}</p>
          <p className="text-xs text-slate-300 font-mono bg-slate-900 p-2 rounded border border-slate-800 inline-block">
            {selectedPaymentInfo.accountNumber}
          </p>
          <p className="text-xs text-slate-400">{selectedPaymentInfo.instructions}</p>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs border-b border-slate-800 pb-4">
          <div>
            <span className="text-slate-400 block font-semibold">Customer Name</span>
            <span className="font-bold text-white text-sm">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Phone Number</span>
            <span className="font-bold text-white text-sm">{order.customerPhone}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">City</span>
            <span className="font-bold text-white text-sm">{order.customerCity}</span>
          </div>
        </div>

        {/* Ordered Items List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Ordered Items
          </h4>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs"
              >
                <div>
                  <span className="font-bold text-white">{item.productName}</span>
                  <span className="text-slate-400 block">
                    Package: {item.packageName} x {item.quantity}
                  </span>
                </div>
                <span className="font-black text-cyan-400">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Buttons Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
        <h3 className="text-lg font-black text-white">Contact Us To Finalize Order</h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Send your payment receipt and Order ID via any of our official channels below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Discord</span>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl border border-slate-700 transition-all"
          >
            <Music2 className="w-4 h-4 text-cyan-400" />
            <span>TikTok</span>
          </a>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Store Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
