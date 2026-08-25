import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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

import { AuthProvider, useAuth } from './hooks/useAuth';
import { ProductsProvider } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';

function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLoginSuccess = (username, password) => {
    const res = login(username, password);
    if (res.success) {
      navigate('/admin');
    }
    return res;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1">
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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <MainLayout />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
