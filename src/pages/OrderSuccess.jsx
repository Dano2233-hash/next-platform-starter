import React, { useEffect, useState } from 'react';
import { formatPrice } from '../utils/formatPrice';
import { Sparkles, MessageSquare, ShieldCheck, CheckCircle2, Send, ExternalLink } from 'lucide-react';

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Attempt to load order details from query params or sessionStorage fallback
    const params = new URLSearchParams(window.location.search);
    const orderIdParam = params.get('id');

    const cached = sessionStorage.getItem('last_order_details');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.orderId === orderIdParam) {
        setOrder(parsed);
        return;
      }
    }

    // Fallback if sessionStorage is cleared but order ID param exists
    if (orderIdParam) {
      setOrder({
        orderId: orderIdParam,
        customerName: 'Valued Client',
        paymentMethod: 'FastPay / Korek',
        total: 0,
        items: []
      });
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-cyan-400 animate-spin">
          {/* Loading */}
        </div>
        <p className="text-gray-400 text-xs">Sourcing your digital gaming invoice details...</p>
      </div>
    );
  }

  // Construct automated WhatsApp helper message
  const getWhatsAppLink = () => {
    const defaultNum = '9647500000000';
    const textMsg = `Hello Dano Store! I just placed an order. Order Number: ${order.orderId}. Grand Total: ${formatPrice(order.total)}. My Selected Payment Method: ${order.paymentMethod}. Please verify my transfer!`;
    return `https://wa.me/${defaultNum}?text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 select-none">

      <div className="bg-[#080811] border border-white/5 rounded-3xl p-8 space-y-8 text-center shadow-2xl relative overflow-hidden">

        {/* Animated Background Lights */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full bg-cyan-500/10 blur-[60px]"></div>

        {/* Success Circle Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-950/40 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 relative z-10 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Successful message header */}
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl md:text-3.5xl font-black uppercase tracking-wider text-white">
            Order Form Created!
          </h1>
          <p className="text-sm text-cyan-400 font-bold">
            Invoice ID: {order.orderId}
          </p>
          <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Simple invoice review block */}
        <div className="bg-[#0c0c16] border border-white/5 rounded-2xl p-4 text-left space-y-3 max-w-md mx-auto">
          <h4 className="text-white font-bold text-xs uppercase tracking-wider border-b border-white/5 pb-2">
            Invoice Details
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
            <span>Customer Name:</span>
            <span className="text-white font-semibold text-right">{order.customerName}</span>

            <span>Selected Payment:</span>
            <span className="text-cyan-400 font-semibold text-right">{order.paymentMethod}</span>

            <span>Total Amount:</span>
            <span className="text-white font-black text-right">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Verification Alert */}
        <div className="p-4 bg-purple-950/20 border border-purple-800/30 rounded-2xl max-w-md mx-auto flex items-start gap-3 text-left">
          <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-purple-300 leading-relaxed">
            Please make sure you send the transfer matching the total amount above using your chosen payment wallet. Once sent, tap one of our instant contact channels below!
          </p>
        </div>

        {/* Support Call-To-Action buttons */}
        <div className="space-y-3 max-w-md mx-auto">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-400">
            Tap to Instantly Message our Agents:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* WhatsApp */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Discord */}
            <span
              className="bg-indigo-600 text-white p-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold select-text cursor-pointer"
              title="Click to copy username"
              onClick={() => {
                navigator.clipboard.writeText('DanoStore#0001');
                alert('Copied Discord handle: DanoStore#0001');
              }}
            >
              <Send className="w-4 h-4" />
              <span>Discord</span>
            </span>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@danostore.net"
              target="_blank"
              rel="noreferrer"
              className="bg-pink-600 hover:bg-pink-500 text-white p-3 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all hover:scale-[1.02]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

        {/* Back link */}
        <div className="pt-2">
          <a
            href="/"
            className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors"
          >
            Return to Dano Store Homepage
          </a>
        </div>

      </div>

    </div>
  );
}
