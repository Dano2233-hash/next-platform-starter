import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  PhoneCall,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const order = location.state?.order;

  if (!order) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-white">No Order Found</h2>
        <p className="text-xs text-slate-400">
          It looks like you reached this page without placing a recent order.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Dano Store! I placed an order.\nOrder ID: ${order.orderId}\nName: ${order.customerName}\nTotal: ${formatPrice(order.totalAmount)}\nPayment Method: ${order.paymentDetails?.name || order.paymentMethod}`
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">

      {/* Top Banner Card */}
      <div className="bg-gradient-to-br from-[#0c132c] via-[#090e21] to-[#050813] border border-cyan-500/30 rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-[1px] shadow-xl shadow-emerald-500/20">
          <div className="w-full h-full bg-[#080d1e] rounded-[15px] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
            Order Successfully Placed
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white pt-2">
            Thank You For Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-cyan-200 font-medium max-w-xl mx-auto">
            “Your order has been created successfully. Please contact us to complete the payment.”
          </p>
        </div>

        {/* Order ID Copy Box */}
        <div className="pt-2 max-w-xs mx-auto">
          <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
            Order Reference Number
          </span>
          <div className="flex items-center justify-between bg-[#050813] border border-cyan-500/40 rounded-xl p-2.5 shadow-inner">
            <span className="font-mono font-black text-lg text-cyan-400 tracking-wider">
              {order.orderId}
            </span>
            <button
              onClick={handleCopyOrderId}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Manual Payment Instructions */}
      <div className="bg-[#090e21] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>How to Complete Payment</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Follow these 3 quick steps to complete your manual IQD payment and receive your digital codes.
          </p>
        </div>

        {/* Payment Account Details */}
        <div className="p-4 bg-[#050813] border border-cyan-500/20 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold uppercase">Selected Payment Method:</span>
            <span className="font-black text-cyan-400 font-heading text-sm">
              {order.paymentDetails?.name || order.paymentMethod}
            </span>
          </div>

          {order.paymentDetails?.accountNumber && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500 block">Transfer Account / Ref:</span>
                <span className="font-mono font-bold text-slate-200 text-sm">
                  {order.paymentDetails.accountNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block">Account Holder:</span>
                <span className="font-bold text-slate-200">
                  {order.paymentDetails.accountName || 'Dano Store Official'}
                </span>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total Amount to Pay:</span>
            <span className="text-lg font-black text-white font-heading">
              {formatPrice(order.totalAmount)}
            </span>
          </div>
        </div>

        {/* Steps List */}
        <ol className="space-y-3 text-xs text-slate-300">
          <li className="flex items-start gap-3 p-3 bg-[#0c1226] rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">1</span>
            <div>
              <strong className="text-white block font-bold">Transfer the total amount</strong>
              Transfer exactly <strong className="text-cyan-400">{formatPrice(order.totalAmount)}</strong> to the account above via FastPay, Korek, or MasterCard/FIB.
            </div>
          </li>

          <li className="flex items-start gap-3 p-3 bg-[#0c1226] rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">2</span>
            <div>
              <strong className="text-white block font-bold">Take a screenshot of payment receipt</strong>
              Capture the transaction reference/receipt on your phone.
            </div>
          </li>

          <li className="flex items-start gap-3 p-3 bg-[#0c1226] rounded-xl border border-slate-800">
            <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0">3</span>
            <div>
              <strong className="text-white block font-bold">Send Order ID &amp; Receipt to Support</strong>
              Click one of the contact buttons below to send your Order ID (<strong className="text-cyan-400">{order.orderId}</strong>) and receipt screenshot to our support team.
            </div>
          </li>
        </ol>

        {/* Contact Support Buttons */}
        <div className="pt-2 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Contact Dano Store Support:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={`https://wa.me/9647500000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 rounded-2xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/40"
            >
              <PhoneCall className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>

            <a
              href="https://discord.gg/danostore"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 rounded-2xl text-indigo-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discord Support</span>
            </a>

            <a
              href="https://tiktok.com/@danostore"
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 rounded-2xl text-purple-300 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-950/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>TikTok Support</span>
            </a>
          </div>
        </div>
      </div>

      {/* Order Summary Recap */}
      <div className="bg-[#090e21] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <h3 className="font-heading font-extrabold text-base text-white border-b border-slate-800 pb-3">
          Order Items &amp; Customer Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#050813] p-4 rounded-2xl border border-slate-800/80">
          <div>
            <span className="text-slate-500 block">Customer Name:</span>
            <span className="font-bold text-white">{order.customerName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Phone Number:</span>
            <span className="font-bold text-white">{order.phoneNumber}</span>
          </div>
          <div>
            <span className="text-slate-500 block">City / Governorates:</span>
            <span className="font-bold text-white">{order.city}</span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          {order.items?.map((item) => (
            <div
              key={item.cartItemId}
              className="flex items-center justify-between p-3 bg-[#0c1226] border border-slate-800/80 rounded-xl text-xs"
            >
              <div>
                <span className="font-bold text-slate-100">{item.productName}</span>
                {item.selectedPackage && (
                  <span className="text-cyan-400 block text-[11px]">{item.selectedPackage}</span>
                )}
                <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
              </div>
              <span className="font-black text-white font-heading">
                {formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Return Home Button */}
      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-2xl border border-slate-700 transition-colors"
        >
          <span>Return To Store Homepage</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default OrderSuccess;
