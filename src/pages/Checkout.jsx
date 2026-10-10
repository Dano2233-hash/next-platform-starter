import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before checking out.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        orderNote: formData.orderNote
      },
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalAmount: totalPrice,
      status: 'Pending Payment'
    };

    try {
      // Save order to Local Storage
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));

      // Clear cart
      clearCart();

      // Redirect to Order Success Page
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/order-success/${newOrder.orderId}`, { state: { order: newOrder } });
      }, 500);
    } catch (e) {
      console.error('Failed to create order', e);
      setIsSubmitting(false);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Checkout Order
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Order Review Sidebar */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Order Summary</span>
            <span className="text-xs text-cyan-400 font-semibold">{cart.length} Items</span>
          </h3>

          {/* Cart Item Mini List */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-2 text-xs">
                <div className="min-w-0">
                  <span className="font-bold text-slate-200 block truncate">{item.product.name}</span>
                  {item.selectedPackage && (
                    <span className="text-[10px] text-slate-400">{item.selectedPackage.name}</span>
                  )}
                  <span className="text-slate-400 block font-medium">Qty: {item.quantity}</span>
                </div>
                <span className="font-extrabold text-cyan-400 whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Digital Delivery</span>
              <span className="font-bold text-emerald-400">FREE</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-white">
              <span>Total IQD</span>
              <span className="text-xl font-extrabold text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400" /> Safe Local Payment
            </div>
            <p className="text-[11px] leading-relaxed">
              We process manual payments safely via FastPay, Korek, and MasterCard. No credit card details are stored online.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
