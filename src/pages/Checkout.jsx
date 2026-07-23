import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';

export function Checkout() {
  const { navigate } = useNavigation();
  const { cart, getCartTotal, getCartCount, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[#050505] text-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center space-y-4">
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-red-500">Cart is Empty</h1>
          <p className="text-sm text-gray-500 max-w-sm">You must add items to your shopping cart before proceeding to checkout.</p>
          <button
            onClick={() => navigate('#/products')}
            className="px-6 py-2.5 rounded-xl bg-brand-blue text-xs font-bold uppercase tracking-wider text-white"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    setIsSubmitting(true);

    // Simulate slight lag for premium responsive loader look
    setTimeout(() => {
      const orderId = generateOrderId();
      const newOrder = {
        id: orderId,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        paymentMethod: formData.paymentMethod,
        orderNote: formData.orderNote,
        items: cart,
        totalAmount: getCartTotal(),
        date: new Date().toISOString(),
        status: 'pending'
      };

      // Read existing orders from local storage
      let existingOrders = [];
      const stored = localStorage.getItem('dano_orders');
      if (stored) {
        try {
          existingOrders = JSON.parse(stored);
        } catch (e) {}
      }

      // Add to array and save
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));

      // Clear Cart
      clearCart();

      // Redirect to success page
      setIsSubmitting(false);
      navigate(`#/order-success?id=${orderId}`);
    }, 1200);
  };

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* Navigation / Header */}
        <div className="border-b border-brand-border/60 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            Secure Digital Checkout
          </h1>
          <p className="text-xs text-gray-500">Provide payment information to generate your manual payment order voucher.</p>
        </div>

        {/* Checkout Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Form Side */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-2xl bg-[#0d0d15] border border-brand-border/60">
            <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
          </div>

          {/* Cart Side Overview */}
          <div className="lg:col-span-4 space-y-4">

            {/* Invoice Summary Box */}
            <div className="p-5 rounded-2xl bg-[#0d0d15] border border-brand-border/80 space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-white/5 pb-2">
                Your Order Items
              </h2>

              <div className="space-y-3.5 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-gray-200 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-brand-cyan font-semibold">{item.selectedPackage.name} <span className="text-gray-500 font-medium">x{item.quantity}</span></p>
                    </div>
                    <span className="font-bold text-gray-300 flex-shrink-0">
                      {formatPrice(item.selectedPackage.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 pt-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Selected Options:</span>
                  <span className="font-bold text-gray-200">{cartCount} packages</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Voucher Fee:</span>
                  <span className="font-bold text-green-500">Free Processing</span>
                </div>

                <div className="border-t border-white/5 pt-3 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-white uppercase">Invoice Total</span>
                  <span className="text-xl font-black text-brand-cyan">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

            </div>

            {/* Manual Payment Verification instructions */}
            <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/20 text-xs text-gray-400 space-y-2.5">
              <p className="font-bold text-gray-200">Manual verification steps:</p>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] text-gray-400">
                <li>Create your purchase invoice with correct details.</li>
                <li>Write down your custom Order number generated next.</li>
                <li>Transfer the exact subtotal using your selected local manual gateway.</li>
                <li>Contact our live chat support on WhatsApp or Discord to verify your transaction.</li>
              </ol>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
