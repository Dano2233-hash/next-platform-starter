import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShoppingBag, ShieldCheck } from 'lucide-react';

export default function Checkout({ cart = [], totalPrice = 0, onClearCart }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-100">No Items to Checkout</h2>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 bg-slate-800 text-cyan-400 font-bold rounded-xl text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleCreateOrder = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      items: cart,
      totalPrice,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      paymentMethodName: formData.paymentMethodName,
      paymentAccountDetails: formData.paymentAccountDetails,
      orderNote: formData.orderNote,
      status: 'Pending Payment',
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order:', e);
    }

    // Clear cart and redirect to order success page with order state
    onClearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="py-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <span>Complete Your Order</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Fill in your contact details and select your preferred payment method (FastPay, Korek Cash, or MasterCard).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} />
        </div>

        {/* Right column: Order Summary */}
        <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Summary ({cart.length})</span>
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <div>
                  <p className="font-bold text-slate-200">{item.productName}</p>
                  <p className="text-[11px] text-cyan-400">{item.selectedPackageName} × {item.quantity}</p>
                </div>
                <p className="font-bold text-slate-200">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-200">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery / Service Fee:</span>
              <span className="font-bold text-green-400">0 IQD</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-extrabold">
              <span className="text-slate-100">Total Payable:</span>
              <span className="text-cyan-300 text-lg">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
