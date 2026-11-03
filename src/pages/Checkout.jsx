import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import ProductImage from '../components/ProductImage';

export default function Checkout() {
  const { cart, cartTotal, cartCount, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#0b1120] border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
        <h2 className="text-xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 mb-6">
          Please add items to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft size={16} />
          <span>Browse Catalog</span>
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);
    const orderNumber = generateOrderId();

    const orderData = {
      orderId: orderNumber,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: [...cart],
      totalAmount: cartTotal,
      itemCount: cartCount,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
    };

    // Save order in state/localStorage
    addOrder(orderData);

    // Clear cart after successful order creation
    clearCart();

    // Redirect to Order Success page with state
    navigate('/order-success', {
      state: { order: orderData },
      replace: true,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-2 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Complete Your Order
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manual payment only. Fast delivery via WhatsApp/Telegram once payment is confirmed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-[#0b1120] border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-base text-white">Order Items</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400">
              {cartCount} total
            </span>
          </div>

          {/* Items breakdown */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-800">
                  <ProductImage
                    product={{
                      name: item.name,
                      image: item.image,
                      category: item.category,
                      platform: item.platform,
                    }}
                    height="h-12"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-white truncate">{item.name}</h5>
                  <p className="text-[11px] text-cyan-400 truncate">{item.selectedPackage}</p>
                  <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-white font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Summary */}
          <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal</span>
              <span className="font-mono text-white font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Service & Delivery</span>
              <span className="text-emerald-400 font-bold">0 IQD (Free)</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
              <span className="text-sm font-bold text-white">Total Due</span>
              <span className="text-2xl font-black text-cyan-400 font-mono">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">How manual payment works:</p>
            <p>1. Submit your order with your details.</p>
            <p>2. Send the total amount via your chosen payment app (FastPay, Korek, or MasterCard).</p>
            <p>3. Message our support on WhatsApp or Discord with your order ID.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
