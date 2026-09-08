import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { CheckoutForm } from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckoutSubmit = (customerInfo) => {
    const orderId = generateOrderId();
    const orderData = {
      id: orderId,
      customerName: customerInfo.customerName,
      phoneNumber: customerInfo.phoneNumber,
      city: customerInfo.city,
      paymentMethod: customerInfo.paymentMethod,
      orderNote: customerInfo.orderNote,
      items: cart,
      totalAmount: cartTotal
    };

    addOrder(orderData);
    clearCart();
    navigate(`/order-success?orderId=${orderId}`);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      {/* Page Title Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Manual Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your information to create your manual verification order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Main Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-24">
            <h3 className="text-base font-black text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Order Summary ({cart.length} Items)</span>
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/50">
                  <div className="min-w-0 pr-2">
                    <p className="font-bold text-white truncate">{item.productName}</p>
                    {item.packageName && <p className="text-[10px] text-cyan-400">Pkg: {item.packageName}</p>}
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-extrabold text-cyan-300 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total calculation */}
            <div className="border-t border-slate-800 pt-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Delivery Charge</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Manual Payment Notice */}
            <div className="bg-[#0d162a] border border-cyan-500/20 rounded-xl p-3 text-xs text-cyan-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Manual Verification Process</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                After placing order, you will receive your order reference ID to send payment via FastPay, Korek, or MasterCard.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
