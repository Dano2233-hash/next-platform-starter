import React from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ArrowLeft, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleOrderSubmit = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment Verification',
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.error('Failed to save order to localStorage:', e);
    }

    // Clear cart and redirect
    clearCart();
    navigate(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Cart</span>
        </Link>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Manual Secure Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs Left Column */}
        <div className="lg:col-span-7">
          <CheckoutForm cart={cart} cartTotal={cartTotal} onSubmitOrder={handleOrderSubmit} />
        </div>

        {/* Order Summary Sidebar Right Column */}
        <div className="lg:col-span-5 bg-[#080d1a] border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl sticky top-24">
          <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800 font-mono">
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span>Order Summary ({cart.length} Items)</span>
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-3 text-xs py-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-cyan-400">
                      {item.packageName} x {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-white shrink-0">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Digital Code Delivery</span>
              <span className="text-green-400 font-bold">FREE Instant</span>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-base font-extrabold text-white">
              <span>Total Payable Amount</span>
              <span className="text-cyan-400 font-mono text-lg">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
