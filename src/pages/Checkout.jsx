import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

/**
 * Checkout Requirements:
 * - Manual payment only (no real online gateway)
 * - Fields: Customer name, Phone number, City, Payment method, Order note
 * - Validation: Name is required, Phone is required, City is required, Payment method is required
 * - Clean error messages
 * - Saves order to Local Storage ('dano_orders')
 * - Clears cart upon order creation
 * - Redirects to /order-success/:orderId
 */
export default function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart, totalItems } = useCart();

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: '',
    paymentMethod: 'fastpay',
    orderNote: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect back to cart/store
  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white font-heading">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">Please add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
        >
          <span>Return to Store</span>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required.';
    } else if (formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter a valid full name.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required for order delivery.';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number (e.g. 0750 xxx xxxx).';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / Region in Iraq or Kurdistan is required.';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a manual payment method (FastPay, Korek, or MasterCard).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const orderNumber = generateOrderId();
    const newOrder = {
      orderId: orderNumber,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      city: formData.city.trim(),
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote.trim(),
      items: cart,
      totalAmount: subtotal,
      currency: 'IQD',
      status: 'Pending Payment Confirmation'
    };

    // Save order into localStorage 'dano_orders'
    try {
      const existingOrdersRaw = localStorage.getItem('dano_orders');
      const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
      existingOrders.unshift(newOrder);
      localStorage.setItem('dano_orders', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Failed to save order to localStorage:', err);
    }

    // Clear cart
    clearCart();

    // Redirect to Order Success page
    navigate(`/order-success/${orderNumber}`, { state: { order: newOrder } });
  };

  return (
    <div className="space-y-8 pb-16 pt-4">

      {/* Back button */}
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-black text-white font-heading tracking-wide">
          CHECKOUT & PAYMENT
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your contact information and select your preferred manual payment option.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#090d1c] border border-white/5 space-y-5 sticky top-28 shadow-xl">
            <h3 className="text-base font-bold text-white font-heading">
              Order Items ({totalItems})
            </h3>

            {/* Compact Item Review */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="font-semibold text-white truncate">{item.name}</p>
                    <p className="text-[11px] text-slate-400">
                      {item.selectedPackage.name} × {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-cyan-400 font-heading">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total calculation */}
            <div className="pt-3 border-t border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Delivery:</span>
                <span className="text-emerald-400 font-bold">Instant (WhatsApp / SMS)</span>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-white/5">
                <span className="text-sm font-bold text-white">Total Amount:</span>
                <span className="text-2xl font-black text-cyan-400 font-heading">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating Order...' : 'Confirm Order & View Payment Info'}</span>
            </button>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Manual Payment Verification</span>
              </div>
              <p>
                No online credit card charge will be made now. You will transfer the IQD amount manually using FastPay, Korek, or MasterCard.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
