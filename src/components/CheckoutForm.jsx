import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAYMENT_METHODS } from '../data/categories';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { User, Phone, MapPin, FileText, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export default function CheckoutForm() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'fastpay',
    note: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full customer name is required.';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (e.g., 0750 XXX XXXX).';
    }
    if (!formData.city.trim()) errs.city = 'City location is required.';
    if (!formData.paymentMethod) errs.paymentMethod = 'Please select a payment method.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const selectedMethodObj = PAYMENT_METHODS.find((p) => p.id === formData.paymentMethod);

    const orderData = {
      orderId,
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: selectedMethodObj ? selectedMethodObj.name : formData.paymentMethod,
      paymentMethodId: formData.paymentMethod,
      note: formData.note.trim(),
      items: cartItems,
      totalAmount: cartTotal,
      currency: 'IQD',
      status: 'Pending Payment',
    };

    // Save to Local Storage via useProducts
    addOrder(orderData);

    // Clear cart
    clearCart();

    // Redirect to Order Success page
    navigate(`/order-success?orderId=${orderId}`, { state: { order: orderData } });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Form Fields */}
      <div className="lg:col-span-7 space-y-6">
        {/* Customer Details Section */}
        <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <User className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-slate-100">Customer Information</h3>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Lawa Dano"
                className={`w-full bg-[#05070f] border ${
                  errors.name ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Phone Number (WhatsApp) <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0750 XXX XXXX or 0770 XXX XXXX"
                className={`w-full bg-[#05070f] border ${
                  errors.phone ? 'border-red-500/80' : 'border-slate-800 focus:border-cyan-500'
                } rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.phone}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              City / Region <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#05070f] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 focus:outline-none transition-colors appearance-none"
              >
                <option value="Erbil">Erbil (Hewlêr)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemany)</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Halabja">Halabja</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Other Kurdistan/Iraq City">Other City</option>
              </select>
            </div>
            {errors.city && (
              <p className="mt-1 text-[11px] font-semibold text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.city}
              </p>
            )}
          </div>

          {/* Note */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Order Note / Game Player ID (Optional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="Enter your PUBG ID, Free Fire ID, or specific instructions..."
                rows="2"
                className="w-full bg-[#05070f] border border-slate-800 focus:border-cyan-500 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-slate-100">Select Payment Method</h3>
            </div>
            <span className="text-[11px] font-bold text-cyan-400">Manual Payment (IQD)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <PaymentMethodCard
                key={method.id}
                method={method}
                isSelected={formData.paymentMethod === method.id}
                onSelect={(id) => setFormData({ ...formData, paymentMethod: id })}
              />
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="text-[11px] font-semibold text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
            </p>
          )}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#090d1c] border border-slate-800 rounded-2xl p-6 space-y-4 sticky top-24">
          <h3 className="text-base font-bold text-slate-100 border-b border-slate-800/80 pb-3">
            Order Summary
          </h3>

          {/* Cart Items list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-200 truncate">{item.name}</p>
                  <p className="text-[10px] text-slate-400">
                    {item.packageName ? item.packageName : 'Standard'} × {item.quantity}
                  </p>
                </div>
                <span className="font-extrabold text-cyan-400 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total</span>
              <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Processing Fee</span>
              <span className="text-emerald-400 font-bold">Free</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Currency</span>
              <span className="text-cyan-400 font-bold">IQD</span>
            </div>
            <div className="border-t border-slate-800/80 pt-3 flex justify-between text-sm">
              <span className="font-extrabold text-slate-100">Total Payable</span>
              <span className="font-black text-cyan-300 text-base">{formatPrice(cartTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || cartItems.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            {isSubmitting ? 'Creating Order...' : 'Complete Order'}
          </button>

          <p className="text-[11px] text-slate-500 text-center leading-relaxed">
            By completing this order, you will receive order confirmation details to finish payment via WhatsApp or Discord.
          </p>
        </div>
      </div>
    </form>
  );
}
