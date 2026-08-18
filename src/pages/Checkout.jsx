import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

export function Checkout({ cart, totalPrice, clearCart }) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrderSubmission = (customerDetails) => {
    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: [...cart],
      totalAmount: totalPrice,
      customerName: customerDetails.name,
      customerPhone: customerDetails.phone,
      customerCity: customerDetails.city,
      paymentMethod: customerDetails.paymentMethod,
      orderNote: customerDetails.orderNote || '',
      status: 'Pending Payment',
    };

    // Save order in localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart and redirect to Order Success page
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Payment Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your information below to place your order. IQD payments only.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmission} />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sticky top-24 space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-cyan-400">
                {cart.reduce((s, i) => s + i.quantity, 0)} Items
              </span>
            </h3>

            {/* Cart Items Summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-800">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-white line-clamp-1">{item.productName}</p>
                    <p className="text-[11px] text-slate-400">
                      {item.packageName} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-extrabold text-cyan-400 shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-emerald-400 font-bold">Instant / Digital</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-black text-sm text-white">Total Amount</span>
                <span className="text-2xl font-black text-cyan-400">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>Safe and official digital gaming services for Iraq & Kurdistan.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
