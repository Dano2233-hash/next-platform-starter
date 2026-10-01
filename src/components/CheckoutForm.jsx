import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS, PaymentMethodCard } from './PaymentMethodCard.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { generateOrderId } from '../utils/orderId.js';
import { formatPrice } from '../utils/formatPrice.js';
import { AlertCircle, ArrowRight, ShieldCheck, User, Phone, MapPin, FileText } from 'lucide-react';

const ORDERS_STORAGE_KEY = 'dano_orders';

export const CheckoutForm = () => {
  const { cart, cartTotal, clearCart } = useCart();
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
    'Anbar',
    'Najaf',
    'Karbala',
    'Other City in Iraq'
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid local phone number.';
    }
    if (!formData.city) {
      newErrors.city = 'Please select or enter your city.';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const selectedMethod = PAYMENT_METHODS.find((m) => m.id === formData.paymentMethod);

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      paymentMethod: selectedMethod ? selectedMethod.name : formData.paymentMethod,
      paymentMethodId: formData.paymentMethod,
      accountInfo: selectedMethod ? selectedMethod.accountInfo : '',
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    try {
      // Save order to Local Storage
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([newOrder, ...existingOrders]));

      // Clear cart
      clearCart();

      // Navigate to order success with order state
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    } catch (err) {
      console.error('Error saving order:', err);
      setErrors({ form: 'Failed to create order. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* General Form Error */}
      {errors.form && (
        <div className="p-4 bg-red-950/80 border border-red-500 rounded-xl flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Customer Information Card */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
          <User className="w-5 h-5 text-cyan-400" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Kurdi"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                className={`w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-3 py-2.5 border ${
                  errors.name ? 'border-red-500' : 'border-gray-800 focus:border-cyan-500'
                } focus:outline-none transition-all`}
              />
              <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: null });
                }}
                className={`w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-3 py-2.5 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-800 focus:border-cyan-500'
                } focus:outline-none transition-all`}
              />
              <Phone className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
            {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: null });
                }}
                className={`w-full bg-[#050814] text-sm text-white rounded-xl pl-10 pr-3 py-2.5 border ${
                  errors.city ? 'border-red-500' : 'border-gray-800 focus:border-cyan-500'
                } focus:outline-none transition-all`}
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-gray-900 text-white">
                    {city}
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
            {errors.city && <p className="text-xs text-red-400 mt-1">{errors.city}</p>}
          </div>

          {/* Order Note */}
          <div>
            <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">
              Order Note / Player ID (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Player ID: 512398472"
                value={formData.orderNote}
                onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                className="w-full bg-[#050814] text-sm text-white placeholder-gray-500 rounded-xl pl-10 pr-3 py-2.5 border border-gray-800 focus:border-cyan-500 focus:outline-none transition-all"
              />
              <FileText className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Card */}
      <div className="bg-[#080d1e] border border-gray-800 rounded-2xl p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Select Local Payment Method <span className="text-red-400">*</span>
          </h3>
          <p className="text-xs text-gray-400 mt-2">
            Choose your preferred manual payment method. Payment instructions will be shown on the next screen.
          </p>
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-red-400 font-semibold">{errors.paymentMethod}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              selected={formData.paymentMethod === method.id}
              onSelect={(id) => {
                setFormData({ ...formData, paymentMethod: id });
                if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: null });
              }}
            />
          ))}
        </div>
      </div>

      {/* Submit Order Action */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting || cart.length === 0}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-gray-950 font-black text-base rounded-2xl transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          <span>Confirm & Create Order ({formatPrice(cartTotal)})</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
