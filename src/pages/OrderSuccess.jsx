import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Phone, MessageSquare, Compass, Send, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNo = searchParams.get('orderNo') || 'DS-UNKNOWN';

  // Find the order in localStorage
  const order = useMemo(() => {
    const saved = localStorage.getItem('dano_orders');
    if (saved) {
      try {
        const ordersList = JSON.parse(saved);
        return ordersList.find((o) => o.orderNo === orderNo);
      } catch (e) {
        return null;
      }
    }
    return null;
  }, [orderNo]);

  // Payment instruction helper
  const getPaymentInstructions = (method) => {
    switch (method) {
      case 'fastpay':
        return 'Please transfer the total amount to FastPay Wallet: 0750 123 4567. Send screenshot of transaction on WhatsApp.';
      case 'korek':
        return 'Please transfer Korek balance to: 0750 987 6543. Send transfer receipt on WhatsApp or Discord.';
      case 'mastercard':
        return 'Please contact us directly on WhatsApp or Discord to request our MasterCard secure invoice link.';
      default:
        return 'Please contact our staff via WhatsApp or Discord to complete your manual transfer.';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Visual Success Icon Block */}
      <div className="text-center space-y-4 bg-gradient-to-b from-[#0c0d12] to-transparent p-8 rounded-2xl border border-[#1a1e29] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] via-[#0066ff] to-[#7000ff]" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xl shadow-emerald-500/5 mb-2">
          <CheckCircle size={36} />
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          ORDER SUBMITTED SUCCESSFULLY!
        </h1>

        <div className="inline-flex items-center gap-2 bg-[#050505] px-4 py-1.5 rounded-full border border-[#1a1e29]">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-extrabold">Order ID:</span>
          <span className="text-xs text-[#00e5ff] font-black">{orderNo}</span>
        </div>

        <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed pt-2">
          Your order has been created successfully. Please contact us to complete the payment.
        </p>
      </div>

      {order && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Summary Info */}
          <div className="bg-[#0c0d12] p-6 rounded-xl border border-[#1a1e29] space-y-4 shadow-md">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 border-b border-[#1a1e29] pb-2">
              Order Details
            </h3>

            <div className="divide-y divide-[#1a1e29]/50 space-y-2.5 max-h-48 overflow-y-auto pr-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs py-2">
                  <span className="text-gray-300 font-medium">
                    {item.productName} <span className="text-gray-500">({item.packageName}) x{item.quantity}</span>
                  </span>
                  <span className="font-bold text-white shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#1a1e29] flex justify-between items-baseline">
              <span className="text-xs font-bold text-gray-400">Total Price:</span>
              <span className="text-lg font-black text-[#00e5ff]">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Payment Instructions & Manual Transfer details */}
          <div className="bg-[#0c0d12] p-6 rounded-xl border border-[#1a1e29] space-y-4 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-300 border-b border-[#1a1e29] pb-2">
                Manual Transfer Instructions
              </h3>
              <p className="text-[11px] text-gray-400 mt-2">
                Selected Method: <span className="text-white font-extrabold capitalize">{order.paymentMethod}</span>
              </p>
              <div className="p-3 bg-[#050505] rounded-lg border border-[#1a1e29] mt-3.5">
                <p className="text-xs text-amber-500 font-bold leading-relaxed">
                  {getPaymentInstructions(order.paymentMethod)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-gray-500 pt-4">
              <ShieldCheck size={14} className="text-[#00e5ff]" />
              Safe & Secure transfer inside Kurdistan region.
            </div>
          </div>
        </div>
      )}

      {/* Social Contact Channels Panel */}
      <div className="bg-[#0c0d12] p-6 rounded-2xl border border-[#1a1e29] space-y-5 shadow-xl text-center">
        <h3 className="text-xs font-black uppercase tracking-wider text-white">
          CLICK BELOW TO SEND RECEIPT & CLAIM YOUR CODE
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/9647501234567"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-3.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-600/10 text-center"
          >
            <Phone size={16} />
            WHATSAPP
          </a>

          {/* Discord Button */}
          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-3.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/10 text-center"
          >
            <MessageSquare size={16} />
            DISCORD CHAT
          </a>

          {/* TikTok Button */}
          <a
            href="https://tiktok.com/@danostore.js"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 p-3.5 bg-black hover:bg-gray-900 text-xs font-bold text-white rounded-xl border border-gray-800 transition-all cursor-pointer shadow-lg text-center"
          >
            <Send size={16} className="text-[#00e5ff]" />
            TIKTOK CHANNEL
          </a>
        </div>
      </div>

      {/* Back to Home action */}
      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <Compass size={14} />
          Go Back to Store Front
        </Link>
      </div>
    </div>
  );
}
