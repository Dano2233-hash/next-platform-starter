import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import { PAYMENT_METHODS } from '../data/categories';

export default function Checkout({ cartItems = [], cartTotal = 0, onClearCart }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-xs">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Catalog
        </Link>
      </div>
    );
  }

  const handleCreateOrder = (formData) => {
    setIsSubmitting(true);
    const orderId = generateOrderId();
    const selectedMethodObj = PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod);

    const orderData = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        note: formData.note || '',
      },
      paymentMethod: selectedMethodObj || { id: formData.paymentMethod, name: formData.paymentMethod },
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment',
    };

    try {
      // Save order to Local Storage ('dano_orders')
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([orderData, ...existingOrders]));

      // Clear cart
      onClearCart();

      // Navigate to order success with state or query
      navigate(`/order-success/${orderId}`, { state: { order: orderData } });
    } catch (e) {
      console.error('Error saving order', e);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">Checkout</h1>
        <p className="text-slate-400 text-xs mt-1">
          Complete your contact info and select a manual local payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} isSubmitting={isSubmitting} />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#0c101c] border border-slate-800/80 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="text-white font-extrabold text-base border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary ({cartItems.length} items)</span>
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
            </h3>

            {/* Cart Items Summary List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.key} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/40">
                  <div className="pr-2 min-w-0">
                    <h4 className="text-white font-bold truncate">{item.productName}</h4>
                    {item.package && (
                      <span className="text-[11px] text-cyan-400 block">{item.package.name}</span>
                    )}
                    <span className="text-[10px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-slate-200 font-extrabold shrink-0">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery / Service Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between items-baseline text-sm">
                <span className="text-white font-bold uppercase">Total Payable</span>
                <span className="text-cyan-400 text-xl font-black">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Manual payment instructions will be provided on the next page.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
