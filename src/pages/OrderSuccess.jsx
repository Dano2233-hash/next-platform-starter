import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import {
  CheckCircle2,
  Copy,
  MessageCircle,
  MessageSquare,
  Video,
  ShoppingBag,
  ArrowLeft,
  FileText
} from 'lucide-react';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const { orders } = useProducts();

  // Retrieve order from route state or local storage list
  const order =
    location.state?.order || orders.find((o) => o.orderId === orderId);

  if (!order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Order Details Not Found</h2>
        <p className="text-slate-400 text-sm">We couldn't locate order #{orderId}.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    );
  }

  const copyAccountNumber = () => {
    if (order.paymentMethod?.accountNumber) {
      navigator.clipboard.writeText(order.paymentMethod.accountNumber);
      alert('Account number copied to clipboard!');
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I have created order ${order.orderId} for ${formatPrice(order.totalAmount)}. Here is my payment confirmation receipt.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#090d1a] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
        <div className="w-16 h-16 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Order Created Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Order Number: <span className="text-cyan-400 font-mono">{order.orderId}</span>
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          “Your order has been created successfully. Please contact us to complete the payment.”
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://wa.me/9647501234567?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl font-extrabold text-xs bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Confirm on WhatsApp</span>
          </a>

          <a
            href="https://discord.gg/danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl font-extrabold text-xs bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Discord Support</span>
          </a>

          <a
            href="https://tiktok.com/@danostore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl font-extrabold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Video className="w-4 h-4" />
            <span>TikTok</span>
          </a>
        </div>
      </div>

      {/* Payment Transfer Instructions Box */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3">
          Manual Payment Instructions ({order.paymentMethod?.name})
        </h3>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-slate-400">Selected Method:</span>
            <h4 className="font-extrabold text-white text-base">{order.paymentMethod?.name}</h4>
            <p className="text-xs text-slate-400 mt-1">{order.paymentMethod?.description}</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 w-full sm:w-auto justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Transfer To Number:</p>
              <p className="font-mono font-bold text-cyan-400 text-sm">{order.paymentMethod?.accountNumber}</p>
            </div>
            <button
              onClick={copyAccountNumber}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
              title="Copy Number"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 space-y-1.5">
          <p className="font-bold text-white">Payment Steps:</p>
          <ol className="list-decimal list-inside space-y-1 text-slate-400">
            <li>Open your {order.paymentMethod?.name} application or mobile dialer.</li>
            <li>Transfer exactly <strong className="text-cyan-400">{formatPrice(order.totalAmount)}</strong> to <span className="font-mono font-bold text-slate-200">{order.paymentMethod?.accountNumber}</span>.</li>
            <li>Take a screenshot or note down the transaction ID.</li>
            <li>Click the WhatsApp button above to send the screenshot and order ID <strong className="text-white">{order.orderId}</strong> to activate your product.</li>
          </ol>
        </div>
      </div>

      {/* Order Items & Customer Info Summary */}
      <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400">
            Order Summary & Details
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Customer Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div>
            <span className="text-slate-500 font-bold">Customer Name:</span>
            <p className="font-bold text-white mt-0.5">{order.customer?.name}</p>
          </div>
          <div>
            <span className="text-slate-500 font-bold">Phone Number:</span>
            <p className="font-bold text-white mt-0.5">{order.customer?.phone}</p>
          </div>
          <div>
            <span className="text-slate-500 font-bold">City / Region:</span>
            <p className="font-bold text-white mt-0.5">{order.customer?.city}</p>
          </div>
          {order.customer?.orderNote && (
            <div className="sm:col-span-3 pt-2 border-t border-slate-800">
              <span className="text-slate-500 font-bold">Player ID / Note:</span>
              <p className="font-mono text-cyan-300 mt-0.5">{order.customer.orderNote}</p>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs"
            >
              <div className="flex items-center gap-3">
                <ProductImage
                  src={item.image}
                  alt={item.productName}
                  category={item.category}
                  platform={item.platform}
                  className="w-12 h-12 shrink-0"
                />
                <div>
                  <h4 className="font-bold text-white">{item.productName}</h4>
                  <p className="text-cyan-400 font-semibold">{item.packageName}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-extrabold text-white">{formatPrice(item.price * item.quantity)}</p>
                <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total Box */}
        <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm">
          <span className="font-bold text-slate-300">Total Payable Amount:</span>
          <span className="font-black text-2xl text-cyan-400">{formatPrice(order.totalAmount)}</span>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
