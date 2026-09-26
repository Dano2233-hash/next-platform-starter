import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';

export const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const newOrderId = generateOrderId();
    const newOrder = {
      orderId: newOrderId,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: [...cartItems],
      totalAmount: cartTotal,
      status: 'Pending Payment',
    };

    try {
      const savedOrders = localStorage.getItem('dano_orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      orders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save order to local storage', e);
    }

    // Save active order details for OrderSuccess page
    try {
      localStorage.setItem('dano_last_order', JSON.stringify(newOrder));
    } catch (e) {
      console.error(e);
    }

    clearCart();
    setIsSubmitting(false);

    navigate(`/order-success?id=${newOrderId}`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 uppercase tracking-tight">
          Checkout &amp; Payment
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer details and choose your preferred local Iraqi payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#080d1f] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-24">
            <h3 className="text-base font-extrabold text-slate-100 uppercase tracking-tight border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <span>Order Summary ({cartItems.length} items)</span>
            </h3>

            {/* Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60"
                >
                  <div className="pr-2">
                    <span className="font-bold text-slate-100 block">{item.productName}</span>
                    <span className="text-[11px] text-cyan-400 font-semibold">
                      {item.packageName} x {item.quantity}
                    </span>
                  </div>
                  <span className="font-black text-slate-200 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-slate-100">Total Due</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Manual Payment Instructions</span>
              </div>
              <p>
                After completing your order, you will receive an order number to send to our team via WhatsApp/Discord for instant payment processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
