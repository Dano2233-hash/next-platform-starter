import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import { useAuth } from './hooks/useAuth';

export const App = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleProductFlag,
    resetToDefaults
  } = useProducts();

  const { login } = useAuth();

  const handleAdminLoginSuccess = (username, password) => {
    const res = login(username, password);
    return res.success;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-slate-100">
      <Navbar products={products} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/product/:slug" element={<ProductDetails products={products} />} />
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
                <Admin
                  products={products}
                  onAddProduct={addProduct}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                  onUpdateStock={updateStock}
                  onToggleFlag={toggleProductFlag}
                  onResetProducts={resetToDefaults}
                />
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

export default App;
