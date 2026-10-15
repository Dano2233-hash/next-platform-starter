import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ShoppingBag, ArrowLeft, Lock } from 'lucide-react';

export const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 bg-[#090d1a] border border-slate-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
        <ShoppingBag className="w-12 h-12 text-cyan-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleCheckoutSubmit = (customerData) => {
    setIsLoading(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        customerName: customerData.name,
        phone: customerData.phone,
        city: customerData.city,
        paymentMethod: customerData.paymentMethod,
        orderNote: customerData.orderNote,
        items: cartItems,
        total: cartTotal,
        status: 'Pending Payment',
        createdAt: new Date().toISOString()
      };

      addOrder(newOrder);
      clearCart();
      setIsLoading(false);

      navigate('/order-success', { state: { order: newOrder } });
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Lock className="w-7 h-7 text-cyan-400" />
            <span>Manual Payment Checkout</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete customer details and select FastPay, Korek, or MasterCard to generate your order.
          </p>
        </div>

        <button
          onClick={() => navigate('/cart')}
          className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isLoading={isLoading} />
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl sticky top-24">
            <h3 className="font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-cyan-400 font-bold">{cartItems.length} items</span>
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60">
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-slate-200 truncate">{item.productName}</h4>
                    <span className="text-[11px] text-cyan-400 font-medium">
                      {item.packageName} x {item.quantity}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-100 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white border-t border-slate-800 pt-2">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Manual Payment Note */}
            <div className="bg-[#05070f] p-3.5 rounded-xl border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Manual Payment Process</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                After placing your order, an order code will be generated. You can complete your transfer via FastPay, Korek, or MasterCard, then contact our support on WhatsApp to receive your code instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
