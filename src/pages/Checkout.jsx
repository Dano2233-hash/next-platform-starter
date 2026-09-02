import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout({ cartItems = [], cartTotal = 0, onClearCart }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Items in Cart</h2>
        <p className="text-sm text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (customerDetails) => {
    setIsSubmitting(true);

    const newOrder = {
      orderId: generateOrderId(),
      customerName: customerDetails.customerName,
      phoneNumber: customerDetails.phoneNumber,
      city: customerDetails.city,
      paymentMethod: customerDetails.paymentMethod,
      orderNote: customerDetails.orderNote,
      items: cartItems,
      totalAmount: cartTotal,
      currency: 'IQD',
      createdAt: new Date().toISOString(),
      status: 'Pending Payment',
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }

    onClearCart();
    setIsSubmitting(false);
    navigate(`/order-success?orderId=${newOrder.orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <span>Manual Checkout</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer details and select FastPay, Korek, or MasterCard for manual payment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
        </div>

        <div className="lg:col-span-5 bg-[#0b101c] p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center justify-between border-b border-slate-800 pb-3">
            <span>Selected Items ({cartItems.length})</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3 rounded-xl bg-[#080d17] border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <ProductImage
                    product={{
                      name: item.name,
                      image: item.image,
                      platform: item.platform,
                      category: item.category,
                    }}
                    className="w-12 h-12 rounded-lg shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-semibold">{item.packageName}</p>
                    <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-slate-100">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Payment Fee</span>
              <span className="text-emerald-400 font-semibold">0 IQD</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <span className="text-sm font-bold text-white">Grand Total (IQD)</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
