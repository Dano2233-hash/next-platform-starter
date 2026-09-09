import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

export const Checkout = ({ cartItems, totalAmount, onOrderCreated }) => {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12 p-8 sm:p-12 bg-[#080d1a] border border-slate-800 rounded-3xl text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = (orderPayload) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: orderPayload.customer.customerName,
      phoneNumber: orderPayload.customer.phoneNumber,
      city: orderPayload.customer.city,
      paymentMethod: orderPayload.customer.paymentMethod,
      orderNote: orderPayload.customer.orderNote,
      items: orderPayload.items,
      total: orderPayload.total,
      createdAt: orderPayload.createdAt,
      status: 'Pending Payment',
    };

    // Save order in localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
      localStorage.setItem('dano_last_order', JSON.stringify(newOrder));
    } catch (e) {
      console.error('Failed to save order:', e);
    }

    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }

    navigate(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Navigation */}
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </button>

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer details and select your payment method (FastPay, Korek, or MasterCard).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cartItems={cartItems}
            totalAmount={totalAmount}
            onSubmitOrder={handleSubmitOrder}
          />
        </div>

        {/* Right Mini-Summary */}
        <div className="lg:col-span-5 bg-[#080d1a] border border-slate-800 rounded-2xl p-5 space-y-4 h-fit">
          <h3 className="font-extrabold text-white text-sm pb-3 border-b border-slate-800 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Summary ({cartItems.length} items)
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartKey} className="flex items-center justify-between text-xs text-slate-300">
                <div>
                  <span className="font-semibold block text-white">{item.productName}</span>
                  <span className="text-[11px] text-cyan-400">{item.packageName} x{item.quantity}</span>
                </div>
                <span className="font-bold text-slate-200">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(totalAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-cyan-400">0 IQD</span>
            </div>
            <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
              <span className="font-extrabold text-white text-sm">Total Amount</span>
              <span className="text-xl font-black text-cyan-300">{formatPrice(totalAmount)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              After placing the order, you will receive payment transfer instructions to finalize your order via WhatsApp or Discord.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
