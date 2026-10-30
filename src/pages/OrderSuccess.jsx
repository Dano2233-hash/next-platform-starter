import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle,
  Copy,
  Check,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'DANO-ORDER';
  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
        const found = savedOrders.find((o) => o.orderId === orderId);
        if (found) {
          setOrder(found);
        }
      } catch (e) {
        console.error('Failed to parse order details', e);
      }
    }
  }, [orderId]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const paymentNames = {
    fastpay: 'FastPay Wallet',
    korek: 'Korek Telecom',
    mastercard: 'MasterCard / Visa'
  };

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-12 space-y-8">
        {/* Success Icon & Banner */}
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            Order Created Successfully!
          </h1>
          <p className="text-sm text-cyan-300 font-semibold max-w-md mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order Reference Card */}
        <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />

          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order Reference Number</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 tracking-wider font-mono">
              {orderId}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          {copied && <p className="text-[11px] text-emerald-400 font-bold">Copied Order ID to clipboard!</p>}
        </div>

        {/* Contact Support Buttons */}
        <div className="bg-[#080c19] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="border-b border-slate-800 pb-3 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-100">Contact Us to Complete Payment</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Send your Order ID ({orderId}) to our support team on your preferred platform:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/9647501234567?text=Hello%20Dano%20Store!%20My%20Order%20ID%20is%20${orderId}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 font-bold text-xs transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* Discord */}
            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-600/30 font-bold text-xs transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Discord Community</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@danostore.iq"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-pink-600/20 border border-pink-500/40 text-pink-300 hover:bg-pink-600/30 font-bold text-xs transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>TikTok Support</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Order Details Summary */}
        {order && (
          <div className="bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3">
              Order Summary Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Customer Name</span>
                <span className="font-bold text-slate-200">{order.customer?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone Number</span>
                <span className="font-bold text-slate-200">{order.customer?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block">City</span>
                <span className="font-bold text-slate-200">{order.customer?.city}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Method</span>
                <span className="font-bold text-cyan-400 uppercase">
                  {paymentNames[order.customer?.paymentMethod] || order.customer?.paymentMethod}
                </span>
              </div>
            </div>

            {/* Items list */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase block">Purchased Items:</span>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-slate-800/40">
                    <div>
                      <span className="font-bold text-slate-200">{item.name}</span>
                      <span className="text-slate-400 text-[10px] block">{item.packageName} x {item.quantity}</span>
                    </div>
                    <span className="font-extrabold text-cyan-400">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-extrabold">
              <span className="text-slate-300">Total IQD:</span>
              <span className="text-cyan-400">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}

        {/* Back to home */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 text-xs font-bold transition-all"
          >
            <span>Return to Dano Store Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
