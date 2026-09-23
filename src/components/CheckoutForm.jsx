import React, { useState } from 'react';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm({ onSuccess }) {
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    if (!formData.city.trim()) errs.city = 'City location is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: totalPrice,
      status: 'Pending Payment',
      createdAt: new Date().toISOString()
    };

    addOrder(orderData);
    clearCart();
    if (onSuccess) {
      onSuccess(orderData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#090d1a] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
      <div className="border-b border-slate-800/80 pb-4">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          <span>Customer & Payment Information</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Please provide your details below to place your gaming order.
        </p>
      </div>

      {/* Global Validation Banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-1">Please correct the errors before proceeding:</span>
            <ul className="list-disc list-inside space-y-0.5 text-red-300">
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Fields Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Full Name <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dano Lawa"
              className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all ${
                errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 0750 123 4567"
              className={`w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all ${
                errors.phone ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
        </div>

        {/* City */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            City / Region <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full bg-slate-950 text-sm text-slate-100 pl-10 pr-4 py-3 rounded-xl border focus:outline-none transition-all appearance-none ${
                errors.city ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
              }`}
            >
              <option value="Erbil">Erbil / Hewlêr</option>
              <option value="Sulaymaniyah">Sulaymaniyah / Slemani</option>
              <option value="Duhok">Duhok</option>
              <option value="Kirkuk">Kirkuk</option>
              <option value="Baghdad">Baghdad</option>
              <option value="Halabja">Halabja</option>
              <option value="Basra">Basra</option>
              <option value="Other Iraq City">Other Iraq City</option>
            </select>
            <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
          {errors.city && <p className="text-[11px] text-red-400">{errors.city}</p>}
        </div>

        {/* Order Note */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Order Note / Game ID Details <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              rows={2}
              value={formData.orderNote}
              onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
              placeholder="e.g. Player ID: 5123456789 or Account email details..."
              className="w-full bg-slate-950 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all resize-none"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Payment Selection */}
      <PaymentMethodCard
        selectedMethod={formData.paymentMethod}
        onSelect={(methodId) => setFormData({ ...formData, paymentMethod: methodId })}
      />

      {/* Submit Button */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-semibold">Total to Pay:</span>
          <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            {formatPrice(totalPrice)}
          </span>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Complete Order</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
