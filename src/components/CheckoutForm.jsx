import React from 'react';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { AlertCircle } from 'lucide-react';

export default function CheckoutForm({ formData, errors, onChange, onSelectPayment, onSubmit, isSubmitting }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs">
            1
          </span>
          Customer Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Customer Full Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g. Dana Ahmed"
              className={`w-full bg-[#060a14] border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.name
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="0750 xxx xxxx"
              className={`w-full bg-[#060a14] border rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                errors.phone
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              City / Governorate <span className="text-red-400">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={onChange}
              className={`w-full bg-[#060a14] border rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none transition-all ${
                errors.city
                  ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30'
              }`}
            >
              <option value="">Select your city...</option>
              <option value="Erbil">Erbil (Hawler)</option>
              <option value="Sulaymaniyah">Sulaymaniyah</option>
              <option value="Duhok">Duhok</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Basra">Basra</option>
              <option value="Najaf">Najaf</option>
              <option value="Karbala">Karbala</option>
              <option value="Mosul">Mosul (Nineveh)</option>
              <option value="Other">Other Iraq Region</option>
            </select>
            {errors.city && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Manual Payment Method Selection */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs">
            2
          </span>
          Select Manual Payment Method
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Choose your local transfer channel. No automated charge will be made online.
        </p>

        {errors.paymentMethod && (
          <div className="mb-3 p-2.5 rounded-lg bg-red-950/50 border border-red-500/40 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.paymentMethod}</span>
          </div>
        )}

        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <PaymentMethodCard
              key={method.id}
              method={method}
              isSelected={formData.paymentMethod === method.id}
              onSelect={onSelectPayment}
            />
          ))}
        </div>
      </div>

      {/* Order Notes / Player ID */}
      <div className="bg-[#090e1d] border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 flex items-center justify-center text-xs">
            3
          </span>
          Order Notes & Game Player ID
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          If ordering game top-ups (e.g. PUBG, Free Fire, MLBB), write your Player ID, Riot Tagline, or Steam account username here.
        </p>

        <textarea
          name="orderNote"
          rows={3}
          value={formData.orderNote}
          onChange={onChange}
          placeholder="e.g. PUBG ID: 512345678 or Discord Username: Player#1234"
          className="w-full bg-[#060a14] border border-slate-700 focus:border-cyan-500 rounded-lg p-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-cyan-950/50 active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <span>Confirm Order & Proceed to Payment</span>
      </button>
    </form>
  );
}
