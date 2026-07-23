import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export function CheckoutForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: '',
    paymentMethod: '',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.customerName.trim()) {
      tempErrors.customerName = 'Customer name is required.';
    }
    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = 'Phone number is required.';
    }
    if (!formData.city.trim()) {
      tempErrors.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      tempErrors.paymentMethod = 'Please select a payment method.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error instantly
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentSelect = (id) => {
    setFormData(prev => ({ ...prev, paymentMethod: id }));
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const paymentMethods = [
    { id: 'fastpay', name: 'FastPay', details: 'Direct FastPay Wallet manual transfer. Quickest approval.' },
    { id: 'korek', name: 'Korek Telecom', details: 'Korek credit transfer or Korek Cash manual transfer.' },
    { id: 'mastercard', name: 'MasterCard', details: 'FIB, Swish, or manual card transfer. 15m checking.' }
  ];

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-widest text-brand-cyan border-b border-white/5 pb-2">
          1. Billing & Delivery Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Customer Name */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Customer Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="customerName"
              placeholder="e.g. Lawa Ahmed"
              value={formData.customerName}
              onChange={handleInputChange}
              className={`w-full bg-[#0d0d15] text-white border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                  : 'border-brand-border/60 focus:ring-1 focus:ring-brand-blue'
              }`}
            />
            {errors.customerName && (
              <p className="text-[10px] text-red-400 font-semibold">{errors.customerName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="e.g. 0750XXXXXXX"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full bg-[#0d0d15] text-white border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                  : 'border-brand-border/60 focus:ring-1 focus:ring-brand-blue'
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-[10px] text-red-400 font-semibold">{errors.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* City Input */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            City / Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad..."
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full bg-[#0d0d15] text-white border rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none transition-all ${
              errors.city
                ? 'border-red-500/80 focus:ring-1 focus:ring-red-500'
                : 'border-brand-border/60 focus:ring-1 focus:ring-brand-blue'
            }`}
          />
          {errors.city && (
            <p className="text-[10px] text-red-400 font-semibold">{errors.city}</p>
          )}
        </div>
      </div>

      {/* Payment Selector section */}
      <div className="space-y-3">
        <h2 className="text-xs font-black uppercase tracking-widest text-brand-cyan border-b border-white/5 pb-2">
          2. Select Manual Payment Method
        </h2>
        <p className="text-[11px] text-gray-500">
          This is a manual payment storefront. We process vouchers manually via fast local payment systems.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paymentMethods.map(method => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              details={method.details}
              activeId={formData.paymentMethod}
              onClick={handlePaymentSelect}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-[10px] text-red-400 font-semibold pt-1">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Order Note */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          Order Notes / Player ID (Optional)
        </label>
        <textarea
          name="orderNote"
          rows={3}
          placeholder="For top-ups, please write your Player ID or Character name here. For subscriptions, provide your specific email details."
          value={formData.orderNote}
          onChange={handleInputChange}
          className="w-full bg-[#0d0d15] text-white border border-brand-border/60 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
        />
      </div>

      {/* Submit Order Buttons */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-brand-blue text-white hover:bg-brand-blue/90 transition shadow-lg shadow-brand-blue/20 btn-glow flex items-center justify-center gap-2"
      >
        {isSubmitting ? 'Creating Order Invoice...' : 'Create Purchase Invoice'}
      </button>

    </form>
  );
}

export default CheckoutForm;
