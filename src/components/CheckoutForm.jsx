import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export const CheckoutForm = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cities = [
    'Erbil',
    'Sulaymaniyah',
    'Duhok',
    'Halabja',
    'Kirkuk',
    'Baghdad',
    'Basra',
    'Mosul',
    'Other City in Iraq'
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Customer name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Please enter a valid full name';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid telephone number (e.g., 0750XXXXXXX)';
    }

    if (!formData.city.trim()) {
      errs.city = 'City selection is required';
    }

    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a manual payment method';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (cart.length === 0) {
      setErrors({ cart: 'Your cart is empty. Please add items before checking out.' });
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: getCartTotal(),
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order into Local Storage under key 'dano_orders'
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (e) {
      console.error('Failed to save order to Local Storage:', e);
    }

    // Clear shopping cart
    clearCart();

    // Redirect to Order Success Page passing order data via state
    navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Global error banner */}
      {errors.cart && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errors.cart}</span>
        </div>
      )}

      {/* Customer Info Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Contact Details</span>
        </h3>

        {/* Full Name */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Customer Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Lawa Ahmed"
              className={`w-full bg-slate-950 text-slate-100 placeholder-slate-500 border rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none transition-all ${
                errors.name
                  ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                  : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.name && <p className="text-rose-400 text-[11px] font-semibold mt-1">{errors.name}</p>}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0750 XXX XXXX"
                className={`w-full bg-slate-950 text-slate-100 placeholder-slate-500 border rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && <p className="text-rose-400 text-[11px] font-semibold mt-1">{errors.phone}</p>}
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
              City / Region <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-slate-950 text-slate-100 border border-slate-800 focus:border-cyan-400 rounded-xl py-2.5 pl-10 pr-4 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all appearance-none"
              >
                {cities.map((c) => (
                  <option key={c} value={c} className="bg-slate-900 text-slate-100">
                    {c}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.city && <p className="text-rose-400 text-[11px] font-semibold mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Order Note Optional */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g. Player ID: 512398471 or specific delivery instructions..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-cyan-400 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
        <PaymentMethodCard
          selectedMethod={formData.paymentMethod}
          onSelectMethod={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
        />
        {errors.paymentMethod && (
          <p className="text-rose-400 text-[11px] font-semibold mt-1">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-cyan-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
      >
        <span>Complete & Place Order ({formatPrice(getCartTotal())})</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};
