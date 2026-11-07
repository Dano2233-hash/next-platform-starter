import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  MapPin,
  User,
  Phone,
  FileText
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { PAYMENT_METHODS } from '../data/categories';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import PaymentMethodCard from '../components/PaymentMethodCard';

export function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Erbil',
    paymentMethod: 'FastPay',
    orderNote: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to cart
  if (cartItems.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full customer name is required.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Active phone number (with WhatsApp) is required.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number (at least 8 digits).';
    }
    if (!formData.city.trim()) {
      errs.city = 'City is required.';
    }
    if (!formData.paymentMethod) {
      errs.paymentMethod = 'Please select a manual payment method.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cartItems,
      totalAmount: subtotal,
      status: 'Pending Payment Validation',
    };

    // Save to Local Storage key 'dano_orders'
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Failed to save order to localStorage', err);
    }

    // Clear cart and redirect to order success page
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 pt-4">
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping Cart</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Manual Payment Checkout</h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer information and select your preferred regional payment method.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer and Payment Information */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Customer Details */}
            <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <User className="w-4 h-4 text-cyan-400" />
                <span>1. Customer & Delivery Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Customer Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dano Lawa"
                      className={`w-full bg-[#05070f] text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-700/80 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 0750 123 4567"
                      className={`w-full bg-[#05070f] text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-slate-700/80 focus:border-cyan-500'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    City / Governorate *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-[#05070f] text-sm text-slate-100 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Erbil">Erbil (Hewlêr)</option>
                      <option value="Sulaymaniyah">Sulaymaniyah (Silêmanî)</option>
                      <option value="Duhok">Duhok (Dihok)</option>
                      <option value="Kirkuk">Kirkuk</option>
                      <option value="Baghdad">Baghdad</option>
                      <option value="Basra">Basra</option>
                      <option value="Other">Other Iraq Region</option>
                    </select>
                  </div>
                  {errors.city && (
                    <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-medium">
                      <AlertCircle className="w-3 h-3" /> {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Player ID / Account / Order Note
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      name="orderNote"
                      value={formData.orderNote}
                      onChange={handleInputChange}
                      placeholder="e.g. PUBG ID: 5123984712"
                      className="w-full bg-[#05070f] text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700/80 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>2. Select Payment Method (Manual Payment Only)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-2">
                  No automated bank debit. You will transfer the funds manually to our account and send the screenshot for activation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {PAYMENT_METHODS.map((method) => (
                  <PaymentMethodCard
                    key={method.id}
                    method={method}
                    isSelected={formData.paymentMethod === method.id}
                    onSelect={(id) => setFormData((prev) => ({ ...prev, paymentMethod: id }))}
                  />
                ))}
              </div>
              {errors.paymentMethod && (
                <p className="text-[11px] text-red-400 flex items-center gap-1 mt-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> {errors.paymentMethod}
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Order Review */}
          <div className="lg:col-span-4">
            <div className="bg-[#0d1222] border border-slate-800 rounded-3xl p-6 space-y-6 sticky top-24">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Items In Order ({cartItems.length})
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-0">
                    <div className="flex-1 pr-2">
                      <span className="font-semibold text-slate-200 block line-clamp-1">{item.name}</span>
                      <span className="text-slate-400 text-[11px]">
                        {item.packageName || item.type} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-cyan-400 whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Selected Payment:</span>
                  <span className="font-bold text-white">{formData.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Currency:</span>
                  <span className="font-bold text-white">Iraqi Dinar (IQD)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-slate-800">
                  <span className="text-sm font-bold text-white">Total Due:</span>
                  <span className="text-2xl font-black text-cyan-400">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-teal-300 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Order...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete Order & View Receipt</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                By completing your order, you agree to contact Dano Store via WhatsApp or Discord to complete the manual transfer.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
