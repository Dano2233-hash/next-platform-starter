import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { generateOrderId } from '../utils/orderId';
import { formatPrice } from '../utils/formatPrice';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export const Checkout = () => {
  const { cart, cartTotal, addOrder } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-200">Your cart is empty</h2>
        <p className="text-xs text-slate-400">Add products to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Store
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (customerInfo) => {
    const orderId = generateOrderId();
    const orderObj = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: customerInfo,
      items: [...cart],
      totalAmount: cartTotal,
      status: 'Pending Payment'
    };

    addOrder(orderObj);
    navigate(`/order-success/${orderId}`, { state: { order: orderObj } });
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Checkout</h1>
          <p className="text-xs text-slate-400">Complete your details to create your order code</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold">
          <Lock className="w-3.5 h-3.5" /> Secure Checkout
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main form column */}
        <div className="lg:col-span-7">
          <CheckoutForm cart={cart} cartTotal={cartTotal} onSubmitOrder={handleOrderSubmit} />
        </div>

        {/* Order review sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-[#0a0f1d] border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-xl sticky top-24">
            <h3 className="font-extrabold text-slate-100 text-base border-b border-slate-800 pb-3">
              Items in Order ({cart.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-3 bg-[#060a14] p-3 rounded-xl border border-slate-800">
                  <div className="w-12 h-12 bg-slate-900 rounded-lg shrink-0 overflow-hidden border border-slate-800 flex items-center justify-center">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-bold text-cyan-400">{item.platform?.slice(0, 3)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">
                      Qty: {item.quantity} {item.selectedPackage ? `(${item.selectedPackage})` : ''}
                    </span>
                  </div>
                  <span className="text-xs font-black text-cyan-400">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Delivery:</span>
                <span className="font-bold text-emerald-400">Digital Delivery (FREE)</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-100 pt-2 border-t border-slate-800/60">
                <span>Total Amount:</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#060a14] rounded-xl border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>After placing order, contact us on WhatsApp to confirm manual payment.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
