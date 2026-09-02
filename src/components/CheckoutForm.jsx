import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder, isSubmitting = false }) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('FastPay');
  const [orderNote, setOrderNote] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (phoneNumber.trim().length < 8) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder({
        customerName: customerName.trim(),
        phoneNumber: phoneNumber.trim(),
        city: city.trim(),
        paymentMethod,
        orderNote: orderNote.trim(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-6 bg-[#0b101c] rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: null }));
              }}
              placeholder="e.g. Karwan Ahmed"
              className={`w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border focus:outline-none transition-all ${
                errors.customerName
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.customerName && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: null }));
              }}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border focus:outline-none transition-all ${
                errors.phoneNumber
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.phoneNumber && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            City / Location *
          </label>
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: null }));
              }}
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad"
              className={`w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border focus:outline-none transition-all ${
                errors.city
                  ? 'border-rose-500 focus:border-rose-500'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.city && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {errors.city}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
            Order Note / Game ID (Optional)
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Enter your Player ID, GamerTag, or special instructions..."
              className="w-full bg-[#070b13] text-sm text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 focus:outline-none"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#0b101c] rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Select Payment Method (IQD)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <PaymentMethodCard
            id="FastPay"
            name="FastPay"
            description="Direct FastPay Mobile Wallet Transfer"
            selected={paymentMethod === 'FastPay'}
            onSelect={setPaymentMethod}
          />
          <PaymentMethodCard
            id="Korek"
            name="Korek Cash"
            description="Korek Cash Direct Transfer"
            selected={paymentMethod === 'Korek'}
            onSelect={setPaymentMethod}
          />
          <PaymentMethodCard
            id="MasterCard"
            name="MasterCard"
            description="FIB / Local MasterCard Transfer"
            selected={paymentMethod === 'MasterCard'}
            onSelect={setPaymentMethod}
          />
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> {errors.paymentMethod}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm tracking-wide transition-all duration-300 shadow-lg shadow-cyan-950/60 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? 'Processing Order...' : 'Complete & Place Order'}
      </button>
    </form>
  );
}
