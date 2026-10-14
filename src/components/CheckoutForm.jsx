import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, FileText, Smartphone, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function CheckoutForm() {
  const { cart, cartTotal, createOrder } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});

  const paymentOptions = [
    {
      id: 'FastPay',
      title: 'FastPay',
      subtitle: 'Instant mobile wallet payment in Kurdistan & Iraq',
      icon: Smartphone,
      badge: 'Fastest',
    },
    {
      id: 'Korek',
      title: 'Korek Cash / Recharge',
      subtitle: 'Korek direct credit or wallet transfer',
      icon: Phone,
      badge: 'Popular',
    },
    {
      id: 'MasterCard',
      title: 'MasterCard / Visa',
      subtitle: 'Local & international debit or credit cards',
      icon: CreditCard,
      badge: 'Secure',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) newErrors.city = 'City selection is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const orderId = generateOrderId();
    const orderObj = {
      orderId,
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
      },
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: cartTotal,
      status: 'Pending Payment',
    };

    createOrder(orderObj);
    navigate('/order-success', { state: { order: orderObj } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Customer Information Block */}
      <div className="bg-[#0a0e1c] p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80">
          <User className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">1. Customer Information</h3>
        </div>

        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="e.g., Lawa Kardo"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border ${
                errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-cyan-500'
              } focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all`}
            />
            <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone & City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Phone Number / WhatsApp <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="phone"
                placeholder="0750 000 0000"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-3 rounded-xl border ${
                  errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
                } focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all`}
              />
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              City / Governorates <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-slate-900 text-sm text-slate-100 pl-10 pr-4 py-3 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all appearance-none"
              >
                <option value="Erbil">Erbil (Hawler)</option>
                <option value="Sulaymaniyah">Sulaymaniyah (Slemani)</option>
                <option value="Duhok">Duhok</option>
                <option value="Kirkuk">Kirkuk</option>
                <option value="Baghdad">Baghdad</option>
                <option value="Basra">Basra</option>
                <option value="Mosul">Mosul</option>
                <option value="Halabja">Halabja</option>
                <option value="Other Iraq City">Other Iraq City</option>
              </select>
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {errors.city && (
              <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.city}
              </p>
            )}
          </div>
        </div>

        {/* Order Note / Player ID */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Player ID / Note (Optional)
          </label>
          <div className="relative">
            <textarea
              name="orderNote"
              rows={2}
              placeholder="For PUBG UC / Mobile Games, enter your Player ID & Game Name here."
              value={formData.orderNote}
              onChange={handleChange}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-[#0a0e1c] p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">2. Select Payment Method</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            Manual Checkout
          </span>
        </div>

        <div className="space-y-3">
          {paymentOptions.map((opt) => (
            <PaymentMethodCard
              key={opt.id}
              id={opt.id}
              title={opt.title}
              subtitle={opt.subtitle}
              icon={opt.icon}
              badge={opt.badge}
              selected={formData.paymentMethod === opt.id}
              onSelect={(id) => setFormData((prev) => ({ ...prev, paymentMethod: id }))}
            />
          ))}
        </div>

        {errors.paymentMethod && (
          <p className="text-xs text-rose-400 flex items-center gap-1 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Submit Order Action */}
      <div className="bg-[#0a0e1c] p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-base font-extrabold text-white">
          <span>Total Order Value:</span>
          <span className="text-cyan-400 text-xl">{formatPrice(cartTotal)}</span>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-black text-base shadow-xl shadow-cyan-500/20 transition-all active:scale-95 uppercase tracking-wide cursor-pointer"
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Confirm & Complete Order</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          By placing your order, you will receive an order confirmation number and direct instructions to finish manual payment with Dano Store.
        </p>
      </div>

    </form>
  );
}
