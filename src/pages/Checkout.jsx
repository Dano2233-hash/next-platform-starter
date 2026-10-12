import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutForm from '../components/CheckoutForm';
import { formatPrice } from '../utils/formatPrice';
import ProductImage from '../components/ProductImage';
import { ShoppingBag, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleSuccess = (createdOrder) => {
    navigate('/order-success', { state: { order: createdOrder } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <h2 className="text-2xl font-black text-slate-100">
          Your Cart is Empty
        </h2>
        <p className="text-xs text-slate-400">
          Please add products to your cart before proceeding to checkout.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">
            Checkout
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete customer details & choose FastPay, Korek, or MasterCard payment.
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-slate-400 hover:text-cyan-400 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <CheckoutForm onSuccess={handleSuccess} />
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-28">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              Order Review ({cartItems.length} items)
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-800">
                      <ProductImage
                        src={item.product.image}
                        alt={item.product.name}
                        category={item.product.category}
                        platform={item.product.platform}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-200 line-clamp-1">
                        {item.product.name}
                      </h5>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        Qty: {item.quantity} {item.selectedPackage ? `(${item.selectedPackage.name})` : ''}
                      </span>
                    </div>
                  </div>
                  <span className="font-black text-slate-100">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Digital Delivery</span>
                <span className="text-cyan-400 uppercase font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-slate-100 font-black text-base pt-2 border-t border-slate-800">
                <span>Total Due</span>
                <span className="text-cyan-400">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-bold text-slate-200 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Manual Payment Note
              </span>
              <p>
                After clicking "Complete Order", you will be given local transfer details to send payment via FastPay, Korek, or MasterCard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
