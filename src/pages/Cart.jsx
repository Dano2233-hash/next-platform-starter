import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-4">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-10 max-w-md mx-auto">It looks like you haven't added anything to your cart yet. Head over to our shop to find the best deals!</p>
        <Link to="/products" className="bg-accent-blue hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-xl inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="glass-card overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-widest">
               <div className="col-span-6">Product</div>
               <div className="col-span-2 text-center">Price</div>
               <div className="col-span-2 text-center">Quantity</div>
               <div className="col-span-2 text-right">Total</div>
            </div>
            <div className="divide-y divide-white/5">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedPackage.name}`} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-6 flex gap-4">
                    <div className="w-20 h-20 bg-dark-700 rounded-xl overflow-hidden shrink-0 border border-white/5">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                       <Link to={`/product/${item.slug}`} className="text-white font-bold hover:text-accent-cyan transition-colors block truncate">
                         {item.name}
                       </Link>
                       <p className="text-accent-cyan text-xs font-medium mt-1">{item.selectedPackage.name}</p>
                       <button
                        onClick={() => removeFromCart(item.id, item.selectedPackage.name)}
                        className="text-red-500 hover:text-red-400 text-xs font-bold flex items-center gap-1 mt-3"
                       >
                         <Trash2 size={12} /> Remove
                       </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-center">
                    <span className="text-gray-400 text-sm md:hidden">Price: </span>
                    <span className="text-white font-medium">{formatPrice(item.selectedPackage.price)}</span>
                  </div>

                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center gap-4 bg-white/5 rounded-lg px-3 py-1.5 border border-white/5">
                       <button onClick={() => updateQuantity(item.id, item.selectedPackage.name, -1)} className="text-gray-400 hover:text-white transition-colors">
                         <Minus size={16} />
                       </button>
                       <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                       <button onClick={() => updateQuantity(item.id, item.selectedPackage.name, 1)} className="text-gray-400 hover:text-white transition-colors">
                         <Plus size={16} />
                       </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 text-right">
                    <span className="text-gray-400 text-sm md:hidden">Total: </span>
                    <span className="text-accent-cyan font-bold">{formatPrice(item.selectedPackage.price * item.quantity)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold mt-8">
             <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
           <div className="glass-card p-6 sticky top-28">
              <h3 className="text-white font-bold text-xl mb-6">Order Summary</h3>
              <div className="space-y-4 mb-8">
                 <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="text-white">{formatPrice(cartTotal)}</span>
                 </div>
                 <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span className="text-white">0 IQD</span>
                 </div>
                 <div className="border-t border-white/5 pt-4 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-accent-cyan font-extrabold text-2xl">{formatPrice(cartTotal)}</span>
                 </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-accent-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent-blue/20 transition-all"
              >
                <CreditCard size={20} />
                Proceed to Checkout
              </Link>

              <div className="mt-8 pt-8 border-t border-white/5">
                 <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <ShieldCheck className="text-green-500" size={18} />
                    <span>Secure Checkout Guaranteed</span>
                 </div>
                 <div className="flex gap-2 grayscale opacity-50">
                    <div className="border border-white/10 rounded px-2 py-1 text-[10px]">FastPay</div>
                    <div className="border border-white/10 rounded px-2 py-1 text-[10px]">Korek</div>
                    <div className="border border-white/10 rounded px-2 py-1 text-[10px]">MasterCard</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
