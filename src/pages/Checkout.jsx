import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ShoppingBag, ArrowLeft, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4 bg-[#0b0f19] border border-slate-800 rounded-3xl p-8">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <Gamepad2 className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const handleOrderSubmission = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote ? formData.orderNote.trim() : '',
      items: [...cart],
      totalPrice,
      status: 'Pending Payment',
    };

    // Save order
    addOrder(orderData);

    // Save current active order details for OrderSuccess page
    localStorage.setItem('dano_last_order', JSON.stringify(orderData));

    // Clear cart
    clearCart();

    // Navigate to Order Success page
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/order-success?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Checkout & <span className="text-cyan-400">Payment</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Manual Safe Payment</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Form Column */}
        <div className="lg:col-span-2">
          <CheckoutForm onSubmitOrder={handleOrderSubmission} isSubmitting={isSubmitting} />
        </div>

        {/* Order Summary Column */}
        <div className="space-y-4">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-5 space-y-4 sticky top-24">
            <h3 className="font-bold text-white text-base border-b border-slate-800 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/50 last:border-0">
                  <div>
                    <h4 className="font-bold text-slate-200 line-clamp-1">{item.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[11px] text-cyan-400 font-semibold">{item.selectedPackage}</span>
                    )}
                    <span className="text-slate-500 block">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-extrabold text-slate-100">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Delivery</span>
                <span className="text-emerald-400 font-bold">Instant Code / Digital</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;
