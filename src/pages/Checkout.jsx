import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const { addOrder } = useProducts();

  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    city: '',
    paymentMethod: 'FastPay', // Default to FastPay
    orderNote: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400 mb-6">Add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950"
        >
          <ArrowLeft className="w-4 h-4" /> Browse Catalog
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePaymentSelect = (paymentId) => {
    setFormData(prev => ({ ...prev, paymentMethod: paymentId }));
    if (errors.paymentMethod) {
      setErrors(prev => ({ ...prev, paymentMethod: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer full name is required.';
    } else if (formData.customerName.trim().length < 3) {
      newErrors.customerName = 'Name must be at least 3 characters.';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required for WhatsApp verification.';
    } else if (formData.phoneNumber.trim().length < 7) {
      newErrors.phoneNumber = 'Please enter a valid phone number.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / Province is required.';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a manual payment method.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const orderId = generateOrderId();
      const orderData = {
        orderId,
        customerName: formData.customerName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        city: formData.city.trim(),
        paymentMethod: formData.paymentMethod,
        orderNote: formData.orderNote.trim(),
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          platform: item.platform,
          type: item.type,
          packageName: item.package.name,
          packageId: item.package.id,
          unitPrice: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        totalAmount: cartSubtotal,
        status: 'Pending Payment',
      };

      // Save order to Local Storage via useProducts
      addOrder(orderData);

      // Clear the active cart
      clearCart();

      // Navigate to Order Success page
      navigate(`/order-success/${orderId}`);
    } catch (err) {
      console.error('Failed to process order', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Manual Checkout</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete your order and receive direct transfer instructions for instant delivery.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer Details & Payment Selector */}
        <div className="lg:col-span-7">
          <CheckoutForm
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
            onPaymentSelect={handlePaymentSelect}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        {/* Right Summary: Items & Total */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            Order Items ({cartItems.length})
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-start justify-between gap-3 text-xs border-b border-slate-800/80 pb-3"
              >
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">
                    {item.package.name} × {item.quantity}
                  </div>
                  <span className="inline-block mt-1 text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/40">
                    {item.platform}
                  </span>
                </div>
                <div className="font-bold text-cyan-300 whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="text-white font-semibold">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Transfer Fees:</span>
              <span className="text-emerald-400 font-semibold">0 IQD</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-800 text-sm">
              <span className="font-bold text-white">Total to Transfer:</span>
              <span className="text-xl font-black text-cyan-400">{formatPrice(cartSubtotal)}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Manual Payment Guarantee
            </div>
            <p className="text-[11px] leading-relaxed">
              We never ask for credit card PINs or passwords. All transactions in Kurdistan & Iraq are handled manually and securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
