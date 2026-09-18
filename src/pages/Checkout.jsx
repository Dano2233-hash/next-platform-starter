import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckoutForm } from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ProductImage } from '../components/ProductImage';
import { ShoppingBag, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export function Checkout({ cartItems = [], totalPrice, onClearCart, onOrderCreated }) {
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4 py-12">
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="bg-cyan-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      ...formData,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    // Save order to Local Storage dano_orders
    try {
      const existing = localStorage.getItem('dano_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save order to local storage:', e);
    }

    // Call callback and clear cart
    if (onOrderCreated) {
      onOrderCreated(newOrder);
    }
    onClearCart();

    // Navigate to Order Success page with state
    navigate(`/order-success?orderId=${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-4">
        <div className="space-y-1">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <Lock className="w-7 h-7 text-cyan-400" />
            <span>Manual Payment Checkout</span>
          </h1>
          <p className="text-xs text-slate-400">
            Fill in your details and select your payment method (FastPay, Korek, or MasterCard).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3.5 py-2 rounded-xl self-start sm:self-auto font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Fast & Safe Manual Payment</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cartItems={cartItems}
            totalPrice={totalPrice}
            onSubmitOrder={handleOrderSubmit}
          />
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-24">
          <h2 className="text-lg font-black text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <span>Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)</span>
          </h2>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-slate-950">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      category={item.category}
                      platform={item.platform}
                      heightClass="h-12"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate text-xs">{item.name}</h4>
                    <p className="text-[10px] text-cyan-400">Pkg: {item.packageName} x{item.quantity}</p>
                  </div>
                </div>

                <span className="font-black text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="text-emerald-400 font-bold">0 IQD (Digital Code)</span>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex justify-between text-base font-black">
              <span className="text-white">Total IQD</span>
              <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-cyan-400 block">Accepted Payment Networks:</span>
            <p>• FastPay Wallet Number</p>
            <p>• Korek Telecom Balance Transfer</p>
            <p>• MasterCard / Local Card Transfer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
