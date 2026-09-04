import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">Add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (customerDetails) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: customerDetails.name,
      phone: customerDetails.phone,
      city: customerDetails.city,
      paymentMethod: customerDetails.paymentMethod,
      orderNote: customerDetails.orderNote,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    try {
      const existingOrdersRaw = localStorage.getItem('dano_orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.error('Failed to save order to local storage', e);
    }

    clearCart();
    setIsSubmitting(false);
    navigate(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">Complete your customer details & local payment choice</p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Edit Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Items Summary */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6 sticky top-24">
            <h3 className="text-base font-extrabold text-white flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" /> Items in Order
              </span>
              <span className="text-xs text-slate-400">{cart.length} items</span>
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-cyan-400 flex-shrink-0">
                      {item.productName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 line-clamp-1">{item.productName}</h4>
                      <span className="text-[10px] text-cyan-300 font-medium">{item.packageName} × {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Total Items Count</span>
                <span className="font-bold text-slate-200">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-base border-t border-slate-800/80 pt-2">
                <span className="font-extrabold text-white">Grand Total</span>
                <span className="font-black text-cyan-400 text-xl">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyan-400" />
              <span>
                No online card processing required. After placing the order, you will receive receipt & contact details to send payment via FastPay, Korek, or MasterCard.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
