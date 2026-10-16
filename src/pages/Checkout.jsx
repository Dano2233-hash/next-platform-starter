import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart.jsx';
import { CheckoutForm } from '../components/CheckoutForm.jsx';
import { formatPrice } from '../utils/formatPrice.js';
import { generateOrderId } from '../utils/orderId.js';
import { ProductImage } from '../components/ProductImage.jsx';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4 bg-[#080d1a] border border-slate-800 rounded-3xl p-8">
        <h2 className="text-xl font-extrabold text-slate-100">No Items to Checkout</h2>
        <p className="text-xs text-slate-400">
          Your shopping cart is empty. Please add products before attempting to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerData) => {
    const orderId = generateOrderId();
    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      customer: customerData,
      items: cart,
      totalPrice,
      status: 'Pending Payment'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear active cart and navigate to success
    clearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Checkout</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete your order details and choose your preferred local payment method
          </p>
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmit={handleOrderSubmit} />
        </div>

        {/* Right Column: Order Items Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#080d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Cart Summary ({cart.length} items)
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartId} className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <ProductImage product={item.product} className="w-12 h-12 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate">
                      {item.product.name}
                    </h4>
                    {item.selectedPackage && (
                      <span className="text-[11px] font-semibold text-cyan-400 block truncate">
                        {item.selectedPackage.name} x {item.quantity}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-extrabold text-slate-200">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200 font-bold">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing Fee</span>
                <span className="text-emerald-400 font-bold">0 IQD</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800">
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
