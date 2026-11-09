import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';

// Context Providers
import { ProductsProvider } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#05070f] text-slate-100">
            {/* Global Navbar */}
            <Navbar />

            {/* Slide-out Cart Drawer */}
            <CartDrawer />

            {/* Page Router View */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* Protected Admin Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Not Found Catch-All */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}
