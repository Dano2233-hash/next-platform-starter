import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { ShieldCheck, ShoppingCart } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    addOrder(orderData);
    clearCart();

    // Navigate to Order Success Page with state
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" /> Complete Your Order
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Enter your details and select your local payment method for instant verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-5">
          <div className="bg-[#090e1a] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h2 className="font-extrabold text-slate-100 text-sm border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-cyan-400 font-semibold">{cart.length} Items</span>
            </h2>

            {/* Selected Items List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedPackage?.name}-${idx}`}
                  className="flex items-center justify-between gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <ProductImage product={item.product} heightClass="h-10" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-slate-200 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[10px] text-cyan-400 block">
                        {item.selectedPackage?.name} × {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-white shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Processing Fee</span>
                <span className="font-bold text-emerald-400">0 IQD</span>
              </div>
              <div className="border-t border-slate-800/80 pt-2 flex justify-between items-baseline">
                <span className="font-extrabold text-slate-100 text-sm">Total Due</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
