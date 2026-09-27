import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout({ cart, cartTotal, clearCart }) {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mx-auto">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="text-xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs">Add products or top-up packages before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs">
          Go To Catalog
        </Link>
      </div>
    );
  }

  const handleCreateOrder = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customer: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        orderNote: formData.orderNote || ''
      },
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Failed to save order in LocalStorage:', e);
    }

    // Clear shopping cart
    clearCart();

    // Navigate to order success screen with order state
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout Order</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete your information and choose your preferred local payment operator.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Secure Direct Payment</span>
        </div>
      </div>

      {/* Checkout Form */}
      <CheckoutForm cart={cart} cartTotal={cartTotal} onSubmitOrder={handleCreateOrder} />
    </div>
  );
}
