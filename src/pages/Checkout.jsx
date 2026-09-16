import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Add products to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerDetails) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customer: customerDetails,
      items: cartItems,
      totalAmount: cartTotal,
      currency: 'IQD',
      createdAt: new Date().toISOString(),
      status: 'Pending Payment',
    };

    // Save to LocalStorage 'dano_orders'
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to local storage', e);
    }

    // Clear cart and redirect to order success
    clearCart();
    navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-sans uppercase mt-2">
          Manual Payment Checkout
        </h1>
        <p className="text-xs text-slate-400">
          Complete your information below to place your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} />
        </div>

        {/* Cart Summary Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Order Items ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs py-2 border-b border-slate-800/60">
                  <div>
                    <div className="font-bold text-slate-200">{item.name}</div>
                    <div className="text-[11px] text-cyan-400 font-mono">{item.packageName} x {item.quantity}</div>
                  </div>
                  <div className="font-extrabold text-slate-100 font-mono">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Digital Delivery</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-sm font-bold text-white">Total Amount</span>
                <span className="text-lg font-black text-cyan-300 font-sans">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>No online credit card charge. Manual local transfer verification.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
