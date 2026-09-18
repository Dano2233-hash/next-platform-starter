import React, { useState } from 'react';
import { PaymentMethodCard } from './PaymentMethodCard';
import { User, Phone, MapPin, FileText, AlertCircle, ShoppingBag, Send } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';

export function CheckoutForm({ cartItems, totalPrice, onSubmitOrder }) {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('fastpay');
  const [orderNote, setOrderNote] = useState('');

  const [errors, setErrors] = useState({});

  const paymentMethodsList = [
    {
      id: 'fastpay',
      name: 'FastPay',
      icon: 'fastpay',
      tag: 'Instant',
      description: 'Transfer via FastPay wallet number provided after checkout.'
    },
    {
      id: 'korek',
      name: 'Korek Telecom',
      icon: 'korek',
      tag: 'Mobile Direct',
      description: 'Transfer balance / Korek Cash.'
    },
    {
      id: 'mastercard',
      name: 'MasterCard / FIB / NassPay',
      icon: 'mastercard',
      tag: 'Card',
      description: 'Local Kurdistan / Iraq Card Transfer.'
    }
  ];

  const validate = () => {
    const errs = {};
    if (!customerName.trim()) {
      errs.customerName = 'Customer name is required.';
    }
    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required.';
    } else if (phoneNumber.trim().length < 8) {
      errs.phoneNumber = 'Please enter a valid phone number.';
    }
    if (!city.trim()) {
      errs.city = 'City is required (e.g. Erbil, Sulaymaniyah, Duhok, Baghdad).';
    }
    if (!paymentMethod) {
      errs.paymentMethod = 'Please select a payment method.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderData = {
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      city: city.trim(),
      paymentMethod,
      orderNote: orderNote.trim(),
      items: cartItems,
      totalPrice,
      createdAt: new Date().toISOString()
    };

    onSubmitOrder(orderData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Customer Info Section */}
      <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          <span>1. Customer Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Dano"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className={`w-full bg-slate-900 border ${
                  errors.customerName ? 'border-rose-500' : 'border-slate-800'
                } text-slate-100 text-sm pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.customerName && (
              <p className="text-rose-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.customerName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="e.g. 0750 123 4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full bg-slate-900 border ${
                  errors.phoneNumber ? 'border-rose-500' : 'border-slate-800'
                } text-slate-100 text-sm pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phoneNumber && (
              <p className="text-rose-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phoneNumber}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-300">
              City / Region <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Erbil, Sulaymaniyah, Duhok, Kirkuk, Baghdad..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`w-full bg-slate-900 border ${
                  errors.city ? 'border-rose-500' : 'border-slate-800'
                } text-slate-100 text-sm pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:border-cyan-500`}
              />
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.city && (
              <p className="text-rose-400 text-xs flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Payment Selection Section */}
      <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-purple-400" />
          <span>2. Select Payment Method (Manual Payment)</span>
        </h3>

        <p className="text-xs text-slate-400">
          Payment is collected manually. After creating your order, you will receive payment details to transfer via FastPay, Korek or MasterCard.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {paymentMethodsList.map((m) => (
            <PaymentMethodCard
              key={m.id}
              method={m}
              selectedMethod={paymentMethod}
              onSelect={setPaymentMethod}
            />
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-rose-400 text-xs flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{errors.paymentMethod}</span>
          </p>
        )}
      </div>

      {/* Order Note */}
      <div className="bg-[#090d16] border border-slate-800 rounded-2xl p-6 space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>3. Order Note / Player ID / Special Requests (Optional)</span>
        </label>
        <textarea
          rows={3}
          placeholder="Add your PUBG ID, Player Tag, Discord Tag or special instructions here..."
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-slate-100 text-sm p-3 rounded-xl focus:outline-none focus:border-cyan-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black text-base py-4 rounded-xl shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
      >
        <Send className="w-5 h-5" />
        <span>Create Order ({formatPrice(totalPrice)})</span>
      </button>
    </form>
  );
}
