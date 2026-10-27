import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
  const { cartItems, cartTotalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-200">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    );
  }

  const handleFormSubmit = (formData) => {
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      customer: formData,
      items: cartItems,
      totalAmount: cartTotalAmount,
      paymentMethod: formData.paymentMethod,
      orderNote: formData.orderNote,
      createdAt: new Date().toISOString(),
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('dano_orders', JSON.stringify(updatedOrders));
    } catch (e) {
      console.error('Failed to save order to local storage:', e);
    }

    // Clear cart and redirect to success page
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <span>Complete Order</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Fill in your contact details and select your preferred local payment method
          </p>
        </div>

        <Link
          to="/cart"
          className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleFormSubmit} totalAmount={cartTotalAmount} />
        </div>

        {/* Right Column: Cart Summary Review */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#090d1a] border border-slate-800 space-y-6 sticky top-24 shadow-xl">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs text-slate-400">{cartItems.length} Items</span>
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/60">
                  <div className="w-12 h-12 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-800">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-cyan-950 flex items-center justify-center font-bold text-cyan-400 text-xs">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-cyan-400 font-semibold">{item.packageName} x {item.quantity}</p>
                  </div>

                  <span className="text-xs font-black text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotalAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD (Instant)</span>
              </div>
              <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-cyan-400">{formatPrice(cartTotalAmount)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" /> Guarantee & Support
              </div>
              <p className="text-[11px] text-slate-300">
                After placing the order, you can contact our support team on WhatsApp or Discord with your Order Number to complete manual payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
