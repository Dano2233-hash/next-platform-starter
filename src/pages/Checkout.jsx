import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { generateOrderId } from '../utils/orderId.js';
import { ShieldCheck, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';

export default function Checkout({ cart, cartTotal, clearCart }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No Items in Cart</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
        >
          Return to Store Catalog
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (customerData) => {
    setIsSubmitting(true);

    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    // Save to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }

    // Clear Cart
    clearCart();

    // Redirect to Success Page
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" /> Checkout & Payment
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order details. Manual local payment accepted only.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4 sticky top-24">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <ShoppingBag className="w-4 h-4 text-cyan-400" /> Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">
                      Qty: {item.quantity} {item.selectedPackage ? `| ${item.selectedPackage}` : ''}
                    </p>
                  </div>
                  <span className="font-extrabold text-cyan-400 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Delivery Fee</span>
                <span className="font-semibold text-emerald-400 uppercase">FREE</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-baseline justify-between">
              <span className="text-sm font-bold text-slate-200">Total Due</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-cyan-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct Local Transfer:
              </div>
              <p>After clicking place order, you will receive our FastPay / Korek numbers to transfer the exact amount.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
