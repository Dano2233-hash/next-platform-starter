import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();

    const newOrder = {
      orderId,
      items: cartItems,
      totalAmount: cartTotalPrice,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      createdAt: new Date().toISOString()
    };

    try {
      const existingOrdersRaw = localStorage.getItem('dano_orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.error('Error saving order to localStorage', e);
    }

    clearCart();
    setIsSubmitting(false);
    navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">Complete your order details below</p>
        </div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Order Review Column */}
        <div className="lg:col-span-5">
          <div className="bg-[#090d1a] border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-800">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span>Order Summary</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[#05070f] border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-slate-200 truncate">{item.productName}</h4>
                    {item.packageName && (
                      <span className="text-[10px] text-cyan-400 font-semibold">
                        Pkg: {item.packageName}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500 block">
                      Qty: {item.quantity} x {formatPrice(item.price)}
                    </span>
                  </div>
                  <span className="font-extrabold text-cyan-300 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery / Service Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD (Free)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-black text-slate-100">
                <span>Total Amount</span>
                <span className="text-cyan-300">{formatPrice(cartTotalPrice)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Manual payment instructions will be provided after creating your order.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
