import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import PaymentMethodCard from './PaymentMethodCard';
import { Wallet, Smartphone, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export default function CheckoutForm() {
  const { cart, cartTotal, addOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'FastPay',
      title: 'FastPay',
      subtitle: 'FastPay Wallet local payment',
      icon: Wallet
    },
    {
      id: 'Korek',
      title: 'Korek Cash',
      subtitle: 'Korek mobile wallet payment',
      icon: Smartphone
    },
    {
      id: 'MasterCard',
      title: 'MasterCard / FIB',
      subtitle: 'First Iraqi Bank or local MasterCard',
      icon: CreditCard
    }
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid Iraqi phone number (e.g. 0750 123 4567)';
    }
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newOrder = {
      orderId: generateOrderId(),
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      items: cart,
      totalAmount: cartTotal,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    addOrder(newOrder);
    navigate(`/order-success/${newOrder.orderId}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Info Section */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-black text-xs flex items-center justify-center">1</span>
          Customer Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Name Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Lawa Kurdistan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full bg-slate-950 text-white text-sm rounded-xl px-4 py-2.5 border transition-all ${
                errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              placeholder="0750 XXX XXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full bg-slate-950 text-white text-sm rounded-xl px-4 py-2.5 border transition-all ${
                errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

        </div>

        {/* City Select */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            City / Region <span className="text-cyan-400">*</span>
          </label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full bg-slate-950 text-white text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:border-cyan-500 transition-all"
          >
            <option value="Erbil">Erbil / Hewlêr</option>
            <option value="Sulaymaniyah">Sulaymaniyah / Slemani</option>
            <option value="Duhok">Duhok</option>
            <option value="Kirkuk">Kirkuk</option>
            <option value="Baghdad">Baghdad</option>
            <option value="Halabja">Halabja</option>
            <option value="Basra">Basra</option>
            <option value="Mosul">Mosul</option>
            <option value="Other Iraq">Other Region in Iraq</option>
          </select>
        </div>

        {/* Order Note */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Order Note / Player ID (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. PUBG Player ID: 51239481, or Discord Tag"
            value={formData.orderNote}
            onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
            className="w-full bg-slate-950 text-white text-sm rounded-xl px-4 py-2.5 border border-slate-800 focus:border-cyan-500 transition-all"
          />
        </div>

      </div>

      {/* Payment Method Section */}
      <div className="bg-[#090e1c] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="font-extrabold text-white text-base border-b border-slate-800 pb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-black text-xs flex items-center justify-center">2</span>
          Select Local Payment Method
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              title={pm.title}
              subtitle={pm.subtitle}
              icon={pm.icon}
              isSelected={formData.paymentMethod === pm.id}
              onSelect={(selectedId) => setFormData({ ...formData, paymentMethod: selectedId })}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 bg-[#090e1c] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Total Amount Due</span>
          <span className="text-xl font-black text-cyan-300">{formatPrice(cartTotal)}</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-cyan-500 text-white font-extrabold rounded-xl shadow-xl shadow-cyan-500/25 transition-all text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Complete Order
        </button>
      </div>

    </form>
  );
}
