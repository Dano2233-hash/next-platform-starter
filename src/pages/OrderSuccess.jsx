import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Phone, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/10">
          <CheckCircle size={48} />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Order Created Successfully!</h1>
        <p className="text-gray-400 text-lg mb-10">Your order number is <span className="text-accent-cyan font-bold">#{order.id}</span>. Please complete the payment to receive your items.</p>

        <div className="glass-card p-8 text-left mb-10">
          <h3 className="text-white font-bold text-xl mb-6 border-b border-white/5 pb-4">Order Summary</h3>
          <div className="space-y-4 mb-8">
             <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Pending Payment</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-400">Payment Method</span>
                <span className="text-white font-bold">{order.payment}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-400">Total Amount</span>
                <span className="text-accent-cyan font-extrabold text-xl">{formatPrice(order.total)}</span>
             </div>
          </div>

          <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-xl p-6">
             <h4 className="text-white font-bold mb-3 flex items-center gap-2">
               <Info className="text-accent-cyan" size={18} />
               Next Steps
             </h4>
             <p className="text-gray-400 text-sm leading-relaxed mb-6">
               Please contact us via any of the platforms below to complete your payment for <span className="text-white font-bold">{order.payment}</span>. Send your order number <span className="text-white font-bold">#{order.id}</span> as a reference.
             </p>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href="https://wa.me/yournumber"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-green-600/10 hover:bg-green-600/20 border border-green-600/20 rounded-xl transition-all group"
                >
                  <MessageCircle size={24} className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-xs">WhatsApp</span>
                </a>
                <a
                  href="https://discord.gg/yourlink"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-accent-purple/10 hover:bg-accent-purple/20 border border-accent-purple/20 rounded-xl transition-all group"
                >
                  <Send size={24} className="text-accent-purple group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-xs">Discord</span>
                </a>
                <a
                  href="https://tiktok.com/@youraccount"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                >
                  <Phone size={24} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-xs">TikTok</span>
                </a>
             </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
           <Link to="/" className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-10 rounded-xl transition-all flex items-center gap-2">
             Back to Home
           </Link>
           <Link to="/products" className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-accent-blue/20 transition-all flex items-center gap-2">
             Continue Shopping <ArrowRight size={18} />
           </Link>
        </div>
      </div>
    </div>
  );
};

const Info = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default OrderSuccess;
