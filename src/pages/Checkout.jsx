import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';
import { ShieldCheck, ArrowRight, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'FastPay', // Default manual payment method
    note: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If cart is empty, redirect back to cart
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentSelect = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a manual payment method.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        note: formData.note.trim()
      },
      paymentMethod: formData.paymentMethod,
      items: cart,
      totalPrice,
      status: 'Pending Payment Verification'
    };

    // Save order in state and Local Storage
    addOrder(newOrder);

    // Clear user cart
    clearCart();

    // Navigate to order success with order state
    navigate('/order-success', {
      state: { order: newOrder },
      replace: true
    });
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Checkout</h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order and receive direct payment instructions for Kurdistan & Iraq.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Form: Details & Payment Method Selection */}
          <div className="lg:col-span-7">
            <CheckoutForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onPaymentSelect={handlePaymentSelect}
            />
          </div>

          {/* Right Summary: Items & Submit CTA */}
          <div className="lg:col-span-5 bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-black text-white text-base flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Order Summary</span>
              </h3>
              <span className="text-xs text-slate-400">
                {cart.length} {cart.length === 1 ? 'line item' : 'line items'}
              </span>
            </div>

            {/* Compact Item list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40"
                >
                  <div className="min-w-0 pr-2">
                    <h5 className="font-bold text-slate-200 truncate">{item.name}</h5>
                    <p className="text-[11px] text-slate-400">
                      {item.packageName} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-extrabold text-cyan-400 whitespace-nowrap">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Selected Payment:</span>
                <span className="font-bold text-white">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Instant Digital Delivery:</span>
                <span className="font-bold text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Currency:</span>
                <span className="font-bold text-cyan-400">IQD</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="font-bold text-slate-200">Total Due</span>
              <span className="text-2xl font-black text-cyan-400">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-black font-extrabold text-sm transition-all shadow-xl shadow-cyan-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Generating Order...' : 'Confirm & Place Order'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Manual payment system: No credit card charges are made online. You will transfer the IQD amount directly using your chosen payment provider.
              </span>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
