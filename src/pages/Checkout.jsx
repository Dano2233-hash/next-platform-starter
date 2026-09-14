import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { generateOrderId } from '../utils/orderId.js';
import { PAYMENT_METHODS } from '../data/categories.js';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 space-y-4 max-w-md mx-auto">
        <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl"
        >
          Browse Products
        </button>
      </div>
    );
  }

  const handleOrderSubmission = (customerDetails) => {
    const orderId = generateOrderId();
    const selectedPayment = PAYMENT_METHODS.find(m => m.id === customerDetails.paymentMethod) || PAYMENT_METHODS[0];

    const newOrder = {
      orderId,
      customer: {
        name: customerDetails.name,
        phone: customerDetails.phone,
        city: customerDetails.city,
        orderNote: customerDetails.orderNote
      },
      paymentMethod: selectedPayment,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order in LocalStorage 'dano_orders'
    try {
      const existing = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {
      console.error('Error saving order to LocalStorage:', e);
    }

    // Clear cart and navigate to order success page
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-semibold mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Checkout & Order Confirmation
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manual transfer via FastPay, Korek, or MasterCard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmission} />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
          <h3 className="text-base font-bold text-white font-heading border-b border-slate-800 pb-3">
            Items in Order ({cart.length})
          </h3>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-200 truncate">{item.product.name}</h4>
                  <span className="text-[10px] text-cyan-400 font-medium">{item.package?.name || 'Standard'} × {item.quantity}</span>
                </div>
                <span className="font-extrabold text-white font-heading shrink-0">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery</span>
              <span className="text-emerald-400 font-bold">Instant Digital</span>
            </div>
            <div className="flex justify-between text-slate-200 font-extrabold text-base pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="text-cyan-400 font-heading text-xl">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>How Manual Payment Works:</span>
            </div>
            <p>1. Complete customer information on the left.</p>
            <p>2. Select your preferred local payment method.</p>
            <p>3. Submit order to get transaction reference & contact us via WhatsApp/Discord for instant code activation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
