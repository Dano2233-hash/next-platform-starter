import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { User, Phone, MapPin, FileText, ArrowRight, AlertCircle } from 'lucide-react';

const paymentMethods = [
  {
    id: 'FastPay',
    name: 'FastPay',
    tag: 'Popular Iraq',
    description: 'Instant manual transfer via FastPay Mobile Wallet. Account number will be shown after order creation.',
    accountInfo: 'FastPay Wallet'
  },
  {
    id: 'Korek',
    name: 'Korek Telecom',
    tag: 'Balance / Card',
    description: 'Pay via Korek Telecom mobile balance or scratch cards. Quick confirmation via WhatsApp.',
    accountInfo: 'Korek Mobile Transfer'
  },
  {
    id: 'MasterCard',
    name: 'MasterCard / FIB / NassPay',
    tag: 'Card Transfer',
    description: 'Direct IBAN / Card transfer via FIB (First Iraqi Bank), NassPay, or local MasterCard.',
    accountInfo: 'IBAN / Card Number'
  }
];

export default function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    city: '',
    paymentMethod: 'FastPay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.customerName.trim()) {
      errs.customerName = 'Customer full name is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Active phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required (e.g., Erbil, Sulaymaniyah, Duhok, Baghdad)';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a payment method';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cartItems,
      totalPrice,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([orderData, ...existingOrders]));
    } catch (e) {
      console.error('Error saving order', e);
    }

    // Clear cart and navigate to order success
    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Details & Payment */}
      <div className="lg:col-span-7 space-y-6">

        {/* Customer Details Box */}
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Customer Information</span>
          </h3>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Lawa Dano"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={`w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border transition-all ${
                  errors.customerName ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {errors.customerName && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.customerName}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Phone Number / WhatsApp <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0750 XXX XX XX or 0770 XXX XX XX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border transition-all ${
                  errors.phone ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Erbil, Sulaymaniyah, Duhok, Kirkuk, Baghdad"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className={`w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border transition-all ${
                  errors.city ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
            {errors.city && (
              <p className="text-xs text-red-400 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.city}</span>
              </p>
            )}
          </div>

          {/* Order Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Order Note / In-Game ID / Player Tag (Optional)
            </label>
            <div className="relative">
              <textarea
                rows={2}
                placeholder="Add Player ID or special instructions if applicable..."
                value={formData.orderNote}
                onChange={(e) => setFormData({ ...formData, orderNote: e.target.value })}
                className="w-full bg-[#05070f] text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-slate-800 focus:border-cyan-500 transition-all"
              />
              <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-100">Select Payment Method</h3>
            <p className="text-xs text-slate-400 mt-0.5">Manual transfers only. No automatic online card processing.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                selectedMethodId={formData.paymentMethod}
                onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
              />
            ))}
          </div>

          {errors.paymentMethod && (
            <p className="text-xs text-red-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.paymentMethod}</span>
            </p>
          )}
        </div>
      </div>

      {/* Right Column: Order Summary */}
      <div className="lg:col-span-5">
        <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 shadow-xl sticky top-24 space-y-4">
          <h3 className="font-bold text-base text-slate-100 border-b border-slate-800 pb-3">
            Order Summary ({cartItems.length} items)
          </h3>

          <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between text-xs gap-2 py-1">
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-200 truncate">{item.name}</p>
                  <p className="text-cyan-400 text-[11px] font-medium">Pkg: {item.packageName} x{item.quantity}</p>
                </div>
                <span className="font-extrabold text-slate-200 flex-shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-200">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Digital Key Fee</span>
              <span className="font-semibold text-emerald-400">FREE</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
              <span className="font-bold text-slate-100 text-sm">Total Pay</span>
              <span className="font-black text-xl text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 transition-all duration-200 cursor-pointer"
          >
            <span>Confirm & Create Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-slate-400 text-center leading-normal">
            By clicking confirm, your digital order code will be generated. Transfer details will be shown on the next page.
          </p>
        </div>
      </div>
    </form>
  );
}
