import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4 bg-[#080d1e] border border-slate-800 rounded-2xl">
        <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link to="/products" className="inline-block px-4 py-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (formData) => {
    const orderId = generateOrderId();
    const orderObj = {
      orderId,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cartItems,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    addOrder(orderObj);
    clearCart();

    // Pass created order details to Order Success page
    navigate('/order-success', { state: { order: orderObj } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      <Link to="/cart" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-400 hover:text-cyan-400">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Cart</span>
      </Link>

      <div className="bg-[#080d1f] border border-slate-800 rounded-2xl p-6">
        <h1 className="text-2xl font-black text-white">Manual Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your information. No online credit card charge occurs now. Contact support after placing order to finalize.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            onSubmit={handleCheckoutSubmit}
            cartItems={cartItems}
            cartTotal={cartTotal}
          />
        </div>

        {/* Order Items Preview */}
        <div className="lg:col-span-5 bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">Order Summary ({cartItems.length} items)</h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cartItems.map(item => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-cyan-400">{item.packageName} x {item.quantity}</p>
                </div>
                <span className="font-extrabold text-slate-200">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-1 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white font-semibold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Digital Delivery</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
              <span>Total Payable</span>
              <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-300 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
            <span>Manual payment instructions and support contact links will be displayed on the next page immediately.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
