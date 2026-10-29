import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-xs font-bold"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleCreateOrder = (customerData) => {
    const orderNumber = generateOrderId();
    const newOrder = {
      orderNumber,
      createdAt: new Date().toISOString(),
      customerName: customerData.name,
      customerPhone: customerData.phone,
      customerCity: customerData.city,
      paymentMethod: customerData.paymentMethod,
      orderNote: customerData.orderNote || '',
      items: [...cart],
      totalPrice: totalPrice,
      status: 'Pending Payment'
    };

    // Save order to Local Storage dano_orders
    try {
      const existingOrdersStr = localStorage.getItem('dano_orders');
      const existingOrders = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to local storage:', e);
    }

    // Clear cart and redirect to Order Success page
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Lock className="w-6 h-6 text-cyan-400" /> Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete your customer information and select your preferred Iraqi local payment method.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cart={cart}
            totalPrice={totalPrice}
            onSubmitOrder={handleCreateOrder}
          />
        </div>

        {/* Right Sticky Order Items Summary */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-cyan-400 font-semibold">{cart.length} Products</span>
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-slate-800/60">
              {cart.map((item) => (
                <div key={item.cartItemId} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-200">{item.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[10px] text-cyan-400 font-semibold block">{item.selectedPackage}</span>
                    )}
                    <span className="text-slate-500 text-[11px]">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-slate-100">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instant Digital Delivery</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between text-sm">
                <span className="font-extrabold text-white">Grand Total</span>
                <span className="font-black text-cyan-400 text-base">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-cyan-300 block">Manual Payment Instructions</span>
              <p>After clicking "Create Order", you will receive contact links for WhatsApp and Discord to confirm payment.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
