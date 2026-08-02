import React, { useState } from 'react';
import PaymentMethodCard from './PaymentMethodCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ArrowRight, ShoppingCart } from 'lucide-react';

export default function CheckoutForm() {
  const { addOrder } = useProducts();
  const { cart, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    paymentMethod: '',
    note: ''
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    {
      id: 'FastPay',
      name: 'FastPay Wallet',
      details: 'Transfer manually to FastPay Wallet +964 750 000 0000. Real-time secure verification.'
    },
    {
      id: 'Korek',
      name: 'Korek Telecom Balance',
      details: 'Send Korek Telecom balance transfer to +964 750 000 0000.'
    },
    {
      id: 'MasterCard',
      name: 'MasterCard Manual',
      details: 'Send manual transfer/payment. Contact us on WhatsApp to receive our card number.'
    }
  ];

  const handleSelectPayment = (id) => {
    setFormData((prev) => ({ ...prev, paymentMethod: id }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Customer name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.city.trim()) newErrors.city = 'City/Location is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to error
      const firstError = Object.keys(validationErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      customerName: formData.name,
      phone: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      note: formData.note,
      items: cart,
      total: getCartTotal(),
      createdAt: new Date().toISOString()
    };

    // Store order and clear cart
    addOrder(orderData);
    clearCart();

    // Store checkout session to display on success page
    sessionStorage.setItem('last_order_details', JSON.stringify(orderData));

    // Redirect to success
    window.location.href = `/order-success?id=${orderId}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-[#080811] border border-white/5 rounded-2xl p-6 space-y-5">
        <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-white/5 pb-3">
          1. Billing Details
        </h3>

        {/* Customer Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Your Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. Dano Lawa"
            className={`w-full bg-[#0d0d1a] border rounded-xl py-3 px-4 text-sm focus:outline-none transition-all ${
              errors.name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-cyan-500'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs font-bold mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="e.g. +964 750 000 0000"
              className={`w-full bg-[#0d0d1a] border rounded-xl py-3 px-4 text-sm focus:outline-none transition-all ${
                errors.phone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-cyan-500'
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs font-bold mt-1">{errors.phone}</p>}
          </div>

          {/* City */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              City / Governorate <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="e.g. Erbil, Sulaymaniyah, Duhok"
              className={`w-full bg-[#0d0d1a] border rounded-xl py-3 px-4 text-sm focus:outline-none transition-all ${
                errors.city ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:border-cyan-500'
              }`}
            />
            {errors.city && <p className="text-red-500 text-xs font-bold mt-1">{errors.city}</p>}
          </div>
        </div>

        {/* Order Note */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Order Note / Gamer ID (Optional)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={3}
            placeholder="Write your player ID, server, or any extra instructions for us..."
            className="w-full bg-[#0d0d1a] border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Payment Selection Box */}
      <div className="bg-[#080811] border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-white font-bold text-base uppercase tracking-wider border-b border-white/5 pb-3">
          2. Manual Payment Method
        </h3>

        <p className="text-xs text-gray-400 leading-relaxed">
          Select one of our secure manual payment wallets. Once you place the order, you can contact our agent with your order number to complete verification.
        </p>

        <div className="space-y-2.5">
          {paymentMethods.map((pm) => (
            <PaymentMethodCard
              key={pm.id}
              id={pm.id}
              name={pm.name}
              details={pm.details}
              selectedId={formData.paymentMethod}
              onSelect={handleSelectPayment}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="text-red-500 text-xs font-bold mt-1">{errors.paymentMethod}</p>}
      </div>

      {/* Safety Message and Buy Button */}
      <div className="p-4 bg-cyan-950/20 border border-cyan-800/30 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] text-cyan-300 leading-relaxed">
          By clicking &quot;Place Order&quot;, your digital invoice is stored securely. No actual credit card billing or instant gateway processing is performed. We look forward to fulfilling your request.
        </p>
      </div>

      <button
        type="submit"
        disabled={cart.length === 0}
        className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
          cart.length === 0
            ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-95 text-white hover:scale-[1.01] shadow-blue-500/25'
        }`}
      >
        <span>Place Manual Order</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
