import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ cart, total, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'fastpay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.phone.trim()) tempErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) tempErrors.city = 'City/Location is required';
    if (!formData.paymentMethod) tempErrors.paymentMethod = 'Please choose a manual payment method';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (id) => {
    setFormData((prev) => ({ ...prev, paymentMethod: id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const paymentMethodsList = [
    {
      id: 'fastpay',
      name: 'FastPay',
      details: 'Instant manual transfer via FastPay Wallet. Transfer directly to our wallet and share the payment screenshot.'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      details: 'Manual balance transfer or Korek recharge voucher codes. Send the code to complete the verification.'
    },
    {
      id: 'mastercard',
      name: 'MasterCard Fib / Iraqi',
      details: 'Direct transfer to our digital card account. We will share details on Viber or WhatsApp after order creation.'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Contact & Shipping Fields */}
      <div className="bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-[#121225] pb-2.5">
          👤 Customer Details
        </h3>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Karzan Ahmed"
            className="w-full bg-[#05050d] border border-[#121225] rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
          />
          {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0750XXXXXXX or 0770XXXXXXX"
            className="w-full bg-[#05050d] border border-[#121225] rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
          />
          {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
            City / Region <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Baghdad"
            className="w-full bg-[#05050d] border border-[#121225] rounded-lg py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
          />
          {errors.city && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">
            Order Notes (optional)
          </label>
          <textarea
            name="note"
            rows="3"
            value={formData.note}
            onChange={handleChange}
            placeholder="e.g. Send PC key via Telegram, or specify game account details"
            className="w-full bg-[#05050d] border border-[#121225] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00e5ff] transition-premium"
          />
        </div>
      </div>

      {/* Manual Payment Methods Options */}
      <div className="bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider border-b border-[#121225] pb-2.5">
          💸 Manual Payment Method
        </h3>
        <p className="text-[10px] text-gray-500 leading-normal">
          Dano Store utilizes manual processing. Create your order first, then copy the generated order ID and send the transfer to complete the activation process.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {paymentMethodsList.map((m) => (
            <PaymentMethodCard
              key={m.id}
              id={m.id}
              name={m.name}
              details={m.details}
              active={formData.paymentMethod === m.id}
              onSelect={handlePaymentSelect}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="text-red-500 text-[10px] font-bold">{errors.paymentMethod}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[#0066ff] via-[#7000ff] to-[#00e5ff] hover:glow-blue text-black text-xs font-black py-3 rounded-lg uppercase tracking-widest transition-premium"
      >
        Submit Order & Request Activation
      </button>
    </form>
  );
}
