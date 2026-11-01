import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-white">Your cart is currently empty</h2>
        <p className="text-xs text-slate-400">Add games or game packages to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-block px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-xs"
        >
          Browse Store
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectPayment = (methodId) => {
    setFormData((prev) => ({ ...prev, paymentMethod: methodId }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'Please select your city';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a manual payment method';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const orderNumber = generateOrderId();
    const newOrder = {
      orderNumber,
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city
      },
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: subtotal,
      status: 'Pending Payment'
    };

    // Save order in state/localStorage
    addOrder(newOrder);

    // Clear cart immediately
    clearCart();

    // Navigate to Order Success with state
    navigate('/order-success', {
      state: { order: newOrder },
      replace: true
    });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
        <span className="text-xs text-slate-400">Step 2 of 2: Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-8">
          <CheckoutForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSelectPayment={handleSelectPayment}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-[#090e1d] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Cart Summary ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    {item.packageName && (
                      <span className="text-[11px] text-cyan-400 block truncate">{item.packageName}</span>
                    )}
                    <span className="text-[11px] text-slate-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-slate-200 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-200">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Fee</span>
                <span className="text-emerald-400 font-semibold">0 IQD</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Mode</span>
                <span className="text-cyan-400 uppercase font-semibold">Manual Verification</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between">
                <span className="text-sm font-bold text-white">Amount Due</span>
                <span className="text-2xl font-black text-cyan-400">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Manual Payment Notice</span>
              </div>
              <p>
                After placing this order, you will receive our payment details and instructions to finalize the transaction via WhatsApp or Discord.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
