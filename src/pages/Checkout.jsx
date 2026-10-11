import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="font-heading font-bold text-2xl text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-bold text-xs"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    const savedOrder = addOrder(orderData);
    clearCart();

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: savedOrder } });
    }, 400);
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </button>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Manual Payment Checkout
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-950/40 border border-cyan-800/50 px-3 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4" /> 100% Safe Order Guarantee
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="font-heading font-bold text-lg text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-slate-400">({cartItems.length} items)</span>
            </h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 flex items-center justify-between gap-2"
                >
                  <div>
                    <h4 className="font-heading font-semibold text-xs text-white truncate max-w-[200px]">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-cyan-400 font-medium">
                      {item.selectedPackage?.name} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-heading font-bold text-xs text-slate-200">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Digital Service Fee</span>
                <span className="font-bold text-emerald-400">0 IQD</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-800 text-sm">
                <span className="font-bold text-white">Grand Total</span>
                <span className="font-heading font-black text-xl text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Direct Contact Instructions
              </div>
              <p className="text-[11px] leading-relaxed">
                After placing your order, an Order Number will be generated. Send payment via your selected payment method (FastPay/Korek/MasterCard) and message us on WhatsApp or Discord.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
