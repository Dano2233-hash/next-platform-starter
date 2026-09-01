import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ProductVisual } from '../components/ProductVisual';

export const Checkout = () => {
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-[#070c26] border border-cyan-900/30 rounded-3xl text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No items to checkout</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 text-white font-bold text-xs">
          Return to Products
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);
    const newOrderId = generateOrderId();
    const orderData = {
      orderId: newOrderId,
      customer: formData,
      items: cartItems,
      totalAmount: cartSubtotal,
      paymentMethod: formData.paymentMethod,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order
    addOrder(orderData);

    // Clear cart
    clearCart();

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: orderData } });
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-cyan-900/30 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Payment Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete customer information & choose your preferred local Kurdistan/Iraq payment.
          </p>
        </div>
        <Link to="/cart" className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Edit Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Order Review Column */}
        <div className="lg:col-span-5 bg-[#080e2d] border border-cyan-900/30 rounded-3xl p-6 space-y-6 sticky top-24 shadow-2xl">
          <h3 className="text-base font-bold text-white border-b border-cyan-900/30 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Summary ({cartItems.length} items)</span>
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartKey} className="flex items-center gap-3 bg-[#05081c] p-2.5 rounded-xl border border-slate-800">
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#070c26]">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <ProductVisual name={item.name} category={item.category} platform={item.platform} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-100 truncate">{item.name}</h4>
                  <p className="text-[10px] text-cyan-400 font-semibold">{item.selectedPackage.name} (x{item.quantity})</p>
                </div>
                <div className="text-xs font-bold text-white font-mono">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800/80 pt-4 space-y-2 text-xs font-semibold">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="text-slate-200">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery:</span>
              <span className="text-emerald-400 font-bold">FREE Instant Digital</span>
            </div>
            <div className="border-t border-slate-800/80 pt-3 flex justify-between items-baseline text-sm">
              <span className="text-white font-bold">Total Amount Due:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartSubtotal)}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe Local Payment Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400">
              No automatic card charging. You will receive clear manual transfer instructions on the next screen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
