import React from 'react';
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

import { useProducts } from './hooks/useProducts';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';

export function App() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
          <Navbar />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home products={products} />} />
              <Route path="/products" element={<Products products={products} />} />
              <Route path="/product/:id" element={<ProductDetails products={products} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />

              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin
                      products={products}
                      addProduct={addProduct}
                      updateProduct={updateProduct}
                      deleteProduct={deleteProduct}
                      resetToDefault={resetToDefault}
                    />
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
    </AuthProvider>
  );
}

export default App;
