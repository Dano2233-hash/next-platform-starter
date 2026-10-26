import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingCart } from 'lucide-react';

export default function CheckoutForm({ onSubmit, cartItems, cartTotal }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+?964|0)?[0-9]{9,10}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid Iraqi phone number (e.g., 0750XXXXXXX)';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
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
      onSubmit(formData);
    }
  };

  const paymentMethods = [
    {
      id: 'fastpay',
      name: 'FastPay',
      details: 'Instant payment via FastPay Mobile Wallet. Simple & secure.'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      details: 'Pay via Korek balance or cash voucher transfer.'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / Visa',
      details: 'Pay with local or international debit/credit cards.'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Card */}
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800/80 pb-3">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Customer Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. Lawa Dano"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-[#0d1326] border rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition-all ${
                  errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. 0750 123 4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-[#0d1326] border rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none transition-all ${
                  errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Governorates <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white outline-none"
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Halabja">Halabja</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Mosul">Mosul</option>
                <option value="Other">Other City</option>
              </select>
            </div>
            {errors.city && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Order Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Order Note / Game ID (Optional)
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="e.g. PUBG ID: 51234567"
                value={formData.orderNote}
                onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                className="w-full bg-[#0d1326] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection Card */}
      <div className="bg-[#080d1e] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2 border-b border-slate-800/80 pb-3">
          <ShoppingCart className="w-4 h-4 text-cyan-400" />
          <span>Select Manual Payment Method</span>
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <PaymentMethodCard
              key={method.id}
              id={method.id}
              name={method.name}
              details={method.details}
              isSelected={formData.paymentMethod === method.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
            <AlertCircle className="w-3 h-3" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Submit Order Button */}
      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:opacity-95 text-black font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
      >
        Complete Order & Get Payment Contact
      </button>
    </form>
  );
}
