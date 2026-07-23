import React from 'react';
import { CheckCircle2, MessageCircle, MessageSquare, Send, ArrowRight, Music2 } from 'lucide-react';
import { useNavigation } from '../hooks/useNavigation';
import { formatPrice } from '../utils/formatPrice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export function OrderSuccess() {
  const { route, navigate } = useNavigation();

  // Retrieve the order details from local storage using orderId from hash query
  let order = null;
  const storedOrders = localStorage.getItem('dano_orders');
  if (storedOrders && route.orderId) {
    try {
      const orders = JSON.parse(storedOrders);
      order = orders.find(o => o.id === route.orderId);
    } catch (e) {}
  }

  // Display name helper for payment methods
  const getPaymentName = (method) => {
    switch (method?.toLowerCase()) {
      case 'fastpay': return 'FastPay Wallet';
      case 'korek': return 'Korek Telecom';
      case 'mastercard': return 'MasterCard / FIB';
      default: return method || 'Manual Local Transfer';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Success Card block */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0d0d15] border border-brand-border/80 text-center space-y-6 shadow-xl shadow-brand-blue/5 animate-fade-in">

          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-brand-cyan animate-bounce" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Invoice Generated Successfully
            </h1>

            {/* Required message */}
            <p className="text-sm text-green-400 font-extrabold max-w-md mx-auto">
              “Your order has been created successfully. Please contact us to complete the payment.”
            </p>
          </div>

          {/* Core Details Receipts */}
          {order ? (
            <div className="p-5 rounded-xl bg-[#050505] border border-brand-border/60 text-left space-y-4">

              {/* Top metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3.5 text-xs">
                <div>
                  <span className="text-gray-500 uppercase font-bold">Order ID:</span>
                  <span className="text-brand-cyan font-black ml-1.5">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase font-bold">Payment Method:</span>
                  <span className="text-white font-extrabold ml-1.5">{getPaymentName(order.paymentMethod)}</span>
                </div>
              </div>

              {/* Customer info recap */}
              <div className="grid grid-cols-2 gap-3 text-xs border-b border-white/5 pb-3.5">
                <div>
                  <p className="text-gray-500 uppercase font-medium">Customer</p>
                  <p className="font-bold text-gray-200">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-medium">Phone Number</p>
                  <p className="font-bold text-gray-200">{order.phoneNumber}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 uppercase font-medium">City</p>
                  <p className="font-bold text-gray-200">{order.city}</p>
                </div>
                {order.orderNote && (
                  <div className="col-span-2">
                    <p className="text-gray-500 uppercase font-medium">Notes / Player ID</p>
                    <p className="font-bold text-gray-300 italic">{order.orderNote}</p>
                  </div>
                )}
              </div>

              {/* Items Table list */}
              <div className="space-y-2 text-xs border-b border-white/5 pb-3.5">
                <p className="text-gray-500 uppercase font-semibold">Purchased Items</p>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center gap-4 text-xs text-gray-300">
                    <div>
                      <span className="font-bold text-white">{item.name}</span>
                      <span className="text-[10px] text-brand-cyan font-bold ml-1.5">({item.selectedPackage.name})</span>
                      <span className="text-gray-500 ml-1.5">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-white">
                      {formatPrice(item.selectedPackage.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subtotal Total cost */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-xs font-bold text-white uppercase">Invoice Amount Due</span>
                <span className="text-xl font-black text-brand-cyan">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>

            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#050505] border border-brand-border/60 text-center">
              <span className="text-xs text-gray-400 font-semibold uppercase">No Order Metadata Available Locally</span>
            </div>
          )}

          {/* Contact Support Buttons (WhatsApp, Discord, TikTok) */}
          <div className="space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">
              3. Contact Us To Confirm Transfer & Receive Voucher
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/9647500000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 hover:border-green-500 text-green-400 font-bold text-xs uppercase tracking-wider transition"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                WhatsApp Chat
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500 text-indigo-400 font-bold text-xs uppercase tracking-wider transition"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Discord Server
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com/@danostore"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-pink-600/10 hover:bg-pink-600/20 border border-pink-500/20 hover:border-pink-500 text-pink-400 font-bold text-xs uppercase tracking-wider transition"
              >
                <Music2 className="h-4.5 w-4.5" />
                TikTok Profile
              </a>
            </div>
          </div>

          {/* Back Home */}
          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => navigate('#/')}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-cyan hover:text-white uppercase tracking-widest transition"
            >
              Back to Home Store
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default OrderSuccess;
