import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShoppingBag, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-slate-900 border border-slate-800 rounded-3xl text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto border border-slate-700">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 font-heading">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">
          Your cart is empty. Please add items to your cart before proceeding.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (customerData) => {
    const orderId = generateOrderId();

    const orderData = {
      orderId,
      customerName: customerData.name,
      phone: customerData.phone,
      city: customerData.city,
      paymentMethod: customerData.paymentMethod,
      orderNote: customerData.orderNote || 'N/A',
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
    };

    addOrder(orderData);
    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Header */}
      <div className="border-b border-slate-800/80 pb-5">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Cart
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-heading">
          Manual Payment Checkout
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your information and choose your payment method below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} totalAmount={cartTotal} />
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 font-heading border-b border-slate-800 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60 last:border-0"
                >
                  <div>
                    <div className="font-bold text-slate-200">{item.name}</div>
                    <div className="text-[11px] text-cyan-400">
                      {item.selectedPackageName} × {item.quantity}
                    </div>
                  </div>
                  <div className="font-extrabold text-slate-100">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transfer Fees</span>
                <span className="text-emerald-400 font-semibold">0 IQD</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="text-sm font-bold text-slate-100">Total Payable</span>
                <span className="text-xl font-extrabold text-cyan-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Important Note
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                This is a manual payment order. No money is auto-deducted now. You will receive direct payment instructions on the next page to complete via WhatsApp.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
