import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ArrowLeft, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Checkout({ cart, cartTotal, onCreateOrder }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
        <ShoppingBag className="w-16 h-16 text-slate-700" />
        <h2 className="text-xl font-black text-white">Your cart is empty</h2>
        <p className="text-slate-400 text-xs">Please add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="py-2.5 px-5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderPayload = {
      orderId,
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
    };

    const createdOrder = onCreateOrder(orderPayload);
    setIsSubmitting(false);

    // Redirect to Order Success page
    navigate('/order-success', { state: { order: createdOrder } });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Checkout</h1>
          <p className="text-xs text-slate-400">Complete your details & confirm payment method</p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-[#090d16] p-6 rounded-2xl border border-slate-800 space-y-5 sticky top-24 shadow-xl">
          <h3 className="text-base font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3">
            Order Items Summary
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-3 text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800/80"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-100 truncate">{item.productName}</p>
                  <p className="text-[11px] text-slate-400">
                    {item.packageName} × <span className="text-white font-bold">{item.quantity}</span>
                  </p>
                </div>
                <span className="font-extrabold text-cyan-300 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
            <div className="flex justify-between text-slate-400">
              <span>Delivery Method</span>
              <span className="text-emerald-400 font-bold">Digital Instant</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Currency</span>
              <span className="font-bold text-white">IQD</span>
            </div>
            <div className="flex justify-between text-base font-extrabold pt-2 border-t border-slate-800 text-white">
              <span>Total Pay</span>
              <span className="text-cyan-300">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Secure Manual Payment for Kurdistan & Iraq. No bank card details stored.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
