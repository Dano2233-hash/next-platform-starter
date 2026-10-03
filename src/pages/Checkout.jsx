import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </button>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to local storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Error saving order to LocalStorage:', e);
    }

    // Clear cart and navigate to order success
    clearCart();
    setIsSubmitting(false);
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manual Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your details and select your preferred local manual payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Cart Breakdown */}
        <div className="lg:col-span-5">
          <div className="bg-[#0a0e1a] border border-slate-800/80 rounded-2xl p-6 space-y-4 sticky top-24 shadow-xl">
            <h3 className="font-extrabold text-base text-white pb-3 border-b border-slate-800 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span>Order Summary ({cart.length} items)</span>
            </h3>

            {/* Item list preview */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-200 truncate">{item.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {item.packageName ? `${item.packageName} × ` : ''}{item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="font-extrabold text-cyan-400 shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-white">Total Due</span>
                <span className="text-xl font-extrabold text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
              <span>Your order ID will be generated upon submitting. Support available 24/7.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
