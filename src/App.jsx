import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

export default function App() {
  const { products } = useProducts();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Header navbar */}
      <Navbar cartCount={getCartCount()} />

      {/* Main container content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <Routes>
          <Route path="/" element={<Home products={products} onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products products={products} onAddToCart={addToCart} />} />
          <Route path="/product/:slug" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} onUpdateQty={updateQuantity} onRemove={removeFromCart} onClear={clearCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
