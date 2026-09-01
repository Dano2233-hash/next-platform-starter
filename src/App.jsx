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

import { ProductsProvider } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';
import { AuthProvider, useAuth } from './hooks/useAuth';

const MainAppContent = () => {
  const { login } = useAuth();

  const handleAdminLoginSuccess = (username, password) => {
    login(username, password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050714] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar />
      <CartDrawer />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path="/admin-login"
            element={<AdminLogin onLoginSuccess={handleAdminLoginSuccess} />}
          />
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
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
