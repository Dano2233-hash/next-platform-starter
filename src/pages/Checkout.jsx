import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/formatPrice';
import { generateOrderId } from '../utils/orderId';
import CheckoutForm from '../components/CheckoutForm';
import ProductImage from '../components/ProductImage';

export const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addOrder } = useProducts();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="py-16 max-w-md mx-auto text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-white">Your Cart is Empty</h2>
        <p className="text-xs text-slate-400">
          Please add products to your shopping cart before checking out.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
        >
          Return to Products
        </button>
      </div>
    );
  }

  const handleCreateOrder = (customerData) => {
    const orderId = generateOrderId();
    const orderData = {
      orderId,
      createdAt: new Date().toISOString(),
      customerName: customerData.customerName,
      phoneNumber: customerData.phoneNumber,
      city: customerData.city,
      orderNote: customerData.orderNote || '',
      paymentMethod: customerData.paymentMethod,
      paymentDetails: customerData.paymentDetails,
      items: [...cartItems],
      totalAmount: cartTotal,
      currency: 'IQD',
      status: 'Pending Payment',
    };

    // Save order in local storage via hook
    addOrder(orderData);

    // Clear cart and navigate to order success page
    clearCart();
    navigate('/order-success', { state: { order: orderData } });
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Checkout &amp; Manual Payment
          </h1>
          <p className="text-xs text-slate-400">
            Fill in your contact info and select your preferred local Kurdish / Iraqi payment option.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-[#090e21] border border-cyan-500/20 text-xs font-semibold text-cyan-400 flex items-center gap-2 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Direct Kurdistan Manual Gateway</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <CheckoutForm onSubmitOrder={handleCreateOrder} cartTotal={cartTotal} />
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="bg-[#090e21] border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-extrabold text-base text-white border-b border-slate-800 pb-3 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-bold text-cyan-400">{cartItems.length} Item(s)</span>
            </h3>

            {/* Scrollable Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center gap-3 p-2.5 bg-[#050813] border border-slate-800/80 rounded-xl"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <ProductImage
                      image={item.productImage}
                      title={item.productName}
                      category={item.category}
                      platform={item.platform}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                    {item.selectedPackage && (
                      <p className="text-[11px] text-cyan-400 truncate">{item.selectedPackage}</p>
                    )}
                    <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-black text-white font-heading">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Total */}
            <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Total</span>
                <span className="text-slate-200 font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Processing / Delivery</span>
                <span className="text-emerald-400 font-bold">FREE (Instant ID)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Currency</span>
                <span className="text-cyan-400 font-bold">IQD Only</span>
              </div>
              <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-white">Total Due</span>
                <span className="text-2xl font-black text-cyan-400 font-heading">
                  {formatPrice(cartTotal)}
                </span>
              </div>
            </div>

            {/* Payment Guarantee */}
            <div className="p-3 bg-[#060a17] border border-cyan-500/20 rounded-xl text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Manual Payment Instructions</span>
              </div>
              <p>
                After submitting, you will get an Order Number to send via WhatsApp, Discord, or TikTok along with your payment receipt.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Checkout;
