import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

export default function CheckoutForm({ onSubmit, total }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: 'FastPay',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required.';
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
    { id: 'FastPay', name: 'FastPay', description: 'Manual FastPay transfer. Direct receipt validation.' },
    { id: 'Korek', name: 'Korek Telecom', description: 'Manual Korek balance or scratch card code transfer.' },
    { id: 'MasterCard', name: 'MasterCard / Fib', description: 'Bank card receipt. Manual validation.' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#0d0d11] border border-white/5 p-6 rounded-lg space-y-4">
        <h3 className="text-xs font-bold uppercase text-cyan-400 tracking-wider">
          Billing & Delivery Details
        </h3>

        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5">Full Name *</label>
          <input
            type="text"
            placeholder="e.g. Lawa Dano"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/30 text-xs rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5">Phone Number *</label>
          <input
            type="text"
            placeholder="e.g. 0750XXXXXXX or 0770XXXXXXX"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/30 text-xs rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5">City *</label>
          <input
            type="text"
            placeholder="e.g. Erbil, Sulaymaniyah, Duhok..."
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/30 text-xs rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1.5">Order Note (Optional)</label>
          <textarea
            placeholder="In-game ID, Player Tag, or custom instructions..."
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
            rows={3}
            className="w-full bg-[#050507] border border-white/10 text-white placeholder-white/30 text-xs rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
          />
        </div>
      </div>

      {/* Payment Selection */}
      <div className="bg-[#0d0d11] border border-white/5 p-6 rounded-lg space-y-4">
        <h3 className="text-xs font-bold uppercase text-cyan-400 tracking-wider">
          Select Payment Method
        </h3>
        {errors.paymentMethod && <p className="text-[10px] text-red-500">{errors.paymentMethod}</p>}

        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              method={pm}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/10 active:scale-98"
      >
        <ShoppingBag className="h-4.5 w-4.5" />
        Place Order Now
      </button>
    </form>
  );
}
