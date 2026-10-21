import React from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { CheckCircle2, MessageCircle, Send, Video, Home, FileText, Smartphone } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const orderId = searchParams.get('orderId') || 'DANO-100000';
  const order = location.state?.order || null;

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I just created an order.\nOrder ID: ${orderId}\nPayment Method: ${order?.paymentMethod || 'Manual'}\nTotal: ${formatPrice(order?.totalAmount || 0)}`
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 text-center">

      {/* Success Animated Card */}
      <div className="p-8 bg-[#0a0f24] border border-slate-800 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden">

        <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        {/* Checkmark Icon */}
        <div className="w-20 h-20 bg-emerald-950/80 border-2 border-emerald-500/60 text-emerald-400 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-cyan-400">
            Order ID: #{orderId}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Order Created Successfully!
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your order has been created successfully. Please contact us to complete the payment.
          </p>
        </div>

        {/* Order Details Card */}
        {order && (
          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl text-left space-y-3 text-xs">
            <h3 className="font-extrabold text-white text-sm border-b border-slate-800 pb-2">
              Order Details
            </h3>

            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500 block">Customer Name:</span>
                <span className="font-bold text-white">{order.customerName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Phone Number:</span>
                <span className="font-bold text-white">{order.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">City:</span>
                <span className="font-bold text-white">{order.city}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Payment Method:</span>
                <span className="font-bold text-cyan-400">{order.paymentMethod}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-300">Total Amount:</span>
              <span className="font-black text-cyan-400">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}

        {/* Contact Buttons */}
        <div className="space-y-3 pt-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Click to send order to support
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-950/50 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Discord</span>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span>TikTok</span>
            </a>
          </div>
        </div>

      </div>

      {/* Back CTA */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>

    </div>
  );
}
