import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';

export function Checkout({ cartItems, totalPrice, onAddOrder, onClearCart }) {
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrderSubmit = (formData) => {
    const orderObj = {
      id: generateOrderId(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        note: formData.orderNote
      },
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      total: totalPrice,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    onAddOrder(orderObj);
    onClearCart();

    // Navigate to order success with order state
    navigate('/order-success', { state: { order: orderObj } });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Manual Payment Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your information and choose your preferred regional payment method.
        </p>
      </div>

      <CheckoutForm
        cartItems={cartItems}
        totalPrice={totalPrice}
        onSubmitOrder={handleOrderSubmit}
      />
    </div>
  );
}
