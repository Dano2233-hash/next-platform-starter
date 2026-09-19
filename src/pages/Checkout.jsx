import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4 max-w-md">
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-2xl bg-cyan-500 text-black"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    // Save to localStorage under key 'dano_orders'
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart & navigate to order success page
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 400);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" /> Checkout & Payment
          </h1>
          <p className="text-xs text-slate-400">
            Complete your order details and choose your preferred local payment method.
          </p>
        </div>

        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 bg-[#0a0e1a] border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl sticky top-24">
          <h2 className="text-base font-extrabold text-white flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Items
            </span>
            <span className="text-xs font-semibold text-slate-400">{cart.length} Products</span>
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-3 text-xs p-2.5 rounded-xl bg-[#060911] border border-slate-800/80"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 text-[9px] font-bold text-cyan-300 p-1 flex items-center justify-center text-center">
                        {item.name.substring(0, 8)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-200 truncate">{item.name}</h4>
                    {item.package && (
                      <span className="text-[10px] text-cyan-400 font-semibold block">
                        {item.package}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 block">
                      Qty: {item.quantity} x {formatPrice(item.unitPrice)}
                    </span>
                  </div>
                </div>

                <div className="font-extrabold text-slate-100 shrink-0">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-emerald-400">Free (Instant Digital)</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base">
              <span className="font-extrabold text-white">Total Amount</span>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Orders are manually processed within 5 to 15 minutes after payment confirmation via WhatsApp/Discord.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
