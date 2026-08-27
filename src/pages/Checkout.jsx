import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { ShoppingCart, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Checkout({ cart = [], cartTotal, onClearCart }) {
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 my-8">
        <ShoppingCart className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400 mb-6">
          Add some digital products or game top-ups to your cart before checking out.
        </p>
        <Link
          to="/products"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-xs rounded-xl"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  const handleCreateOrder = (customerData) => {
    const orderId = generateOrderId();
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'Pending Payment Verification'
    };

    // Save order to Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('dano_orders') || '[]');
      localStorage.setItem('dano_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error('Failed to save order to localStorage', e);
    }

    // Clear cart and redirect to order success page
    onClearCart();
    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Back button */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/cart" className="flex items-center gap-1 hover:text-cyan-400">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Cart</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-3">
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          Checkout & Manual Payment
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Complete your customer details and select your payment method to place your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} />
        </div>

        {/* Right Cart Summary */}
        <div className="lg:col-span-5">
          <div className="bg-[#0a0f1d] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl sticky top-24">
            <h3 className="font-bold text-base text-white border-b border-slate-800 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.packageId}`}
                  className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      src={item.product.image}
                      alt={item.product.name}
                      category={item.product.category}
                      platform={item.product.platform}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Qty: {item.quantity} {item.packageName ? `• ${item.packageName}` : ''}
                    </p>
                  </div>
                  <div className="text-xs font-extrabold text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing & Delivery</span>
                <span className="text-emerald-400 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Safe local payments for Kurdistan & Iraq. Order verification via WhatsApp.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
