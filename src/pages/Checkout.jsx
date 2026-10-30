import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleOrderSubmit = (customerDetails) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerDetails,
      items: cart,
      totalAmount: cartTotal,
      currency: 'IQD',
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart & navigate to order success page
    clearCart();
    navigate(`/order-success?orderId=${orderId}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <ShoppingBag className="w-16 h-16 text-slate-700 mb-4" />
          <h2 className="text-xl font-bold text-slate-100 mb-2">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400 mb-6">Add products to your cart before proceeding to checkout.</p>
          <Link
            to="/products"
            className="px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-400 transition-colors"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070f] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">Checkout</h1>
            <p className="text-xs text-slate-400 mt-1">Complete your information to create your manual payment order</p>
          </div>
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Checkout Form (Left Column) */}
          <div className="lg:col-span-7">
            <CheckoutForm cart={cart} cartTotal={cartTotal} onSubmitOrder={handleOrderSubmit} />
          </div>

          {/* Order Summary Sidebar (Right Column) */}
          <div className="lg:col-span-5 bg-[#0b0f19] border border-slate-800/80 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-cyan-400">{cart.length} Items</span>
            </h3>

            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between text-xs py-2 border-b border-slate-800/50"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-bold text-slate-200 truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.packageName} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-cyan-400 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery Fee</span>
                <span className="text-emerald-400 font-bold">FREE</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-between text-lg font-extrabold text-slate-100">
                <span>Total Due</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                How Manual Payment Works
              </p>
              <p>
                After creating your order, you will receive an Order ID. Contact our support via WhatsApp/Discord/TikTok to complete payment with FastPay, Korek, or MasterCard.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
