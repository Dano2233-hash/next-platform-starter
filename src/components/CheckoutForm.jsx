import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle } from 'lucide-react';

export default function CheckoutForm({ onSubmitOrder }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethodsList = [
    {
      id: 'fastpay',
      name: 'FastPay',
      number: '0750 123 4567',
      description: 'Transfer total amount to our FastPay account and send receipt via WhatsApp'
    },
    {
      id: 'korek',
      name: 'Korek Cash',
      number: '0750 987 6543',
      description: 'Send direct Korek credit transfer to our registered agent number'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / FIB',
      number: '5399 **** **** 8821',
      description: 'Direct IBAN / Card transfer for Fast Pay or FIB Kurdistan accounts'
    }
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required (e.g., Erbil, Sulaymaniyah, Duhok)';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitOrder(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Info Section */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          Customer Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Dano"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-slate-900 border ${
                  errors.name ? 'border-rose-500' : 'border-slate-700'
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors`}
              />
            </div>
            {errors.name && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. 0750 XXX XXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-slate-900 border ${
                  errors.phone ? 'border-rose-500' : 'border-slate-700'
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors`}
              />
            </div>
            {errors.phone && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Region *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Kirkuk, Baghdad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full bg-slate-900 border ${
                  errors.city ? 'border-rose-500' : 'border-slate-700'
                } rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors`}
              />
            </div>
            {errors.city && (
              <p className="text-rose-400 text-[11px] mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          Select Manual Payment Method *
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Select how you want to send your payment. Manual transfer details will be generated upon order completion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethodsList.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-rose-400 text-[11px] mt-2 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Order Notes (Player ID / Account Details) */}
      <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-5 shadow-xl">
        <label className="block text-xs font-bold text-white mb-1.5 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          Order Note / In-Game Player ID (Optional)
        </label>
        <p className="text-[11px] text-slate-400 mb-2">
          If ordering PUBG UC, Free Fire Diamonds, or MLBB, enter your Player ID & Character Name here for instant top-up.
        </p>
        <textarea
          rows={3}
          placeholder="e.g. PUBG Player ID: 5129381923, Name: DanoGamer"
          value={formData.orderNote}
          onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-600/25 transition-all cursor-pointer"
      >
        Complete & Place Order
      </button>
    </form>
  );
}
