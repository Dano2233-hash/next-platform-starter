import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

import { CartProvider } from './hooks/useCart';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { login } = useAuth();

  const handleAdminLoginSuccess = (user, pass) => {
    login(user, pass);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#050811] text-slate-100 selection:bg-cyan-500 selection:text-black">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:orderId" element={<OrderSuccess />} />
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

        <CartDrawer />
        <Footer />
      </div>
    </CartProvider>
  );
}
