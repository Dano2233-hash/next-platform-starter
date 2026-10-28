import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

export function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();

    const orderObj = {
      id: orderId,
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cartItems,
      totalAmount: cartTotal
    };

    const createdOrder = addOrder(orderObj);
    clearCart();
    setIsSubmitting(false);

    navigate('/order-success', { state: { order: createdOrder } });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manual Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order details and receive manual payment instructions.
          </p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5 bg-[#0a0f20] border border-slate-800 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" /> Order Summary ({cartItems.length} Items)
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex justify-between text-xs border-b border-slate-800/60 pb-2">
                <div>
                  <h4 className="font-bold text-slate-200">{item.name}</h4>
                  <span className="text-[11px] text-cyan-400 block">{item.packageName} × {item.quantity}</span>
                </div>
                <span className="font-extrabold text-white">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-slate-800 pt-4 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Method</span>
              <span className="text-emerald-400 font-bold">Instant Code</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Payment Type</span>
              <span className="text-amber-400 font-bold uppercase">Manual Processing</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-baseline justify-between">
            <span className="font-extrabold text-slate-100 text-sm">Grand Total</span>
            <span className="text-2xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>After placing the order, you will receive payment transfer info & contact options.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
