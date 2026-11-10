import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect or prompt
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 mb-6">Add products before proceeding to checkout.</p>
        <Link to="/products" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-xs font-semibold">
          Return to Store
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: cart,
      totalAmount: totalPrice,
      status: 'Pending Payment Verification'
    };

    // Save order in context & localStorage
    addOrder(orderData);

    // Clear cart
    clearCart();

    // Redirect to Order Success page
    navigate(`/order-success/${orderId}`, { state: { order: orderData } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Manual Payment Checkout
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete the details below to generate your order receipt and receive payment transfer instructions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form (Name, Phone, City, Payment Method, Note) */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Order Items Preview (Right Side) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0b101e] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-cyan-400 font-semibold">{cart.length} unique items</span>
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-slate-200 truncate">{item.name}</p>
                    {item.packageName && (
                      <p className="text-[11px] text-cyan-400 font-medium truncate">{item.packageName}</p>
                    )}
                    <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0 font-bold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery:</span>
                <span className="text-cyan-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                <span className="text-sm font-bold text-white">Total Amount Due:</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#090d19] border border-slate-800/80 rounded-xl p-4 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Manual Payment Security Notice</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              We never ask for your private banking passwords or PIN. You only transfer the exact IQD order amount directly to our official FastPay, Korek, or MasterCard accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
