import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export function Checkout({ cart, cartTotal, onOrderSuccess }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-lg font-black text-white">No active checkout items found</h2>
        <Link to="/products" className="inline-block rounded-lg bg-[#0066ff] px-4 py-2 text-xs font-bold text-white">
          Go To Store
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (customerDetails) => {
    // Generate order ID
    const newOrderId = generateOrderId();

    // Construct Order entity
    const finalOrder = {
      orderId: newOrderId,
      date: new Date().toISOString(),
      customer: customerDetails,
      items: cart,
      total: cartTotal,
      status: 'Pending Payment Verification'
    };

    // Store in local storage orders
    const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
    localStorage.setItem('dano_orders', JSON.stringify([finalOrder, ...existingOrders]));

    // Pass up to app.jsx state handling & redirect
    onOrderSuccess(finalOrder);
    navigate('/order-success');
  };

  return (
    <div className="space-y-6 pb-16 text-left max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-white">Manual Checkout</h1>
        <p className="text-xs text-gray-400 font-medium mt-1">
          Complete the details below. Our support agents will process your digital key order manually.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left Side: Input fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#12121e] bg-[#0c0c14] p-5 sm:p-6">
            <CheckoutForm onSubmit={handleFormSubmit} />
          </div>
        </div>

        {/* Right Side: Quick Invoice column */}
        <div className="rounded-xl border border-[#12121e] bg-[#0c0c14] p-5 self-start space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-white">Your Invoice Summary</h3>

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedPackage.name}`} className="border-b border-[#12121d] pb-2 last:border-none last:pb-0">
                <span className="block text-xs font-bold text-white truncate">{item.name}</span>
                <div className="flex justify-between items-center text-[10px] text-gray-400 mt-0.5 font-medium">
                  <span>{item.selectedPackage.name} (x{item.quantity})</span>
                  <span className="font-bold text-[#00e5ff]">
                    {formatPrice(item.selectedPackage.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#12121e] pt-4 flex justify-between items-center">
            <span className="text-xs font-black uppercase text-gray-400">Total Price</span>
            <span className="text-base font-black text-[#00e5ff]">{formatPrice(cartTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
