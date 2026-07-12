import React from 'react';

const CheckoutForm = ({ formData, onChange, errors }) => {
  const cities = ["Erbil", "Sulaymaniyah", "Duhok", "Kirkuk", "Baghdad", "Basra", "Mosul", "Other"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
          <input
            type="text"
            className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white focus:outline-none transition-all ${
              errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-accent-cyan'
            }`}
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
          <input
            type="tel"
            className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white focus:outline-none transition-all ${
              errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-accent-cyan'
            }`}
            placeholder="07XX XXX XXXX"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
        <select
          className={`w-full bg-white/5 border rounded-lg py-3 px-4 text-white focus:outline-none transition-all ${
            errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-white/10 focus:border-accent-cyan'
          }`}
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
        >
          <option value="" disabled className="bg-navy-900">Select your city</option>
          {cities.map((city) => (
            <option key={city} value={city} className="bg-navy-900">{city}</option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Order Note (Optional)</label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-accent-cyan min-h-[100px]"
          placeholder="Any special instructions or account details if needed..."
          value={formData.note}
          onChange={(e) => onChange('note', e.target.value)}
        />
      </div>
    </div>
  );
};

export default CheckoutForm;
