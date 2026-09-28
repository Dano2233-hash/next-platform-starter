import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import { PAYMENT_METHODS } from '../data/categories';
import { ShoppingBag, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';

export const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-600 mx-auto" />
        <h2 className="text-2xl font-black text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Catalog
        </Link>
      </div>
    );
  }

  const handleOrderSubmit = (formData) => {
    setIsSubmitting(true);

    const orderId = generateOrderId();
    const selectedPay = PAYMENT_METHODS.find((p) => p.id === formData.paymentMethod) || PAYMENT_METHODS[0];

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        orderNote: formData.orderNote
      },
      paymentMethod: selectedPay,
      items: cartItems.map((item) => ({
        cartKey: item.cartKey,
        productId: item.productId,
        productName: item.product?.name,
        packageName: item.packageName,
        price: item.price,
        quantity: item.quantity,
        image: item.product?.image,
        category: item.product?.category,
        platform: item.product?.platform
      })),
      totalAmount: totalPrice,
      status: 'Pending Payment'
    };

    addOrder(newOrder);

    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`, { state: { order: newOrder } });
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Checkout & Payment
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete your order with FastPay, Korek, or MasterCard
          </p>
        </div>
        <Link
          to="/cart"
          className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} isSubmitting={isSubmitting} />
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#090d1a] border border-slate-800 rounded-2xl p-6 space-y-5 sticky top-24 shadow-xl">
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider text-cyan-400 border-b border-slate-800/80 pb-3">
              Order Summary ({cartItems.length} items)
            </h3>

            {/* List of items */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartKey}
                  className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <ProductImage
                    src={item.product?.image}
                    alt={item.product?.name}
                    category={item.product?.category}
                    platform={item.product?.platform}
                    className="w-12 h-12 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{item.product?.name}</h4>
                    <p className="text-[11px] text-cyan-400 font-semibold">{item.packageName}</p>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-extrabold text-xs text-slate-200 shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Manual Processing Fee</span>
                <span className="font-bold text-emerald-400">0 IQD</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-white">Total Amount</span>
                <span className="font-black text-xl text-cyan-400">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Notice */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>How Manual Payment Works:</span>
              </div>
              <p>
                After clicking "Complete Order", send the total amount via your selected payment app and share the receipt with our support on WhatsApp.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
