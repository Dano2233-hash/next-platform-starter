import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, ShoppingBag } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import ProductImage from '../components/ProductImage';

const ORDERS_STORAGE_KEY = 'dano_orders';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Add game codes or top-ups to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerData) => {
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: cart,
      totalPrice,
      paymentMethod: customerData.paymentMethod,
      status: 'Pending Payment Verification'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear shopping cart
    clearCart();

    // Redirect to Order Success page
    navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Checkout & Manual Payment
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Lock className="w-3.5 h-3.5" />
          <span>Secure Order</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            cart={cart}
            totalPrice={totalPrice}
            onSubmitOrder={handleOrderSubmit}
          />
        </div>

        {/* Order Items Review Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 space-y-5 sticky top-24">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-cyan-400">{cart.length} Items</span>
            </h3>

            {/* Cart Items Summary */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 text-xs border-b border-slate-800/50 pb-2.5 last:border-none">
                  <ProductImage
                    src={item.product?.image}
                    name={item.product?.name}
                    category={item.product?.category}
                    platform={item.product?.platform}
                    type={item.product?.type}
                    className="w-12 h-12 rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-100 truncate">{item.product?.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {item.packageName} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-black text-slate-200 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Manual Payment Processing</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-slate-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manual Verification Process</span>
              </div>
              <p>
                After submitting, you will receive our FastPay / Korek / MasterCard account details to send the payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
