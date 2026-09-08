import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { AdminLogin } from './pages/AdminLogin';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

import { AuthProvider } from './hooks/useAuth';
import { ProductsProvider } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';

export function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100 selection:bg-cyan-500 selection:text-black">
            <Navbar />
            <CartDrawer />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
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

            <Footer />
          </div>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
