import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ChevronLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold text-slate-100">Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();

    const orderData = {
      id: orderId,
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
    };

    // Save order in state / local storage
    addOrder(orderData);

    // Clear cart & navigate to Order Success page
    clearCart();
    setIsSubmitting(false);
    navigate(`/order-success/${orderId}`, { state: { order: orderData } });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Checkout</h1>
          <p className="text-xs text-slate-400">Complete your details to place manual order.</p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-5 space-y-4 sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Items ({cart.length})</span>
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs"
                >
                  <div className="min-w-0">
                    <h5 className="font-bold text-slate-200 truncate">{item.productName}</h5>
                    <p className="text-[11px] text-cyan-400 font-semibold">
                      {item.packageName} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-extrabold text-slate-100 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery / Instant Fee</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-100 pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-cyan-300 text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="bg-cyan-950/40 border border-cyan-800/50 rounded-xl p-3 text-[11px] text-cyan-200 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Manual payment via FastPay, Korek, or MasterCard. Contact support after order creation for instant code dispatch.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
