import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { PAYMENT_METHODS } from '../data/categories';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { ArrowLeft, ShoppingBag, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-100">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">Your cart is currently empty. Please add products before proceeding.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Products
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (customerData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const selectedMethodObj = PAYMENT_METHODS.find((m) => m.id === customerData.paymentMethod);

    const newOrder = {
      orderId,
      customerName: customerData.customerName,
      phone: customerData.phone,
      city: customerData.city,
      paymentMethod: selectedMethodObj ? selectedMethodObj.name : customerData.paymentMethod,
      paymentDetails: selectedMethodObj || {},
      orderNote: customerData.orderNote,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment Verification',
    };

    const savedOrder = addOrder(newOrder);

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${savedOrder.orderId}`, { state: { order: savedOrder } });
    }, 600);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Back to Cart Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900 border border-slate-800 px-3 py-1 rounded-xl mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Cart
          </button>
          <h1 className="font-heading text-2xl font-black text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            Manual Payment Checkout
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090d1a] border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4 sticky top-24">
            <h3 className="font-heading font-bold text-base text-slate-100 flex items-center justify-between border-b border-slate-800 pb-3">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-slate-400">{cart.length} Items</span>
            </h3>

            {/* Compact Item List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                    <ProductImage product={item.product || item} className="h-full w-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-xs text-slate-200 truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                  <span className="font-extrabold text-xs text-cyan-400">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instant Digital Delivery</span>
                <span className="font-bold text-emerald-400">0 IQD</span>
              </div>
              <div className="border-t border-slate-800/80 pt-2 flex justify-between items-baseline">
                <span className="font-black text-slate-100 text-sm">Total Payable</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* FastPay / Korek notice */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-1.5 text-[11px] text-slate-400">
              <p className="font-bold text-slate-200 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Payment Process:
              </p>
              <p>
                After placing your order, you will receive your unique Order ID and instructions to complete transfer via FastPay, Korek, or MasterCard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
