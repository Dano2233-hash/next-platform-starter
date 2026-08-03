import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckSquare } from 'lucide-react';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import ProductImage from '../components/ProductImage';

export default function Checkout({ cart, total, onOrderCreated }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent direct access to checkout with an empty cart
    if (!cart || cart.length === 0) {
      navigate('/products');
    }
  }, [cart, navigate]);

  const handleCheckoutSubmit = (customerDetails) => {
    const orderNumber = generateOrderId();

    // Construct final transaction state
    const orderData = {
      orderNumber,
      customer: customerDetails,
      items: cart,
      total,
      date: new Date().toISOString(),
      status: 'Pending Verification'
    };

    // Store order inside Local Storage
    try {
      const storedOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      storedOrders.push(orderData);
      localStorage.setItem('dano_orders', JSON.stringify(storedOrders));
    } catch (e) {
      console.error("Failed to append order record to localStorage", e);
    }

    // Clear cart and notify parents
    onOrderCreated(orderData);
    navigate(`/order-success?id=${orderNumber}`);
  };

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between border-b border-[#121225] pb-4">
        <h1 className="text-xl font-black text-white uppercase tracking-wider">
          💳 Secure Digital Checkout
        </h1>
        <Link
          to="/cart"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-premium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Edit Shopping Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left column - Customer details and payment forms */}
        <div className="lg:col-span-7">
          <CheckoutForm cart={cart} total={total} onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Right column - Cart summary layout list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#090911] border border-[#121225] p-5 rounded-xl space-y-4">
            <h3 className="text-xs font-black uppercase text-white tracking-widest border-b border-[#121225] pb-2.5">
              📋 Order Review List
            </h3>

            <div className="divide-y divide-[#121225]/40 space-y-3.5 max-h-80 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 pt-3.5 first:pt-0">
                  <div className="w-12 h-9 bg-black rounded overflow-hidden shrink-0">
                    <ProductImage product={item.product} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-extrabold text-white truncate leading-normal">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-purple-400 truncate mt-0.5">
                      🎁 Option: {item.selectedPackage}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-xs font-black text-[#00e5ff]">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#121225] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Original Subtotal</span>
                <span className="text-white font-bold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-400 pb-2.5 border-b border-[#121225]/50">
                <span>Activation Fee</span>
                <span className="text-[#00e5ff] font-bold uppercase tracking-wider text-[10px]">Free Digital</span>
              </div>
              <div className="flex justify-between items-baseline pt-2.5">
                <span className="text-gray-400 font-extrabold uppercase tracking-wider text-[10px]">Order Total</span>
                <span className="text-lg font-black text-[#00e5ff] tracking-tight">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Secure / Authentic Store validation block */}
          <div className="bg-[#05050c] border border-dashed border-[#1a1a2e] p-4 rounded-xl space-y-3">
            <div className="flex gap-2 items-center text-[#00e5ff]">
              <CheckSquare className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-wider">Secure Manual Order Flow</h4>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal">
              No credit card or online payment gateway required. Simply complete this booking, save the order reference ID, and our administrator team will finalize delivery with you directly on social apps.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
