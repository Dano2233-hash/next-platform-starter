import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShieldCheck, ChevronLeft, ShoppingBag } from 'lucide-react';

export function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-sm text-slate-400">
          You need items in your cart before you can proceed to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const orderData = {
      id: orderId,
      orderNumber: orderId,
      customerName: formData.name,
      phoneNumber: formData.phone,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote || '',
      items: cart.map((item) => ({
        id: item.id,
        productId: item.product.id,
        name: item.product.name,
        package: item.selectedPackage ? item.selectedPackage.name : null,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: totalPrice,
      status: 'Pending Payment',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Save to orders state & localStorage
    addOrder(orderData);

    // Clear cart immediately
    clearCart();

    // Redirect to Order Success page with state
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/order-success', { state: { order: orderData } });
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">

      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Manual Checkout</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete your order and contact us via WhatsApp / Discord to finalize payment.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Edit Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left: Checkout Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right: Cart Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Order Summary ({cart.length} items)</span>
              </h3>
              <span className="text-xs font-bold text-cyan-400">{formatPrice(totalPrice)}</span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-slate-800/60 pb-2.5">
                  <div>
                    <h4 className="font-semibold text-slate-200">{item.product.name}</h4>
                    {item.selectedPackage && (
                      <span className="text-[11px] text-cyan-400">{item.selectedPackage.name}</span>
                    )}
                    <span className="text-slate-400 block mt-0.5">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-bold text-white whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="text-cyan-400 font-semibold">Manual Verification</span>
              </div>
              <div className="flex justify-between">
                <span>Instant Delivery</span>
                <span className="text-emerald-400 font-semibold">Digital Delivery (0 IQD)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-sm">
                <span className="font-bold text-white">Total Amount Due</span>
                <span className="text-xl font-black text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>How Manual Payment Works:</span>
            </div>
            <p>1. Submit your order with your preferred payment method.</p>
            <p>2. Send the exact amount via FastPay, Korek, or MasterCard.</p>
            <p>3. Send a screenshot on WhatsApp/Discord to receive your code in seconds!</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Checkout;
