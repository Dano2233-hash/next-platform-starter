import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm, { PAYMENT_METHODS } from '../components/CheckoutForm';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-gray-400">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const selectedMethodObj = PAYMENT_METHODS.find(m => m.id === formData.paymentMethod);

    const newOrder = {
      orderId,
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      paymentMethodId: formData.paymentMethod,
      paymentMethodName: selectedMethodObj ? selectedMethodObj.name : formData.paymentMethod,
      paymentDetails: selectedMethodObj ? selectedMethodObj.numberInfo : '',
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    addOrder(newOrder);
    clearCart();
    setIsSubmitting(false);

    // Navigate to Order Success page with state
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white">Manual Checkout</h1>
        <p className="text-xs text-gray-400">
          Enter your contact information and select a payment method for manual verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#090d18] border border-gray-800 space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-white pb-3 border-b border-gray-800">
              Order Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                  <div className="pr-2 min-w-0">
                    <span className="font-bold text-white block truncate">{item.product.name}</span>
                    {item.selectedPackage && (
                      <span className="text-[10px] text-cyan-400">{item.selectedPackage.name}</span>
                    )}
                    <span className="text-[10px] text-gray-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-gray-200 shrink-0">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">Free Instant</span>
              </div>
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-gray-800">
                <span>Total Due</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#050811] border border-gray-800/80 text-[11px] text-gray-400 space-y-1">
              <div className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Safe Manual Verification</span>
              </div>
              <p>
                No automated card charging. Your order is generated, and payment is verified directly via WhatsApp/Discord.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
