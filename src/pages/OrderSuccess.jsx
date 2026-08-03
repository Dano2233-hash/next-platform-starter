import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, AlertTriangle, MessageSquare, Copy, ExternalLink, Sparkles } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  // Load the order from localStorage
  const order = React.useMemo(() => {
    if (!orderId) return null;
    try {
      const stored = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      return stored.find((o) => o.orderNumber === orderId);
    } catch (e) {
      return null;
    }
  }, [orderId]);

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      alert('Order number copied to clipboard: ' + orderId);
    }
  };

  const getPaymentLabel = (method) => {
    switch (method?.toLowerCase()) {
      case 'fastpay':
        return 'FastPay Mobile Wallet';
      case 'korek':
        return 'Korek Telecom Balance Transfer';
      case 'mastercard':
        return 'MasterCard (Fib / Iraqi)';
      default:
        return 'Manual Payment Method';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">

      {/* Top Banner Checkmark */}
      <div className="bg-[#090911] border border-[#121225] rounded-2xl p-6 sm:p-10 text-center space-y-4 relative overflow-hidden">
        {/* Spotlight circle glow */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff]" />

        <div className="w-16 h-16 rounded-full bg-green-950/40 border border-green-500/40 flex items-center justify-center mx-auto text-green-400 animate-bounce">
          <CheckCircle className="w-8 h-8" />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          Your Order Has Been Created!
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
          "Your order has been created successfully. Please contact us to complete the payment."
        </p>

        {/* Big Code Receipt display */}
        {orderId && (
          <div className="bg-black/40 border border-[#1a1a2e] p-3 rounded-xl max-w-xs mx-auto flex items-center justify-between gap-3">
            <div>
              <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-widest block text-left">Order Number</span>
              <span className="text-xs sm:text-sm font-black text-[#00e5ff] tracking-widest">{orderId}</span>
            </div>
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-white/5 rounded text-gray-400 hover:text-white transition-premium shrink-0"
              title="Copy Order ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Manual support trigger links */}
      <div className="bg-[#090911] border border-[#121225] p-6 rounded-2xl space-y-4">
        <h3 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#121225] pb-2 text-center sm:text-left">
          💬 Contact Us to Pay & Activate
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed text-center sm:text-left">
          Your digital key or account subscription will be processed manually by our operators. Tap on any supported social channel below, send your <strong>Order Number ({orderId})</strong>, and we will guide you on the FastPay / Korek transfer.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://wa.me/9647500000000" // Placeholder Kurdistan WhatsApp
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#128C7E] hover:bg-[#075e54] text-white text-xs font-bold py-3 px-4 rounded-xl transition-premium"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            WhatsApp Support
          </a>

          <a
            href="https://discord.gg/danostore" // Placeholder Discord
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] text-white text-xs font-bold py-3 px-4 rounded-xl transition-premium"
          >
            <MessageSquare className="w-4 h-4" />
            Discord Community
          </a>

          <a
            href="https://tiktok.com/@danostore" // Placeholder TikTok
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-black hover:bg-neutral-900 border border-neutral-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition-premium"
          >
            <ExternalLink className="w-4 h-4" />
            TikTok Page
          </a>
        </div>
      </div>

      {/* Summary Row Details */}
      {order && (
        <div className="bg-[#090911] border border-[#121225] p-6 rounded-2xl space-y-4 text-xs">
          <h3 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#121225] pb-2">
            🧾 Order Summary
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-0.5">Recipient</span>
              <span className="text-white font-bold text-xs">{order.customer?.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-0.5">Phone Contact</span>
              <span className="text-white font-bold text-xs">{order.customer?.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-0.5">Region Location</span>
              <span className="text-white font-bold text-xs">{order.customer?.city}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-0.5">Selected Payment</span>
              <span className="text-cyan-400 font-extrabold text-xs uppercase">{getPaymentLabel(order.customer?.paymentMethod)}</span>
            </div>
          </div>

          <div className="border-t border-[#121225]/60 pt-4 space-y-2">
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block">Ordered Items</span>
            <div className="space-y-2">
              {order.items?.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-gray-300">
                  <span>{item.product.name} ({item.selectedPackage}) x{item.quantity}</span>
                  <span className="text-white font-bold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#121225] pt-4 flex justify-between items-baseline">
            <span className="text-gray-400 font-extrabold uppercase text-[10px] tracking-wider">Total Amount Due</span>
            <span className="text-base font-black text-[#00e5ff]">{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      {/* Navigation options */}
      <div className="text-center pt-2">
        <Link
          to="/products"
          className="bg-[#0a0a16] border border-[#1a1a2e] hover:border-gray-700 text-gray-300 text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-premium inline-block"
        >
          Return to digital catalog
        </Link>
      </div>

    </div>
  );
}
